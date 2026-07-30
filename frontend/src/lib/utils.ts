// ============================================================
// UTILITY FUNCTIONS
// ============================================================
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { RegistrationStatus, STATUS_LABELS } from '@/types';

// Tailwind class merge helper
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// Format date in Arabic locale
export function formatDate(dateStr: string, options?: Intl.DateTimeFormatOptions): string {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('ar-EG', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...options,
  }).format(date);
}

// Format time
export function formatTime(dateStr: string): string {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('ar-EG', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}

// Relative time (e.g., "منذ 5 دقائق")
export function timeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return 'منذ لحظات';
  if (diffMins < 60) return `منذ ${diffMins} دقيقة`;
  if (diffHours < 24) return `منذ ${diffHours} ساعة`;
  if (diffDays < 7) return `منذ ${diffDays} يوم`;
  return formatDate(dateStr);
}

// Status label helper
export function getStatusLabel(status: RegistrationStatus): string {
  return STATUS_LABELS[status] || status;
}

// Status CSS class
export function getStatusClass(status: RegistrationStatus): string {
  const map: Record<RegistrationStatus, string> = {
    paid:      'status-paid',
    pending:   'status-pending',
    cancelled: 'status-cancelled',
    completed: 'status-completed',
  };
  return map[status] || '';
}

// Download blob file
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Format phone number for display
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 11) {
    return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  return phone;
}

// WhatsApp link
export function whatsappLink(phone: string, message?: string): string {
  const cleaned = phone.replace(/\D/g, '');
  const number = cleaned.startsWith('0') ? `2${cleaned}` : cleaned;
  const url = `https://wa.me/${number}`;
  return message ? `${url}?text=${encodeURIComponent(message)}` : url;
}

// Truncate text
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return `${text.slice(0, length)}...`;
}

// Number with Arabic formatting
export function formatNumber(n: number): string {
  return new Intl.NumberFormat('ar-EG').format(n);
}

// Debounce
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

// Parse API error message
export function parseApiError(error: unknown): string {
  if (typeof error === 'object' && error !== null) {
    const e = error as Record<string, unknown>;
    if (e.response && typeof e.response === 'object') {
      const resp = e.response as Record<string, unknown>;
      if (resp.data && typeof resp.data === 'object') {
        const data = resp.data as Record<string, unknown>;
        if (data.detail) return String(data.detail);
        if (data.message) return String(data.message);
        // Extract first field error
        const firstKey = Object.keys(data)[0];
        if (firstKey) {
          const msg = data[firstKey];
          if (Array.isArray(msg)) return String(msg[0]);
          return String(msg);
        }
      }
    }
    if (e.message) return String(e.message);
  }
  return 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.';
}

// Generate seat percentage
export function seatPercentage(occupied: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((occupied / total) * 100);
}

// Clamp number
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

// Sleep
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
