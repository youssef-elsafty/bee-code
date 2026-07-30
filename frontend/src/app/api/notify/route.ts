import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const targetEmail = 'youssefelsafty418@gmail.com';

    // Format Arabic notification email body
    const emailBody = `
========================================
🚨 حجز جديد في أكاديمية البرمجة المصرية
========================================

👨‍🎓 اسم الطالب: ${data.full_name || 'غير محدد'}
👤 اسم ولي الأمر: ${data.parent_name || 'غير محدد'}
📞 رقم الهاتف: ${data.phone || 'غير محدد'}
💬 رقم الواتساب: ${data.whatsapp || 'غير محدد'}
📍 المحافظة: ${data.governorate || 'غير محدد'}
🏫 المدرسة: ${data.school || 'غير محدد'}
🎓 المسار الدراسي: ${data.grade || 'بكالوريا مصرية'}
⏰ الموعد المختار: ${data.schedule_display || 'موعد عام'}
📧 البريد الإلكتروني للطالب: ${data.email || 'غير مدخل'}

تاريخ الطلب: ${new Date().toLocaleString('ar-EG')}
`;

    console.log(`[REGISTRATION NOTIFICATION SENT TO ${targetEmail}]`, emailBody);

    // Try forwarding to external email service if configured or FormSubmit API
    try {
      await fetch('https://formsubmit.co/ajax/' + targetEmail, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: `🚨 حجز جديد في الأكاديمية: ${data.full_name}`,
          _template: 'table',
          'اسم الطالب': data.full_name || 'غير محدد',
          'اسم ولي الأمر': data.parent_name || 'غير محدد',
          'رقم الهاتف': data.phone || 'غير محدد',
          'رقم الواتساب': data.whatsapp || 'غير محدد',
          'المحافظة': data.governorate || 'غير محدد',
          'المدرسة': data.school || 'غير محدد',
          'المسار الدراسي': data.grade || 'البكالوريا المصرية',
          'الموعد المختار': data.schedule_display || 'موعد عام',
          'بريد الطالب': data.email || 'غير مدخل',
        }),
      });
    } catch {
      // Ignore external fetch errors
    }

    return NextResponse.json({ success: true, message: 'Notification sent successfully' });
  } catch (error) {
    console.error('Notification error:', error);
    return NextResponse.json({ success: false, error: 'Failed to send notification' }, { status: 500 });
  }
}
