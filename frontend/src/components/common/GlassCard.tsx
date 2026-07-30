'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: 'blue' | 'purple' | 'cyan' | 'none';
  delay?: number;
  animate?: boolean;
  onClick?: () => void;
}

export default function GlassCard({
  children,
  className = '',
  hover = true,
  glow = 'none',
  delay = 0,
  animate = true,
  onClick,
}: GlassCardProps) {
  const glowClasses = {
    blue: 'hover:shadow-[0_0_40px_rgba(37,99,235,0.25)]',
    purple: 'hover:shadow-[0_0_40px_rgba(124,58,237,0.25)]',
    cyan: 'hover:shadow-[0_0_40px_rgba(6,182,212,0.2)]',
    none: '',
  };

  const baseClasses = cn(
    'glass-card',
    hover && 'cursor-default',
    glow !== 'none' && glowClasses[glow],
    className,
  );

  if (!animate) {
    return (
      <div className={baseClasses} onClick={onClick}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={hover ? { y: -6, scale: 1.01 } : undefined}
      className={baseClasses}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
