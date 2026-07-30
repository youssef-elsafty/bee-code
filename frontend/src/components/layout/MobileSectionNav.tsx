'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import {
  Rocket,
  ShieldCheck,
  Sparkles,
  Calendar,
  Star,
  PenLine,
  HelpCircle,
  Phone,
} from 'lucide-react';

/**
 * Section definitions — order matters (matches page flow).
 * Each `id` must match the section's DOM id attribute.
 */
const SECTIONS = [
  { id: 'hero',         label: 'الرئيسية',   icon: Rocket },
  { id: 'why',          label: 'لماذا نحن',  icon: ShieldCheck },
  { id: 'benefits',     label: 'المكتسبات',  icon: Sparkles },
  { id: 'challenge',    label: 'المنهج',     icon: Calendar },
  { id: 'testimonials', label: 'آراء',       icon: Star },
  { id: 'register',     label: 'احجز',       icon: PenLine },
  { id: 'faq',          label: 'أسئلة',      icon: HelpCircle },
  { id: 'contact',      label: 'تواصل',      icon: Phone },
];

export default function MobileSectionNav() {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  // Only render on homepage, hide on admin pages
  if (pathname?.startsWith('/admin')) return null;

  /* ── Track which section is in view ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let best: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (!best || entry.intersectionRatio > best.intersectionRatio) {
              best = entry;
            }
          }
        }
        if (best) {
          setActiveId(best.target.id);
        }
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: [0, 0.25, 0.5],
      },
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /* ── Show/hide bar shadow on scroll ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Auto-scroll active item into view ── */
  useEffect(() => {
    const btn = btnRefs.current.get(activeId);
    if (btn && navRef.current) {
      btn.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [activeId]);

  /* ── Smooth-scroll to section on tap ── */
  const handleTap = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach((c) => c.classList.add('visible'));
      el.classList.add('visible');
      // Offset for sticky header + this nav bar (~100px total)
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, []);

  return (
    <div
      className="md:hidden sticky z-30 w-full"
      style={{ top: 0 }}
    >
      {/* Glass background bar */}
      <div
        className="transition-all duration-300"
        style={{
          background: 'rgba(11, 13, 16, 0.92)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(245, 158, 11, 0.2)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
        }}
      >
        <div
          ref={navRef}
          className="flex items-center gap-2 px-3 py-2 overflow-x-auto scrollbar-hide select-none"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {SECTIONS.map(({ id, label, icon: Icon }) => {
            const isActive = activeId === id;

            return (
              <button
                key={id}
                ref={(el) => {
                  if (el) btnRefs.current.set(id, el);
                }}
                onClick={() => handleTap(id)}
                type="button"
                className="flex items-center gap-1.5 shrink-0 transition-all duration-200 active:scale-95 cursor-pointer"
                style={{
                  padding: '0.45rem 0.85rem',
                  borderRadius: 9999,
                  fontSize: '0.75rem',
                  fontWeight: isActive ? 900 : 700,
                  whiteSpace: 'nowrap',
                  background: isActive
                    ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.25), rgba(245, 158, 11, 0.1))'
                    : 'rgba(255, 255, 255, 0.04)',
                  border: isActive
                    ? '1px solid rgba(245, 158, 11, 0.5)'
                    : '1px solid rgba(255, 255, 255, 0.08)',
                  color: isActive ? '#FCD34D' : '#9CA3AF',
                  boxShadow: isActive ? '0 4px 14px rgba(245, 158, 11, 0.25)' : 'none',
                }}
              >
                <Icon
                  size={14}
                  style={{
                    color: isActive ? '#F59E0B' : '#6B7280',
                    flexShrink: 0,
                  }}
                />
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
