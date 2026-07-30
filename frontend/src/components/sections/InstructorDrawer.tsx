'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Code2, Globe, Linkedin, Github, FileText,
  GraduationCap, Zap, Award, Users, Star, Briefcase,
  FolderCode, CheckCircle2, Flame,
} from 'lucide-react';

/* ── Animated counter ─────────────────────────────────── */
function AnimatedCount({ target, suffix = '', active }: { target: number; suffix?: string; active: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) { setCount(0); return; }
    let val = 0;
    const step = Math.max(1, Math.ceil(target / 40));
    const t = setInterval(() => {
      val += step;
      if (val >= target) { setCount(target); clearInterval(t); }
      else setCount(val);
    }, 25);
    return () => clearInterval(t);
  }, [active, target]);
  return <span>{count}{suffix}</span>;
}

/* ── Floating code snippet ────────────────────────────── */
const CODE_LINES = [
  '>>> # Youssef El Safty — iSchool Senior Instructor (1.5 Yrs)',
  '>>> experience = "iSchool Instructor (1.5 Years)"',
  '>>> university = "Egyptian Russian University (ERU)"',
  '>>> projects_built = 25+',
  '>>> students_mentored = 200+',
  '>>> print("Building the next generation of engineers...")',
];

const SKILLS = [
  { label: 'Python & Data Structures', color: '#3B82F6', pct: 98 },
  { label: 'C++ & Logic Building',     color: '#10B981', pct: 92 },
  { label: 'Algorithms & Problem Solving', color: '#F59E0B', pct: 95 },
  { label: 'Full-Stack Web (React/Django)', color: '#8B5CF6', pct: 90 },
  { label: 'Database Design (SQL/PostgreSQL)', color: '#EF4444', pct: 88 },
];

const SOCIALS = [
  { label: 'Portfolio', icon: Globe,    href: 'https://youssef-elsafty.vercel.app',                                       color: '#38BDF8' },
  { label: 'LinkedIn',  icon: Linkedin, href: 'https://linkedin.com/in/youssef-elsafty',                                  color: '#60A5FA' },
  { label: 'GitHub',    icon: Github,   href: 'https://github.com/youssef-elsafty',                                       color: '#C084FC' },
  { label: 'CV',        icon: FileText, href: 'https://drive.google.com/file/d/13UX9tpo1Vdx-ynNIAOg6zCymxtrm4rXL/view', color: '#34D399' },
];

const ACHIEVEMENTS = [
  { value: 200, suffix: '+',  label: 'طالب تم تأسيسهم',    color: '#3B82F6', icon: Users        },
  { value: 98,  suffix: '٪', label: 'نسبة النجاح والتفوق',  color: '#F59E0B', icon: Award        },
  { value: 25,  suffix: '+',  label: 'مشروع حقيقي متميز', color: '#10B981', icon: FolderCode   },
  { value: 1.5, suffix: ' سنة', label: 'مدرب بـ iSchool',   color: '#FCD34D', icon: Briefcase    },
];

const CAREER_HIGHLIGHTS = [
  {
    title: 'مدرب برمجيات في شركة iSchool',
    period: 'سنة ونصف من التدريس العملي المكثف',
    desc: 'قام بتدريس مئات الطلاب أساسيات البرمجة، خوارزميات التفكير المنطقي، ومشاريع بايثون وويب حقيقية بنجاح مبهر.',
    badge: 'خبرة تدريسية حقيقية',
    accent: '#F59E0B',
  },
  {
    title: 'طالب بالجامعة الروسية المصرية (ERU)',
    period: 'هندسة وعلوم الحاسب والذكاء الاصطناعي',
    desc: 'حاصل على تقدير امتياز 🌟 في التخصص الأكاديمي، دراسة متعمقة في علوم الحاسب والألغوريثمات، وتنفيذ مشاريع تخرج وتطبيقات أنظمة برمجية متكاملة.',
    badge: 'امتياز مع مرتبة الشرف',
    accent: '#38BDF8',
  },
  {
    title: 'نظام إدارة الجراج الذكي — NASA Space Apps 🚀',
    period: 'مشروع تقني متكامل — GitHub',
    desc: 'نظام ذكي متكامل لإدارة الجراج يتضمن بوابة تحكم بـ ESP32، كاميرا مباشرة، وإشعارات Firebase فورية. حقق إنجازات بارزة في مسابقات تقنية كبرى.',
    badge: '🏆 إنجاز تنافسي',
    accent: '#10B981',
    github: 'https://github.com/youssef-elsafty/garage-management-system',
  },
];

