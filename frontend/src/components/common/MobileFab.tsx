'use client';

import { useState, useEffect } from 'react';
import { ChevronUp, MessageCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function MobileFab() {
  const pathname = usePathname();
  const [showFab, setShowFab] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowFab(true);
      } else {
        setShowFab(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathname?.startsWith('/admin')) return null;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {showFab && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-20 left-4 z-30 md:hidden pointer-events-auto mb-safe"
        >
          <button
            onClick={scrollToTop}
            type="button"
            aria-label="العودة للأعلى"
            className="w-11 h-11 rounded-2xl bg-[#111318]/90 border border-amber-500/40 text-amber-400 flex items-center justify-center shadow-[0_8px_25px_rgba(0,0,0,0.8)] backdrop-blur-xl active:scale-90 transition-transform"
          >
            <ChevronUp size={20} className="animate-bounce" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
