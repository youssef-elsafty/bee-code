'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  Code2, Globe, Linkedin, Github, FileText,
  GraduationCap, Zap, Award, Users, Star, Cpu,
  Terminal, Database, Server, Monitor,
} from 'lucide-react';

/* ── Scroll reveal hook ─────────────────────────────────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

/* ── Counter that animates up ───────────────────────────── */
function AnimatedCount({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, visible } = useReveal();
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 30);
    return () => clearInterval(timer);
  }, [visible, target]);
  return (
    <span ref={ref} style={{ display: 'inline-block' }}>
      {count}{suffix}
    </span>
  );
}

const SKILLS = [
  { label: 'Python',      icon: Terminal,  color: '#3B82F6', pct: 95 },
  { label: 'C++',         icon: Cpu,       color: '#10B981', pct: 90 },
  { label: 'Algorithms',  icon: Code2,     color: '#F59E0B', pct: 92 },
  { label: 'Web Dev',     icon: Monitor,   color: '#8B5CF6', pct: 88 },
  { label: 'Databases',   icon: Database,  color: '#EF4444', pct: 82 },
  { label: 'Linux/CLI',   icon: Server,    color: '#34D399', pct: 85 },
];

const SOCIALS = [
  { label: 'Portfolio', icon: Globe,    href: 'https://youssef-elsafty.vercel.app',                                       color: '#38BDF8' },
  { label: 'LinkedIn',  icon: Linkedin, href: 'https://linkedin.com/in/youssef-elsafty',                                  color: '#60A5FA' },
  { label: 'GitHub',    icon: Github,   href: 'https://github.com/youssef-elsafty',                                       color: '#C084FC' },
  { label: 'CV',        icon: FileText, href: 'https://drive.google.com/file/d/13UX9tpo1Vdx-ynNIAOg6zCymxtrm4rXL/view', color: '#34D399' },
];

const ACHIEVEMENTS = [
  { value: 200, suffix: '+', label: 'طالب ناجح',        icon: Users,        color: '#3B82F6' },
  { value: 95,  suffix: '٪', label: 'نسبة النجاح',       icon: Award,        color: '#F59E0B' },
  { value: 3,   suffix: '+', label: 'سنوات خبرة تدريس', icon: GraduationCap, color: '#10B981' },
  { value: 5,   suffix: '⭐', label: 'تقييم الطلاب',     icon: Star,          color: '#F59E0B' },
];

/* ── Floating tech orbs ─────────────────────────────────── */
function TechOrbs() {
  const icons = [
    { icon: Terminal, color: '#3B82F6', style: { top: '10%', right: '5%', animationDelay: '0s',   animationDuration: '12s' } },
    { icon: Code2,    color: '#F59E0B', style: { top: '60%', right: '-2%', animationDelay: '3s',   animationDuration: '10s' } },
    { icon: Database, color: '#10B981', style: { top: '30%', left: '2%',  animationDelay: '1.5s', animationDuration: '14s' } },
    { icon: Cpu,      color: '#8B5CF6', style: { bottom: '20%', left: '5%', animationDelay: '4s',  animationDuration: '11s' } },
  ];
  return (
    <>
      {icons.map(({ icon: Icon, color, style }, i) => (
        <div
          key={i}
          className="animate-float"
          style={{
            position: 'absolute',
            width: 44, height: 44,
            borderRadius: 14,
            background: `${color}18`,
            border: `1px solid ${color}30`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            pointerEvents: 'none',
            zIndex: 1,
            ...style,
          }}
        >
          <Icon size={20} color={color} />
        </div>
      ))}
    </>
  );
}

