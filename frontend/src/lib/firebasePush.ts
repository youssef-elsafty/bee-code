/**
 * Firebase Web Push Architecture — Frontend Configuration
 * Ready to connect with backend Django FCM endpoints
 */

export interface PushSubscriptionResult {
  supported: boolean;
  permission: NotificationPermission;
  token: string | null;
  error: string | null;
}

export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'denied';
  }
  const permission = await Notification.requestPermission();
  return permission;
}

export async function initFirebasePush(): Promise<PushSubscriptionResult> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator) || !('Notification' in window)) {
    return {
      supported: false,
      permission: 'denied',
      token: null,
      error: 'Push Notifications not supported in this environment',
    };
  }

  const permission = Notification.permission;
  if (permission !== 'granted') {
    return {
      supported: true,
      permission,
      token: null,
      error: 'Permission not granted',
    };
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    let subscription = await registration.pushManager.getSubscription();

    if (!subscription) {
      // VAPID Public Key stub ready for Firebase Project
      const vapidPublicKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY || 'BEE_CODE_VAPID_PUBLIC_KEY_PLACEHOLDER';
      
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: vapidPublicKey,
      });
    }

    const token = JSON.stringify(subscription);
    return {
      supported: true,
      permission: 'granted',
      token,
      error: null,
    };
  } catch (err: any) {
    return {
      supported: true,
      permission: Notification.permission,
      token: null,
      error: err.message || 'Failed to initialize push subscription',
    };
  }
}
