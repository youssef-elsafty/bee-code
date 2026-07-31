'use client';

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  User, Users, Phone, Mail, School, MapPin, Clock, CheckCircle2, Loader2, AlertCircle,
} from 'lucide-react';
import { registrationSchema, RegistrationFormValues } from '@/lib/validations';
import { publicEndpoints } from '@/lib/api';
import { GOVERNORATES, Schedule } from '@/types';
import SuccessAnimation from '@/components/common/SuccessAnimation';
import { useAvailableSchedules, reserveSeatLocally } from '@/hooks/useSchedules';
import { saveLocalRegistration } from '@/lib/registrationsStore';

import { useRouter } from 'next/navigation';

const GRADES = ['مسار الهندسة وعلوم الحاسب — بكالوريا مصرية'];

interface FieldWrapperProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

function FieldWrapper({ label, error, required, children, icon }: FieldWrapperProps) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-white/80">
        {icon && <span className="inline-flex items-center gap-1.5">{icon}{label}</span>}
        {!icon && label}
        {required && <span className="text-amber-400 mr-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-rose-400 text-xs flex items-center gap-1.5 mt-1">
          <AlertCircle size={12} />
          {error}
        </p>
      )}
    </div>
  );
}

export default function RegistrationForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedName, setSubmittedName] = useState('');
  const [submittedSchedule, setSubmittedSchedule] = useState('');
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    const handleBookingNotice = () => {
      setShowNotice(true);
    };

    window.addEventListener('require-booking-notice', handleBookingNotice);
    return () => window.removeEventListener('require-booking-notice', handleBookingNotice);
  }, []);

  const { data: schedules = [], isLoading: schedulesLoading } = useAvailableSchedules();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    mode: 'onChange',
    defaultValues: {
      grade: GRADES[0],
      governorate: 'القليوبية',
      school: '',
      agreement: false,
    },
  });

  // Robust filtering: handles SAT/TUE/SAT_TUE and SUN/WED/SUN_WED from backend
  const getDayString = (s: Schedule) => (s.day_of_week || s.day || '').toString().toUpperCase();

  const filteredSchedules = selectedDay
    ? schedules.filter((s: Schedule) => {
        const day = getDayString(s);
        if (selectedDay === 'SAT_TUE') {
          return day.includes('SAT') || day.includes('TUE');
        }
        if (selectedDay === 'SUN_WED') {
          return day.includes('SUN') || day.includes('WED');
        }
        return day === selectedDay;
      })
    : [];

  // Count occupied seats per day group
  const satTueOccupied = schedules
    .filter((s: Schedule) => {
      const d = getDayString(s);
      return d.includes('SAT') || d.includes('TUE');
    })
    .reduce((acc: number, s: Schedule) => acc + (s.occupied_seats ?? 0), 0);

  const sunWedOccupied = schedules
    .filter((s: Schedule) => {
      const d = getDayString(s);
      return d.includes('SUN') || d.includes('WED');
    })
    .reduce((acc: number, s: Schedule) => acc + (s.occupied_seats ?? 0), 0);

  const registerMutation = useMutation({
    mutationFn: async (data: RegistrationFormValues) => {
      const schedule = schedules.find((s: Schedule) => s.id === data.schedule_id);
      const scheduleLabel = schedule ? `${schedule.day_display} — ${schedule.time_display}` : '';
      
      const payload = { 
        ...data, 
        email: data.email || undefined,
        schedule_display: scheduleLabel,
      };

      // Save to local storage for instant sync/notifications in dashboard
      saveLocalRegistration(payload);

      // Structure data correctly for Django REST backend API
      const backendPayload = {
        student: {
          full_name: data.full_name,
          parent_name: data.parent_name,
          phone: data.phone,
          whatsapp: data.whatsapp,
          email: data.email || undefined,
          school: data.school,
          governorate: data.governorate,
          grade: data.grade,
        },
        schedule_id: data.schedule_id
      };

      try {
        fetch('/api/notify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }).catch(() => {});
      } catch {
        // ignore
      }

      try {
        const res = await publicEndpoints.register(backendPayload);
        return res;
      } catch (err: any) {
        console.error('API Register Error:', err);
        throw err;
      }
    },
    onSuccess: (_, variables) => {
      // Instantly reserve/deduct 1 seat locally and update query cache
      reserveSeatLocally(variables.schedule_id);
      queryClient.invalidateQueries({ queryKey: ['schedules', 'available'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'schedules'] });

      const schedule = schedules.find((s: Schedule) => s.id === variables.schedule_id);
      const scheduleLabel = schedule ? `${schedule.day_display} — ${schedule.time_display}` : 'الموعد المختار';
      
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(
          'registration_confirmation',
          JSON.stringify({
            name: variables.full_name,
            schedule: scheduleLabel,
            phone: variables.phone,
            whatsapp: variables.whatsapp,
          })
        );
      }

      toast.success('تم تسليم طلب الحجز بنجاح!');
      router.push('/register/success');
    },
    onError: (err: any) => {
      console.error('Registration error details:', err.response?.data);
      const data = err.response?.data;
      let errorMsg = 'فشل التسجيل. يرجى مراجعة البيانات والمحاولة مرة أخرى.';
      
      if (data) {
        if (typeof data === 'string') {
          errorMsg = data;
        } else if (data.student) {
          // Extract nested student validation messages
          const studentErrs = data.student;
          const firstKey = Object.keys(studentErrs)[0];
          if (firstKey && Array.isArray(studentErrs[firstKey])) {
            errorMsg = `${firstKey}: ${studentErrs[firstKey][0]}`;
          }
        } else if (data.non_field_errors && Array.isArray(data.non_field_errors)) {
          errorMsg = data.non_field_errors[0];
        } else if (data.detail) {
          errorMsg = data.detail;
        }
      }
      toast.error(errorMsg);
    },
  });

  const onSubmit = (data: RegistrationFormValues) => {
    registerMutation.mutate(data);
  };

  if (isSuccess) {
    return (
      <div className="card-glass p-8 max-w-2xl mx-auto my-12" style={{ borderRadius: '28px' }}>
        <SuccessAnimation studentName={submittedName} scheduleLabel={submittedSchedule} />
      </div>
    );
  }

  return (
    <section id="register" className="section-gap relative overflow-hidden bg-[#0B0D10]">
      <div className="section-container relative z-10">
        {/* Header */}
        <div className="reveal text-center mb-12">
          <div className="badge-amber inline-flex mb-4">
            <span>🐝</span>
            <span>التسجيل الآن</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            احجز مكانك{' '}
            <span className="text-amber-gradient">قبل ما ينتهي</span>
          </h2>
          <p className="text-white/55 text-lg max-w-xl mx-auto leading-relaxed">
            احجز الآن وسيتواصل معك فريقنا خلال 24 ساعة
          </p>
        </div>

        {/* Form Card */}
        <div className="reveal max-w-2xl mx-auto">
          <div className="card-glass p-5 sm:p-10 border border-amber-500/20 shadow-2xl relative overflow-hidden">
            
            {/* WhatsApp Booking Notice Banner */}
            {showNotice && (
              <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-amber-950/40 border border-amber-500/40 backdrop-blur-xl text-right shadow-[0_8px_30px_rgba(245,158,11,0.25)] flex items-start gap-3.5 animate-bounce-short">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 text-amber-400 font-bold text-lg shadow-sm">
                  ⚠️
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-black text-amber-300 flex items-center gap-2">
                    برجاء إتمام الحجز أولاً 🐝
                  </h4>
                  <p className="text-xs text-slate-200 mt-1 leading-relaxed font-semibold">
                    للحصول على رابط جروب الواتساب والتواصل المباشر مع المدرب، يرجى ملء بيانات الحجز أدناه وسنقوم بتوجيهك تلقائياً لجروب الواتساب!
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4 sm:space-y-5">
              {/* Student Name */}
              <FieldWrapper label="اسم الطالب" error={errors.full_name?.message} required icon={<User size={14} className="text-amber-400" />}>
                <input
                  {...register('full_name')}
                  placeholder="الاسم الرباعي للطالب"
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-base sm:text-sm font-cairo"
                />
              </FieldWrapper>

              {/* Parent Name */}
              <FieldWrapper label="اسم ولي الأمر" error={errors.parent_name?.message} required icon={<Users size={14} className="text-amber-400" />}>
                <input
                  {...register('parent_name')}
                  placeholder="اسم الأب أو الأم"
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-900/60 border border-white/10 text-white placeholder-slate-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-sm font-cairo"
                />
              </FieldWrapper>

              {/* Phone + WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FieldWrapper label="رقم الهاتف" error={errors.phone?.message} required icon={<Phone size={14} className="text-amber-400" />}>
                  <input
                    {...register('phone')}
                    placeholder="01XXXXXXXXX"
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-900/60 border border-white/10 text-white placeholder-slate-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-sm font-cairo"
                    dir="ltr"
                    type="tel"
                    inputMode="numeric"
                  />
                </FieldWrapper>

                <FieldWrapper label="رقم الواتساب" error={errors.whatsapp?.message} required icon={<Phone size={14} className="text-emerald-400" />}>
                  <input
                    {...register('whatsapp')}
                    placeholder="01XXXXXXXXX"
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-900/60 border border-white/10 text-white placeholder-slate-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-sm font-cairo"
                    dir="ltr"
                    type="tel"
                    inputMode="numeric"
                  />
                </FieldWrapper>
              </div>

              {/* Email */}
              <FieldWrapper label="البريد الإلكتروني" error={errors.email?.message} icon={<Mail size={14} className="text-amber-400" />}>
                <input
                  {...register('email')}
                  placeholder="اختياري"
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-900/60 border border-white/10 text-white placeholder-slate-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-sm font-cairo"
                  dir="ltr"
                  type="email"
                />
              </FieldWrapper>

              {/* School */}
              <FieldWrapper label="المدرسة (اختياري)" error={errors.school?.message} icon={<School size={14} className="text-amber-400" />}>
                <input
                  {...register('school')}
                  placeholder="اسم المدرسة (اختياري)"
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-900/60 border border-white/10 text-white placeholder-slate-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-sm font-cairo"
                />
              </FieldWrapper>

              {/* Governorate */}
              <FieldWrapper label="المحافظة (اختياري)" error={errors.governorate?.message} icon={<MapPin size={14} className="text-amber-400" />}>
                <Controller
                  name="governorate"
                  control={control}
                  render={({ field }) => (
                    <select {...field} className="w-full px-4 py-3.5 rounded-xl bg-slate-900/60 border border-white/10 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-sm font-cairo">
                      <option value="" className="bg-slate-900 text-slate-300">اختر المحافظة</option>
                      {GOVERNORATES.map((gov) => (
                        <option key={gov} value={gov} className="bg-slate-900 text-white">{gov}</option>
                      ))}
                    </select>
                  )}
                />
              </FieldWrapper>

              {/* ── Step 1: Day Group ── */}
              <div>
                <p className="text-sm font-bold text-white/70 mb-3 flex items-center gap-2">
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 22, height: 22, borderRadius: '50%',
                    background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)',
                    fontSize: '0.7rem', fontWeight: 900, color: '#F59E0B',
                  }}>١</span>
                  اختر مجموعتك
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { key: 'SAT_TUE', label: 'السبت والثلاثاء', days: ['سبت', 'ثلاثاء'], occupied: satTueOccupied },
                    { key: 'SUN_WED', label: 'الأحد والأربعاء', days: ['أحد', 'أربعاء'], occupied: sunWedOccupied },
                  ].map((group) => {
                    const isSelected = selectedDay === group.key;
                    const noSeats = group.occupied >= 30 && !schedulesLoading;
                    return (
                      <button
                        key={group.key}
                        type="button"
                        disabled={noSeats}
                        onClick={() => {
                          setSelectedDay(group.key);
                          setValue('schedule_id', 0 as unknown as number);
                        }}
                        style={{
                          padding: '1rem',
                          borderRadius: 16,
                          border: isSelected
                            ? '2px solid rgba(245,158,11,0.7)'
                            : '1px solid rgba(255,255,255,0.08)',
                          background: isSelected
                            ? 'rgba(245,158,11,0.12)'
                            : 'rgba(255,255,255,0.03)',
                          cursor: noSeats ? 'not-allowed' : 'pointer',
                          opacity: noSeats ? 0.45 : 1,
                          transition: 'all 0.2s',
                          textAlign: 'center',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '0.5rem',
                          width: '100%',
                        }}
                      >
                        <span style={{ fontSize: '1.5rem' }}>📅</span>
                        <span style={{
                          fontSize: '0.9rem',
                          fontWeight: 800,
                          color: isSelected ? '#FCD34D' : '#E5E7EB',
                          lineHeight: 1.2,
                        }}>{group.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ── Step 2: Time Slot ── */}
              {selectedDay && (
                <div>
                  <p className="text-sm font-bold text-white/70 mb-3 flex items-center gap-2">
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      width: 22, height: 22, borderRadius: '50%',
                      background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)',
                      fontSize: '0.7rem', fontWeight: 900, color: '#F59E0B',
                    }}>٢</span>
                    اختر الوقت المناسب
                    {errors.schedule_id && (
                      <span style={{ color: '#F87171', fontSize: '0.7rem', fontWeight: 600 }}>
                        (مطلوب)
                      </span>
                    )}
                  </p>

                  <Controller
                    name="schedule_id"
                    control={control}
                    render={({ field }) => (
                      <div>
                        {schedulesLoading ? (
                          <div className="flex items-center gap-2 text-slate-400 text-sm py-4 justify-center">
                            <Loader2 size={16} className="animate-spin" />
                            جاري تحميل المواعيد...
                          </div>
                        ) : filteredSchedules.length === 0 ? (
                          <div style={{
                            padding: '1rem', borderRadius: 12,
                            background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
                            color: '#FCA5A5', fontSize: '0.875rem', textAlign: 'center',
                          }}>
                            لا توجد مواعيد متاحة حالياً لهذه المجموعة
                          </div>
                        ) : (
                          <div className="grid grid-cols-3 gap-3">
                            {filteredSchedules.map((schedule: Schedule) => {
                              const isSelected = field.value === schedule.id;
                              const isFull = schedule.is_full;
                              return (
                                <button
                                  key={schedule.id}
                                  type="button"
                                  disabled={isFull}
                                  onClick={() => !isFull && field.onChange(schedule.id)}
                                  style={{
                                    padding: '0.875rem 0.5rem',
                                    borderRadius: 14,
                                    border: isSelected
                                      ? '2px solid rgba(245,158,11,0.8)'
                                      : isFull
                                      ? '1px solid rgba(255,255,255,0.05)'
                                      : '1px solid rgba(255,255,255,0.1)',
                                    background: isSelected
                                      ? 'rgba(245,158,11,0.15)'
                                      : isFull
                                      ? 'rgba(255,255,255,0.02)'
                                      : 'rgba(255,255,255,0.04)',
                                    cursor: isFull ? 'not-allowed' : 'pointer',
                                    opacity: isFull ? 0.4 : 1,
                                    transition: 'all 0.2s',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '0.35rem',
                                    width: '100%',
                                    position: 'relative',
                                  }}
                                >
                                  {/* Time */}
                                  <span style={{
                                    fontSize: '1.1rem',
                                    fontWeight: 900,
                                    color: isSelected ? '#FCD34D' : '#F5F5F0',
                                    letterSpacing: '-0.02em',
                                    direction: 'ltr',
                                  }}>
                                    {schedule.time_display}
                                  </span>

                                  {/* Selected tick */}
                                  {isSelected && (
                                    <span style={{
                                      position: 'absolute', top: 6, right: 8,
                                      width: 16, height: 16,
                                      borderRadius: '50%',
                                      background: '#F59E0B',
                                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}>
                                      <CheckCircle2 size={10} color="#0B0D10" />
                                    </span>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}
                  />
                </div>
              )}

              {/* Agreement */}
              <FieldWrapper label="" error={errors.agreement?.message}>
                <Controller
                  name="agreement"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="mt-1 rounded border-white/20 bg-slate-900 text-amber-500 focus:ring-amber-500"
                      />
                      <span className="text-slate-300 text-xs leading-relaxed">
                        أوافق على التواصل معي لتأكيد الحجز وإرسال تفاصيل الكورس
                      </span>
                    </label>
                  )}
                />
              </FieldWrapper>

              {/* Submit */}
              <button
                type="submit"
                disabled={registerMutation.isPending}
                className="btn-amber w-full justify-center text-lg py-4 mt-2 font-bold flex items-center gap-2"
              >
                {registerMutation.isPending ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    جاري التسجيل...
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={20} />
                    احجز مكانك الآن 🐝
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
