// ============================================================
// ZOD VALIDATION SCHEMAS
// ============================================================
import { z } from 'zod';

// Egyptian phone number validation
const egyptianPhone = z
  .string()
  .min(1, 'رقم الهاتف مطلوب')
  .regex(/^(01)[0-9]{9}$/, 'رقم الهاتف يجب أن يبدأ بـ 01 ويتكون من 11 رقم');

// ── Public Registration ───────────────────────────────────────
export const registrationSchema = z.object({
  full_name: z
    .string()
    .min(3, 'الاسم يجب أن يكون 3 أحرف على الأقل')
    .max(100, 'الاسم طويل جداً'),
  parent_name: z
    .string()
    .min(3, 'اسم ولي الأمر يجب أن يكون 3 أحرف على الأقل')
    .max(100, 'الاسم طويل جداً'),
  phone: egyptianPhone,
  whatsapp: egyptianPhone,
  email: z
    .string()
    .email('البريد الإلكتروني غير صحيح')
    .optional()
    .or(z.literal('')),
  school: z
    .string()
    .min(3, 'اسم المدرسة مطلوب')
    .max(150, 'اسم المدرسة طويل جداً'),
  governorate: z
    .string()
    .min(1, 'المحافظة مطلوبة'),
  grade: z
    .string()
    .min(1, 'الصف الدراسي مطلوب'),
  schedule_id: z
    .number({ required_error: 'يرجى اختيار الموعد' })
    .positive('يرجى اختيار موعد صحيح'),
  agreement: z
    .boolean()
    .refine((val) => val === true, 'يجب الموافقة على الشروط والأحكام'),
});

export type RegistrationFormValues = z.infer<typeof registrationSchema>;

// ── Admin Login ───────────────────────────────────────────────
export const loginSchema = z.object({
  username: z
    .string()
    .min(1, 'اسم المستخدم مطلوب'),
  password: z
    .string()
    .min(1, 'كلمة المرور مطلوبة'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

// ── Schedule Create/Edit ──────────────────────────────────────
export const scheduleSchema = z.object({
  day_of_week: z.enum(['SAT', 'TUE'], {
    required_error: 'اليوم مطلوب',
  }),
  time_slot: z
    .number()
    .refine((v) => [15, 16, 17].includes(v), 'الوقت غير صحيح'),
  total_seats: z
    .number()
    .int('عدد المقاعد يجب أن يكون رقماً صحيحاً')
    .min(1, 'يجب أن يكون هناك مقعد واحد على الأقل')
    .max(100, 'الحد الأقصى 100 مقعد'),
  is_active: z.boolean().default(true),
});

export type ScheduleFormValues = z.infer<typeof scheduleSchema>;

// ── Student Notes Update ──────────────────────────────────────
export const studentNotesSchema = z.object({
  notes: z.string().max(500, 'الملاحظات طويلة جداً').optional(),
  status: z.enum(['pending', 'paid', 'cancelled', 'completed']),
});

export type StudentNotesValues = z.infer<typeof studentNotesSchema>;
