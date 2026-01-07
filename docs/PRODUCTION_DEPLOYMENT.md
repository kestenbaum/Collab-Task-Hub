# Production Deployment Guide

This guide provides step-by-step instructions for deploying Collab Task Hub to production.

## Prerequisites

- Docker and Docker Compose installed on production server
- Domain name configured (optional but recommended)
- SSL certificate (recommended for HTTPS)
- Minimum server requirements:
  - 2 CPU cores
  - 4GB RAM
  - 20GB disk space
  - Ubuntu 20.04+ or similar Linux distribution

## Initial Server Setup

### 1. Install Docker

```bash
# Update package list
sudo apt update

# Install dependencies
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

# Add Docker's official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Add Docker repository
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Add user to docker group
sudo usermod -aG docker $USER
```

### 2. Clone Repository

```bash
# Create application directory
sudo mkdir -p /opt/collab-task-hub
sudo chown $USER:$USER /opt/collab-task-hub

# Clone repository
cd /opt/collab-task-hub
git clone https://github.com/your-username/collab-task-hub.git .
```

### 3. Configure Environment

```bash
# Copy environment template
cp .env.prod.example .env.prod

# Edit environment file
nano .env.prod
```

Update the following critical values:

```env
DB_USERNAME=your_secure_username
DB_PASSWORD=your_very_secure_password_CHANGE_THIS
DB_DATABASE=collab_task_hub

JWT_SECRET=generate_a_random_32_plus_character_secret_key

NEXT_PUBLIC_API_URL=https://api.yourdomain.com
CORS_ORIGIN=https://yourdomain.com

DOCKER_REGISTRY=ghcr.io/your-username
```

### 4. Set Up SSL Certificates (Optional but Recommended)

#### Using Let's Encrypt

```bash
# Install certbot
sudo apt install -y certbot

# Generate certificate
sudo certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com

# Create SSL directory
mkdir -p nginx/ssl

# Copy certificates
sudo cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem nginx/ssl/certificate.crt
sudo cp /etc/letsencrypt/live/yourdomain.com/privkey.pem nginx/ssl/private.key
sudo chown -R $USER:$USER nginx/ssl
```

#### Update nginx configuration

Uncomment SSL lines in [nginx/nginx.conf](nginx/nginx.conf):

```nginx
ssl_certificate /etc/nginx/ssl/certificate.crt;
ssl_certificate_key /etc/nginx/ssl/private.key;
```

## Deployment

### 1. Build and Start Services

```bash
# Build images
docker compose -f docker-compose.prod.yml build

# Start services
docker compose -f docker-compose.prod.yml up -d
```

### 2. Verify Deployment

```bash
# Check running containers
docker compose -f docker-compose.prod.yml ps

# Check logs
docker compose -f docker-compose.prod.yml logs -f

# Test health endpoints
curl http://localhost:3000/health
curl http://localhost:3001
```

### 3. Configure Firewall

```bash
# Allow HTTP/HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Allow SSH (if not already allowed)
sudo ufw allow 22/tcp

# Enable firewall
sudo ufw enable
```

## Database Management

### Initial Database Setup

The database is automatically created when PostgreSQL container starts. To manually run migrations:

```bash
# Access backend container
docker exec -it collab-task-hub-backend-prod sh

# Run migrations (if using TypeORM migrations)
npm run migration:run
```

### Database Backup

```bash
# Create backup directory
mkdir -p /opt/collab-task-hub/backups

# Backup database
docker exec collab-task-hub-db-prod pg_dump -U your_username collab_task_hub > backups/backup-$(date +%Y%m%d-%H%M%S).sql
```

### Restore Database

```bash
# Restore from backup
cat backups/backup-20260107-120000.sql | docker exec -i collab-task-hub-db-prod psql -U your_username collab_task_hub
```

### Automated Backups

Create a cron job for daily backups:

```bash
# Edit crontab
crontab -e

# Add daily backup at 2 AM
0 2 * * * cd /opt/collab-task-hub && docker exec collab-task-hub-db-prod pg_dump -U your_username collab_task_hub > backups/backup-$(date +\%Y\%m\%d-\%H\%M\%S).sql

# Add weekly cleanup (keep only last 7 days)
0 3 * * 0 find /opt/collab-task-hub/backups -name "backup-*.sql" -mtime +7 -delete
```

