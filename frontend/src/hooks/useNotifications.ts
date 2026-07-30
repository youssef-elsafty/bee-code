'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationsApi } from '@/lib/api';
import { isAuthenticated } from '@/lib/auth';
import { Notification, PaginatedResponse } from '@/types';

export function useNotifications(params?: Record<string, unknown>) {
  return useQuery<PaginatedResponse<Notification>>({
    queryKey: ['admin', 'notifications', params],
    queryFn: async () => {
      const { data } = await notificationsApi.list(params);
      return data;
    },
    enabled: typeof window !== 'undefined' ? isAuthenticated() : false,
    refetchInterval: 5000,
  });
}

export function useUnreadCount() {
  return useQuery<number>({
    queryKey: ['admin', 'notifications', 'unread-count'],
    queryFn: async () => {
      const { data } = await notificationsApi.list({ is_read: false, page_size: 1 });
      return data.count;
    },
    enabled: typeof window !== 'undefined' ? isAuthenticated() : false,
    refetchInterval: 5000,
  });
}

export function useMarkNotificationsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (ids?: number[]) => notificationsApi.markRead(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'notifications'] });
    },
  });
}

export function useMarkAllRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => notificationsApi.markAllRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'notifications'] });
    },
  });
}
