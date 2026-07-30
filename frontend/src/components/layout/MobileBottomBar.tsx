'use client';

import { useState, useEffect } from 'react';
import { Home, BookOpen, Sparkles, UserCheck, MessageCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

import toast from 'react-hot-toast';

const WHATSAPP_GROUP_URL = 'https://chat.whatsapp.com/LYzxCLQzAn79vvmQpAxZ1x?mode=gi_t';

export default function MobileBottomBar() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<string>('home');

  // Hide on admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const handleNavigate = (tab: string, targetId?: string) => {
    setActiveTab(tab);

    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(12);
      } catch (e) {
        // Haptic feedback fallback
      }
    }

    if (tab === 'whatsapp') {
      toast.error('⚠️ برجاء الحجز أولاً للانضمام لجروب الواتساب والتواصل مع الفريق!', {
        duration: 4000,
        style: {
          background: '#111318',
          color: '#fff',
          border: '1px solid rgba(245,158,11,0.4)',
          fontWeight: 'bold',
          fontFamily: 'var(--font-cairo)',
        },
      });

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('require-booking-notice'));
      }

      const el = document.getElementById('register');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = '/#register';
      }
      return;
    }

    if (tab === 'instructor') {
      window.dispatchEvent(new CustomEvent('open-instructor-drawer'));
      return;
    }

    if (tab === 'register') {
      const el = document.getElementById('register');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = '/register';
      }
      return;
    }

    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else if (pathname !== '/') {
        window.location.href = `/#${targetId}`;
      }
    }
  };

  return (
    <nav
      aria-label="Mobile Navigation Bar"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden pointer-events-auto select-none pb-safe"
    >
      {/* Top glowing separator border */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

      {/* Glass Bottom Bar Container */}
      <div className="px-2 py-2 flex items-center justify-around bg-[#0B0D10]/95 backdrop-blur-2xl border-t border-white/10 shadow-[0_-10px_35px_rgba(0,0,0,0.85)]">
        {/* Tab 1: Home */}
        <button
          onClick={() => handleNavigate('home', 'hero')}
          type="button"
          className={`flex-1 py-1.5 px-1 flex flex-col items-center justify-center gap-1 rounded-xl transition-all duration-200 active:scale-95 ${
            activeTab === 'home' ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Home size={19} className={activeTab === 'home' ? 'text-amber-400 scale-110' : ''} />
          <span className="text-[0.62rem] font-bold tracking-tight">الرئيسية</span>
        </button>

        {/* Tab 2: Curriculum / Challenge */}
        <button
          onClick={() => handleNavigate('curriculum', 'challenge')}
          type="button"
          className={`flex-1 py-1.5 px-1 flex flex-col items-center justify-center gap-1 rounded-xl transition-all duration-200 active:scale-95 ${
            activeTab === 'curriculum' ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen size={19} className={activeTab === 'curriculum' ? 'text-amber-400 scale-110' : ''} />
          <span className="text-[0.62rem] font-bold tracking-tight">المنهج</span>
        </button>

        {/* Tab 3: Reserve Seat (Primary Action Button) */}
        <button
          onClick={() => handleNavigate('register')}
          type="button"
          className="flex-[1.4] py-2 px-3 mx-1 rounded-xl flex items-center justify-center gap-1.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-black text-xs shadow-[0_4px_20px_rgba(245,158,11,0.45)] active:scale-95 transition-all duration-200"
        >
          <Sparkles size={15} className="animate-pulse shrink-0" />
          <span className="truncate">احجز مقعدك</span>
        </button>

        {/* Tab 4: Instructor Drawer */}
        <button
          onClick={() => handleNavigate('instructor')}
          type="button"
          className={`flex-1 py-1.5 px-1 flex flex-col items-center justify-center gap-1 rounded-xl transition-all duration-200 active:scale-95 ${
            activeTab === 'instructor' ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <UserCheck size={19} className={activeTab === 'instructor' ? 'text-amber-400 scale-110' : ''} />
          <span className="text-[0.62rem] font-bold tracking-tight">المدرب</span>
        </button>

        {/* Tab 5: WhatsApp Direct Group */}
        <button
          type="button"
          onClick={() => handleNavigate('whatsapp')}
          className="flex-1 py-1.5 px-1 flex flex-col items-center justify-center gap-1 rounded-xl text-emerald-400 active:scale-95 transition-all duration-200"
        >
          <MessageCircle size={19} className="text-emerald-400" />
          <span className="text-[0.62rem] font-bold tracking-tight">الواتساب</span>
        </button>
      </div>
    </nav>
  );
}
