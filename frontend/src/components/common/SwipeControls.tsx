'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SwipeControlsProps {
  onScrollLeft: () => void;
  onScrollRight: () => void;
  text?: string;
}

export default function SwipeControls({
  onScrollLeft,
  onScrollRight,
  text = 'اسحب للتصفح 👈',
}: SwipeControlsProps) {
  return (
    <div className="flex md:hidden items-center justify-between gap-2 mb-3 px-1 text-slate-400">
      {/* Swipe text hint */}
      <span className="text-[0.72rem] font-bold text-amber-400/90 flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full animate-pulse">
        {text}
      </span>

      {/* Touch action arrows */}
      <div className="flex items-center gap-1">
        <button
          onClick={onScrollRight}
          type="button"
          aria-label="السابق"
          className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 active:scale-95 active:bg-amber-500/20 transition-all"
        >
          <ChevronRight size={15} />
        </button>

        <button
          onClick={onScrollLeft}
          type="button"
          aria-label="التالي"
          className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 active:scale-95 active:bg-amber-500/20 transition-all"
        >
          <ChevronLeft size={15} />
        </button>
      </div>
    </div>
  );
}
