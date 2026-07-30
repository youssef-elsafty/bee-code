from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Student(models.Model):
    full_name = models.CharField(max_length=255)
    parent_name = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    whatsapp = models.CharField(max_length=20, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    school = models.CharField(max_length=255, blank=True, default='')
    governorate = models.CharField(max_length=100, blank=True, default='القليوبية')
    grade = models.CharField(max_length=50)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.full_name

class Schedule(models.Model):
    DAY_CHOICES = (
        ('SAT', 'Saturday'),
        ('SUN', 'Sunday'),
        ('MON', 'Monday'),
        ('TUE', 'Tuesday'),
        ('WED', 'Wednesday'),
        ('THU', 'Thursday'),
        ('FRI', 'Friday'),
    )
    
    day = models.CharField(max_length=3, choices=DAY_CHOICES)
    time = models.TimeField()
    total_seats = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    occupied_seats = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        unique_together = ('day', 'time')

    def __str__(self):
        return f"{self.get_day_display()} at {self.time} ({self.occupied_seats}/{self.total_seats})"

    @property
    def available_seats(self):
        return max(0, self.total_seats - self.occupied_seats)

class Registration(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('paid', 'Paid'),
        ('cancelled', 'Cancelled'),
        ('completed', 'Completed'),
    )

    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='registrations')
    schedule = models.ForeignKey(Schedule, on_delete=models.CASCADE, related_name='registrations')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    notes = models.TextField(blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('student', 'schedule')

    def __str__(self):
        return f"{self.student.full_name} - {self.schedule} - {self.get_status_display()}"
