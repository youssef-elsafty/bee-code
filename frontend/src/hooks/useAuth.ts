'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/lib/api';
import { saveTokens, logout as logoutFn, isAuthenticated } from '@/lib/auth';
import { AdminUser } from '@/types';
import toast from 'react-hot-toast';

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(true);

  // Current user query
  const { data: user, isLoading: userLoading } = useQuery<AdminUser>({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      const { data } = await authApi.me();
      return data;
    },
    enabled: isAuthenticated(),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    setIsLoading(userLoading);
  }, [userLoading]);

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: { username: string; password: string }) => {
      const { data } = await authApi.login(credentials);
      return data;
    },
    onSuccess: (data) => {
      saveTokens({ access: data.access, refresh: data.refresh });
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
      toast.success('تم تسجيل الدخول بنجاح');
      router.push('/admin/dashboard');
    },
    onError: () => {
      toast.error('اسم المستخدم أو كلمة المرور غير صحيحة');
    },
  });

  // Logout
  const handleLogout = useCallback(async () => {
    await logoutFn();
    queryClient.clear();
    router.push('/admin/login');
    toast.success('تم تسجيل الخروج');
  }, [router, queryClient]);

  const requireAuth = useCallback(() => {
    if (!isAuthenticated()) {
      router.push('/admin/login');
    }
  }, [router]);

  return {
    user,
    isAuthenticated: isAuthenticated() && !!user,
    isLoading: isLoading || loginMutation.isPending,
    login: loginMutation.mutate,
    logout: handleLogout,
    requireAuth,
  };
}
