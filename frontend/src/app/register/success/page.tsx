'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Calendar,
  User,
  Phone,
  MessageCircle,
  Home,
  Sparkles,
  ShieldCheck,
  Clock,
  ExternalLink,
} from 'lucide-react';
import AuroraBackground from '@/components/common/AuroraBackground';

const WHATSAPP_GROUP_URL = 'https://chat.whatsapp.com/LYzxCLQzAn79vvmQpAxZ1x?mode=gi_t';

interface ConfirmationData {
  name?: string;
  schedule?: string;
  phone?: string;
  whatsapp?: string;
}

export default function RegistrationSuccessPage() {
  const [data, setData] = useState<ConfirmationData | null>(null);
  const [refCode, setRefCode] = useState<string>('REF-202688');
  const [countdown, setCountdown] = useState<number>(4);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const raw = sessionStorage.getItem('registration_confirmation');
        if (raw) {
          setData(JSON.parse(raw));
        }
        setRefCode(`REF-${Math.floor(100000 + Math.random() * 900000)}`);
      } catch (e) {
        console.error('Failed to parse confirmation data', e);
      }
    }
  }, []);

  // Automatic countdown redirect to WhatsApp Group
  useEffect(() => {
    if (countdown <= 0) {
      if (typeof window !== 'undefined') {
        window.location.href = WHATSAPP_GROUP_URL;
      }
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const studentName = data?.name || 'الطالب العزيز';
  const scheduleText = data?.schedule || 'الموعد المحدد في الاستمارة';
  const phoneText = data?.phone || data?.whatsapp || 'رقم الهاتف المسجل';

  const directWhatsappLink = `https://wa.me/201050399949?text=${encodeURIComponent(
    `أهلاً، لقد قمت بالتسجيل باسم (${studentName}) وأود تأكيد الحجز للموعد: (${scheduleText}).`
  )}`;

  return (
    <div className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden bg-[#0B0D10]">
      <AuroraBackground intensity="low" />

      <div className="relative z-10 w-full max-w-2xl mx-auto">
        {/* Main Glass Card */}
        <div className="card-glass p-8 sm:p-12 text-center relative overflow-hidden border border-amber-500/30 shadow-2xl shadow-amber-950/40 rounded-3xl">
          {/* Top Ambient Glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Animated Success Badge */}
          <div className="relative mb-8 inline-flex items-center justify-center">
            <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl animate-pulse" />
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-xl shadow-emerald-950/50 border border-emerald-400/40 relative z-10 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <CheckCircle2 className="w-12 h-12 text-white animate-bounce-slow" />
            </div>
          </div>

          {/* Header Tag */}
          <div className="badge-amber inline-flex mb-4 px-4 py-1.5 text-xs sm:text-sm font-bold">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>تم تأكيد تقديم طلب الحجز</span>
          </div>

          {/* Title & Subtitle */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
            مبروك يا <span className="text-amber-gradient">{studentName}</span>! 🎉
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-lg mx-auto leading-relaxed mb-6">
            تم تسجيل طلبك بنجاح في أكاديمية <strong className="text-amber-400">Bee Code</strong>. حجزت مقعدك المبدئي معنا وفي انتظار انضمامك!
          </p>

          {/* Automatic Redirect Countdown Banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-200 text-sm font-bold mb-8 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl shadow-emerald-950/40 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping flex-shrink-0" />
              <MessageCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span className="text-right">جاري توجيهك تلقائياً لجروب <strong>Bee Code</strong> على الواتساب...</span>
            </div>
            <span className="px-3.5 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 font-mono text-xs border border-emerald-400/30 whitespace-nowrap flex-shrink-0">
              خلال {countdown} ثوانٍ ⏱️
            </span>
          </div>

          {/* Structured Confirmation Ticket Box */}
          <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 mb-8 text-right space-y-4 backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-500" />

            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <span className="text-xs text-amber-400 font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                تأكيد حجز المقعد
              </span>
              <span className="text-xs text-slate-400 font-mono" dir="ltr" suppressHydrationWarning>
                {refCode}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm pt-1">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xs text-slate-400">اسم الطالب</span>
                  <span className="font-bold text-white">{studentName}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xs text-slate-400">الموعد المختار</span>
                  <span className="font-bold text-amber-300">{scheduleText}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xs text-slate-400">رقم التواصل</span>
                  <span className="font-bold text-white" dir="ltr">{phoneText}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xs text-slate-400">حالة الطلب</span>
                  <span className="font-bold text-emerald-400">مقبول — جاري التواصل</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Notice */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs sm:text-sm font-semibold mb-8 flex items-center justify-center gap-2">
            <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>سيتواصل معك فريق التسجيل خلال 24 ساعة لاستكمال تأكيد المقعد والدفع.</span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={WHATSAPP_GROUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-decoration-none"
            >
              <button className="btn-amber w-full sm:w-auto px-8 py-4 text-base font-bold flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25">
                <MessageCircle className="w-5 h-5 text-slate-950" />
                <span>الانضمام لجروب الواتساب الآن 🚀</span>
                <ExternalLink className="w-4 h-4 text-slate-950" />
              </button>
            </a>

            <Link href="/" className="w-full sm:w-auto text-decoration-none">
              <button className="w-full sm:w-auto px-8 py-4 text-base font-bold rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 flex items-center justify-center gap-2 transition-all">
                <Home className="w-5 h-5 text-slate-300" />
                <span>العودة للرئيسية</span>
              </button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
