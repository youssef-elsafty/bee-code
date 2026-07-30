'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { WifiOff, RefreshCw, Home, ArrowRight, ShieldAlert, Sparkles, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

export default function OfflinePage() {
  const [isRetrying, setIsRetrying] = useState(false);
  const [isBackOnline, setIsBackOnline] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsBackOnline(true);
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    };

    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, []);

  const handleRetry = () => {
    setIsRetrying(true);
    setTimeout(() => {
      if (navigator.onLine) {
        window.location.reload();
      } else {
        setIsRetrying(false);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0B0D10] text-slate-100 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden select-none">
      {/* Background Amber Glow Ambient Effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-amber-600/5 rounded-full blur-[90px] pointer-events-none" />

      <main className="w-full max-w-md mx-auto text-center relative z-10">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-black tracking-wide mb-6 shadow-lg"
        >
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span>وضع الأوفلاين (غير متصل بالشبكة)</span>
        </motion.div>

        {/* Offline Main Icon Container */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="relative w-28 h-28 mx-auto mb-8 flex items-center justify-center rounded-3xl bg-slate-900/90 border border-amber-500/30 shadow-[0_15px_40px_rgba(245,158,11,0.15)] backdrop-blur-2xl"
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-500/10 via-transparent to-transparent pointer-events-none" />
          <WifiOff size={48} className="text-amber-400 animate-pulse" />
        </motion.div>

        {/* Dynamic Online Reconnection Banner */}
        {isBackOnline && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-sm flex items-center justify-center gap-2"
          >
            <Sparkles className="animate-spin text-emerald-400" size={18} />
            <span>تم استعادة الاتصال بالإنترنت! جاري إعادة التحميل...</span>
          </motion.div>
        )}

        {/* Title & Description */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl font-black text-white mb-3"
        >
          انقطع الاتصال بالإنترنت 🐝
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-slate-300 text-sm leading-relaxed mb-8 px-2 font-medium"
        >
          يبدو أن شبكة الإنترت غير متاحة حالياً. لا تقلق، تتيح لك أكاديمية Bee Code إمكانية تصفح الصفحات والمحتوى المخزن مسبقاً لحين إعادة الاتصال.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col gap-3.5 mb-8"
        >
          <button
            onClick={handleRetry}
            disabled={isRetrying}
            type="button"
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-black text-sm flex items-center justify-center gap-2.5 shadow-[0_6px_25px_rgba(245,158,11,0.35)] active:scale-98 transition-all hover:brightness-110 disabled:opacity-75"
          >
            <RefreshCw size={18} className={isRetrying ? 'animate-spin' : ''} />
            <span>{isRetrying ? 'جاري اختبار الاتصال...' : 'إعادة المحاولة الآن'}</span>
          </button>

          <Link
            href="/"
            className="w-full py-3.5 px-6 rounded-2xl bg-slate-900/80 border border-white/10 text-slate-200 font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
          >
            <Home size={18} className="text-amber-400" />
            <span>الصفحة الرئيسية (المخزنة)</span>
          </Link>
        </motion.div>

        {/* Tips for offline navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-right text-xs text-slate-400 leading-relaxed"
        >
          <div className="flex items-center gap-2 font-bold text-slate-200 mb-1.5">
            <ShieldAlert size={15} className="text-amber-400" />
            <span>نصائح لاستعادة الاتصال:</span>
          </div>
          <ul className="space-y-1 list-disc list-inside text-slate-300">
            <li>تحقق من اتصال الواي فاي (Wi-Fi) أو بيانات الهاتف.</li>
            <li>تاكد من إيقاف تشغيل وضع الطيران.</li>
            <li>سيتم تحميل البيانات وتحديث التطبيق تلقائياً فور الاتصال.</li>
          </ul>
        </motion.div>
      </main>
    </div>
  );
}
