'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import AuroraBackground from '@/components/common/AuroraBackground';

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center" dir="rtl">
      <AuroraBackground />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        className="relative z-10 text-center px-6"
      >
        {/* 404 number */}
        <motion.div
          className="text-[10rem] font-black leading-none mb-2"
          style={{ lineHeight: 1 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-gradient-animated">404</span>
        </motion.div>

        <h1 className="text-3xl font-black text-white mb-3">الصفحة مش موجودة!</h1>
        <p className="text-white/50 text-lg mb-8 max-w-sm mx-auto">
          يبدو إن الصفحة دي اتشالت أو الرابط غلط. ارجع للرئيسية!
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary">العودة للرئيسية</Link>
          <Link href="/register" className="btn-ghost">سجل الآن</Link>
        </div>
      </motion.div>
    </div>
  );
}