const FEATURED_PROJECTS = [
  {
    title: 'نظام إدارة الجراج الذكي',
    category: 'Full-Stack Web App',
    desc: 'نظام متكامل لإدارة الجراج يتضمن بوابة ذكية بـ ESP32، كاميرا مباشرة، وإشعارات Firebase فورية.',
    tags: ['Django', 'ESP32', 'Firebase', 'Python', 'IoT'],
    github: 'https://github.com/youssef-elsafty/garage-management-system',
  },
  {
    title: 'التعرف على المشاعر من الصوت',
    category: 'Python & ML',
    desc: 'مشروع تعلم آلي لتحليل واكتشاف المشاعر من الكلام الصوتي باستخدام MFCCs وخوارزميات التصنيف.',
    tags: ['Python', 'Librosa', 'Scikit-learn', 'ML'],
    github: 'https://github.com/youssef-elsafty/Speech-Emotion-Recognition',
  },
  {
    title: 'نظام توصية المحاصيل الزراعية',
    category: 'ML & Flask Web App',
    desc: 'تطبيق ذكاء اصطناعي لتوصية المحاصيل المناسبة بناءً على تركيب التربة والمناخ مع واجهة Flask تفاعلية.',
    tags: ['Python', 'Flask', 'Scikit-learn', 'ML', 'Agriculture'],
    github: 'https://github.com/youssef-elsafty/Crops-Recommendations',
  },
];

