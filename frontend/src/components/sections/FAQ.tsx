'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    q: 'من يحق له الالتحاق بالكورس؟',
    a: 'الكورس مخصص لطلاب مسار الهندسة وعلوم الحاسب بالبكالوريا المصرية. نبدأ من الأساسيات دون اشتراط خبرة برمجية.',
  },
  {
    q: 'كم عدد الحصص والمواعيد المتاحة؟',
    a: 'المواعيد المتاحة: (السبت والثلاثاء) أو (الأحد والأربعاء) بمواعيد 3:00 مساءً، 4:00 مساءً، أو 5:00 مساءً.',
  },
  {
    q: 'كيف تضمن الأكاديمية متابعة ولي الأمر؟',
    a: 'نرسل تقارير أسبوعية دورية تتضمن مستوى الحضور، الأداء في التطبيقات العملية، ونسب الإنجاز الدراسية.',
  },
  {
    q: 'ماذا يحدث في حال غياب الطالب عن إحدى الحصص؟',
    a: 'يتم إتاحة التسجيل الكامل للحصة وملخص التطبيقات لضمان عدم تفويت أي جزئية دراسية.',
  },
  {
    q: 'كيف يتم حجز وتأكيد المقعد الدراسي؟',
    a: 'بعد استكمال نموذج الحجز الإلكتروني، يتواصل فريق التسجيل خلال 24 ساعة لتأكيد الموعد والتفاصيل النهائية.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-gap relative overflow-hidden bg-[#0B0D10]">
      <div className="section-container relative z-10 max-w-3xl">
        
        {/* Header */}
        <div className="reveal text-center mb-16">
          <div className="badge-amber inline-flex mb-4">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>الأسئلة الشائعة</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-[46px] font-black text-white tracking-tight mb-4">
            إجابات <span className="text-amber-gradient">واضحة ودقيقة</span>
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div key={i} className="reveal card-glass overflow-hidden transition-all duration-300">
              <button
                className="w-full flex items-center justify-between p-6 text-right"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="text-base font-bold text-white">
                  {faq.q}
                </span>
                <div
                  className="p-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 transition-transform duration-300"
                  style={{ transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {openIndex === i && (
                <div className="px-6 pb-6 pt-2 text-slate-300/80 text-sm leading-relaxed border-t border-white/5">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
