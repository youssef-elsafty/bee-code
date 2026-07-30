// ============================================================
// AUTH HELPERS — JWT token management
// ============================================================
import Cookies from 'js-cookie';
import { AdminUser, AuthTokens } from '@/types';
import { authApi, clearAuthCookies } from './api';

const COOKIE_OPTIONS = {
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
};

export function saveTokens(tokens: AuthTokens): void {
  // Access token: 1 day
  Cookies.set('access_token', tokens.access, { ...COOKIE_OPTIONS, expires: 1 });
  // Refresh token: 7 days
  Cookies.set('refresh_token', tokens.refresh, { ...COOKIE_OPTIONS, expires: 7 });
}

export function getAccessToken(): string | undefined {
  return Cookies.get('access_token');
}

export function getRefreshToken(): string | undefined {
  return Cookies.get('refresh_token');
}

export function isAuthenticated(): boolean {
  return !!Cookies.get('access_token');
}

export async function logout(): Promise<void> {
  const refresh = getRefreshToken();
  if (refresh) {
    try {
      await authApi.logout(refresh);
    } catch {
      // ignore — we still clear cookies
    }
  }
  clearAuthCookies();
}

export async function getCurrentUser(): Promise<AdminUser | null> {
  try {
    const { data } = await authApi.me();
    return data as AdminUser;
  } catch {
    return null;
  }
}

export function decodeJwt(token: string): Record<string, unknown> | null {
  try {
    const payload = token.split('.')[1];
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  const decoded = decodeJwt(token);
  if (!decoded?.exp) return true;
  return (decoded.exp as number) * 1000 < Date.now();
}
