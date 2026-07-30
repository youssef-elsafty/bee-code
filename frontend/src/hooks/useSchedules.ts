'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { schedulesApi, publicEndpoints } from '@/lib/api';
import { Schedule } from '@/types';
import toast from 'react-hot-toast';

const STORAGE_KEY = 'beecode_schedules_cache';

const DEFAULT_SCHEDULES: Schedule[] = [
  {
    id: 1,
    day_of_week: 'SAT_TUE',
    day_display: 'السبت والثلاثاء',
    time_slot: 15,
    time_display: '3:00 مساءً',
    total_seats: 30,
    occupied_seats: 0,
    available_seats: 30,
    is_active: true,
    is_full: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    day_of_week: 'SAT_TUE',
    day_display: 'السبت والثلاثاء',
    time_slot: 16,
    time_display: '4:00 مساءً',
    total_seats: 30,
    occupied_seats: 0,
    available_seats: 30,
    is_active: true,
    is_full: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 3,
    day_of_week: 'SAT_TUE',
    day_display: 'السبت والثلاثاء',
    time_slot: 17,
    time_display: '5:00 مساءً',
    total_seats: 30,
    occupied_seats: 0,
    available_seats: 30,
    is_active: true,
    is_full: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 4,
    day_of_week: 'SUN_WED',
    day_display: 'الأحد والأربعاء',
    time_slot: 15,
    time_display: '3:00 مساءً',
    total_seats: 30,
    occupied_seats: 0,
    available_seats: 30,
    is_active: true,
    is_full: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 5,
    day_of_week: 'SUN_WED',
    day_display: 'الأحد والأربعاء',
    time_slot: 16,
    time_display: '4:00 مساءً',
    total_seats: 30,
    occupied_seats: 0,
    available_seats: 30,
    is_active: true,
    is_full: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 6,
    day_of_week: 'SUN_WED',
    day_display: 'الأحد والأربعاء',
    time_slot: 17,
    time_display: '5:00 مساءً',
    total_seats: 30,
    occupied_seats: 0,
    available_seats: 30,
    is_active: true,
    is_full: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export function getStoredSchedules(): Schedule[] {
  if (typeof window === 'undefined') return DEFAULT_SCHEDULES;
  try {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // fallback
  }
  return DEFAULT_SCHEDULES;
}

export function saveStoredSchedules(schedules: Schedule[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(schedules));
  } catch {
    // fallback
  }
}

export function reserveSeatLocally(scheduleId: number): Schedule[] {
  const current = getStoredSchedules();
  const updated = current.map((s) => {
    if (s.id === scheduleId) {
      const newOccupied = (s.occupied_seats || 0) + 1;
      const total = s.total_seats || 30;
      const newAvailable = Math.max(0, total - newOccupied);
      return {
        ...s,
        occupied_seats: newOccupied,
        available_seats: newAvailable,
        is_full: newAvailable <= 0,
      };
    }
    return s;
  });
  saveStoredSchedules(updated);
  return updated;
}

// Helper to map backend schedule format (day, time) to frontend format
export function mapBackendSchedule(s: any): Schedule {
  if (!s) return s;

  const rawDay = s.day || s.day_of_week || 'SAT';
  let day_of_week: Schedule['day_of_week'] = 'SAT_TUE';
  let day_display = s.day_display || '';

  if (rawDay === 'SAT' || rawDay === 'TUE' || rawDay === 'SAT_TUE') {
    day_of_week = 'SAT_TUE';
    day_display = 'السبت والثلاثاء';
  } else if (rawDay === 'SUN' || rawDay === 'WED' || rawDay === 'SUN_WED') {
    day_of_week = 'SUN_WED';
    day_display = 'الأحد والأربعاء';
  } else {
    day_of_week = rawDay as any;
    day_display = rawDay;
  }

  const rawTime = s.time || '15:00:00';
  const hour = parseInt(rawTime.split(':')[0], 10) || 15;

  const timeDisplayMap: Record<number, string> = {
    15: '3:00 مساءً',
    16: '4:00 مساءً',
    17: '5:00 مساءً',
  };

  const totalSeats = s.total_seats || 30;
  const occupiedSeats = s.occupied_seats || 0;
  const availableSeats = typeof s.available_seats === 'number' ? s.available_seats : Math.max(0, totalSeats - occupiedSeats);

  return {
    id: s.id,
    day_of_week,
    day_display,
    time_slot: hour as any,
    time_display: timeDisplayMap[hour] || `${hour}:00 مساءً`,
    total_seats: totalSeats,
    occupied_seats: occupiedSeats,
    available_seats: availableSeats,
    is_active: s.is_active !== false,
    is_full: availableSeats <= 0,
    created_at: s.created_at || new Date().toISOString(),
    updated_at: s.updated_at || new Date().toISOString(),
  };
}

function mapScheduleToBackend(data: any) {
  if (!data) return data;
  if (data.day && data.time) return data;

  let day = data.day_of_week || 'SAT';
  if (day === 'SAT_TUE') day = 'SAT';
  if (day === 'SUN_WED') day = 'SUN';

  const hour = data.time_slot || 15;
  const time = `${hour}:00:00`;

  return {
    day,
    time,
    total_seats: Number(data.total_seats || 30),
    is_active: data.is_active !== false,
  };
}

// Public: available schedules for registration form
export function useAvailableSchedules() {
  return useQuery<Schedule[]>({
    queryKey: ['schedules', 'available'],
    queryFn: async () => {
      try {
        const { data } = await publicEndpoints.getAvailableSchedules();
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map(mapBackendSchedule);
          saveStoredSchedules(mapped);
          return mapped;
        }
        return getStoredSchedules();
      } catch {
        return getStoredSchedules();
      }
    },
    staleTime: 1000 * 10,
  });
}

// Admin: all schedules
export function useAdminSchedules() {
  return useQuery<Schedule[]>({
    queryKey: ['admin', 'schedules'],
    queryFn: async () => {
      try {
        const { data } = await schedulesApi.list();
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map(mapBackendSchedule);
          saveStoredSchedules(mapped);
          return mapped;
        }
        return getStoredSchedules();
      } catch {
        return getStoredSchedules();
      }
    },
  });
}

// Admin: create schedule
export function useCreateSchedule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: unknown) => schedulesApi.create(mapScheduleToBackend(data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'schedules'] });
      queryClient.invalidateQueries({ queryKey: ['schedules', 'available'] });
      toast.success('تم إنشاء الموعد بنجاح');
    },
    onError: () => toast.error('فشل إنشاء الموعد'),
  });
}

// Admin: update schedule
export function useUpdateSchedule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: unknown }) =>
      schedulesApi.update(id, mapScheduleToBackend(data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'schedules'] });
      queryClient.invalidateQueries({ queryKey: ['schedules', 'available'] });
      toast.success('تم تحديث الموعد');
    },
    onError: () => toast.error('فشل تحديث الموعد'),
  });
}

// Admin: toggle schedule active status
export function useToggleSchedule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => schedulesApi.toggle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'schedules'] });
      queryClient.invalidateQueries({ queryKey: ['schedules', 'available'] });
      toast.success('تم تغيير حالة الموعد');
    },
    onError: () => toast.error('فشل تغيير حالة الموعد'),
  });
}

// Admin: delete schedule
export function useDeleteSchedule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => schedulesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'schedules'] });
      toast.success('تم حذف الموعد');
    },
    onError: () => toast.error('فشل حذف الموعد'),
  });
}
