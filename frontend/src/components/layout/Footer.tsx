'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe, Linkedin, Github, FileText, Heart } from 'lucide-react';

function BeeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 40 40" fill="none">
      <polygon points="20,2 36,11 36,29 20,38 4,29 4,11" fill="#F59E0B" opacity="0.15" stroke="#F59E0B" strokeWidth="1.5" />
      <circle cx="20" cy="14" r="4" fill="#FCD34D" />
      <circle cx="20" cy="24" r="5" fill="#F59E0B" />
      <ellipse cx="12" cy="18" rx="5" ry="3" fill="#FDE68A" opacity="0.6" transform="rotate(-20 12 18)" />
      <ellipse cx="28" cy="18" rx="5" ry="3" fill="#FDE68A" opacity="0.6" transform="rotate(20 28 18)" />
    </svg>
  );
}

export default function Footer() {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  if (pathname?.startsWith('/admin')) return null;

  const socialLinks = [
    { name: 'Portfolio', icon: Globe,    href: 'https://youssef-elsafty.vercel.app' },
    { name: 'LinkedIn',  icon: Linkedin, href: 'https://linkedin.com/in/youssef-elsafty' },
    { name: 'GitHub',    icon: Github,   href: 'https://github.com/youssef-elsafty' },
    { name: 'CV',        icon: FileText, href: 'https://drive.google.com/file/d/13UX9tpo1Vdx-ynNIAOg6zCymxtrm4rXL/view' },
  ];

  const quickLinks = [
    { label: 'لماذا Bee Code', href: '#why' },
    { label: 'المنهج الكامل', href: '#challenge' },
    { label: 'مكتسبات الطالب', href: '#benefits' },
    { label: 'الأسئلة الشائعة', href: '#faq' },
  ];

  return (
    <footer className="relative border-t border-white/[0.06] bg-[#070809] overflow-hidden">

      {/* Amber glow top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-16 bg-amber-400/5 blur-2xl" />

      <div className="section-container relative z-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-white/[0.05]">

          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/25">
                <BeeIcon />
              </div>
              <span className="font-black text-xl tracking-tight">
                <span className="text-amber-gradient">Bee</span>
                <span className="text-white"> Code</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              أكاديمية برمجة متخصصة للبكالوريا المصرية — مسار الهندسة وعلوم الحاسب. تأسيس عملي يضمن التفوق.
            </p>
            <div className="flex items-center gap-2 pt-1">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/[0.03] hover:bg-amber-500/10 border border-white/[0.06] hover:border-amber-400/30 text-slate-400 hover:text-amber-300 flex items-center justify-center transition-all duration-300"
                  title={item.name}
                >
                  <item.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-amber-400/80 uppercase tracking-widest mb-5">روابط سريعة</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-amber-300 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-amber-400/40 group-hover:bg-amber-400 transition-colors" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-amber-400/80 uppercase tracking-widest mb-5">ابدأ رحلتك</h4>
            <p className="text-sm text-slate-500">مستوياتنا تفتح في بداية كل شهر. المقاعد محدودة لضمان جودة التعليم.</p>
            <Link href="/register">
              <button className="btn-amber w-full mt-4">
                احجز مكانك الآن 🐝
              </button>
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-slate-600">
          <p className="flex items-center gap-1.5">
            © {year} Bee Code. صُنع بـ <Heart className="w-3 h-3 text-amber-400 fill-amber-400" /> في مصر.
          </p>
        </div>
      </div>
    </footer>
  );
}
