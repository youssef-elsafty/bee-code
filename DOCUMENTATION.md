# 🐝 دليل مشروع أكاديمية Bee Code — الهيكلة والتجاوب والأمان (Full Documentation)

> **تاريخ التحديث:** يوليو 2026  
> **الإصدار:** 2.0 (Mobile-First Native App Mode + Security Hardened)  
> **التقنيات المستخدمة:** Next.js 15, Tailwind CSS, Lucide Icons, Django REST Framework

---

## 📱 1. نظام تجاوب الموبايل والـ Mobile-First Architecture

تمت إعادة هيكلة الواجهات لتعمل بكفاءة فائقة على كافة الشاشات مع إعطاء الأولوية لتجربة الموبايل (Native App Look & Feel).

### 📐 1.1 المسافات والبادينج (.section-gap)
تمت معالجة مشكلة الفراغات الكبيرة عبر تعديل الكلاس الرئيسي في `src/app/globals.css`:
```css
.section-gap {
  padding-top: 3.5rem;    /* 56px للجوال بدلاً من 128px */
  padding-bottom: 3.5rem;
}
@media (min-width: 640px) {
  .section-gap { padding-top: 5rem; padding-bottom: 5rem; }
}
@media (min-width: 768px) {
  .section-gap { padding-top: 9.5rem; padding-bottom: 9.5rem; }
}
```

### 👆 1.2 كروت السحب الأفقي (Horizontal Swipe Carousels)
تم تحويل كروت الأقسام الرئيسية على الجوال إلى كروت متجاورة أفقياً تسحب باللمس (`snap-x snap-mandatory`):
- **الأقسام المدعومة:**
  - `WhyChooseUs` (مميزات الأكاديمية)
  - `CourseBenefits` (مكتسبات الطالب)
  - `ChallengeTimeline` (خطة الـ 30 يوم)
  - `Testimonials` (آراء الطلاب وأولياء الأمور)
- **مكون الأسهم والتوجيه (`SwipeControls.tsx`):**
  - يظهر شريط تنبيهي ينبض (`اسحب للتصفح 👈`) مع أسهم تفاعلية عند الضغط عليها تقوم بالتمرير التلقائي.

### 🧭 1.3 شريط التنقل العلوي للموبايل (`MobileSectionNav.tsx`)
- شريط زجاجي يثبت أسفل الـ Header العلوي على الموبايل (`sticky top-[52px]`).
- يحتوي على أزرار التصفح السريع للأقسام 8 الرئيسية.
- يعمل بتقنية `IntersectionObserver` لإضاءة وتحديد القسم الظاهر حالياً تلقائياً أثناء السكرول.

### 📱 1.4 شريط الإجراءات السفلي (`MobileBottomBar.tsx`)
- شريط ثابت أسفل الشاشة على الموبايل يتضمن 3 أزرار رئيسية:
  1. زر فتح نافذة المدرب (`InstructorDrawer`).
  2. زر التقديم السريع (`احجز مقعدك`).
  3. زر التواصل المباشر عبر `الواتساب`.

---

## 🔒 2. دليل الأمان والوقاية قبل الرفع على GitHub (Security Checklist)

قبل تنفيذ أمر `git push` لرفع المشروع على GitHub، يجب التأكد من الخطوات الأمنية التالية لحماية البيئة والبيانات:

### ✅ 2.1 مراجعة ملف `.gitignore`
تأكد من وجود الملفات التالية داخل `.gitignore` وعدم رفعها مطلقاً:
```gitignore
# Environment variables
.env
.env.local
.env.production

# Node modules & build outputs
node_modules/
.next/
out/
build/

# Python & Django
*.pyc
__pycache__/
db.sqlite3
media/
```

### 🔒 2.2 مفاتيح API والبيانات الحساسة
- عدم كتابة أي Secret Key أو Database Password في كود المصدر (`*.ts`, `*.tsx`, `*.py`).
- استخدام `process.env.NEXT_PUBLIC_...` في الواجهة الأمامية للمتغيرات العامة فقط.
- التأكد من حماية مفتاح Django `SECRET_KEY` ونقله إلى ملف `.env` في الباك إند.

### 🛡️ 2.3 حماية الجداول والبيانات (SQL Injection & XSS)
- في Django ORM: يتم منع الـ SQL Injection تلقائياً عند استخدام الاستعلامات القياسية مثل `Student.objects.filter()`. لا تستخدم `extra()` أو `raw()` بدون تعقيم parameters.
- في Next.js: تجنب استخدام `dangerouslySetInnerHTML` إلا مع نصوص معقمة بنسبة 100%.

### 🌐 2.4 حماية CORS و CSRF
في ملف `settings.py` بالباك إند:
```python
# التأكد من تقييد النطاقات المسموحة عند الإنتاج:
CORS_ALLOWED_ORIGINS = [
    "https://yourdomain.com",
    "http://localhost:3000",
]
ALLOWED_HOSTS = ["yourdomain.com", "localhost", "127.0.0.1"]
```

### 🔐 2.5 حماية لوحة التحكم (Admin Panel)
- التأكد من حماية المسار `/admin` بواسطة برمجيات الوسيط (Middleware / Authentication Tokens).
- وضع حد أقصى لمكالمات الطلبات (Rate Limiting) على مسارات تسجيل الدخول لحماية السيرفر من هجمات الـ Brute Force.

---

## 🛠️ 3. دليل تشغيل التطبيق (Local Development Guide)

### تشغيل الواجهة الأمامية (Frontend):
```bash
cd frontend
npm install
npm run dev
```
*التطبيق يعمل على:* `http://localhost:3000`  
*للمعاينة على الموبايل عبر الشبكة المحلية:* `http://<YOUR_LOCAL_IP>:3000`

### تشغيل الباك إند (Backend):
```bash
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 8000
```
*السيرفر يعمل على:* `http://localhost:8000`

---

## 🌟 4. خريطة المكونات الرئيسية في المشـروع (Component Tree)

```text
src/
├── app/
│   ├── layout.tsx              # Root Layout (Metadata, Fonts, PWA headers)
│   ├── globals.css             # Design System & Responsive Base Utilities
│   ├── page.tsx                # Homepage Landing Page
│   └── admin/                  # Dashboard Administration Panel
├── components/
│   ├── common/
│   │   ├── SwipeControls.tsx   # أسهم وإشارات السحب الأفقي للموبايل
│   │   ├── MobileQuickAccess.tsx # Modal الـ QR Code لفتح الموبايل
│   │   └── BackToTop.tsx
│   ├── layout/
│   │   ├── Navbar.tsx          # Desktop Header & Responsive Drawer
│   │   ├── PwaMobileHeader.tsx # PWA App Mode top banner
│   │   ├── MobileSectionNav.tsx# Sticky section horizontal pill navigator
│   │   └── MobileBottomBar.tsx # Mobile persistent action bar
│   └── sections/
│       ├── HeroSection.tsx
│       ├── WhyChooseUs.tsx     # Swipeable bento cards
│       ├── CourseBenefits.tsx  # Swipeable bento cards
│       ├── ChallengeTimeline.tsx# 30-Day curriculum swipeable cards
│       ├── Testimonials.tsx    # Swipeable testimonial cards
│       ├── InstructorDrawer.tsx# Full instructor details drawer
│       ├── RegistrationForm.tsx
│       └── FAQ.tsx
```

---
**تم إعداد هذا الملف للحفاظ على جودة التطوير واستمرارية الأمان.** 🐝✨
