'use client';

import { motion } from 'framer-motion';
import {
  Linkedin,
  Github,
  Globe,
  FileText,
  Sparkles,
  Award,
  Cpu,
  Layers,
  Box,
  ExternalLink,
  Code2,
  CheckCircle2,
} from 'lucide-react';

export default function InstructorBadge() {
  const links = [
    {
      name: 'Portfolio',
      icon: Globe,
      href: 'https://youssef-elsafty.vercel.app',
      color: '#3B82F6',
      label: 'youssef-elsafty.vercel.app',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://linkedin.com/in/youssef-elsafty',
      color: '#0A66C2',
      label: 'Youssef Elsafty | LinkedIn',
    },
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/youssef-elsafty',
      color: '#A855F7',
      label: 'github.com/youssef-elsafty',
    },
    {
      name: 'CV (Google Drive)',
      icon: FileText,
      href: 'https://drive.google.com/file/d/13UX9tpo1Vdx-ynNIAOg6zCymxtrm4rXL/view',
      color: '#10B981',
      label: 'Youssef Elsafty.pdf',
    },
  ];

  const skills = [
    { name: 'Django & Backend', icon: Layers },
    { name: 'AI & Deep Learning', icon: Cpu },
    { name: 'Computer Vision', icon: Award },
    { name: 'Docker & DevOps', icon: Box },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative w-full max-w-4xl mx-auto mb-8 z-30 px-2"
    >
      {/* Container Glass Card */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900/90 border border-blue-500/40 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl shadow-blue-950/60 text-right">
        {/* Top Glow Ambient effect */}
        <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400" />
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Main Content Layout */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10">
          
          {/* Instructor Image Frame */}
          <div className="relative flex-shrink-0">
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-blue-400/80 shadow-2xl shadow-blue-500/30 group">
              <img
                src="/youssef.jpg"
                alt="م. يوسف الصفتي"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                style={{ filter: 'brightness(1.1) contrast(1.08)' }}
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-2xl pointer-events-none" />
            </div>
            {/* Online Badge */}
            <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow-lg border border-white/20 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>المحاضر الرئيسي</span>
            </div>
          </div>

          {/* Instructor Details & Bio */}
          <div className="flex-1 text-right w-full">
            
            {/* Title & Name Badge */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  م. يوسف الصفتي
                </span>
                <Sparkles className="w-5 h-5 text-blue-400 animate-pulse" />
              </div>
              
              <div className="badge-glow text-xs px-3 py-1">
                <Code2 className="w-3.5 h-3.5 text-blue-400" />
                <span>البكالوريا المصرية — الهندسة وعلوم الحاسب</span>
              </div>
            </div>

            {/* Subtitle Role */}
            <h4 className="text-sm sm:text-base font-extrabold text-gradient-animated mb-3">
              مهندس ذكاء اصطناعي وخبير Backend Software Development
            </h4>

            {/* Bio Description Box */}
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-800/70 p-4 rounded-2xl border border-white/10 shadow-inner mb-4">
              أدمج بين دقة البرمجيات وذكاء الآلة. أمتلك سجلاً في بناء أنظمة متكاملة تعتمد على Django وإطارات الذكاء الاصطناعي، مع شغف حقيقي بتحويل الأفكار المعقدة إلى منتجات برمجية جاهزة للإنتاج (Production-ready). خبرتي تمتد من هندسة النماذج العميقة وحوسبة الرؤية الحاسوبية إلى أتمتة النشر عبر Docker. أبحث دائماً عن التحديات البرمجية الكبرى لترك بصمة تقنية فارقة.
            </p>

            {/* Expertise Pills */}
            <div className="flex flex-wrap gap-2 mb-5">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-xl bg-blue-950/60 text-blue-200 border border-blue-500/30 shadow-sm"
                >
                  <skill.icon className="w-3.5 h-3.5 text-cyan-400" />
                  {skill.name}
                </span>
              ))}
            </div>

            {/* Professional & Social Links Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3 border-t border-white/10">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-blue-600/25 border border-white/10 hover:border-blue-400/50 text-xs text-white transition-all duration-300 group/link shadow-sm"
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="p-2 rounded-lg flex items-center justify-center"
                      style={{ background: `${link.color}25` }}
                    >
                      <link.icon
                        className="w-4 h-4"
                        style={{ color: link.color }}
                      />
                    </div>
                    <div className="text-right">
                      <span className="font-bold block text-white text-xs">
                        {link.name}
                      </span>
                      <span className="text-[11px] text-slate-400 group-hover/link:text-blue-300">
                        {link.label}
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover/link:text-white transition-colors" />
                </a>
              ))}
            </div>

          </div>
        </div>

      </div>
    </motion.div>
  );
}
