# ==============================================================================
# Egyptian Programming Academy Platform - Nginx Dockerfile
# ==============================================================================
FROM nginx:1.25-alpine

LABEL maintainer="Egyptian Programming Academy DevOps <devops@egyptianacademy.org>"
LABEL description="Production Nginx Reverse Proxy for Egyptian Programming Academy Platform"

# Remove default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom production Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Create necessary directories for static files, media files, certbot challenges, and SSL certificates
RUN mkdir -p /var/www/static \
             /var/www/media \
             /var/www/certbot \
             /etc/nginx/ssl \
             /var/log/nginx

# Ensure correct permissions for nginx user
RUN chown -R nginx:nginx /var/www/static \
                         /var/www/media \
                         /var/www/certbot \
                         /etc/nginx/ssl \
                         /var/log/nginx \
    && chmod -R 755 /var/www

# Expose standard HTTP and HTTPS ports
EXPOSE 80 443

# Healthcheck to verify Nginx is running and config is valid
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD nginx -t || exit 1

# Start Nginx in foreground mode
CMD ["nginx", "-g", "daemon off;"]
