'use client';

import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';

export default function Loading() {
  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center z-50"
      style={{ background: '#071120' }}
    >
      {/* Animated logo */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8"
        style={{
          background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
          boxShadow: '0 0 60px rgba(37,99,235,0.5)',
        }}
      >
        <Code2 size={40} className="text-white" />
      </motion.div>

      {/* Loading dots */}
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: '#2563EB' }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1, delay: i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <p className="text-white/40 text-sm mt-6 font-cairo">جاري التحميل...</p>
    </div>
  );
}
