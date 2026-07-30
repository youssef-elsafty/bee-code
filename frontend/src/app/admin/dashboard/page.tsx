import type { Metadata } from 'next';
import StatsCards from '@/components/admin/StatsCards';
import RegistrationsChart from '@/components/admin/RegistrationsChart';
import NotificationPanel from '@/components/admin/NotificationPanel';

export const metadata: Metadata = {
  title: 'لوحة التحكم | CodeAcademy Admin',
  robots: { index: false },
};

export default function DashboardPage() {
  return (
    <div className="space-y-5 md:space-y-8">
      {/* Page title */}
      <div>
        <h1 className="text-xl md:text-2xl font-black text-white">لوحة التحكم</h1>
        <p className="text-white/40 text-xs md:text-sm mt-1">نظرة عامة على أداء الأكاديمية</p>
      </div>

      {/* Stats cards */}
      <StatsCards />

      {/* Charts + Notifications */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
        <div className="xl:col-span-2">
          <RegistrationsChart />
        </div>
        <div className="glass-dark rounded-2xl p-4 md:p-5">
          <NotificationPanel />
        </div>
      </div>
    </div>
  );
}
