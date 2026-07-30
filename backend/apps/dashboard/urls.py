from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DashboardStatsView, ExportStudentsView, AuditLogViewSet

router = DefaultRouter()
router.register(r'audit-logs', AuditLogViewSet, basename='audit-logs')

urlpatterns = [
    path('stats/', DashboardStatsView.as_view(), name='dashboard-stats'),
    path('export/students/', ExportStudentsView.as_view(), name='export-students'),
    path('', include(router.urls)),
]
