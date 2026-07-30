from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    PublicScheduleViewSet, PublicRegistrationView,
    StudentViewSet, ScheduleViewSet, RegistrationViewSet
)

router = DefaultRouter()
router.register(r'admin/students', StudentViewSet, basename='admin-students')
router.register(r'admin/schedules', ScheduleViewSet, basename='admin-schedules')
router.register(r'admin/registrations', RegistrationViewSet, basename='admin-registrations')

urlpatterns = [
    # Public
    path('schedules/available/', PublicScheduleViewSet.as_view(), name='public-schedules'),
    path('register/', PublicRegistrationView.as_view(), name='public-register'),
    
    # Admin
    path('', include(router.urls)),
]
