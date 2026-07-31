import { Registration, RegistrationStatus, DashboardStats, Notification } from '@/types';

const REGISTRATIONS_KEY = 'codeacademy_registrations';
const NOTIFICATIONS_KEY = 'codeacademy_notifications';

const DEFAULT_REGISTRATIONS: Registration[] = [
  {
    id: 1,
    student: {
      id: 1,
      full_name: 'أحمد محمود علي',
      parent_name: 'محمود علي',
      phone: '01012345678',
      whatsapp: '01012345678',
      email: 'ahmed@example.com',
      school: 'مدرسة التفوق الثانوية',
      governorate: 'القاهرة',
      grade: 'مسار الهندسة وعلوم الحاسب — بكالوريا مصرية',
      created_at: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
    },
    schedule: {
      id: 1,
      day_of_week: 'SAT_TUE',
      day_display: 'السبت والثلاثاء',
      time_slot: 15,
      time_display: '3:00 مساءً',
      total_seats: 25,
      occupied_seats: 12,
      available_seats: 13,
      is_active: true,
      is_full: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    status: 'paid',
    notes: 'حجز مؤكد',
    registered_at: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
  },
  {
    id: 2,
    student: {
      id: 2,
      full_name: 'سارة محمد حسان',
      parent_name: 'محمد حسان',
      phone: '01198765432',
      whatsapp: '01198765432',
      email: 'sara@example.com',
      school: 'مدرسة الأورمان لغات',
      governorate: 'الجيزة',
      grade: 'مسار الهندسة وعلوم الحاسب — بكالوريا مصرية',
      created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
    },
    schedule: {
      id: 2,
      day_of_week: 'SUN_WED',
      day_display: 'الأحد والأربعاء',
      time_slot: 17,
      time_display: '5:00 مساءً',
      total_seats: 25,
      occupied_seats: 8,
      available_seats: 17,
      is_active: true,
      is_full: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    status: 'pending',
    notes: '',
    registered_at: new Date(Date.now() - 3600000 * 5).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
];

export function getLocalRegistrations(): Registration[] {
  if (typeof window === 'undefined') return DEFAULT_REGISTRATIONS;
  try {
    const data = localStorage.getItem(REGISTRATIONS_KEY);
    if (!data) {
      localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(DEFAULT_REGISTRATIONS));
      return DEFAULT_REGISTRATIONS;
    }
    return JSON.parse(data);
  } catch {
    return DEFAULT_REGISTRATIONS;
  }
}

export function saveLocalRegistration(newReg: {
  full_name: string;
  parent_name: string;
  phone: string;
  whatsapp: string;
  school?: string;
  governorate?: string;
  grade?: string;
  email?: string;
  schedule_id: number;
  schedule_display?: string;
}): Registration {
  const current = getLocalRegistrations();
  const newId = Date.now();
  const now = new Date().toISOString();

  const dayDisplay = newReg.schedule_display
    ? newReg.schedule_display.split('—')[0]?.trim() || 'الموعد المختار'
    : 'السبت والثلاثاء';
  const timeDisplay = newReg.schedule_display
    ? newReg.schedule_display.split('—')[1]?.trim() || '3:00 مساءً'
    : '3:00 مساءً';

  const registration: Registration = {
    id: newId,
    student: {
      id: newId,
      full_name: newReg.full_name,
      parent_name: newReg.parent_name,
      phone: newReg.phone,
      whatsapp: newReg.whatsapp,
      email: newReg.email || '',
      school: newReg.school || '',
      governorate: newReg.governorate || '',
      grade: newReg.grade || 'مسار الهندسة وعلوم الحاسب — بكالوريا مصرية',
      created_at: now,
    },
    schedule: {
      id: newReg.schedule_id || 1,
      day_of_week: 'SAT_TUE',
      day_display: dayDisplay,
      time_slot: 15,
      time_display: timeDisplay,
      total_seats: 25,
      occupied_seats: 1,
      available_seats: 24,
      is_active: true,
      is_full: false,
      created_at: now,
      updated_at: now,
    },
    status: 'pending',
    notes: 'حجز جديد من الموقع',
    registered_at: now,
    updated_at: now,
  };

  const updated = [registration, ...current];
  if (typeof window !== 'undefined') {
    localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(updated));

    addLocalNotification({
      id: newId,
      title: `🚨 حجز جديد: ${newReg.full_name}`,
      message: `تم استلام طلب حجز جديد من الطالب ${newReg.full_name} (${newReg.phone}) - الموعد: ${dayDisplay} ${timeDisplay}`,
      type: 'registration',
      is_read: false,
      created_at: now,
    });
  }

  return registration;
}

export function updateLocalRegistrationStatus(id: number, status: RegistrationStatus): Registration[] {
  const current = getLocalRegistrations();
  const updated = current.map((r) => (r.id === id ? { ...r, status, updated_at: new Date().toISOString() } : r));
  if (typeof window !== 'undefined') {
    localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(updated));
  }
  return updated;
}

export function deleteLocalRegistration(id: number): Registration[] {
  const current = getLocalRegistrations();
  const updated = current.filter((r) => r.id !== id);
  if (typeof window !== 'undefined') {
    localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(updated));
  }
  return updated;
}

export function getLocalNotifications(): Notification[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(NOTIFICATIONS_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function addLocalNotification(notif: Notification): void {
  const current = getLocalNotifications();
  const updated = [notif, ...current];
  if (typeof window !== 'undefined') {
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(updated));
  }
}

export function getLocalStats(): DashboardStats {
  const registrations = getLocalRegistrations();
  const todayStr = new Date().toISOString().split('T')[0];
  const todayRegs = registrations.filter((r) => r.registered_at.startsWith(todayStr)).length;
  const pending = registrations.filter((r) => r.status === 'pending').length;
  const paid = registrations.filter((r) => r.status === 'paid').length;
  const completed = registrations.filter((r) => r.status === 'completed').length;
  const cancelled = registrations.filter((r) => r.status === 'cancelled').length;
  const occupied = registrations.filter((r) => r.status !== 'cancelled').length;

  return {
    total_students: registrations.length,
    today_registrations: todayRegs,
    total_occupied_seats: occupied,
    total_available_seats: Math.max(0, 150 - occupied),
    total_schedules: 6,
    paid_count: paid,
    pending_count: pending,
    cancelled_count: cancelled,
    completed_count: completed,
    registrations_by_day: [
      { date: todayStr, count: todayRegs },
    ],
    registrations_by_schedule: [
      { schedule_label: 'السبت والثلاثاء 3:00 مساءً', count: occupied, available: 25 - occupied },
    ],
    recent_registrations: registrations.slice(0, 5),
  };
}
