import django_filters
from .models import Student, Registration, Schedule

class StudentFilter(django_filters.FilterSet):
    class Meta:
        model = Student
        fields = {
            'full_name': ['icontains'],
            'phone': ['icontains'],
            'governorate': ['exact', 'icontains'],
            'grade': ['exact', 'icontains'],
        }

class ScheduleFilter(django_filters.FilterSet):
    class Meta:
        model = Schedule
        fields = {
            'day': ['exact'],
            'is_active': ['exact'],
        }

class RegistrationFilter(django_filters.FilterSet):
    class Meta:
        model = Registration
        fields = {
            'status': ['exact'],
            'schedule__day': ['exact'],
            'student__full_name': ['icontains'],
        }
