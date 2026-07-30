from django.contrib import admin
from .models import Student, Schedule, Registration

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'phone', 'governorate', 'grade', 'created_at')
    search_fields = ('full_name', 'phone', 'email')
    list_filter = ('governorate', 'grade')

@admin.register(Schedule)
class ScheduleAdmin(admin.ModelAdmin):
    list_display = ('day', 'time', 'total_seats', 'occupied_seats', 'available_seats', 'is_active')
    list_filter = ('day', 'is_active')

@admin.register(Registration)
class RegistrationAdmin(admin.ModelAdmin):
    list_display = ('student', 'schedule', 'status', 'created_at')
    list_filter = ('status', 'schedule__day')
    search_fields = ('student__full_name',)
