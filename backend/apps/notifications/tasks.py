from celery import shared_task
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from .models import Notification
import json

@shared_task
def send_notification_task(title, message, notif_type='info', recipient_id=None):
    # Create DB record
    notification = Notification.objects.create(
        title=title,
        message=message,
        type=notif_type,
        recipient_id=recipient_id
    )
    
    # Broadcast via WebSocket
    channel_layer = get_channel_layer()
    group_name = f"user_{recipient_id}" if recipient_id else "global_notifications"
    
    async_to_sync(channel_layer.group_send)(
        group_name,
        {
            "type": "send_notification",
            "message": {
                "id": notification.id,
                "title": notification.title,
                "message": notification.message,
                "type": notification.type,
                "created_at": str(notification.created_at)
            }
        }
    )
