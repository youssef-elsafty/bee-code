from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import action
from .models import Student, Schedule, Registration
from .serializers import (
    StudentSerializer, ScheduleSerializer, RegistrationSerializer, 
    PublicRegistrationSerializer
)
from apps.accounts.permissions import IsStaffOrAdmin
from .filters import StudentFilter, RegistrationFilter, ScheduleFilter

class PublicScheduleViewSet(generics.ListAPIView):
    queryset = Schedule.objects.filter(is_active=True)
    serializer_class = ScheduleSerializer
    permission_classes = [AllowAny]
    filterset_class = ScheduleFilter

    def get_queryset(self):
        # Only return schedules with available seats
        return [s for s in super().get_queryset() if s.available_seats > 0]

class PublicRegistrationView(generics.CreateAPIView):
    serializer_class = PublicRegistrationSerializer
    permission_classes = [AllowAny]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        registration = serializer.save()
        
        # Send Email Notification to Admin
        try:
            from django.core.mail import send_mail
            student = registration.student
            schedule = registration.schedule
            subject = f"🚨 حجز جديد في الأكاديمية: {student.full_name}"
            message = (
                f"تم استلام طلب حجز جديد:\n\n"
                f"👨‍🎓 اسم الطالب: {student.full_name}\n"
                f"👤 اسم ولي الأمر: {student.parent_name}\n"
                f"📞 رقم الهاتف: {student.phone}\n"
                f"💬 رقم الواتساب: {student.whatsapp}\n"
                f"📍 المحافظة: {student.governorate}\n"
                f"🏫 المدرسة: {student.school}\n"
                f"🎓 المسار الدراسي: {student.grade}\n"
                f"⏰ الموعد المختار: {schedule.day_display} — {schedule.time_display}\n"
            )
            send_mail(
                subject,
                message,
                'noreply@academy.com',
                ['youssefelsafty418@gmail.com'],
                fail_silently=True,
            )
        except Exception:
            pass

        return Response(
            {"message": "Registration successful.", "registration_id": registration.id},
            status=status.HTTP_201_CREATED
        )

# Admin Views
class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all().order_by('-created_at')
    serializer_class = StudentSerializer
    permission_classes = [IsStaffOrAdmin]
    filterset_class = StudentFilter

class ScheduleViewSet(viewsets.ModelViewSet):
    queryset = Schedule.objects.all().order_by('day', 'time')
    serializer_class = ScheduleSerializer
    permission_classes = [IsStaffOrAdmin]
    filterset_class = ScheduleFilter

    @action(detail=True, methods=['post'])
    def toggle(self, request, pk=None):
        schedule = self.get_object()
        schedule.is_active = not schedule.is_active
        schedule.save()
        return Response({'status': 'schedule toggled', 'is_active': schedule.is_active})

class RegistrationViewSet(viewsets.ModelViewSet):
    queryset = Registration.objects.select_related('student', 'schedule').all().order_by('-created_at')
    serializer_class = RegistrationSerializer
    permission_classes = [IsStaffOrAdmin]
    filterset_class = RegistrationFilter

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        schedule = instance.schedule
        
        # Free up seat
        if schedule.occupied_seats > 0:
            schedule.occupied_seats -= 1
            schedule.save()
            
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
