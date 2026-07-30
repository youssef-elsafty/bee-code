'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { studentsApi } from '@/lib/api';
import { PaginatedResponse, Registration, TableFilters } from '@/types';
import toast from 'react-hot-toast';

// Admin: registrations list with filters
export function useRegistrations(filters: TableFilters = {}) {
  return useQuery<PaginatedResponse<Registration>>({
    queryKey: ['admin', 'registrations', filters],
    queryFn: async () => {
      const { data } = await studentsApi.registrations(filters as Record<string, unknown>);
      return data;
    },
    placeholderData: (prev) => prev,
    refetchInterval: 4000,
  });
}

// Admin: update registration (status, notes)
export function useUpdateRegistration() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: unknown }) =>
      studentsApi.updateRegistration(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'registrations'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'dashboard'] });
      toast.success('تم تحديث بيانات الطالب');
    },
    onError: () => toast.error('فشل تحديث البيانات'),
  });
}

// Admin: delete registration
export function useDeleteRegistration() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => studentsApi.deleteRegistration(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'registrations'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'schedules'] });
      toast.success('تم حذف التسجيل');
    },
    onError: () => toast.error('فشل حذف التسجيل'),
  });
}
