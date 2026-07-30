import type { Metadata } from 'next';
import ScheduleManager from '@/components/admin/ScheduleManager';

export const metadata: Metadata = {
  title: 'إدارة المواعيد | CodeAcademy Admin',
  robots: { index: false },
};

export default function SchedulePage() {
  return (
    <div className="space-y-5 md:space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-black text-white">إدارة المواعيد</h1>
        <p className="text-white/40 text-xs md:text-sm mt-1">إنشاء وتعديل مواعيد الكورس والمقاعد</p>
      </div>
      <ScheduleManager />
    </div>
  );
}
