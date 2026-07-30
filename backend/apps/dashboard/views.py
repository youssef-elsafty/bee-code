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

class DashboardStatsView(views.APIView):
    permission_classes = [IsStaffOrAdmin]

    def get(self, request):
        total_students = Student.objects.count()
        total_registrations = Registration.objects.count()
        total_schedules = Schedule.objects.count()
        
        # Breakdown by status
        registrations_by_status = {
            'pending': Registration.objects.filter(status='pending').count(),
            'paid': Registration.objects.filter(status='paid').count(),
            'cancelled': Registration.objects.filter(status='cancelled').count(),
            'completed': Registration.objects.filter(status='completed').count(),
        }

        return Response({
            'total_students': total_students,
            'total_registrations': total_registrations,
            'total_schedules': total_schedules,
            'registrations_by_status': registrations_by_status
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
