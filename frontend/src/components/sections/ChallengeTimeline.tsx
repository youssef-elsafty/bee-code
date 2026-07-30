'use client';

import { useRef } from 'react';
import { CheckCircle2, Calendar } from 'lucide-react';
import SwipeControls from '@/components/common/SwipeControls';

const WEEKS = [
  {
    step: '01',
    week: 'الأسبوع الأول',
    title: 'أساسيات البرمجة والهيكلة',
    topics: [
      'مكوّنات الكمبيوتر وكيف يعمل',
      'الطفرة البرمجية وأثرها في حياتنا',
      'المتغيرات والأنواع الأساسية',
      'العمليات المنطقية والحسابية',
      'مفهوم الإدخال والإخراج القياسي',
      'بناء أول برنامج حقيقي',
    ],
    accent: '#F59E0B',
  },
  {
    step: '02',
    week: 'الأسبوع الثاني',
    title: 'خوارزميات حل المسائل',
    topics: ['الشروط والجمل الشرطية', 'الحلقات والتكرار (Loops)', 'الدوال والمكونات البرمجية', 'حل مسائل منطقية رياضية'],
    accent: '#06B6D4',
  },
  {
    step: '03',
    week: 'الأسبوع الثالث',
    title: 'نماذج امتحانات البكالوريا',
    topics: ['تحليل امتحانات السنوات السابقة', 'استراتيجيات الحل السريع والأنسب', 'تجنب أكثر الأخطاء الشائعة', 'تدريبات زامنية محاكاة'],
    accent: '#A855F7',
  },
  {
    step: '04',
    week: 'الأسبوع الرابع',
    title: 'المراجعة والجاهزية التامة',
    topics: ['مراجعة شاملة لجميع المحاور', 'امتحان تجريبي شامل بدرجات', 'تصحيح تفصيلي وتقييم فردي', 'الجاهزية التامة للدرجة النهائية'],
    accent: '#34D399',
  },
];

export default function ChallengeTimeline() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -280, behavior: 'smooth' });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 280, behavior: 'smooth' });

  return (
    <section id="challenge" className="section-gap relative overflow-hidden bg-[#0B0D10]">
      <div className="section-container relative z-10">
        
        {/* Header */}
        <div className="reveal text-center mb-10 md:mb-20">
          <div className="badge-amber inline-flex mb-4">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>خطة الـ 30 يوم المكثفة</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-[46px] font-black text-white tracking-tight mb-4">
            خارطة الطريق <span className="text-amber-gradient">للتميز الإجمالي</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
            منهج مكثف في 4 أسابيع ينقل الطالب من الصفر وحتى الاحتراف الكامل.
          </p>
        </div>

        {/* Mobile Swipe Controls */}
        <SwipeControls onScrollLeft={scrollLeft} onScrollRight={scrollRight} />

        {/* Sprint Cards: Horizontal swipe on mobile, grid on md+ */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible gap-4 sm:gap-6"
        >
          {WEEKS.map((w, i) => (
            <div
              key={i}
              className="reveal card-glass p-6 sm:p-7 flex flex-col justify-between relative group text-right w-[82vw] max-w-[320px] sm:w-auto shrink-0 snap-center md:shrink"
            >
              <div>
                {/* Step Pill Header */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-bold text-slate-400 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                    {w.week}
                  </span>
                  <span className="text-2xl font-black text-white/20 group-hover:text-amber-400 transition-colors">
                    {w.step}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-4 leading-tight">
                  {w.title}
                </h3>

                <ul className="space-y-2.5 mb-6">
                  {w.topics.map((t, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-300/80 text-xs leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="h-1 w-full rounded-full opacity-40 group-hover:opacity-100 transition-opacity"
                style={{ background: w.accent }}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
