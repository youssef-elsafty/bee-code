'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'primary' | 'warm' | 'animated';
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p';
}

export default function GradientText({
  children,
  className = '',
  variant = 'default',
  as: Tag = 'span',
}: GradientTextProps) {
  const variantClasses = {
    default:  'text-gradient',
    primary:  'text-gradient-primary',
    warm:     'text-gradient-warm',
    animated: 'text-gradient-animated',
  };

  return (
    <Tag className={cn(variantClasses[variant], className)}>
      {children}
    </Tag>
  );
}
