#!/bin/bash
set -e

if [ "$1" = "gunicorn" ]; then
echo "Apply database migrations"
python manage.py migrate --settings=config.settings.production --noinput

echo "Seed default schedules if missing"
python manage.py shell --settings=config.settings.production -c "
from apps.students.models import Schedule
from datetime import time

schedules = [
    ('SAT', time(15, 0), 30),
    ('SAT', time(16, 0), 30),
    ('SAT', time(17, 0), 30),
    ('SUN', time(15, 0), 30),
    ('SUN', time(16, 0), 30),
    ('SUN', time(17, 0), 30),
]
for day, t, seats in schedules:
    Schedule.objects.get_or_create(day=day, time=t, defaults={'total_seats': seats})
"

if [ -n "${ADMIN_PASSWORD:-}" ]; then
echo "Ensure configured admin user exists"
python manage.py shell --settings=config.settings.production -c "
import os
from apps.accounts.models import CustomUser
username = os.environ.get('ADMIN_USERNAME', 'admin')
email = os.environ.get('ADMIN_EMAIL', 'admin@beecode.com')
password = os.environ['ADMIN_PASSWORD']
if not CustomUser.objects.filter(username=username).exists():
    CustomUser.objects.create_superuser(username, email, password, role='superadmin')
    print('Admin user created.')
elif os.environ.get('ADMIN_RESET_PASSWORD', '').lower() in ('true', '1'):
    user = CustomUser.objects.get(username=username)
    user.email = email
    user.role = 'superadmin'
    user.is_staff = True
    user.is_superuser = True
    user.set_password(password)
    user.save()
    print('Admin password reset.')
else:
    print('Admin user already exists.')
"
else
echo "ADMIN_PASSWORD is not set; skipping automatic admin creation"
fi

echo "Collect static files"
python manage.py collectstatic --settings=config.settings.production --noinput
fi

exec "$@"
