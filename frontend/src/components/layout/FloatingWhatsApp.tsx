'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';

const WHATSAPP_GROUP_URL = 'https://chat.whatsapp.com/LYzxCLQzAn79vvmQpAxZ1x?mode=gi_t';

import toast from 'react-hot-toast';

export default function FloatingWhatsApp() {
  const pathname = usePathname();
  const [showTooltip, setShowTooltip] = useState(false);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
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
  };

  return (
    <div className="hidden md:flex fixed bottom-6 left-6 z-50 pointer-events-auto items-center justify-center">
      {/* Tooltip positioned absolutely so it never causes layout shift */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: -10 }}
            exit={{ opacity: 0, scale: 0.85, y: -5 }}
            transition={{ duration: 0.18 }}
            className="absolute bottom-full left-0 mb-3 whitespace-nowrap pointer-events-none z-50 px-3.5 py-2 text-xs font-black text-white shadow-2xl border border-amber-500/40 backdrop-blur-2xl bg-slate-950/90"
            style={{ borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.6), 0 0 15px rgba(245,158,11,0.3)' }}
          >
            💬 برجاء الحجز أولاً للانضمام للواتساب
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Button */}
      <motion.button
        onClick={handleClick}
        type="button"
        aria-label="الانضمام لجروب الواتساب الخاص بالطلاب"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl cursor-pointer relative border-0 outline-none"
        style={{
          background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
          boxShadow: '0 8px 28px rgba(37, 211, 102, 0.55)',
          border: '2px solid rgba(255,255,255,0.2)',
        }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
      >
        <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-40 animate-ping" />
        <MessageCircle size={28} className="text-white relative z-10" fill="white" />
      </motion.button>
    </div>
  );
}
