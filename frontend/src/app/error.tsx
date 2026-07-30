'use client';

import { useEffect } from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0B0D10] text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-6">
        <AlertTriangle className="w-8 h-8 text-amber-400" />
      </div>
      <h2 className="text-2xl font-bold mb-2">حدث خطأ غير متوقع</h2>
      <p className="text-slate-400 text-sm max-w-md mb-6">
        حدث خطأ أثناء تحميل الصفحة. يمكنك المحاولة مرة أخرى أو تحديث الصفحة.
      </p>
      <button
        onClick={() => reset()}
        className="btn-amber px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2"
      >
        <RefreshCw size={16} />
        إعادة التحميل
      </button>
    </div>
  );
}
