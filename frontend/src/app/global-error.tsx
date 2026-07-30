'use client';

import { useEffect } from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global Error:', error);
  }, [error]);

  return (
    <html lang="ar" dir="rtl">
      <body className="bg-[#0B0D10] text-white flex flex-col items-center justify-center min-h-screen p-6 text-center font-sans">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-6">
          <AlertTriangle className="w-8 h-8 text-amber-400" />
        </div>
        <h2 className="text-2xl font-bold mb-2">حدث خطأ في النظام</h2>
        <p className="text-slate-400 text-sm max-w-md mb-6">
          يرجى الضغط على الزر أدناه لإعادة تحميل التطبيق.
        </p>
        <button
          onClick={() => reset()}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '0.75rem',
            background: 'linear-gradient(135deg, #FCD34D, #F59E0B)',
            color: '#0B0D10',
            fontWeight: 800,
            border: 'none',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <RefreshCw size={16} />
          تحديث الصفحة
        </button>
      </body>
    </html>
  );
}
