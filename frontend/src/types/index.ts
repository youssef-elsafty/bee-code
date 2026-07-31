// ============================================================
// TYPESCRIPT TYPES — Egyptian Programming Academy
// ============================================================

// ── Auth ─────────────────────────────────────────────────────
export type UserRole = 'superadmin' | 'admin' | 'staff';

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  role: UserRole;
  first_name: string;
  last_name: string;
  is_active: boolean;
  date_joined: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

// ── Schedules ─────────────────────────────────────────────────
export type DayOfWeek = 'SAT' | 'TUE' | 'SUN' | 'WED' | 'SAT_TUE' | 'SUN_WED';
export type TimeSlot = 15 | 16 | 17;
export type RegistrationStatus = 'pending' | 'paid' | 'cancelled' | 'completed';

export interface Schedule {
  id: number;
  day_of_week: DayOfWeek;
  day?: string;
  day_display: string;
  time_slot: TimeSlot;
  time_display: string;
  total_seats: number;
  occupied_seats: number;
  available_seats: number;
  is_active: boolean;
  is_full: boolean;
  created_at: string;
  updated_at: string;
}

// ── Students ─────────────────────────────────────────────────
export interface Student {
  id: number;
  full_name: string;
  parent_name: string;
  phone: string;
  whatsapp: string;
  email: string;
  school: string;
  governorate: string;
  grade: string;
  created_at: string;
}

// ── Registrations ─────────────────────────────────────────────
export interface Registration {
  id: number;
  student: Student;
  schedule: Schedule;
  status: RegistrationStatus;
  notes: string;
  registered_at: string;
  updated_at: string;
}

export interface RegistrationWithDetails extends Registration {
  student: Student;
  schedule: Schedule;
}

// ── Public Registration Form ──────────────────────────────────
export interface RegistrationFormData {
  full_name: string;
  parent_name: string;
  phone: string;
  whatsapp: string;
  email?: string;
  school: string;
  governorate: string;
  grade: string;
  schedule_id: number;
  agreement: boolean;
}

// ── Notifications ─────────────────────────────────────────────
export type NotificationType = 'info' | 'success' | 'warning' | 'error' | 'registration';

export interface Notification {
  id: number;
  title: string;
  message: string;
  type: NotificationType;
  is_read: boolean;
  created_at: string;
  metadata?: Record<string, unknown>;
}

// ── Dashboard Stats ───────────────────────────────────────────
export interface DashboardStats {
  total_students: number;
  today_registrations: number;
  total_occupied_seats: number;
  total_available_seats: number;
  total_schedules: number;
  paid_count: number;
  pending_count: number;
  cancelled_count: number;
  completed_count: number;
  registrations_by_day: RegistrationByDay[];
  registrations_by_schedule: RegistrationBySchedule[];
  recent_registrations: Registration[];
}

export interface RegistrationByDay {
  date: string;
  count: number;
}

export interface RegistrationBySchedule {
  schedule_label: string;
  count: number;
  available: number;
}

// ── Audit Log ─────────────────────────────────────────────────
export interface AuditLog {
  id: number;
  action: string;
  model_name: string;
  object_id: string;
  user: string;
  timestamp: string;
  data_before?: Record<string, unknown>;
  data_after?: Record<string, unknown>;
}

// ── API Response Wrappers ─────────────────────────────────────
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface ApiError {
  detail?: string;
  message?: string;
  [key: string]: unknown;
}

// ── UI State ─────────────────────────────────────────────────
export interface TableFilters {
  search?: string;
  status?: RegistrationStatus | '';
  schedule_id?: number | '';
  page?: number;
  page_size?: number;
  ordering?: string;
}

export interface ToastOptions {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}

// ── Egyptian Governorates ─────────────────────────────────────
export const GOVERNORATES = [
  'القاهرة', 'الجيزة', 'الإسكندرية', 'الدقهلية', 'البحر الأحمر',
  'البحيرة', 'الفيوم', 'الغربية', 'الإسماعيلية', 'المنوفية',
  'المنيا', 'القليوبية', 'الوادي الجديد', 'السويس', 'أسوان',
  'أسيوط', 'بني سويف', 'بورسعيد', 'دمياط', 'الشرقية',
  'جنوب سيناء', 'كفر الشيخ', 'مطروح', 'الأقصر', 'قنا',
  'شمال سيناء', 'سوهاج',
] as const;

export type Governorate = typeof GOVERNORATES[number];

// ── Day / Time Labels ─────────────────────────────────────────
export const DAY_LABELS: Record<DayOfWeek, string> = {
  SAT: 'السبت',
  TUE: 'الثلاثاء',
  SUN: 'الأحد',
  WED: 'الأربعاء',
  SAT_TUE: 'السبت والثلاثاء',
  SUN_WED: 'الأحد والأربعاء',
};

export const TIME_LABELS: Record<TimeSlot, string> = {
  15: '3:00 مساءً',
  16: '4:00 مساءً',
  17: '5:00 مساءً',
};

export const STATUS_LABELS: Record<RegistrationStatus, string> = {
  pending:   'قيد الانتظار',
  paid:      'مدفوع',
  cancelled: 'ملغي',
  completed: 'مكتمل',
};
