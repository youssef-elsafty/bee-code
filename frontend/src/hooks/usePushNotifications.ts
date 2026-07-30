'use client';

import { useState, useEffect } from 'react';
import { requestNotificationPermission, initFirebasePush, PushSubscriptionResult } from '@/lib/firebasePush';

export function usePushNotifications() {
  const [pushState, setPushState] = useState<PushSubscriptionResult>({
    supported: false,
    permission: 'default',
    token: null,
    error: null,
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPushState((prev) => ({
        ...prev,
        supported: true,
        permission: Notification.permission,
      }));
    }
  }, []);

  const enableNotifications = async () => {
    setIsLoading(true);
    try {
      const permission = await requestNotificationPermission();
      if (permission === 'granted') {
        const result = await initFirebasePush();
        setPushState(result);
      } else {
        setPushState((prev) => ({
          ...prev,
          permission,
          error: 'تم رفض إذن الإشعارات من قبل المستخدم',
        }));
      }
    } catch (err: any) {
      setPushState((prev) => ({
        ...prev,
        error: err?.message || 'حدث خطأ أثناء تفعيل الإشعارات',
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    ...pushState,
    isLoading,
    enableNotifications,
  };
}