/* ── Main Component ─────────────────────────────────────── */
export default function AboutInstructor() {
  const leftReveal = useReveal();
  const rightReveal = useReveal();

  return (
    <section
      id="about"
      style={{
        position: 'relative',
        padding: '7rem 0',
        background: 'linear-gradient(180deg, #0B0D10 0%, #090B0E 50%, #0B0D10 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Background grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(245,158,11,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(245,158,11,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />

      {/* Ambient glows */}
      <div style={{
        position: 'absolute', top: '10%', right: '-5%',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '5%', left: '-5%',
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="section-container" style={{ position: 'relative', zIndex: 2 }}>

        {/* ── Section header ── */}
        <div
          className={`animate-fade-in-up ${leftReveal.visible ? '' : ''}`}
          ref={leftReveal.ref}
          style={{ textAlign: 'center', marginBottom: '4.5rem' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.4rem 1.1rem', borderRadius: 9999,
            background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.22)',
            color: '#FCD34D', fontSize: '0.8rem', fontWeight: 700,
            marginBottom: '1rem',
            animation: 'fade-in-down 0.6s cubic-bezier(0.16,1,0.3,1) both',
          }}>
            <GraduationCap size={14} />
            المدرب
          </div>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 900,
            color: '#F5F5F0',
            margin: 0,
            animation: 'fade-in-up 0.7s 0.1s cubic-bezier(0.16,1,0.3,1) both',
          }}>
            تعرف على{' '}
            <span style={{ color: '#F59E0B' }}>مدربك</span>
          </h2>
          <p style={{
            color: '#6B7280', marginTop: '0.75rem', maxWidth: '36rem',
            margin: '0.75rem auto 0',
            animation: 'fade-in-up 0.7s 0.2s cubic-bezier(0.16,1,0.3,1) both',
          }}>
            خبرة حقيقية في تدريس البرمجة لطلاب البكالوريا المصرية — نتائج مثبتة ومسار واضح للنجاح
          </p>
        </div>

        {/* ── Main grid ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '3rem',
          alignItems: 'center',
        }}
          className="lg:grid-cols-2"
        >

          {/* ── Left: Profile card ── */}
          <div
            ref={leftReveal.ref}
            style={{
              animation: leftReveal.visible
                ? 'fade-in-right 0.8s cubic-bezier(0.16,1,0.3,1) both'
                : 'none',
              position: 'relative',
            }}
          >
            <TechOrbs />

            {/* Glowing avatar card */}
            <div
              className="animate-glow-pulse"
              style={{
                position: 'relative',
                background: 'linear-gradient(135deg, rgba(17,19,24,0.9) 0%, rgba(25,28,35,0.95) 100%)',
                border: '1px solid rgba(245,158,11,0.25)',
                borderRadius: 28,
                padding: '2.5rem',
                backdropFilter: 'blur(20px)',
                overflow: 'hidden',
                maxWidth: 420,
                margin: '0 auto',
              }}
            >
              {/* Card grid glow */}
              <div style={{
                position: 'absolute', top: -80, left: -80,
                width: 250, height: 250,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)',
              }} />

              {/* Avatar + name block */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '2rem' }}>
                {/* Avatar with orbital ring */}
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  {/* Pulsing ring */}
                  <div style={{
                    position: 'absolute', inset: -6,
                    borderRadius: '50%',
                    border: '2px solid rgba(245,158,11,0.35)',
                    animation: 'border-glow 3s ease-in-out infinite',
                  }} />
                  {/* Avatar circle */}
                  <div style={{
                    width: 80, height: 80, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '2rem', fontWeight: 900,
                    color: '#0B0D10',
                    boxShadow: '0 8px 32px rgba(245,158,11,0.4)',
                    position: 'relative', zIndex: 1,
                  }}>
                    🐝
                  </div>
                  {/* Status dot */}
                  <div style={{
                    position: 'absolute', bottom: 4, right: 4, zIndex: 2,
                    width: 14, height: 14, borderRadius: '50%',
                    background: '#10B981',
                    border: '2px solid #111318',
                    boxShadow: '0 0 8px rgba(16,185,129,0.6)',
                  }} />
                  {/* Ping */}
                  <div style={{
                    position: 'absolute', bottom: 4, right: 4,
                    width: 14, height: 14, borderRadius: '50%',
                    background: '#10B981',
                    animation: 'ping-amber 2s ease infinite',
                    opacity: 0.5,
                  }} />
                </div>

                {/* Name & title */}
                <div>
                  <h3 style={{
                    fontSize: '1.35rem', fontWeight: 900,
                    color: '#F5F5F0', margin: 0, lineHeight: 1.2,
                  }}>
                    يوسف أحمد الصفتي
                  </h3>
                  <p style={{
                    color: '#F59E0B', fontSize: '0.85rem',
                    fontWeight: 700, margin: '0.3rem 0 0',
                  }}>
                    مدرب البرمجة — Bee Code
                  </p>
                  <p style={{ color: '#6B7280', fontSize: '0.75rem', margin: '0.2rem 0 0' }}>
                    🎓 الجامعة الروسية المصرية (ERU) — هندسة الحاسب
                  </p>
                </div>
              </div>

              {/* Bio text */}
              <p style={{
                color: '#9CA3AF', lineHeight: 1.85, fontSize: '0.9rem',
                borderTop: '1px solid rgba(255,255,255,0.07)',
                paddingTop: '1.5rem', margin: 0,
              }}>
                مهندس حاسب متخصص في تدريس البرمجة لطلاب البكالوريا المصرية. أمتلك خبرة{' '}
                <span style={{ color: '#FCD34D', fontWeight: 700 }}>أكثر من 3 سنوات</span>{' '}
                في بناء أساس برمجي متين لطلاب الهندسة وعلوم الحاسب، بمنهج عملي مكثف يضمن التفوق في الامتحانات والتأسيس الحقيقي.
              </p>

              {/* Social links */}
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.75rem', flexWrap: 'wrap' }}>
                {SOCIALS.map(({ label, icon: Icon, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={label}
                    style={{
                      width: 40, height: 40, borderRadius: 12,
                      background: `${color}12`,
                      border: `1px solid ${color}30`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color,
                      textDecoration: 'none',
                      transition: 'all 0.25s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `${color}25`;
                      e.currentTarget.style.borderColor = `${color}70`;
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = `0 8px 20px ${color}30`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = `${color}12`;
                      e.currentTarget.style.borderColor = `${color}30`;
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <Icon size={17} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Stats + Skills ── */}
          <div
            ref={rightReveal.ref}
            style={{
              animation: rightReveal.visible
                ? 'fade-in-left 0.8s 0.15s cubic-bezier(0.16,1,0.3,1) both'
                : 'none',
              display: 'flex', flexDirection: 'column', gap: '2rem',
            }}
          >

            {/* Achievement stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.875rem',
            }}>
              {ACHIEVEMENTS.map(({ value, suffix, label, icon: Icon, color }, i) => (
                <div
                  key={label}
                  style={{
                    background: 'rgba(17,19,24,0.7)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 16,
                    padding: '1.25rem',
                    transition: 'all 0.3s',
                    animation: `fade-in-up 0.6s ${0.1 + i * 0.08}s cubic-bezier(0.16,1,0.3,1) both`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${color}40`;
                    e.currentTarget.style.background = `rgba(17,19,24,0.9)`;
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                    e.currentTarget.style.background = 'rgba(17,19,24,0.7)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: `${color}15`,
                    border: `1px solid ${color}25`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '0.75rem',
                  }}>
                    <Icon size={17} color={color} />
                  </div>
                  <div style={{
                    fontSize: '1.75rem', fontWeight: 900,
                    color, lineHeight: 1,
                  }}>
                    <AnimatedCount target={value} suffix={suffix} />
                  </div>
                  <div style={{
                    fontSize: '0.78rem', color: '#6B7280',
                    marginTop: '0.3rem', fontWeight: 600,
                  }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>

            {/* Skills bars */}
            <div style={{
              background: 'rgba(17,19,24,0.6)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 20,
              padding: '1.75rem',
            }}>
              <p style={{
                color: '#F5F5F0', fontWeight: 800,
                fontSize: '0.9rem', marginBottom: '1.25rem',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
              }}>
                <Zap size={15} color="#F59E0B" />
                المهارات التقنية
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                {SKILLS.map(({ label, icon: Icon, color, pct }, i) => (
                  <div key={label} style={{ animation: `fade-in-right 0.6s ${0.2 + i * 0.07}s both` }}>
                    <div style={{
                      display: 'flex', justifyContent: 'space-between',
                      alignItems: 'center', marginBottom: '0.35rem',
                    }}>
                      <span style={{
                        display: 'flex', alignItems: 'center', gap: '0.4rem',
                        color: '#D1D5DB', fontSize: '0.8rem', fontWeight: 600,
                      }}>
                        <Icon size={13} color={color} />
                        {label}
                      </span>
                      <span style={{ color, fontSize: '0.75rem', fontWeight: 700 }}>
                        {rightReveal.visible ? pct : 0}٪
                      </span>
                    </div>
                    <div style={{
                      height: 5, borderRadius: 999,
                      background: 'rgba(255,255,255,0.06)',
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        height: '100%', borderRadius: 999,
                        background: `linear-gradient(90deg, ${color}88, ${color})`,
                        width: rightReveal.visible ? `${pct}%` : '0%',
                        transition: `width 1.2s ${0.3 + i * 0.1}s cubic-bezier(0.16,1,0.3,1)`,
                        boxShadow: `0 0 8px ${color}50`,
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <a href="#register" style={{ textDecoration: 'none' }}>
              <button style={{
                width: '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
                padding: '1rem 2rem', borderRadius: 14,
                fontWeight: 800, fontSize: '1rem',
                color: '#0B0D10',
                background: 'linear-gradient(135deg, #FCD34D 0%, #F59E0B 55%, #D97706 100%)',
                border: 'none', cursor: 'pointer',
                boxShadow: '0 8px 28px rgba(245,158,11,0.35)',
                fontFamily: 'inherit',
                transition: 'all 0.25s',
                animation: 'fade-in-up 0.6s 0.5s both',
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 14px 40px rgba(245,158,11,0.55)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 28px rgba(245,158,11,0.35)';
                }}
              >
                <Code2 size={18} />
                احجز مقعدك مع يوسف الصفتي
              </button>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
