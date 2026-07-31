import csv
from io import BytesIO
import openpyxl
from reportlab.pdfgen import canvas

from django.http import HttpResponse
from rest_framework import views, status, viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from apps.accounts.permissions import IsSuperAdminOrAdmin, IsStaffOrAdmin
from apps.students.models import Student, Registration, Schedule
from .models import AuditLog, SiteSetting
from .serializers import AuditLogSerializer

from django.utils import timezone
from datetime import timedelta
from apps.students.serializers import RegistrationSerializer

class DashboardStatsView(views.APIView):
    permission_classes = [IsStaffOrAdmin]

    def get(self, request):
        today = timezone.now().date()
        total_students = Student.objects.count()
        today_registrations = Registration.objects.filter(created_at__date=today).count()

        schedules = Schedule.objects.all()
        total_schedules = schedules.count()
        total_occupied_seats = sum(s.occupied_seats for s in schedules)
        total_available_seats = sum(s.available_seats for s in schedules)

        pending_count = Registration.objects.filter(status='pending').count()
        paid_count = Registration.objects.filter(status='paid').count()
        cancelled_count = Registration.objects.filter(status='cancelled').count()
        completed_count = Registration.objects.filter(status='completed').count()

        # Registrations by day (last 7 days)
        registrations_by_day = []
        for i in range(6, -1, -1):
            day_date = today - timedelta(days=i)
            cnt = Registration.objects.filter(created_at__date=day_date).count()
            registrations_by_day.append({
                'date': day_date.strftime('%Y-%m-%d'),
                'count': cnt
            })

        # Registrations by schedule
        registrations_by_schedule = []
        day_map = {
            'SAT': 'السبت والثلاثاء', 'TUE': 'السبت والثلاثاء',
            'SUN': 'الأحد والأربعاء', 'WED': 'الأحد والأربعاء',
        }
        for s in schedules:
            day_lbl = day_map.get(s.day, s.get_day_display())
            h = s.time.hour
            m = s.time.minute
            period = 'مساءً' if h >= 12 else 'صباحاً'
            dh = h if h <= 12 else h - 12
            dh = dh or 12
            time_lbl = f"{dh}:{m:02d} {period}"
            registrations_by_schedule.append({
                'schedule_label': f"{day_lbl} {time_lbl}",
                'count': s.occupied_seats,
                'available': s.available_seats
            })

        # Recent registrations (last 5)
        recent_qs = Registration.objects.select_related('student', 'schedule').order_by('-created_at')[:5]
        recent_data = RegistrationSerializer(recent_qs, many=True).data

        registrations_by_status = {
            'pending': pending_count,
            'paid': paid_count,
            'cancelled': cancelled_count,
            'completed': completed_count,
        }

        return Response({
            'total_students': total_students,
            'today_registrations': today_registrations,
            'total_occupied_seats': total_occupied_seats,
            'total_available_seats': total_available_seats,
            'total_schedules': total_schedules,
            'paid_count': paid_count,
            'pending_count': pending_count,
            'cancelled_count': cancelled_count,
            'completed_count': completed_count,
            'registrations_by_day': registrations_by_day,
            'registrations_by_schedule': registrations_by_schedule,
            'recent_registrations': recent_data,
            'registrations_by_status': registrations_by_status,
        })

class ExportStudentsView(views.APIView):
    permission_classes = [IsStaffOrAdmin]

    def get(self, request):
        fmt = request.query_params.get('format', 'csv').lower()
        students = Student.objects.all()

        if fmt == 'csv':
            response = HttpResponse(content_type='text/csv')
            response['Content-Disposition'] = 'attachment; filename="students.csv"'
            writer = csv.writer(response)
            writer.writerow(['ID', 'Full Name', 'Phone', 'Governorate', 'Grade'])
            for s in students:
                writer.writerow([s.id, s.full_name, s.phone, s.governorate, s.grade])
            return response

        elif fmt == 'xlsx':
            wb = openpyxl.Workbook()
            ws = wb.active
            ws.title = "Students"
            ws.append(['ID', 'Full Name', 'Phone', 'Governorate', 'Grade'])
            for s in students:
                ws.append([s.id, s.full_name, s.phone, s.governorate, s.grade])
            
            response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
            response['Content-Disposition'] = 'attachment; filename="students.xlsx"'
            wb.save(response)
            return response

        elif fmt == 'pdf':
            response = HttpResponse(content_type='application/pdf')
            response['Content-Disposition'] = 'attachment; filename="students.pdf"'
            p = canvas.Canvas(response)
            y = 800
            p.drawString(100, y, "Students List")
            y -= 30
            for s in students:
                p.drawString(100, y, f"{s.id} - {s.full_name} - {s.phone} - {s.governorate}")
                y -= 20
                if y < 50:
                    p.showPage()
                    y = 800
            p.save()
            return response

        return Response({"error": "Invalid format. Use csv, xlsx, or pdf"}, status=status.HTTP_400_BAD_REQUEST)

class AuditLogViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AuditLog.objects.all().order_by('-timestamp')
    serializer_class = AuditLogSerializer
    permission_classes = [IsSuperAdminOrAdmin]
