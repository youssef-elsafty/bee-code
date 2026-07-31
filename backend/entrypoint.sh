#!/bin/bash
set -e

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

echo "Ensure default admin user exists"
python manage.py shell --settings=config.settings.production -c "
from apps.accounts.models import CustomUser
if not CustomUser.objects.filter(username='admin').exists():
    CustomUser.objects.create_superuser('admin', 'admin@beecode.com', 'admin123', role='superadmin')
    print('Admin user created.')
else:
    u = CustomUser.objects.get(username='admin')
    u.set_password('admin123')
    u.role = 'superadmin'
    u.save()
    print('Admin user updated.')
"

echo "Collect static files"
python manage.py collectstatic --settings=config.settings.production --noinput

echo "Starting server"
exec gunicorn config.wsgi:application --bind 0.0.0.0:${PORT:-10000}