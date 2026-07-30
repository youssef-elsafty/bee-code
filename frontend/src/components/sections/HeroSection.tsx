'use client';

import Link from 'next/link';
import { ArrowLeft, Trophy, CheckCircle2, Zap, Users, Code2,
         Globe, Linkedin, Github, FileText } from 'lucide-react';

/* ── Static SVG background — no JS needed ── */
function Background() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <pattern id="hexbg" x="0" y="0" width="80" height="70" patternUnits="userSpaceOnUse">
            <polygon points="40,5 75,22.5 75,57.5 40,75 5,57.5 5,22.5"
              fill="none" stroke="#F59E0B" strokeWidth="0.5" opacity="0.09" />
          </pattern>
          <radialGradient id="glow1" cx="65%" cy="38%" r="50%">
            <stop offset="0%"   stopColor="#F59E0B" stopOpacity="0.18" />
            <stop offset="55%"  stopColor="#D97706" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#0B0D10" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="glow2" cx="8%" cy="82%" r="35%">
            <stop offset="0%"   stopColor="#7C3AED" stopOpacity="0.09" />
            <stop offset="100%" stopColor="#0B0D10" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexbg)" />
        <rect width="100%" height="100%" fill="url(#glow1)" />
        <rect width="100%" height="100%" fill="url(#glow2)" />
      </svg>
    </div>
  );
}

function BeeIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <polygon points="20,2 36,11 36,29 20,38 4,29 4,11" fill="#F59E0B" fillOpacity="0.15" stroke="#F59E0B" strokeWidth="1.5" />
      <circle cx="20" cy="14" r="4" fill="#FCD34D" />
      <circle cx="20" cy="24" r="5" fill="#F59E0B" />
      <ellipse cx="12" cy="18" rx="5" ry="3" fill="#FDE68A" opacity="0.6" transform="rotate(-20 12 18)" />
      <ellipse cx="28" cy="18" rx="5" ry="3" fill="#FDE68A" opacity="0.6" transform="rotate(20 28 18)" />
    </svg>
  );
}

const STATS = [
  { value: '٩٥٪',  label: 'نسبة النجاح', icon: Trophy,  color: '#F59E0B' },
  { value: '٣٠',   label: 'يوم مكثف',    icon: Zap,     color: '#10B981' },
  { value: '٢٠٠+', label: 'طالب ناجح',   icon: Users,   color: '#3B82F6' },
];

const SOCIAL = [
  { name: 'Portfolio', icon: Globe,    href: 'https://youssef-elsafty.vercel.app',                                         color: '#38BDF8' },
  { name: 'LinkedIn',  icon: Linkedin, href: 'https://linkedin.com/in/youssef-elsafty',                                    color: '#60A5FA' },
  { name: 'GitHub',    icon: Github,   href: 'https://github.com/youssef-elsafty',                                         color: '#C084FC' },
  { name: 'CV',        icon: FileText, href: 'https://drive.google.com/file/d/13UX9tpo1Vdx-ynNIAOg6zCymxtrm4rXL/view',   color: '#34D399' },
];

