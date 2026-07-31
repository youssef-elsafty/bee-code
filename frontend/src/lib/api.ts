// ============================================================
// API CLIENT — Axios with JWT interceptors + auto-refresh
// ============================================================
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import {
  getLocalRegistrations,
  updateLocalRegistrationStatus,
  deleteLocalRegistration,
  getLocalNotifications,
  getLocalStats,
} from './registrationsStore';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://bee-code.onrender.com/api/v1';

// ── Public API (no auth) ──────────────────────────────────────
export const publicApi = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
});

// ── Authenticated API ─────────────────────────────────────────
export const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
  withCredentials: false,
});

// Request interceptor — attach access token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = Cookies.get('access_token') || (typeof window !== 'undefined' ? localStorage.getItem('access_token') : null);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor — auto-refresh on 401
let isRefreshing = false;
let failedQueue: Array<{ resolve: (v: unknown) => void; reject: (e: unknown) => void }> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) =>
    error ? reject(error) : resolve(token),
  );
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = Cookies.get('refresh_token') || (typeof window !== 'undefined' ? localStorage.getItem('refresh_token') : null);
      if (!refreshToken) {
        clearAuthCookies();
        if (typeof window !== 'undefined') window.location.href = '/admin/login';
        return Promise.reject(error);
      }

      try {
        const { data } = await publicApi.post('/auth/refresh/', { refresh: refreshToken });
        Cookies.set('access_token', data.access, { expires: 1, sameSite: 'lax' });
        if (typeof window !== 'undefined') localStorage.setItem('access_token', data.access);
        api.defaults.headers.common.Authorization = `Bearer ${data.access}`;
        processQueue(null, data.access);
        originalRequest.headers.Authorization = `Bearer ${data.access}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        clearAuthCookies();
        if (typeof window !== 'undefined') window.location.href = '/admin/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export function clearAuthCookies() {
  Cookies.remove('access_token');
  Cookies.remove('refresh_token');
  if (typeof window !== 'undefined') {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
}

// ── API endpoint functions ────────────────────────────────────

// Auth
export const authApi = {
  login: (credentials: { username: string; password: string }) =>
    publicApi.post('/auth/login/', credentials),
  refresh: (refresh: string) =>
    publicApi.post('/auth/refresh/', { refresh }),
  logout: (refresh: string) =>
    api.post('/auth/logout/', { refresh }),
  me: async () => {
    const token = Cookies.get('access_token');
    if (token === 'demo-access-token') {
      return {
        data: {
          id: 1,
          username: 'admin',
          email: 'admin@beecode.com',
          role: 'superadmin',
          first_name: 'أدمن',
          last_name: 'الأكاديمية',
          is_active: true,
          date_joined: new Date().toISOString(),
        }
      };
    }
    return api.get('/auth/me/');
  },
};

// Public
export const publicEndpoints = {
  getAvailableSchedules: () =>
    publicApi.get('/schedules/available/'),
  register: (data: unknown) =>
    publicApi.post('/register/', data),
};

// Admin — Students / Registrations
export const studentsApi = {
  list: (params?: Record<string, unknown>) =>
    api.get('/admin/students/', { params }),
  get: (id: number) =>
    api.get(`/admin/students/${id}/`),
  update: (id: number, data: unknown) =>
    api.patch(`/admin/students/${id}/`, data),
  delete: (id: number) =>
    api.delete(`/admin/students/${id}/`),
  registrations: async (params?: Record<string, unknown>) => {
    try {
      const res = await api.get('/admin/registrations/', { params });
      if (Array.isArray(res.data)) {
        return { data: { results: res.data, count: res.data.length } };
      }
      if (res.data?.results !== undefined) return res;
    } catch (err) {
      console.error('Error fetching registrations from API:', err);
    }
    const all = getLocalRegistrations();
    let filtered = all;
    if (params?.search) {
      const q = String(params.search).toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.student.full_name.toLowerCase().includes(q) ||
          r.student.phone.includes(q) ||
          r.student.parent_name.toLowerCase().includes(q)
      );
    }
    if (params?.status) {
      filtered = filtered.filter((r) => r.status === params.status);
    }
    return { data: { results: filtered, count: filtered.length } };
  },
  updateRegistration: async (id: number, data: unknown) => {
    try {
      return await api.patch(`/admin/registrations/${id}/`, data);
    } catch {
      const d = data as { status?: import('@/types').RegistrationStatus };
      if (d.status) updateLocalRegistrationStatus(id, d.status);
      return { data: { success: true } };
    }
  },
  deleteRegistration: async (id: number) => {
    try {
      return await api.delete(`/admin/registrations/${id}/`);
    } catch {
      deleteLocalRegistration(id);
      return { data: { success: true } };
    }
  },
};

// Admin — Schedules
export const schedulesApi = {
  list: () => api.get('/admin/schedules/'),
  create: (data: unknown) => api.post('/admin/schedules/', data),
  update: (id: number, data: unknown) => api.patch(`/admin/schedules/${id}/`, data),
  delete: (id: number) => api.delete(`/admin/schedules/${id}/`),
  toggle: (id: number) => api.post(`/admin/schedules/${id}/toggle/`),
};

// Admin — Dashboard
export const dashboardApi = {
  stats: async () => {
    try {
      const res = await api.get('/admin/dashboard/stats/');
      if (res.data) return res;
    } catch {
      // Fallback to local store
    }
    return { data: getLocalStats() };
  },
  auditLogs: (params?: Record<string, unknown>) => api.get('/admin/dashboard/audit-logs/', { params }),
};

// Admin — Notifications
export const notificationsApi = {
  list: async (params?: Record<string, unknown>) => {
    try {
      const res = await api.get('/admin/notifications/', { params });
      if (Array.isArray(res.data)) {
        return { data: { results: res.data, count: res.data.length } };
      }
      if (res.data?.results) return res;
    } catch {
      // Fallback
    }
    const notifs = getLocalNotifications();
    return { data: { results: notifs, count: notifs.length } };
  },
  markRead: (ids?: number[]) => api.post('/admin/notifications/mark-read/', { ids }),
  markAllRead: () => api.post('/admin/notifications/mark-read/', { all: true }),
  delete: (id: number) => api.delete(`/admin/notifications/${id}/`),
};

// Admin — Export
export const exportApi = {
  students: (format: 'xlsx' | 'csv' | 'pdf') =>
    api.get(`/admin/dashboard/export/students/`, { params: { format }, responseType: 'blob' }),
};
