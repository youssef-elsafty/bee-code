#!/bin/bash
set -e

echo "Apply database migrations"
python manage.py migrate --settings=config.settings.production --noinput

echo "Collect static files"
python manage.py collectstatic --settings=config.settings.production --noinput

echo "Starting server"
exec "$@"