export default function HeroSection({ onAboutClick }: { onAboutClick?: () => void }) {
  return (
    <section
      id="hero"
      className="pt-20 pb-12 md:pt-24 md:pb-20 relative min-h-screen flex items-center overflow-hidden bg-[#0B0D10]"
    >
      <Background />

      <div className="section-container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '3rem',
          alignItems: 'center',
        }}
          className="lg:grid-cols-hero"
        >

          {/* ── LEFT column ── */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1.5rem' }}>

            {/* Top pill — animate in first */}
            <div
              className="animate-fade-in-down delay-100"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.625rem',
                padding: '0.5rem 1rem', borderRadius: 9999,
                background: 'rgba(245,158,11,0.10)', border: '1px solid rgba(245,158,11,0.28)',
                color: '#FCD34D', fontSize: '0.875rem', fontWeight: 700,
              }}>
              <BeeIcon size={20} />
              <span>البكالوريا المصرية — الهندسة وعلوم الحاسب</span>
              {/* Pulsing live dot */}
              <span style={{ position: 'relative', width: 8, height: 8, flexShrink: 0 }}>
                <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#10B981', animation: 'ping-amber 2s ease infinite', opacity: 0.6 }} />
                <span style={{ position: 'relative', display: 'block', width: 8, height: 8, borderRadius: '50%', background: '#10B981' }} />
              </span>
            </div>

            {/* H1 — stagger */}
            <h1
              className="animate-fade-in-up delay-200"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: '#F5F5F0',
                margin: 0,
              }}
            >
              احتراف البرمجة{' '}
              <span style={{ color: '#F59E0B' }}>
                للبكالوريا
              </span>
              <span style={{ display: 'block', marginTop: '0.25rem', color: 'rgba(245,245,240,0.9)' }}>
                المصرية.
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="animate-fade-in-up delay-300"
              style={{
                fontSize: '1.125rem',
                lineHeight: 1.75,
                color: '#9CA3AF',
                maxWidth: '38rem',
                margin: 0,
              }}
            >
              تأسيس برمجي عملي ومكثف ينقل الطالب من الأساسيات حتى احتراف التفكير البرمجي —
              لضمان التفوق الكامل في امتحانات البكالوريا المصرية.
            </p>

            {/* CTAs */}
            <div className="animate-fade-in-up delay-400 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-2 w-full">
              <a href="#register" className="w-full sm:w-auto" style={{ textDecoration: 'none' }}>
                <button
                  className="w-full sm:w-auto justify-center"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.875rem 1.75rem', borderRadius: 9999,
                    fontWeight: 800, fontSize: '1rem',
                    color: '#0B0D10',
                    background: 'linear-gradient(135deg,#FCD34D 0%,#F59E0B 55%,#D97706 100%)',
                    border: 'none', cursor: 'pointer',
                    boxShadow: '0 8px 28px rgba(245,158,11,0.4)',
                    fontFamily: 'inherit',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 16px 40px rgba(245,158,11,0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 8px 28px rgba(245,158,11,0.4)';
                  }}
                >
                  <Code2 size={18} />
                  احجز مكانك الآن
                  <ArrowLeft size={18} style={{ transform: 'rotate(180deg)' }} />
                </button>
              </a>
              <button
                onClick={(e) => { e.preventDefault(); onAboutClick?.(); }}
                className="w-full sm:w-auto justify-center"
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.875rem 1.75rem', borderRadius: 9999,
                  fontWeight: 700, fontSize: '1rem',
                  color: '#F5F5F0',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  cursor: 'pointer', fontFamily: 'inherit',
                  backdropFilter: 'blur(12px)',
                  transition: 'all 0.25s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(245,158,11,0.08)';
                  e.currentTarget.style.borderColor = 'rgba(245,158,11,0.35)';
                  e.currentTarget.style.color = '#FCD34D';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                  e.currentTarget.style.color = '#F5F5F0';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                تعرف على المدرب
              </button>
            </div>

            {/* Stats */}
            <div className="animate-fade-in-up delay-500 grid grid-cols-3 gap-2 sm:gap-4 w-full pt-4 border-t border-white/10 mt-2">
              {STATS.map((s, i) => (
                <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2 min-w-0">
                  <div className="flex items-center gap-1">
                    <s.icon size={16} style={{ color: s.color, flexShrink: 0 }} />
                    <span className="font-black text-white text-sm sm:text-base truncate">{s.value}</span>
                  </div>
                  <span className="text-slate-400 text-[11px] sm:text-xs md:text-sm leading-tight truncate">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Social */}
            <div
              className="animate-fade-in-up delay-600"
              style={{
                display: 'flex', alignItems: 'center', gap: '0.625rem',
                paddingTop: '1.25rem',
                borderTop: '1px solid rgba(255,255,255,0.07)',
                width: '100%',
              }}>
              <span style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: 500, marginLeft: '0.5rem' }}>م. يوسف الصفتي</span>
              <span style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.1)' }} />
              {SOCIAL.map((item) => (
                <a key={item.name} href={item.href} target="_blank" rel="noopener noreferrer" title={item.name}
                  style={{
                    padding: '0.5rem', borderRadius: 10, display: 'flex', alignItems: 'center',
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                    transition: 'all 0.2s',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.2) translateY(-2px)';
                    e.currentTarget.style.background = `${item.color}18`;
                    e.currentTarget.style.borderColor = `${item.color}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1) translateY(0)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  }}
                >
                  <item.icon size={14} style={{ color: item.color }} />
                </a>
              ))}
            </div>
          </div>

          {/* ── RIGHT column — Instructor Card ── */}
          <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative',
          }}
            className="flex flex-col items-center mt-8 lg:mt-0 w-full"
          >
            {/* Amber halo */}
            <div style={{
              position: 'absolute', width: 320, height: 320, borderRadius: '50%', zIndex: -1,
              background: 'radial-gradient(circle, rgba(245,158,11,0.2) 0%, transparent 70%)',
              filter: 'blur(60px)', pointerEvents: 'none',
              animation: 'glow-pulse 4s ease-in-out infinite',
            }} />

            <div
              className="animate-fade-in-scale delay-300"
              style={{ position: 'relative', width: '100%', maxWidth: 360 }}
            >
              {/* Card outer gradient border */}
              <div style={{
                borderRadius: 28, padding: 1,
                background: 'linear-gradient(135deg, rgba(245,158,11,0.35), rgba(245,158,11,0.05) 60%, transparent)',
                animation: 'border-glow 4s ease-in-out infinite',
              }}>
                <div style={{
                  borderRadius: 27, overflow: 'hidden',
                  background: '#111318', boxShadow: '0 40px 80px rgba(0,0,0,0.7)',
                }}>
                  <div style={{ position: 'relative', width: '100%', height: 420 }}>
                    <img src="/youssef.jpg" alt="م. يوسف الصفتي"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block', filter: 'brightness(1.1) contrast(1.08)' }} />
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to top, #0B0D10 0%, rgba(11,13,16,0.1) 55%, transparent 100%)',
                    }} />
                    {/* Info badge */}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.25rem' }}>
                      <div style={{
                        padding: '1rem', borderRadius: 16,
                        background: 'rgba(11,13,16,0.92)', backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(245,158,11,0.15)',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      }}>
                        <div style={{ textAlign: 'right' }}>
                          <p style={{ margin: 0, fontWeight: 800, fontSize: '0.9375rem', color: '#F5F5F0' }}>م. يوسف الصفتي</p>
                          <p style={{ margin: '0.25rem 0 0', fontSize: '0.75rem', fontWeight: 700, color: '#FCD34D' }}>
                            مهندس ذكاء اصطناعي · خبير Backend
                          </p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                          <span style={{ position: 'relative', width: 10, height: 10 }}>
                            <span style={{
                              position: 'absolute', inset: 0, borderRadius: '50%', background: '#10B981',
                              animation: 'ping-amber 2s ease infinite', opacity: 0.5,
                            }} />
                            <span style={{
                              position: 'relative', display: 'block', width: 10, height: 10,
                              borderRadius: '50%', background: '#10B981',
                              boxShadow: '0 0 8px rgba(16,185,129,0.7)',
                            }} />
                          </span>
                          <span style={{ fontSize: '0.625rem', fontWeight: 700, color: '#10B981' }}>متاح</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top floating badge */}
              <div
                className="animate-float"
                style={{
                  position: 'absolute', top: -18, right: -16,
                  display: 'flex', alignItems: 'center', gap: '0.625rem',
                  padding: '0.625rem 0.875rem', borderRadius: 16,
                  background: 'rgba(17,19,24,0.98)',
                  border: '1px solid rgba(245,158,11,0.22)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                  animationDelay: '0s',
                }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 10, flexShrink: 0,
                  background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <BeeIcon size={18} />
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: 0, fontSize: '0.6875rem', fontWeight: 900, color: '#F5F5F0', lineHeight: 1 }}>Bee Code 🐝</p>
                  <p style={{ margin: '0.25rem 0 0', fontSize: '0.625rem', color: '#F59E0B' }}>أكاديمية البرمجة</p>
                </div>
              </div>

              {/* Bottom floating badge */}
              <div
                className="animate-float"
                style={{
                  position: 'absolute', bottom: -18, left: -16,
                  display: 'flex', alignItems: 'center', gap: '0.625rem',
                  padding: '0.625rem 0.875rem', borderRadius: 16,
                  background: 'rgba(17,19,24,0.98)',
                  border: '1px solid rgba(16,185,129,0.22)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                  animationDelay: '2s',
                }}>
                <CheckCircle2 size={18} style={{ color: '#10B981', flexShrink: 0 }} />
                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: 0, fontSize: '0.6875rem', fontWeight: 900, color: '#F5F5F0', lineHeight: 1 }}>٩٥٪ نسبة نجاح</p>
                  <p style={{ margin: '0.25rem 0 0', fontSize: '0.625rem', color: '#10B981' }}>مضمونة 💯</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute', bottom: '2rem', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
        pointerEvents: 'none', opacity: 0.5,
        animation: 'fade-in-up 1s 1.2s both',
      }}>
        <span style={{ fontSize: '0.625rem', color: '#6B7280', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          scroll
        </span>
        <div style={{
          width: 1.5, height: 32, borderRadius: 999,
          background: 'linear-gradient(to bottom, #F59E0B, transparent)',
          animation: 'scroll-hint 2s ease-in-out infinite',
        }} />
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .lg\\:grid-cols-hero {
            grid-template-columns: 7fr 5fr !important;
          }
        }
      `}</style>
    </section>
  );
}

