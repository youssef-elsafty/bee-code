'use client';

import { useRef } from 'react';
import { Brain, Calculator, Code2, GraduationCap, ShieldCheck, Sparkles } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import SwipeControls from '@/components/common/SwipeControls';

const BENEFITS = [
  {
    icon: Brain,
    title: 'التفكير المنطقي والهيكلي',
    desc: 'تطوير مهارات التحليل وحل التحديات البرمجية بشكل ممنهج وسريع.',
    accent: '#F59E0B',
  },
  {
    icon: Calculator,
    title: 'حل المسائل والخوارزميات',
    desc: 'إتقان المسائل المنطقية والتحليل الرياضي المطلوبة في امتحانات البكالوريا.',
    accent: '#38BDF8',
  },
  {
    icon: Code2,
    title: 'كتابة الأكواد بمهارية',
    desc: 'تطبيق عملي لكتابة كود نظيف، خالي من الأخطاء وجاهز للإنتاج.',
    accent: '#818CF8',
  },
  {
    icon: GraduationCap,
    title: 'الاستعداد التام للبكالوريا',
    desc: 'تغطية شاملة لكل محاور المنهج الجديد بثقة وتفوق كامل.',
    accent: '#34D399',
  },
  {
    icon: ShieldCheck,
    title: 'الضمان والدرجة النهائية',
    desc: 'تدريبات مكثفة تضمن دخول الامتحان بأعلى مستويات الثقة.',
    accent: '#F43F5E',
  },
];

export default function CourseBenefits() {
  useScrollReveal();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -280, behavior: 'smooth' });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 280, behavior: 'smooth' });

  return (
    <section id="benefits" className="section-gap relative overflow-hidden bg-[#0B0D10]">
      <div className="section-container relative z-10">
        
        {/* Header */}
        <div className="reveal text-center mb-10 md:mb-20">
          <div className="badge-amber inline-flex mb-4">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>مكتسبات الطالب</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-[46px] font-black text-white tracking-tight mb-4">
            مهارات تضمن <span className="text-amber-gradient">الدرجة النهائية</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
            الهدف ليس فقط اجتياز الامتحان، بل إتقان التفكير البرمجي التأسيسي.
          </p>
        </div>

        {/* Mobile Swipe Controls */}
        <SwipeControls onScrollLeft={scrollLeft} onScrollRight={scrollRight} />

        {/* Bento Grid: Horizontal swipe on mobile, grid on md+ */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-12 md:overflow-visible gap-4 sm:gap-6"
        >
          {BENEFITS.map((b, i) => {
            const isLarge = i === 0 || i === 3;
            return (
              <div
                key={i}
                className={`reveal ${
                  isLarge ? 'md:col-span-7' : 'md:col-span-5'
                } card-glass p-6 sm:p-8 flex flex-col justify-between group cursor-default w-[84vw] max-w-[340px] md:w-full md:max-w-none shrink-0 snap-center md:shrink-0`}
              >
                <div className="text-right">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                    style={{
                      background: `${b.accent}15`,
                      border: `1px solid ${b.accent}30`,
                    }}
                  >
                    <b.icon className="w-6 h-6" style={{ color: b.accent }} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{b.title}</h3>
                  <p className="text-slate-300/80 text-sm leading-relaxed max-w-md">
                    {b.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
