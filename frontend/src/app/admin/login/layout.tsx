import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'لوحة التحكم | CodeAcademy Admin',
  robots: { index: false },
};

export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  // Login page uses root layout (no sidebar), just return children
  return <>{children}</>;
}
