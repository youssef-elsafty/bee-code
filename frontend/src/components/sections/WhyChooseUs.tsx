'use client';

import { useRef } from 'react';
import {
  Layers, FlaskConical, FileCheck, CalendarCheck, Headphones, CheckCircle2,
} from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import SwipeControls from '@/components/common/SwipeControls';

function BeeHex({ color = '#F59E0B' }: { color?: string }) {
  return (
    <svg width="20" height="18" viewBox="0 0 20 18" fill="none">
      <polygon points="10,1 19,5.5 19,14.5 10,19 1,14.5 1,5.5" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1" />
    </svg>
  );
}

export default function WhyChooseUs() {
  useScrollReveal();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -280, behavior: 'smooth' });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 280, behavior: 'smooth' });

  return (
    <section id="why" className="section-gap relative overflow-hidden bg-[#0B0D10]">

      {/* Subtle amber line top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />

      <div className="section-container relative z-10">

        {/* Header */}
        <div className="reveal text-center mb-10 md:mb-20">
          <div className="badge-amber inline-flex mb-4">
            <BeeHex />
            <span>مميزات أكاديمية Bee Code</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-[48px] font-black text-white tracking-tight mb-4 leading-tight">
            منظومة تعليمية{' '}
            <span className="text-amber-gradient">لا مثيل لها</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
            كل جزء في المنهج مصمم بعناية لضمان الاستيعاب الحقيقي والتطبيق الفعلي.
          </p>
        </div>

        {/* Mobile Swipe Controls */}
        <SwipeControls onScrollLeft={scrollLeft} onScrollRight={scrollRight} />

        {/* Bento Grid: Horizontal swipe on mobile, grid on md+ */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-12 md:overflow-visible gap-4 sm:gap-5"
        >

          {/* Card 1 — Large 8-col */}
          <div className="reveal md:col-span-8 card-glass p-6 sm:p-8 relative overflow-hidden group min-h-[280px] flex flex-col justify-between w-[84vw] max-w-[340px] md:w-full md:max-w-none shrink-0 snap-center md:shrink-0">
            {/* Background hex pattern */}
            <div className="absolute top-4 left-4 opacity-20 pointer-events-none">
              <svg width="120" height="104" viewBox="0 0 120 104" fill="none">
                {[[60,10],[100,31],[100,73],[60,94],[20,73],[20,31]].map(([x,y],i) => (
                  <polygon key={i} points="60,10 100,31 100,73 60,94 20,73 20,31"
                    fill="none" stroke="#F59E0B" strokeWidth="0.5" opacity="0.4" />
                ))}
              </svg>
            </div>

            <div className="relative z-10 text-right">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-400/20 flex items-center justify-center mb-6 group-hover:border-amber-400/40 transition-colors">
                <Layers className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mb-3">تأسيس برمجي من الصفر</h3>
              <p className="text-slate-400 text-sm sm:text-base max-w-lg leading-relaxed">
                لا نكتفي بالشرح النظري، بل نبدأ مع الطالب من كتابة أول سطر كود وحتى فهم هيكلة البيانات والمنطق البرمجي السليم.
              </p>
            </div>

            {/* Fake code window */}
            <div className="mt-6 p-4 rounded-xl bg-[#070809] border border-white/[0.06] font-mono text-xs leading-relaxed" dir="ltr">
              <div className="flex items-center gap-1.5 mb-3 pb-2 border-b border-white/[0.05]">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                <span className="text-[10px] text-slate-500 ml-2">bee_code.py</span>
                <span className="mr-auto text-[10px] text-amber-400/60">🐝 Bee Code Academy</span>
              </div>
              <p><span className="text-amber-400">def</span> <span className="text-amber-200">master_programming</span>(student):</p>
              <p className="pl-4 text-slate-500"># 30 days intensive — guaranteed success</p>
              <p className="pl-4"><span className="text-amber-400">return</span> <span className="text-emerald-400">&quot;100% Bacc Score 🏆&quot;</span></p>
            </div>
          </div>

          {/* Card 2 — 4-col */}
          <div className="md:col-span-4 card-glass p-6 sm:p-8 flex flex-col justify-between group min-h-[280px] w-[84vw] max-w-[340px] md:w-full md:max-w-none shrink-0 snap-center md:shrink-0">
            <div className="text-right">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-400/20 flex items-center justify-center mb-6 group-hover:border-emerald-400/40 transition-colors">
                <FlaskConical className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mb-3">تدريب عملي مكثف</h3>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                تطبيقات حقيقية ومشاريع عملية بعد كل درس لتثبيت المعلومات فوراً.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs font-bold text-emerald-300 bg-emerald-950/30 p-3 rounded-xl border border-emerald-400/15">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              مشاريع برمجية جاهزة للتقييم
            </div>
          </div>

          {/* Card 3 — 4-col */}
          <div className="md:col-span-4 card-glass p-6 sm:p-8 flex flex-col justify-between group min-h-[260px] w-[84vw] max-w-[340px] md:w-full md:max-w-none shrink-0 snap-center md:shrink-0">
            <div className="text-right">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center mb-6 group-hover:border-blue-400/40 transition-colors">
                <FileCheck className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mb-3">نماذج البكالوريا</h3>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                حل وتحليل شامل لجميع الامتحانات والنماذج الرسمية المتوقعة بدقة متناهية.
              </p>
            </div>
            <div className="mt-4 text-xs font-bold text-blue-300">
              📋 كل نماذج السنوات السابقة محلولة
            </div>
          </div>

          {/* Card 4 — 8-col */}
          <div className="md:col-span-8 card-glass p-6 sm:p-8 flex flex-col justify-between group min-h-[260px] w-[84vw] max-w-[340px] md:w-full md:max-w-none shrink-0 snap-center md:shrink-0">
            <div className="text-right">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-400/20 flex items-center justify-center mb-6 group-hover:border-amber-400/40 transition-colors">
                <CalendarCheck className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mb-3">متابعة وتقارير أسبوعية</h3>
              <p className="text-slate-400 text-sm sm:text-base max-w-xl leading-relaxed">
                تقارير دورية مفصلة لولي الأمر لمتابعة مستوى التقدم وأداء الطالب أولاً بأول.
              </p>
            </div>
            <div className="flex items-center gap-3 mt-4 flex-wrap">
              {['تقارير أسبوعية', 'دعم 24/7', 'متابعة فردية'].map((tag) => (
                <span key={tag} className="px-3 py-1.5 rounded-lg bg-amber-500/8 border border-amber-400/15 text-xs font-bold text-amber-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
