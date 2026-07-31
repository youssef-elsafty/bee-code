from rest_framework import serializers
from .models import Student, Schedule, Registration
from django.db import transaction
from django.core.exceptions import ValidationError

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

class ScheduleSerializer(serializers.ModelSerializer):
    available_seats = serializers.ReadOnlyField()
    day_display = serializers.SerializerMethodField()
    time_display = serializers.SerializerMethodField()
    day_of_week = serializers.SerializerMethodField()
    is_full = serializers.SerializerMethodField()

    class Meta:
        model = Schedule
        fields = '__all__'

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

class RegistrationSerializer(serializers.ModelSerializer):
    student = StudentSerializer(read_only=True)
    schedule = ScheduleSerializer(read_only=True)
    student_id = serializers.PrimaryKeyRelatedField(
        queryset=Student.objects.all(), source='student', write_only=True
    )
    schedule_id = serializers.PrimaryKeyRelatedField(
        queryset=Schedule.objects.all(), source='schedule', write_only=True
    )

    class Meta:
        model = Registration
        fields = '__all__'
        
    def validate(self, data):
        # Allow validation for creation
        schedule = data.get('schedule')
        if not self.instance and schedule:
            if schedule.available_seats <= 0:
                raise serializers.ValidationError("Schedule is fully booked.")
            if not schedule.is_active:
                raise serializers.ValidationError("Schedule is not active.")
        return data

class PublicRegistrationSerializer(serializers.Serializer):
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
        
        # Increase occupied seats
        schedule.occupied_seats += 1
        schedule.save()

        registration = Registration.objects.create(
            student=student,
            schedule=schedule,
            status='pending'
        )
        return registration
