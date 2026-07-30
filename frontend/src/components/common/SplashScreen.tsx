'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const shown = sessionStorage.getItem('bee_code_splash_shown');
    if (shown) {
      setIsVisible(false);
      return;
    }
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem('bee_code_splash_shown', 'true');
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  if (!isMounted) return null;


  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] bg-[#0B0D10] flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden"
        >
          {/* Ambient Glow */}
          <div className="absolute w-[350px] h-[350px] bg-amber-500/15 rounded-full blur-[100px] animate-pulse" />

          <div className="relative z-10 flex flex-col items-center text-center px-6">
            {/* Animated Logo Container */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 220, damping: 15 }}
              className="relative w-24 h-24 mb-6 flex items-center justify-center"
            >
              {/* Outer Pulsing Hexagon Ring */}
              <div className="absolute inset-0 rounded-3xl bg-amber-500/20 border border-amber-500/40 animate-ping-amber" />
              
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center text-slate-950 font-black text-4xl shadow-[0_10px_40px_rgba(245,158,11,0.5)]">
                🐝
              </div>
            </motion.div>

            {/* Platform Branding Text */}
            <motion.h1
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-black tracking-tight text-white mb-2"
            >
              <span className="text-amber-400">Bee</span> Code
            </motion.h1>

            <motion.p
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xs font-bold text-amber-200/80 tracking-wide"
            >
              أكاديمية البرمجة للبكالوريا المصرية
            </motion.p>

            {/* Modern Animated Progress Line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="w-36 h-1 bg-slate-900 rounded-full mt-8 overflow-hidden border border-white/10"
            >
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 1.4, ease: 'easeInOut' }}
                className="w-full h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
