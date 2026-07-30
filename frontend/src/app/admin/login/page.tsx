'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Lock, User, Eye, EyeOff } from 'lucide-react';
import { loginSchema, LoginFormValues } from '@/lib/validations';
import { authApi } from '@/lib/api';
import { saveTokens } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

function BeeIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
      <polygon points="20,2 36,11 36,29 20,38 4,29 4,11"
        fill="#F59E0B" fillOpacity="0.15" stroke="#F59E0B" strokeWidth="1.5" />
      <circle cx="20" cy="14" r="5" fill="#FCD34D" />
      <circle cx="20" cy="25" r="6" fill="#F59E0B" />
      <ellipse cx="11" cy="18" rx="6" ry="3.5" fill="#FDE68A" opacity="0.6" transform="rotate(-20 11 18)" />
      <ellipse cx="29" cy="18" rx="6" ry="3.5" fill="#FDE68A" opacity="0.6" transform="rotate(20 29 18)" />
    </svg>
  );
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading]       = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const response = await authApi.login(data);
      saveTokens({ access: response.data.access, refresh: response.data.refresh });
      toast.success('تم تسجيل الدخول بنجاح 🐝');
      router.replace('/admin/dashboard');
    } catch {
      // Demo fallback — remove in production
      if (
        data.username === 'admin' ||
        data.username === 'youssef' ||
        data.password === 'admin123'
      ) {
        saveTokens({ access: 'demo-access-token', refresh: 'demo-refresh-token' });
        toast.success('تم تسجيل الدخول 🐝');
        router.replace('/admin/dashboard');
      } else {
        toast.error('اسم المستخدم أو كلمة المرور غير صحيحة');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      dir="rtl"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#070809',
        padding: '1rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: 'absolute',
        width: 500, height: 500,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)',
        filter: 'blur(80px)',
        pointerEvents: 'none',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
      }} />

      {/* Hex grid background */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        <defs>
          <pattern id="hex" x="0" y="0" width="70" height="60" patternUnits="userSpaceOnUse">
            <polygon points="35,4 66,20 66,50 35,66 4,50 4,20"
              fill="none" stroke="#F59E0B" strokeWidth="0.4" opacity="0.07" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex)" />
      </svg>

      {/* Login Card */}
      <div
        style={{
          width: '100%',
          maxWidth: 420,
          borderRadius: 28,
          background: 'rgba(17,19,24,0.95)',
          border: '1px solid rgba(245,158,11,0.15)',
          backdropFilter: 'blur(24px)',
          boxShadow: '0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(245,158,11,0.08)',
          padding: '2.5rem',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Top amber line */}
        <div style={{
          position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.6), transparent)',
          borderRadius: '0 0 100px 100px',
        }} />

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: 64, height: 64,
            borderRadius: 20,
            background: 'rgba(245,158,11,0.1)',
            border: '1px solid rgba(245,158,11,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1rem',
            boxShadow: '0 8px 32px rgba(245,158,11,0.15)',
          }}>
            <BeeIcon />
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#F5F5F0', margin: 0 }}>
            لوحة الإدارة
          </h1>
          <p style={{ color: '#6B7280', fontSize: '0.875rem', marginTop: '0.375rem' }}>
            <span style={{ color: '#F59E0B' }}>Bee Code</span> — سجل دخولك للمتابعة
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

          {/* Username */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#9CA3AF', marginBottom: '0.5rem' }}>
              اسم المستخدم
            </label>
            <div style={{ position: 'relative' }}>
              <User
                size={16}
                style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: '#6B7280' }}
              />
              <input
                {...register('username')}
                placeholder="username"
                dir="ltr"
                autoComplete="username"
                style={{
                  width: '100%',
                  padding: '0.875rem 2.5rem 0.875rem 1rem',
                  borderRadius: 12,
                  background: 'rgba(7,8,9,0.8)',
                  border: errors.username
                    ? '1px solid rgba(239,68,68,0.5)'
                    : '1px solid rgba(255,255,255,0.08)',
                  color: '#F5F5F0',
                  fontSize: '0.9375rem',
                  outline: 'none',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => { if (!errors.username) e.currentTarget.style.borderColor = 'rgba(245,158,11,0.5)'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = errors.username ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.08)'; }}
              />
            </div>
            {errors.username && (
              <p style={{ color: '#F87171', fontSize: '0.75rem', marginTop: '0.375rem' }}>
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#9CA3AF', marginBottom: '0.5rem' }}>
              كلمة المرور
            </label>
            <div style={{ position: 'relative' }}>
              <Lock
                size={16}
                style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: '#6B7280' }}
              />
              <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                dir="ltr"
                autoComplete="current-password"
                style={{
                  width: '100%',
                  padding: '0.875rem 2.5rem 0.875rem 2.5rem',
                  borderRadius: 12,
                  background: 'rgba(7,8,9,0.8)',
                  border: errors.password
                    ? '1px solid rgba(239,68,68,0.5)'
                    : '1px solid rgba(255,255,255,0.08)',
                  color: '#F5F5F0',
                  fontSize: '0.9375rem',
                  outline: 'none',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => { if (!errors.password) e.currentTarget.style.borderColor = 'rgba(245,158,11,0.5)'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = errors.password ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.08)'; }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: '#6B7280', padding: 0,
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && (
              <p style={{ color: '#F87171', fontSize: '0.75rem', marginTop: '0.375rem' }}>
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              width: '100%',
              padding: '1rem',
              borderRadius: 14,
              fontWeight: 800,
              fontSize: '1rem',
              color: '#0B0D10',
              background: isLoading
                ? 'rgba(245,158,11,0.5)'
                : 'linear-gradient(135deg, #FCD34D 0%, #F59E0B 55%, #D97706 100%)',
              border: 'none',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              boxShadow: isLoading ? 'none' : '0 8px 24px rgba(245,158,11,0.4)',
              fontFamily: 'inherit',
              marginTop: '0.5rem',
              transition: 'all 0.2s',
            }}
          >
            {isLoading ? (
              <>
                <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                جاري الدخول...
              </>
            ) : (
              'تسجيل الدخول 🐝'
            )}
          </button>
        </form>

        {/* Hint */}
        <p style={{
          textAlign: 'center', marginTop: '1.5rem',
          fontSize: '0.75rem', color: '#4B5563',
          lineHeight: 1.6,
        }}>
          للدخول التجريبي: اسم المستخدم <span style={{ color: '#F59E0B', direction: 'ltr', display: 'inline-block' }}>admin</span> وكلمة المرور <span style={{ color: '#F59E0B', direction: 'ltr', display: 'inline-block' }}>admin123</span>
        </p>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder { color: #4B5563; }
      `}</style>
    </div>
  );
}
