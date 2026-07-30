'use client';

import { ArrowLeft, MessageCircle, Phone, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function ContactSection() {
  const phone = '01050399949';

  return (
    <section id="contact" className="section-gap relative overflow-hidden bg-[#0B0D10]">
      <div className="section-container relative z-10">
        
        {/* Massive Centered CTA Box */}
        <div className="reveal card-glass p-10 sm:p-16 lg:p-20 text-center max-w-4xl mx-auto relative overflow-hidden border border-amber-500/30 shadow-2xl shadow-amber-950/40">
          {/* Background Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 via-amber-600/5 to-amber-500/10 pointer-events-none" />
          
          <div className="relative z-10 space-y-6">
            <div className="badge-amber inline-flex">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>الأماكن محدودة جداً</span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.15]">
              جاهز تضمن تفوقك في <br className="hidden sm:inline" />
              <span className="text-amber-gradient">مادة البرمجة؟</span>
            </h2>

            <p className="text-slate-300/85 text-lg sm:text-xl max-w-xl mx-auto leading-relaxed">
              احجز مقعدك الآن وسيتواصل معك فريق التسجيل خلال 24 ساعة لاستكمال الخطوات.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/register" className="w-full sm:w-auto">
                <button className="btn-amber w-full sm:w-auto text-lg px-10 py-4 font-bold flex items-center justify-center gap-2">
                  <span>احجز مكانك الآن 🐝</span>
                  <ArrowLeft className="w-5 h-5 rtl:rotate-180" />
                </button>
              </Link>

              <a
                href={`https://wa.me/2${phone}?text=أهلاً، أريد الاستفسار عن تفاصيل كورس البرمجة`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-lg px-8 py-4 font-bold rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-5 h-5 text-emerald-400" />
                <span>واتساب مباشر</span>
              </a>
            </div>

            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-semibold">
              <a href={`tel:${phone}`} className="flex items-center gap-1.5 hover:text-amber-400 transition-colors" dir="ltr">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>{phone}</span>
              </a>
              <span>•</span>
              <span>السبت والثلثاء أو الأحد والأربعاء (3م / 4م / 5م)</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
