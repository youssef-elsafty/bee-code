'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Menu, X, LayoutDashboard } from 'lucide-react';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { label: 'لماذا Bee Code', href: '#why' },
  { label: 'المدرب', href: '#about' },
  { label: 'المنهج', href: '#challenge' },
  { label: 'المكتسبات', href: '#benefits' },
  { label: 'الأسئلة الشائعة', href: '#faq' },
];

function BeeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 40 40" fill="none">
      <polygon points="20,2 36,11 36,29 20,38 4,29 4,11" fill="#F59E0B" fillOpacity="0.15" stroke="#F59E0B" strokeWidth="1.5" />
      <circle cx="20" cy="14" r="4" fill="#FCD34D" />
      <circle cx="20" cy="24" r="5" fill="#F59E0B" />
      <ellipse cx="12" cy="18" rx="5" ry="3" fill="#FDE68A" opacity="0.6" transform="rotate(-20 12 18)" />
      <ellipse cx="28" cy="18" rx="5" ry="3" fill="#FDE68A" opacity="0.6" transform="rotate(20 28 18)" />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathname?.startsWith('/admin')) return null;

  return (
    <>
      {/* ── Desktop Navbar ── */}
      <header
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 50,
          padding: scrolled ? '0.75rem 0' : '1.25rem 0',
          background: scrolled ? 'rgba(11,13,16,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
          boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.5)' : 'none',
          transition: 'all 0.4s ease',
        }}
      >
        <div className="section-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none' }}>
            <div style={{
              width: 38, height: 38,
              borderRadius: 12,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(245,158,11,0.1)',
              border: '1px solid rgba(245,158,11,0.25)',
            }}>
              <BeeIcon />
            </div>
            <span style={{ fontWeight: 900, fontSize: '1.2rem', letterSpacing: '-0.02em' }}>
              <span style={{
                background: 'linear-gradient(135deg,#FCD34D,#F59E0B)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Bee</span>
              <span style={{ color: '#F5F5F0' }}> Code</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav style={{ alignItems: 'center', gap: '1.75rem' }} className="hidden md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  if (link.href === '#about') {
                    e.preventDefault();
                    window.dispatchEvent(new CustomEvent('open-instructor-drawer'));
                    return;
                  }
                  if (pathname === '/' && link.href.startsWith('#')) {
                    e.preventDefault();
                    const id = link.href.substring(1);
                    const el = document.getElementById(id);
                    if (el) {
                      el.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach((c) => c.classList.add('visible'));
                      el.classList.add('visible');
                      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }
                }}
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#9CA3AF',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FCD34D')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#9CA3AF')}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div style={{ alignItems: 'center', gap: '0.75rem' }} className="hidden md:flex">

            <Link href="/register" style={{ textDecoration: 'none' }}>
              <button
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.375rem',
                  padding: '0.625rem 1.25rem',
                  borderRadius: 9999,
                  fontWeight: 800,
                  fontSize: '0.875rem',
                  color: '#0B0D10',
                  background: 'linear-gradient(135deg,#FCD34D 0%,#F59E0B 60%,#D97706 100%)',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 6px 20px rgba(245,158,11,0.35)',
                  transition: 'all 0.25s',
                  fontFamily: 'inherit',
                }}
              >
                احجز مكانك
                <ArrowLeft size={14} style={{ transform: 'rotate(180deg)' }} />
              </button>
            </Link>
          </div>

          {/* Mobile Horizontal Scrollable Nav Links */}
          <div className="md:hidden flex-1 overflow-x-auto scrollbar-hide py-1 px-1 mr-2 flex items-center gap-1.5 select-none scroll-smooth">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  if (link.href === '#about') {
                    e.preventDefault();
                    window.dispatchEvent(new CustomEvent('open-instructor-drawer'));
                    return;
                  }
                  if (pathname === '/' && link.href.startsWith('#')) {
                    e.preventDefault();
                    const id = link.href.substring(1);
                    const el = document.getElementById(id);
                    if (el) {
                      el.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach((c) => c.classList.add('visible'));
                      el.classList.add('visible');
                      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }
                }}
                className="shrink-0 text-[0.78rem] font-bold text-slate-300 hover:text-amber-300 active:text-amber-400 px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] active:bg-amber-500/20 active:border-amber-500/40 transition-all whitespace-nowrap text-decoration-none"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </header>
    </>
  );
}
