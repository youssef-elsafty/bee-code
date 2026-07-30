'use client';

import { useRef } from 'react';
import { Star, Quote } from 'lucide-react';
import SwipeControls from '@/components/common/SwipeControls';

const TESTIMONIALS = [
  {
    name: 'أم محمد السيد',
    role: 'والدة طالب بالبكالوريا المصرية',
    quote: 'ابني كان حاسس إن البرمجة صعبة. بعد شهر بس مع البشمهندس بقى بيحل الأسئلة بسهولة ويشرحهالي كمان.',
    avatar: 'أ',
    accent: '#F59E0B',
    badge: 'ولي أمر',
  },
  {
    name: 'كريم عبد الرحمن',
    role: 'طالب بكالوريا علمية',
    quote: 'الشرح عالي المستوى وعملي جداً. الدكتور بيوصل الفكرة من جزرها بدون تعقيد.',
    avatar: 'ك',
    accent: '#38BDF8',
    badge: 'طالب',
  },
  {
    name: 'أ. ريم أحمد',
    role: 'والدة طالبتين بالأكاديمية',
    quote: 'متابعة أسبوعية ممتازة واهتمام حقيقي بكل التفاصيل. نتائج البنات اتغيرت تماماً.',
    avatar: 'ر',
    accent: '#34D399',
    badge: 'ولي أمر',
  },
];

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -280, behavior: 'smooth' });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 280, behavior: 'smooth' });

  return (
    <section id="testimonials" className="section-gap relative overflow-hidden bg-[#0B0D10]">
      <div className="section-container relative z-10">
        
        {/* Header */}
        <div className="reveal text-center mb-10 md:mb-20">
          <div className="badge-amber inline-flex mb-4">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>ثقة الطلاب وأولياء الأمور</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-[46px] font-black text-white tracking-tight mb-4">
            ماذا يقولون عن <span className="text-amber-gradient">الأكاديمية</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
            نتائج حقيقية وتجارب ملهمة للطلاب وأسرهم.
          </p>
        </div>

        {/* Mobile Swipe Controls */}
        <SwipeControls onScrollLeft={scrollLeft} onScrollRight={scrollRight} />

        {/* Testimonials Cards: Horizontal swipe on mobile, grid on md+ */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:overflow-visible gap-4 sm:gap-6"
        >
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="reveal card-glass p-6 sm:p-8 flex flex-col justify-between relative group text-right w-[84vw] max-w-[340px] md:w-full md:max-w-none shrink-0 snap-center md:shrink-0"
            >
              <div>
                {/* Header Avatar & Role */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black text-white flex-shrink-0 shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${t.accent}, ${t.accent}88)`,
                    }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-white">{t.name}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{t.role}</p>
                    <div className="flex gap-1 mt-1" dir="ltr">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>

                <Quote className="w-8 h-8 text-white/10 mb-2 rotate-180" />
                <p className="text-slate-300/90 text-sm leading-relaxed mb-6 font-normal">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs text-slate-400 font-semibold">
                <span className="px-3 py-1 rounded-full bg-white/5 text-slate-300 border border-white/10">
                  {t.badge}
                </span>
                <span className="text-emerald-400">تقييم موثق ★ ٥/٥</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
