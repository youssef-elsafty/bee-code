'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Sparkles, MessageCircle, ArrowRight, ExternalLink, PartyPopper, Award, CalendarCheck } from 'lucide-react';
import Link from 'next/link';

const WHATSAPP_GROUP_URL = 'https://chat.whatsapp.com/LYzxCLQzAn79vvmQpAxZ1x?mode=gi_t';

interface SuccessAnimationProps {
  studentName?: string;
  scheduleLabel?: string;
}

export default function SuccessAnimation({ studentName, scheduleLabel }: SuccessAnimationProps) {
  const [countdown, setCountdown] = useState(4);

  useEffect(() => {
    // Scroll to success banner smoothly
    window.scrollTo({ top: document.getElementById('register')?.offsetTop || 0, behavior: 'smooth' });

    // Automatically redirect student to WhatsApp group after 4 seconds
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = WHATSAPP_GROUP_URL;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const confettiItems = ['🎉', '🥳', '🏆', '🐝', '✨', '⭐', '🔥', '🎓'];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.85 }}
        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        className="flex flex-col items-center text-center py-6 px-4 sm:px-8 relative overflow-hidden my-4"
      >
        {/* Floating Celebration Confetti Particles */}
        {confettiItems.map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-xl sm:text-2xl pointer-events-none select-none"
            style={{
              top: `${10 + (i * 11) % 70}%`,
              left: `${8 + (i * 12) % 84}%`,
            }}
            initial={{ opacity: 0, y: 20, scale: 0 }}
            animate={{
              opacity: [0, 1, 0.8, 0],
              y: [-20, -100 - (i * 10)],
              scale: [0.5, 1.3, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              delay: 0.2 + i * 0.1,
              duration: 2.5,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeOut',
            }}
          >
            {emoji}
          </motion.div>
        ))}

        {/* Animated Check Circle & Glow */}
        <div className="relative mb-6">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border-2 border-emerald-400/40"
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 2.4 + i * 0.4, opacity: 0 }}
              transition={{
                duration: 2,
                delay: i * 0.35,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />
          ))}

          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(16,185,129,0.3), rgba(16,185,129,0.12))',
              border: '2px solid rgba(16,185,129,0.7)',
              boxShadow: '0 0 70px rgba(16,185,129,0.5), inset 0 1px 0 rgba(255,255,255,0.2)',
            }}
          >
            <CheckCircle className="w-11 h-11 sm:w-13 sm:h-13 text-emerald-400" strokeWidth={2.5} />
          </motion.div>
        </div>

        {/* Congratulatory Main Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="space-y-3 w-full max-w-lg mx-auto"
        >
          {/* Festive Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-extrabold shadow-lg">
            <PartyPopper size={16} className="text-emerald-400 animate-bounce" />
            <span>🎉 ألف مبروك! تم تأكيد تسجيلك وحجز المقعد رسمياً</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
            مبروك الحجز يا{' '}
            <span className="text-amber-gradient">{studentName || 'مبدع'}</span>! 🚀
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
            تم تسجيل بياناتك بنجاح وضمان مكانك في أكاديمية Bee Code للبكالوريا المصرية.
          </p>

          {/* Details Ticket Summary Card */}
          <div
            className="p-5 my-4 space-y-3 text-right border border-emerald-500/30 rounded-2xl relative overflow-hidden"
            style={{ background: 'linear-gradient(180deg, rgba(7, 24, 18, 0.85), rgba(11, 13, 16, 0.95))' }}
          >
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                <Award size={14} className="text-amber-400" /> حالة الطلب:
              </span>
              <span className="text-xs font-black text-emerald-400 bg-emerald-500/20 px-2.5 py-1 rounded-full border border-emerald-500/30">
                مضمون ومحجوز 100% ✅
              </span>
            </div>

            {studentName && (
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-slate-400">اسم الطالب:</span>
                <span className="text-white font-bold">{studentName}</span>
              </div>
            )}

            {scheduleLabel && (
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-slate-400 flex items-center gap-1">
                  <CalendarCheck size={13} className="text-amber-400" /> الموعد المؤكد:
                </span>
                <span className="text-amber-300 font-extrabold">{scheduleLabel}</span>
              </div>
            )}
          </div>

          {/* Important Next Step Box */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-200 text-xs sm:text-sm font-semibold flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
              <span>خطوة أخيرة مهمة: انضم لجروب الواتساب الخاص بالدورة</span>
            </div>
            <span className="text-[0.78rem] text-slate-300">
              جاري تحويلك تلقائياً خلال <strong className="text-amber-400 text-sm font-black mx-1">{countdown}</strong> ثوانٍ...
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 pt-2">
            <a
              href={WHATSAPP_GROUP_URL}
              className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-green-600 text-white font-black text-base shadow-xl shadow-emerald-500/30 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>الانضمام لجروب الواتساب المباشر (اضغط هنا)</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <Link
              href="/"
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center gap-2 text-slate-400 hover:text-white text-xs font-bold transition-colors py-2"
            >
              <span>تسجيل طالب آخر</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
