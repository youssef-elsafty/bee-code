# 🚀 Egyptian Programming Academy Platform - Docker Infrastructure & Deployment Guide

Production-ready Docker and Nginx deployment stack for the **Egyptian Programming Academy Platform**. This repository contains the complete container orchestration, reverse proxy routing, security configurations, and development environment setup.

---

## 📐 Infrastructure Architecture

```
                                  +-----------------------+
                                  |    Client (Browser)   |
                                  +-----------+-----------+
                                              |
                                     HTTP:80  |  HTTPS:443
                                              v
                                   +---------------------+
                                   | Nginx Reverse Proxy |
                                   +----+-------------+--+
                                        |             |
                         /api, /admin, /ws            | / (All other requests)
                                        v             v
             +----------------------------+         +----------------------------+
             |   Backend (Django Gunicorn)|         |    Frontend (Next.js App)  |
             |       Container:8000       |         |       Container:3000       |
             +--------------+-------------+         +----------------------------+
                            |
           +----------------+----------------+
           |                                 |
           v                                 v
+-----------------------+         +-----------------------+
|  PostgreSQL 16 Database|        |     Redis 7 Cache     |
|     Container:5432    |        |     Container:6379    |
+-----------------------+         +-----------+-----------+
                                              |
                                   +----------+----------+
                                   |                     |
                                   v                     v
                        +--------------------+ +-------------------+
                        |   Celery Worker    | |    Celery Beat    |
                        | (Async Tasks Execution) (Task Scheduler) |
                        +--------------------+ +-------------------+
```

---

## 🛠️ Prerequisites

Before deploying the infrastructure, ensure the following software is installed on the host system:

