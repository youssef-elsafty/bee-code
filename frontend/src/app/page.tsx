import type { Metadata } from 'next';
import HomeClient from '@/components/HomeClient';

export const metadata: Metadata = {
  title: 'Bee Code 🐝 | أكاديمية البرمجة للبكالوريا المصرية',
  description: 'Bee Code — أكاديمية برمجة متميزة لطلاب البكالوريا المصرية (الهندسة وعلوم الحاسب). تأسيس عملي يضمن التفوق والنجاح.',
  keywords: ['Bee Code', 'بكالوريا مصرية', 'برمجة', 'بايثون', 'هندسة', 'علوم الحاسب'],
  openGraph: {
    title: 'Bee Code | أكاديمية البرمجة',
    description: 'تأسيس برمجي شامل لطلاب البكالوريا المصرية. احجز مكانك الآن 🐝',
    type: 'website',
    locale: 'ar_EG',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bee Code | أكاديمية البرمجة',
    description: 'تأسيس برمجي شامل لطلاب البكالوريا المصرية. احجز مكانك الآن 🐝',
  },
};

export default function Home() {
  return <HomeClient />;
}
