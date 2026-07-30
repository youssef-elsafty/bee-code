import type { Metadata } from 'next';
import StudentsTable from '@/components/admin/StudentsTable';

export const metadata: Metadata = {
  title: 'إدارة الطلاب | CodeAcademy Admin',
  robots: { index: false },
};

export default function StudentsPage() {
  return (
    <div className="space-y-5 md:space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-black text-white">إدارة الطلاب</h1>
        <p className="text-white/40 text-xs md:text-sm mt-1">عرض وتعديل جميع تسجيلات الطلاب</p>
      </div>
      <StudentsTable />
    </div>
  );
}
