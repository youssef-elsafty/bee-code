import type { Metadata } from 'next';
import NotificationPanel from '@/components/admin/NotificationPanel';

export const metadata: Metadata = {
  title: 'الإشعارات | CodeAcademy Admin',
  robots: { index: false },
};

export default function NotificationsPage() {
  return (
    <div className="space-y-5 md:space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-black text-white">الإشعارات</h1>
        <p className="text-white/40 text-xs md:text-sm mt-1">جميع إشعارات النظام والتسجيلات الجديدة</p>
      </div>
      <div className="glass-dark rounded-2xl p-4 md:p-6 max-w-2xl">
        <NotificationPanel />
      </div>
    </div>
  );
}
