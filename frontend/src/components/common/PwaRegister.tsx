'use client';

import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function PwaRegister() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;

    const registerSW = async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
        });

        console.log('🐝 Bee Code PWA Service Worker Registered Scope:', registration.scope);

        // Listener for waiting worker (installed & ready to take over)
        const showUpdateToast = (worker: ServiceWorker) => {
          toast(
            (t) => (
              <div className="flex items-center gap-3 text-xs font-bold text-slate-100">
                <span>تحديث جديد متاح لتطبيق Bee Code 🐝</span>
                <button
                  onClick={() => {
                    worker.postMessage({ type: 'SKIP_WAITING' });
                    toast.dismiss(t.id);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black shadow-md hover:brightness-110 active:scale-95 transition-all"
                >
                  تحديث الآن
                </button>
              </div>
            ),
            {
              duration: Infinity,
              position: 'bottom-center',
              style: {
                background: '#111318',
                border: '1px solid rgba(245,158,11,0.3)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
              },
            }
          );
        };

        if (registration.waiting) {
          showUpdateToast(registration.waiting);
        }

        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          if (!installingWorker) return;

          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
              showUpdateToast(installingWorker);
            }
          };
        };

        // Reload page when new service worker takes control
        let refreshing = false;
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          if (!refreshing) {
            refreshing = true;
            window.location.reload();
          }
        });
      } catch (error) {
        console.error('🐝 Service Worker Registration Failed:', error);
      }
    };

    window.addEventListener('load', registerSW);

    return () => {
      window.removeEventListener('load', registerSW);
    };
  }, []);

  return null;
}
