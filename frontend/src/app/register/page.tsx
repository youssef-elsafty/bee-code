import type { Metadata } from 'next';
import RegistrationForm from '@/components/sections/RegistrationForm';
import AuroraBackground from '@/components/common/AuroraBackground';

export const metadata: Metadata = {
  title: 'سجل الآن | أكاديمية البرمجة المصرية',
  description: 'سجل ابنك في كورس البرمجة للبكالوريا المصرية — مسار الهندسة وعلوم الحاسب. المقاعد محدودة.',
  openGraph: {
    title: 'سجل الآن | أكاديمية البرمجة المصرية',
    description: 'احجز مكانك في كورس البرمجة قبل اكتمال المقاعد',
    type: 'website',
  },
};

export default function RegisterPage() {
  return (
    <div className="relative min-h-screen">
      <AuroraBackground intensity="low" />
      <div className="relative z-10 pt-16">
        <RegistrationForm />
      </div>
    </div>
  );
}
