from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from .models import Notification
from .serializers import NotificationSerializer

class NotificationViewSet(viewsets.ModelViewSet):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Allow superadmins to see all, others see their own or broadcast (recipient=None)
        if self.request.user.role == 'superadmin':
            return Notification.objects.all().order_by('-created_at')
        return Notification.objects.filter(
            models.Q(recipient=self.request.user) | models.Q(recipient__isnull=True)
        ).order_by('-created_at')

    @action(detail=False, methods=['post'], url_path='mark-read')
    def mark_all_read(self, request):
        qs = self.get_queryset().filter(is_read=False)
        updated = qs.update(is_read=True)
        return Response({'status': 'marked as read', 'count': updated})
