from rest_framework import serializers
from .models import Student, Schedule, Registration
from django.db import transaction


# ── Student Serializers ──────────────────────────────────────────

class StudentSerializer(serializers.ModelSerializer):
    """Used for PUBLIC registration — only writable fields."""
    email = serializers.EmailField(required=False, allow_null=True, allow_blank=True)
    school = serializers.CharField(required=False, allow_blank=True, default='')
    governorate = serializers.CharField(required=False, allow_blank=True, default='القليوبية')
    whatsapp = serializers.CharField(required=False, allow_blank=True, allow_null=True)

    class Meta:
        model = Student
        fields = ['full_name', 'parent_name', 'phone', 'whatsapp', 'email', 'school', 'governorate', 'grade']


class AdminStudentSerializer(serializers.ModelSerializer):
    """Used for ADMIN reads — includes id and timestamps."""
    class Meta:
        model = Student
        fields = '__all__'


# ── Schedule Serializer ──────────────────────────────────────────

class ScheduleSerializer(serializers.ModelSerializer):
    available_seats = serializers.ReadOnlyField()
    day_display = serializers.SerializerMethodField()
    time_display = serializers.SerializerMethodField()
    day_of_week = serializers.SerializerMethodField()
    is_full = serializers.SerializerMethodField()

    class Meta:
        model = Schedule
        fields = [
            'id', 'day', 'time', 'total_seats', 'occupied_seats', 'is_active',
            'available_seats', 'day_display', 'time_display', 'day_of_week', 'is_full',
        ]

    def get_day_display(self, obj):
        mapping = {
            'SAT': 'السبت والثلاثاء',
            'TUE': 'السبت والثلاثاء',
            'SUN': 'الأحد والأربعاء',
            'WED': 'الأحد والأربعاء',
        }
        return mapping.get(obj.day, obj.get_day_display())

    def get_time_display(self, obj):
        if not obj.time:
            return ""
        hour = obj.time.hour
        minute = obj.time.minute
        period = 'مساءً' if hour >= 12 else 'صباحاً'
        display_hour = hour if hour <= 12 else hour - 12
        if display_hour == 0:
            display_hour = 12
        return f"{display_hour}:{minute:02d} {period}"

    def get_day_of_week(self, obj):
        mapping = {
            'SAT': 'SAT_TUE',
            'TUE': 'SAT_TUE',
            'SUN': 'SUN_WED',
            'WED': 'SUN_WED',
        }
        return mapping.get(obj.day, obj.day)

    def get_is_full(self, obj):
        return obj.available_seats <= 0


# ── Registration Serializers ─────────────────────────────────────

class RegistrationSerializer(serializers.ModelSerializer):
    """Used by Admin ViewSet — full nested read, PK write."""
    student = AdminStudentSerializer(read_only=True)
    schedule = ScheduleSerializer(read_only=True)
    registered_at = serializers.DateTimeField(source='created_at', read_only=True)
    student_id = serializers.PrimaryKeyRelatedField(
        queryset=Student.objects.all(), source='student', write_only=True
    )
    schedule_id = serializers.PrimaryKeyRelatedField(
        queryset=Schedule.objects.all(), source='schedule', write_only=True
    )

    class Meta:
        model = Registration
        fields = ['id', 'student', 'schedule', 'status', 'notes', 'registered_at', 'updated_at',
                  'student_id', 'schedule_id']

    def validate(self, data):
        schedule = data.get('schedule')
        if not self.instance and schedule:
            if schedule.available_seats <= 0:
                raise serializers.ValidationError("Schedule is fully booked.")
            if not schedule.is_active:
                raise serializers.ValidationError("Schedule is not active.")
        return data


class PublicRegistrationSerializer(serializers.Serializer):
    """Used for PUBLIC registration endpoint."""
    student = StudentSerializer()
    schedule_id = serializers.PrimaryKeyRelatedField(
        queryset=Schedule.objects.filter(is_active=True),
        write_only=True
    )

    def validate_schedule_id(self, value):
        if value.available_seats <= 0:
            raise serializers.ValidationError("This schedule is fully booked.")
        return value

    @transaction.atomic
    def create(self, validated_data):
        student_data = validated_data.pop('student')
        schedule = validated_data.pop('schedule_id')

        student = Student.objects.create(**student_data)

        # Increase occupied seats atomically
        Schedule.objects.filter(pk=schedule.pk).update(
            occupied_seats=schedule.occupied_seats + 1
        )
        schedule.refresh_from_db()

        registration = Registration.objects.create(
            student=student,
            schedule=schedule,
            status='pending'
        )
        return registration