## Monitoring and Maintenance

### View Logs

```bash
# All services
docker compose -f docker-compose.prod.yml logs -f

# Specific service
docker compose -f docker-compose.prod.yml logs -f backend
docker compose -f docker-compose.prod.yml logs -f frontend
docker compose -f docker-compose.prod.yml logs -f postgres
docker compose -f docker-compose.prod.yml logs -f nginx
```

### Check Resource Usage

```bash
# Container stats
docker stats

# Disk usage
docker system df

# Detailed disk usage
docker system df -v
```

### Update Application

```bash
# Pull latest changes
git pull origin main

# Pull latest images (if using registry)
docker compose -f docker-compose.prod.yml pull

# Rebuild and restart (zero-downtime)
docker compose -f docker-compose.prod.yml up -d --no-deps --build

# Remove old images
docker image prune -af
```

### Restart Services

```bash
# Restart all services
docker compose -f docker-compose.prod.yml restart

# Restart specific service
docker compose -f docker-compose.prod.yml restart backend
```

### Scale Services

```bash
# Scale backend to 3 instances
docker compose -f docker-compose.prod.yml up -d --scale backend=3
```

## Troubleshooting

### Container Won't Start

```bash
# Check logs
docker compose -f docker-compose.prod.yml logs container-name

# Check container status
docker compose -f docker-compose.prod.yml ps -a

# Inspect container
docker inspect collab-task-hub-backend-prod
```

### Database Connection Issues

```bash
# Test database connection
docker exec -it collab-task-hub-db-prod psql -U your_username -d collab_task_hub

# Check database logs
docker logs collab-task-hub-db-prod
```

### High Memory Usage

```bash
# Check memory usage
docker stats --no-stream

# Restart heavy services
docker compose -f docker-compose.prod.yml restart backend postgres
```

### Nginx Issues

```bash
# Test nginx configuration
docker exec collab-task-hub-nginx-prod nginx -t

# Reload nginx
docker exec collab-task-hub-nginx-prod nginx -s reload
```

## Security Hardening

### 1. Update System Regularly

```bash
sudo apt update && sudo apt upgrade -y
```

### 2. Configure Fail2Ban

```bash
# Install fail2ban
sudo apt install -y fail2ban

# Configure for SSH
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

### 3. Disable Root Login

```bash
sudo nano /etc/ssh/sshd_config

# Set: PermitRootLogin no
sudo systemctl restart sshd
```

### 4. Set Up Docker Secrets (Alternative to .env)

```bash
# Create secrets
echo "your_db_password" | docker secret create db_password -
echo "your_jwt_secret" | docker secret create jwt_secret -

# Update docker-compose to use secrets instead of environment variables
```

## Performance Optimization

### 1. Enable Docker BuildKit

```bash
export DOCKER_BUILDKIT=1
```

### 2. Optimize Database

```bash
# Access PostgreSQL
docker exec -it collab-task-hub-db-prod psql -U your_username collab_task_hub

# Run VACUUM
VACUUM ANALYZE;

# Check indexes
SELECT * FROM pg_indexes WHERE schemaname = 'public';
```

### 3. Set Up Monitoring

Consider installing:

- Prometheus for metrics
- Grafana for visualization
- Node Exporter for system metrics
- cAdvisor for container metrics

## Rollback Procedure

### Quick Rollback

```bash
# Stop current version
docker compose -f docker-compose.prod.yml down

# Checkout previous version
git checkout previous-tag-or-commit

# Restore database backup (if needed)
cat backups/backup-before-update.sql | docker exec -i collab-task-hub-db-prod psql -U your_username collab_task_hub

# Start previous version
docker compose -f docker-compose.prod.yml up -d
```

## Support and Resources

- GitHub Issues: https://github.com/your-username/collab-task-hub/issues
- Documentation: [CI_CD_PIPELINE.md](CI_CD_PIPELINE.md)
- Docker Documentation: https://docs.docker.com
- NestJS Documentation: https://docs.nestjs.com
- Next.js Documentation: https://nextjs.org/docs
