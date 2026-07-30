'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import AdminSidebar from '@/components/admin/AdminSidebar';
import QueryProvider from '@/providers/QueryProvider';
import { Toaster } from 'react-hot-toast';
import BackToTop from '@/components/common/BackToTop';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [authed, setAuthed] = useState(false);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    setMounted(true);
    const isUserAuthed = isAuthenticated();
    setAuthed(isUserAuthed);

    if (!isUserAuthed && !isLoginPage) {
      router.replace('/admin/login');
    }
  }, [pathname, isLoginPage, router]);

  // Prevent hydration mismatch by rendering empty frame until mounted on client
  if (!mounted) {
    return (
      <div style={{ minHeight: '100vh', background: '#070809' }} />
    );
  }

  /* ── Login page: render without sidebar ── */
  if (isLoginPage) {
    return (
      <QueryProvider>
        <div
          style={{
            minHeight: '100vh',
            background: '#070809',
            color: '#F5F5F0',
            fontFamily: 'var(--font-cairo), system-ui, sans-serif',
          }}
          dir="rtl"
        >
          {children}
        </div>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: '#111318',
              color: '#fff',
              border: '1px solid rgba(245,158,11,0.2)',
              fontFamily: 'var(--font-cairo), system-ui, sans-serif',
            },
          }}
        />
      </QueryProvider>
    );
  }

  /* ── Not authenticated: blank redirect (no flash) ── */
  if (!authed) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#070809',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '1rem',
          fontFamily: 'var(--font-cairo), system-ui, sans-serif',
        }}
      >
        {/* Tiny spinner — redirecting */}
        <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
          <polygon
            points="20,2 36,11 36,29 20,38 4,29 4,11"
            fill="#F59E0B"
            fillOpacity="0.15"
            stroke="#F59E0B"
            strokeWidth="1.5"
          />
          <circle cx="20" cy="17" r="4" fill="#FCD34D" />
          <circle cx="20" cy="27" r="5" fill="#F59E0B" />
        </svg>
        <p style={{ color: '#6B7280', fontSize: '0.875rem' }}>جاري التحقق من الهوية...</p>
      </div>
    );
  }

  /* ── Authenticated: full dashboard ── */
  return (
    <QueryProvider>
      <div
        dir="rtl"
        style={{
          minHeight: '100vh',
          display: 'flex',
          background: '#070809',
          color: '#F5F5F0',
          fontFamily: 'var(--font-cairo), system-ui, sans-serif',
        }}
      >
        <AdminSidebar />

        <main style={{ flex: 1, overflowX: 'hidden' }}>
          <div className="px-4 py-4 mt-14 lg:mt-0 lg:px-8 lg:py-8">
            {children}
          </div>
        </main>
      </div>

      <BackToTop />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#111318',
            color: '#fff',
            border: '1px solid rgba(245,158,11,0.2)',
            fontFamily: 'var(--font-cairo), system-ui, sans-serif',
          },
        }}
      />
    </QueryProvider>
  );
}