interface InstructorDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function InstructorDrawer({ open, onClose }: InstructorDrawerProps) {
  const [rendered, setRendered] = useState(false);
  const [visible, setVisible]   = useState(false);
  const [skillsActive, setSkillsActive] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  /* Mount → slide in */
  useEffect(() => {
    if (open) {
      setRendered(true);
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setVisible(true);
          setTimeout(() => setSkillsActive(true), 500);
        });
      });
    } else {
      setVisible(false);
      setSkillsActive(false);
      document.body.style.overflow = '';
      const t = setTimeout(() => setRendered(false), 450);
      return () => clearTimeout(t);
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  /* Close on backdrop click */
  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  /* Close on Escape */
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  if (!rendered) return null;

  return (
    <div
      onClick={handleBackdrop}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        backgroundColor: visible ? 'rgba(7,8,9,0.85)' : 'transparent',
        backdropFilter: visible ? 'blur(10px)' : 'none',
        transition: 'background-color 0.4s ease, backdrop-filter 0.4s ease',
        display: 'flex', alignItems: 'stretch', justifyContent: 'flex-start',
      }}
    >
      {/* ── Drawer Panel ── */}
      <div
        ref={drawerRef}
        style={{
          width: '100%',
          maxWidth: 680,
          height: '100vh',
          background: 'linear-gradient(160deg, #0E1015 0%, #111318 60%, #0B0D10 100%)',
          borderLeft: '1px solid rgba(245,158,11,0.2)',
          transform: visible ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'flex', flexDirection: 'column',
          overflowY: 'auto',
          position: 'relative',
          boxShadow: visible ? '25px 0 90px rgba(0,0,0,0.8), 0 0 120px rgba(245,158,11,0.08)' : 'none',
        }}
      >
        {/* Grid texture */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.35,
          backgroundImage: `
            linear-gradient(rgba(245,158,11,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,158,11,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }} />

        {/* Ambient glow top */}
        <div style={{
          position: 'absolute', top: -80, left: -80, width: 380, height: 380, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)',
          pointerEvents: 'none', filter: 'blur(50px)',
          animation: 'glow-pulse 4s ease-in-out infinite',
        }} />

        {/* Floating code in background */}
        <div style={{
          position: 'absolute', bottom: 30, left: 0, right: 0,
          pointerEvents: 'none', padding: '0 2rem',
          opacity: 0.07, fontFamily: 'monospace', fontSize: '0.72rem',
          color: '#10B981', lineHeight: 2,
        }}>
          {CODE_LINES.map((l, i) => <div key={i}>{l}</div>)}
        </div>

        {/* ── Mobile Drag Indicator ── */}
        <div className="w-12 h-1.5 bg-amber-500/40 rounded-full mx-auto my-2.5 sm:hidden" />

        {/* ── Header ── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          position: 'relative', zIndex: 1,
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: 38, height: 38, borderRadius: 12,
              background: 'rgba(245,158,11,0.12)',
              border: '1px solid rgba(245,158,11,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <GraduationCap size={20} color="#F59E0B" />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 900, color: '#F5F5F0' }}>
                السيرة الذاتية للمدرب
              </h2>
              <p style={{ margin: '0.1rem 0 0', fontSize: '0.75rem', color: '#6B7280' }}>
                م. يوسف أحمد الصفتي — خبرة عمل وتدريس حقيقية
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#9CA3AF', cursor: 'pointer', transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(244,63,94,0.15)';
              e.currentTarget.style.color = '#FB7185';
              e.currentTarget.style.borderColor = 'rgba(244,63,94,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              e.currentTarget.style.color = '#9CA3AF';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* ── Content ── */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '2rem', position: 'relative', zIndex: 1 }}>

          {/* Profile card */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(25,28,35,0.85) 0%, rgba(17,19,24,0.95) 100%)',
              border: '1px solid rgba(245,158,11,0.22)',
              borderRadius: 22, padding: '1.75rem',
              marginBottom: '1.5rem',
              boxShadow: '0 12px 40px rgba(0,0,0,0.4), 0 0 30px rgba(245,158,11,0.05)',
              position: 'relative', overflow: 'hidden',
            }}
          >
            {/* Top highlight bar */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 2,
              background: 'linear-gradient(90deg, #FCD34D, #F59E0B, #10B981)',
            }} />

            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
              {/* Avatar */}
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <div style={{
                  position: 'absolute', inset: -3, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #FCD34D, #F59E0B)',
                  opacity: 0.9,
                }} />
                <div style={{
                  width: 96, height: 96, borderRadius: '50%',
                  background: '#0B0D10',
                  border: '3px solid #FCD34D',
                  overflow: 'hidden',
                  boxShadow: '0 8px 30px rgba(245,158,11,0.5)',
                  position: 'relative', zIndex: 1,
                }}>
                  <img
                    src="/youssef.jpg"
                    alt="يوسف الصفتي"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'top',
                      filter: 'brightness(1.12) contrast(1.08)',
                    }}
                  />
                </div>
                {/* Active badge */}
                <div style={{ position: 'absolute', bottom: 2, right: 2, zIndex: 2 }}>
                  <span style={{
                    position: 'absolute', inset: 0, borderRadius: '50%',
                    background: '#10B981', animation: 'ping-amber 2s ease infinite', opacity: 0.6,
                  }} />
                  <span style={{
                    display: 'block', width: 12, height: 12, borderRadius: '50%',
                    background: '#10B981', border: '2px solid #111318',
                    boxShadow: '0 0 8px rgba(16,185,129,0.8)',
                  }} />
                </div>
              </div>

              {/* Info */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 900, color: '#F5F5F0' }}>
                    يوسف أحمد الصفتي
                  </h3>
                  <span style={{
                    padding: '0.15rem 0.6rem', borderRadius: 999,
                    background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)',
                    color: '#34D399', fontSize: '0.68rem', fontWeight: 800,
                  }}>
                    مدرب برمجيات معتمد
                  </span>
                  <span style={{
                    padding: '0.15rem 0.6rem', borderRadius: 999,
                    background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.4)',
                    color: '#FCD34D', fontSize: '0.68rem', fontWeight: 900,
                  }}>
                    🌟 حاصل على تقدير امتياز
                  </span>
                </div>

                <p style={{ margin: '0.3rem 0 0', fontSize: '0.83rem', color: '#FCD34D', fontWeight: 700 }}>
                  مدرب سابق بـ iSchool (سنة ونصف) & طالب الحاسبات بتقدير امتياز بالجامعة الروسية (ERU)
                </p>

                {/* Social mini */}
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.85rem', flexWrap: 'wrap' }}>
                  {SOCIALS.map(({ label, icon: Icon, href, color }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                      title={label}
                      style={{
                        width: 34, height: 34, borderRadius: 10,
                        background: `${color}12`, border: `1px solid ${color}30`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color, textDecoration: 'none', transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = `${color}25`;
                        e.currentTarget.style.transform = 'translateY(-3px)';
                        e.currentTarget.style.boxShadow = `0 8px 20px ${color}30`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = `${color}12`;
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <Icon size={15} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Real Bio */}
            <p style={{
              color: '#D1D5DB', lineHeight: 1.9, fontSize: '0.88rem',
              margin: '1.4rem 0 0',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              paddingTop: '1.25rem',
            }}>
              مطور برمجيات ومدرب تقني أمتلك خبرة عملية وعميقة تمتد لأكثر من{' '}
              <span style={{ color: '#FCD34D', fontWeight: 800 }}>سنة ونصف في شركة iSchool</span>،
              قمت خلالها بتدريس مئات الطلاب وتطوير مهاراتهم في البرمجة والتفكير المنطقي.{' '}
              خريج{' '}
              <span style={{ color: '#38BDF8', fontWeight: 800 }}>هندسة وعلوم الحاسب والذكاء الاصطناعي بالجامعة الروسية المصرية (ERU) بتقدير امتياز مع مرتبة الشرف 🌟</span>،
              وحققنا مراكز متقدمة وإنجازات بارزة في مسابقات كبرى مثل{' '}
              <span style={{ color: '#F59E0B', fontWeight: 800 }}>NASA Space Apps Challenge</span>{' '}
              والعديد من المسابقات التقنية الأخرى، إلى جانب بناء{' '}
              <span style={{ color: '#10B981', fontWeight: 800 }}>العشرات من المشاريع البرمجية الحقيقية</span>.
            </p>
          </div>

          {/* Achievement stats */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: '0.75rem', marginBottom: '1.5rem',
          }}>
            {ACHIEVEMENTS.map(({ value, suffix, label, color, icon: Icon }) => (
              <div key={label}
                style={{
                  background: 'rgba(17,19,24,0.75)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 16, padding: '1.1rem',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${color}40`;
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = `0 12px 28px ${color}15`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  width: 34, height: 34, borderRadius: 10,
                  background: `${color}15`, border: `1px solid ${color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '0.6rem',
                }}>
                  <Icon size={16} color={color} />
                </div>
                <div style={{ fontSize: '1.65rem', fontWeight: 900, color, lineHeight: 1 }}>
                  {typeof value === 'number' && Math.floor(value) === value ? (
                    <AnimatedCount target={value} suffix={suffix} active={skillsActive} />
                  ) : (
                    <span>{value}{suffix}</span>
                  )}
                </div>
                <div style={{ fontSize: '0.73rem', color: '#9CA3AF', marginTop: '0.3rem', fontWeight: 700 }}>
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* Real Career Highlights */}
          <div style={{
            background: 'rgba(17,19,24,0.6)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 18, padding: '1.5rem',
            marginBottom: '1.5rem',
          }}>
            <p style={{
              color: '#F5F5F0', fontWeight: 800, fontSize: '0.9rem',
              margin: '0 0 1.25rem',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}>
              <Flame size={16} color="#F59E0B" />
              الخبرات والمحطات الرئيسية
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {CAREER_HIGHLIGHTS.map((h, i) => (
                <div key={i} style={{
                  background: 'rgba(7,8,9,0.6)',
                  border: `1px solid ${h.accent}25`,
                  borderRadius: 14, padding: '1.1rem',
                  position: 'relative', overflow: 'hidden',
                }}>
                  <div style={{
                    position: 'absolute', top: 0, right: 0, bottom: 0, width: 3,
                    background: h.accent,
                  }} />
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem', flexWrap: 'wrap', gap: '0.4rem' }}>
                    <h4 style={{ margin: 0, fontSize: '0.92rem', fontWeight: 800, color: '#F5F5F0' }}>
                      {h.title}
                    </h4>
                    <span style={{
                      fontSize: '0.68rem', fontWeight: 700, color: h.accent,
                      background: `${h.accent}15`, padding: '0.15rem 0.5rem', borderRadius: 999,
                      border: `1px solid ${h.accent}30`,
                    }}>
                      {h.badge}
                    </span>
                  </div>
                  <p style={{ margin: '0 0 0.4rem', fontSize: '0.75rem', color: '#9CA3AF', fontWeight: 600 }}>
                    🗓️ {h.period}
                  </p>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#D1D5DB', lineHeight: 1.6 }}>
                    {h.desc}
                  </p>
                  {(h as any).github && (
                    <a
                      href={(h as any).github}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                        marginTop: '0.75rem',
                        fontSize: '0.72rem', fontWeight: 800,
                        color: '#10B981', textDecoration: 'none',
                        background: 'rgba(16,185,129,0.1)',
                        padding: '0.3rem 0.75rem', borderRadius: 999,
                        border: '1px solid rgba(16,185,129,0.25)',
                        transition: 'all 0.2s',
                      }}
                    >
                      <Github size={12} />
                      <span>عرض على GitHub</span>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Featured Projects with GitHub Links */}
          <div style={{
            background: 'rgba(17,19,24,0.6)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 18, padding: '1.5rem',
            marginBottom: '1.5rem',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem',
            }}>
              <p style={{
                color: '#F5F5F0', fontWeight: 800, fontSize: '0.9rem',
                margin: 0,
                display: 'flex', alignItems: 'center', gap: '0.5rem',
              }}>
                <FolderCode size={16} color="#A855F7" />
                نماذج من المشاريع المنجزة (25+ مشروع)
              </p>
              <a
                href="https://github.com/youssef-elsafty"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  color: '#C084FC', fontSize: '0.75rem', fontWeight: 700,
                  textDecoration: 'none', background: 'rgba(168,85,247,0.1)',
                  padding: '0.25rem 0.65rem', borderRadius: 999,
                  border: '1px solid rgba(168,85,247,0.25)',
                  transition: 'all 0.2s',
                }}
              >
                <Github size={13} />
                <span>رابط GitHub</span>
              </a>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              {FEATURED_PROJECTS.map((proj, idx) => (
                <div key={idx} style={{
                  background: 'rgba(7,8,9,0.6)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 14, padding: '1rem',
                  display: 'flex', flexDirection: 'column', gap: '0.5rem',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h4 style={{ margin: 0, fontSize: '0.88rem', fontWeight: 800, color: '#F5F5F0' }}>
                      {proj.title}
                    </h4>
                    <span style={{
                      fontSize: '0.65rem', fontWeight: 700, color: '#C084FC',
                      background: 'rgba(192,132,252,0.1)', padding: '0.1rem 0.45rem', borderRadius: 999,
                    }}>
                      {proj.category}
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.78rem', color: '#9CA3AF', lineHeight: 1.5 }}>
                    {proj.desc}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.25rem', flexWrap: 'wrap', gap: '0.4rem' }}>
                    <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                      {proj.tags.map((tag) => (
                        <span key={tag} style={{
                          fontSize: '0.62rem', fontWeight: 600, color: '#D1D5DB',
                          background: 'rgba(255,255,255,0.05)', padding: '0.1rem 0.4rem', borderRadius: 4,
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                        fontSize: '0.72rem', fontWeight: 800, color: '#FCD34D',
                        textDecoration: 'none',
                      }}
                    >
                      <Github size={12} />
                      <span>عرض الكود على GitHub</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Direct Big GitHub Link Button */}
            <a
              href="https://github.com/youssef-elsafty"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                marginTop: '1rem', padding: '0.85rem 1rem', borderRadius: 12,
                background: 'linear-gradient(135deg, rgba(168,85,247,0.15) 0%, rgba(99,102,241,0.15) 100%)',
                border: '1px solid rgba(168,85,247,0.35)',
                color: '#E9D5FF', fontWeight: 800, fontSize: '0.82rem',
                textDecoration: 'none', transition: 'all 0.2s',
                textAlign: 'center',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(168,85,247,0.25) 0%, rgba(99,102,241,0.25) 100%)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(168,85,247,0.15) 0%, rgba(99,102,241,0.15) 100%)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Github size={16} color="#C084FC" />
              <span>استعرض كافة المشاريع والكود المصدري على GitHub (github.com/youssef-elsafty) 🚀</span>
            </a>
          </div>

          {/* Skills — Tag Cloud (no percentages) */}
          <div style={{
            background: 'rgba(17,19,24,0.6)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 18, padding: '1.5rem',
            marginBottom: '1.5rem',
          }}>
            <p style={{
              color: '#F5F5F0', fontWeight: 800, fontSize: '0.875rem',
              margin: '0 0 1.1rem',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}>
              <Zap size={16} color="#F59E0B" />
              الخبرات والمهارات التقنية
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
              {SKILLS.map(({ label, color }) => (
                <span key={label} style={{
                  padding: '0.45rem 0.85rem',
                  borderRadius: 999,
                  background: `${color}12`,
                  border: `1px solid ${color}35`,
                  color,
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.01em',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: color, display: 'inline-block', flexShrink: 0 }} />
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div>
            <a href="#register" onClick={onClose} style={{ textDecoration: 'none' }}>
              <button style={{
                width: '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
                padding: '1.1rem 2rem', borderRadius: 16,
                fontWeight: 900, fontSize: '1.05rem',
                color: '#0B0D10',
                background: 'linear-gradient(135deg, #FCD34D 0%, #F59E0B 55%, #D97706 100%)',
                border: 'none', cursor: 'pointer',
                boxShadow: '0 8px 30px rgba(245,158,11,0.45)',
                fontFamily: 'inherit',
                transition: 'all 0.25s',
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 16px 42px rgba(245,158,11,0.65)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(245,158,11,0.45)';
                }}
              >
                <Code2 size={20} />
                احجز مكانك مع يوسف الصفتي الآن 🐝
              </button>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
