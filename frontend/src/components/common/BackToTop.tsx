'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="back-to-top"
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
          onClick={scrollToTop}
          aria-label="العودة إلى الأعلى"
          className="hidden md:flex fixed bottom-24 left-4 z-50 w-12 h-12 rounded-full items-center justify-center transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
            boxShadow: '0 4px 24px rgba(37,99,235,0.4)',
          }}
          whileHover={{ scale: 1.1, boxShadow: '0 8px 32px rgba(37,99,235,0.6)' }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUp size={20} className="text-white" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