1. **Docker Engine**: `v24.0.0` or higher
2. **Docker Compose**: `v2.20.0` or higher
3. **Git**: Installed for repository cloning
4. **Domain Name**: Pointed to host server IP (for SSL certificates via Let's Encrypt)
5. **Open Ports**: Port `80` (HTTP) and Port `443` (HTTPS) accessible from the internet

---

## 🔑 Environment Variables Reference

Copy `.env.example` to `.env` before running containers:

```bash
cp .env.example .env
```

| Variable Name | Description | Default / Example Value | Required in Prod |
| :--- | :--- | :--- | :---: |
| `NODE_ENV` | Application environment mode (`production` or `development`) | `production` | Yes |
| `DEBUG` | Django debug toggle (`True` or `False`) | `False` | Yes |
| `SECRET_KEY` | Django cryptographic signing key | `django-insecure-...` | **Yes** |
| `ALLOWED_HOSTS` | Comma-separated domain names allowed by Django | `egyptianacademy.org,localhost` | Yes |
| `DOMAIN_NAME` | Primary domain name for SSL / Nginx | `egyptianacademy.org` | Yes |
| `SSL_EMAIL` | Contact email for Let's Encrypt renewal | `admin@egyptianacademy.org` | Yes |
| `CORS_ALLOWED_ORIGINS` | Permitted cross-origin requests | `https://egyptianacademy.org` | Yes |
| `CSRF_TRUSTED_ORIGINS` | Trusted origins for CSRF POST requests | `https://egyptianacademy.org` | Yes |
| `POSTGRES_DB` | PostgreSQL database name | `egyptian_academy_db` | Yes |
| `POSTGRES_USER` | PostgreSQL database user | `academy_user` | Yes |
| `POSTGRES_PASSWORD` | PostgreSQL database password | `academy_secure_password_...` | **Yes** |
| `POSTGRES_HOST` | Hostname of DB service inside Docker | `db` | Yes |
| `POSTGRES_PORT` | PostgreSQL internal port | `5432` | Yes |
| `DATABASE_URL` | Full database URI string | `postgres://user:pass@db:5432/db` | Yes |
| `REDIS_HOST` | Hostname of Redis service inside Docker | `redis` | Yes |
| `REDIS_PORT` | Redis internal port | `6379` | Yes |
| `REDIS_URL` | Full Redis connection URI | `redis://redis:6379/0` | Yes |
| `CELERY_BROKER_URL` | Celery task broker URL | `redis://redis:6379/0` | Yes |
| `CELERY_RESULT_BACKEND` | Celery task result backend URL | `redis://redis:6379/0` | Yes |
| `PORT` | Next.js frontend port inside container | `3000` | Yes |
| `NEXT_PUBLIC_API_URL` | Frontend public API base URL | `https://egyptianacademy.org/api/v1` | Yes |
| `NEXT_PUBLIC_WS_URL` | Frontend public WebSocket base URL | `wss://egyptianacademy.org/ws` | Yes |
| `STATIC_ROOT` | Django static files destination path | `/app/staticfiles` | Yes |
| `MEDIA_ROOT` | Django user uploaded media storage path | `/app/media` | Yes |
| `EMAIL_BACKEND` | Django email backend class | `django.core.mail.backends.smtp.EmailBackend` | Yes |
| `EMAIL_HOST` | SMTP server hostname | `smtp.gmail.com` | Yes |
| `EMAIL_PORT` | SMTP server port | `587` | Yes |
| `EMAIL_USE_TLS` | SMTP TLS encryption toggle | `True` | Yes |
| `EMAIL_HOST_USER` | SMTP username | `notifications@egyptianacademy.org` | Yes |
| `EMAIL_HOST_PASSWORD` | SMTP password / app password | `your-app-password` | Yes |

---

## 💻 Local Development Setup

In development mode, source code directories are live-mounted into containers with hot-reloading enabled for Django and Next.js. Database and Redis ports are exposed for local debugging tools.

### 1. Initialize Development Environment
```bash
# Clone the repository
git clone https://github.com/egyptian-programming-academy/platform.git
cd platform

# Create local environment configuration
cp .env.example .env
```

### 2. Start Development Containers
```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build -d
```

### 3. Verify Local Services
- **Frontend App**: `http://localhost:3000`
- **Backend API**: `http://localhost:8000/api/v1/`
- **Django Admin**: `http://localhost:8000/admin/`
- **PostgreSQL**: `localhost:5432`
- **Redis**: `localhost:6379`

---

## 🚀 Production Deployment Setup

Follow these steps to deploy the application in production mode:

### 1. Environment Preparation
```bash
cp .env.example .env
# Edit .env and supply strong secrets and production domain names
nano .env
```

### 2. Build and Launch Containers
```bash
docker compose up -d --build
```

### 3. Verify Container Status
```bash
docker compose ps
```
Ensure all 7 services (`db`, `redis`, `backend`, `celery`, `celery-beat`, `frontend`, `nginx`) are in the `running` state and healthy.

---

## 🗄️ Database Migrations & Superuser Creation

### 1. Run Database Migrations
Execute Django database migrations inside the running `backend` container:
```bash
docker compose exec backend python manage.py migrate
```

### 2. Collect Django Static Files
Gather all Django admin and app static assets into the shared Nginx volume:
```bash
docker compose exec backend python manage.py collectstatic --noinput
```

### 3. Create Admin Superuser
Create an initial administrator account for the Egyptian Programming Academy platform:
```bash
docker compose exec backend python manage.py createsuperuser
```

---

## 🔒 SSL Certificate Setup (Let's Encrypt / Certbot)

To secure the platform with HTTPS using free SSL certificates from Let's Encrypt:

### Step 1: Request SSL Certificate using Certbot Docker Image
Run Certbot in standalone/webroot mode against the active Nginx webroot:

```bash
docker run -it --rm --name certbot \
  -v "$(pwd)/nginx/ssl:/etc/letsencrypt" \
  -v "$(pwd)/certbot_www:/var/www/certbot" \
  certbot/certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  -d egyptianacademy.org \
  -d www.egyptianacademy.org \
  --email admin@egyptianacademy.org \
  --agree-tos \
  --no-eff-email
```

### Step 2: Enable HTTPS in Nginx Configuration
Open `nginx/nginx.conf` and activate the HTTPS block:

1. Uncomment the HTTP to HTTPS redirect inside the `server (listen 80)` block:
```nginx
location / {
    return 301 https://$host$request_uri;
}
```

2. Uncomment the `server (listen 443 ssl http2)` block in `nginx/nginx.conf`.

3. Validate Nginx configuration syntax:
```bash
docker compose exec nginx nginx -t
```

4. Reload Nginx to apply changes:
```bash
docker compose exec nginx nginx -s reload
```

### Step 3: Automatic SSL Renewal Setup
Set up a system crontab on the host server to renew certificates automatically:

```bash
# Edit crontab
crontab -e

# Add the following line (runs every day at 03:00 AM)
0 3 * * * docker run --rm -v "$(pwd)/nginx/ssl:/etc/letsencrypt" -v "$(pwd)/certbot_www:/var/www/certbot" certbot/certbot renew --quiet && docker compose exec nginx nginx -s reload
```

---

## 🧰 Maintenance & Operational Commands

| Task | Command |
| :--- | :--- |
| **View All Logs** | `docker compose logs -f` |
| **View Nginx Logs** | `docker compose logs -f nginx` |
| **View Backend Logs** | `docker compose logs -f backend` |
| **View Celery Logs** | `docker compose logs -f celery` |
| **Restart Single Service** | `docker compose restart backend` |
| **Scale Celery Workers** | `docker compose up -d --scale celery=3` |
| **Stop All Services** | `docker compose down` |
| **Stop & Wipe Volumes** | `docker compose down -v` |
| **PostgreSQL Backup** | `docker compose exec db pg_dump -U academy_user egyptian_academy_db > backup.sql` |
| **PostgreSQL Restore** | `cat backup.sql \| docker compose exec -T db psql -U academy_user -d egyptian_academy_db` |

---

## 🛡️ Security & Best Practices Implemented

- **Non-root container users**: Standard permissions enforcement inside container containers.
- **Isolated Bridge Network**: Internal services (`db`, `redis`) are shielded behind Docker internal networking.
- **Security Headers**: HSTS, Content Security Policy (CSP), X-Frame-Options, X-Content-Type-Options, and Referrer Policy configured in Nginx.
- **Rate Limiting**: Applied to `/api/` (30 req/s) and `/api/v1/register/` (5 req/min) to prevent brute-force attacks.
- **WebSocket Gateway**: High-performance persistent upgrade proxying configured for Django Channels (`/ws/`).
- **Media File Security**: Restricted execution and cached asset delivery.
