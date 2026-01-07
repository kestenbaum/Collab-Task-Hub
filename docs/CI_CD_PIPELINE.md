# CI/CD Pipeline Documentation

This document describes the automated CI/CD pipeline for the Collab Task Hub application.

## Overview

The CI/CD pipeline automates testing, building, and deployment processes using GitHub Actions. It consists of two main workflows:

1. **CI Pipeline** (`ci.yml`) - Runs on every pull request and push
2. **CD Pipeline** (`cd.yml`) - Runs on pushes to main branch and version tags

## CI Pipeline

### Triggers

- Pull requests to `main` or `develop` branches
- Pushes to `main` or `develop` branches

### Jobs

#### 1. Lint Backend

- Installs dependencies
- Runs ESLint on backend code
- Ensures code quality standards

#### 2. Lint Frontend

- Installs dependencies
- Runs ESLint on frontend code
- Validates code style

#### 3. Test Backend

- Spins up PostgreSQL test database
- Runs unit tests
- Runs end-to-end tests
- Validates database connectivity

#### 4. Test Frontend

- Installs dependencies
- Builds the frontend application
- Ensures build succeeds

#### 5. Build Docker Images

- Builds backend Docker image
- Builds frontend Docker image
- Validates Dockerfiles
- Uses layer caching for faster builds

#### 6. Status Check

- Aggregates all job results
- Provides clear pass/fail status

### Environment Variables

- `NODE_VERSION`: Node.js version (default: 20)

## CD Pipeline

### Triggers

- Push to `main` branch
- Version tags (e.g., `v1.0.0`)

### Jobs

#### 1. Build and Push

- Builds production Docker images
- Pushes images to Docker registry
- Tags images with:
  - Branch name
  - Semantic version
  - Git SHA
  - `latest` for main branch

#### 2. Deploy

- Connects to production server via SSH
- Pulls latest code
- Pulls latest Docker images
- Restarts services with zero downtime
- Performs health checks
- Cleans up old images

#### 3. Notify

- Sends deployment status notification

## Required GitHub Secrets

### Docker Registry

- `DOCKER_REGISTRY`: Docker registry URL (e.g., `ghcr.io` or `your-registry.io`)
- `DOCKER_USERNAME`: Docker registry username
- `DOCKER_PASSWORD`: Docker registry password/token

### Application Configuration

- `NEXT_PUBLIC_API_URL`: Production API URL for frontend

### Production Server (for CD)

- `PRODUCTION_HOST`: Server IP or hostname
- `PRODUCTION_USER`: SSH username
- `PRODUCTION_SSH_KEY`: SSH private key for authentication
- `PRODUCTION_SSH_PORT`: SSH port (optional, defaults to 22)
- `PRODUCTION_DOMAIN`: Production domain name

### Application Secrets

- `JWT_SECRET`: JWT secret key (minimum 32 characters)
- `DB_USERNAME`: Database username
- `DB_PASSWORD`: Database password

## Setting Up GitHub Secrets

1. Go to your repository on GitHub
2. Navigate to `Settings` > `Secrets and variables` > `Actions`
3. Click `New repository secret`
4. Add each secret listed above

### Example Secret Configuration

```
DOCKER_REGISTRY=ghcr.io/your-username
DOCKER_USERNAME=your-username
DOCKER_PASSWORD=ghp_your_github_token

NEXT_PUBLIC_API_URL=https://api.yourdomain.com

PRODUCTION_HOST=123.45.67.89
PRODUCTION_USER=deploy
PRODUCTION_SSH_KEY=-----BEGIN OPENSSH PRIVATE KEY-----
...your private key...
-----END OPENSSH PRIVATE KEY-----
PRODUCTION_DOMAIN=yourdomain.com

JWT_SECRET=your-super-secret-jwt-key-min-32-chars
DB_USERNAME=postgres
DB_PASSWORD=your-secure-db-password
```

## Local Testing

### Test CI Pipeline Locally

```bash
# Install dependencies
cd backend && npm install
cd ../frontend && npm install

# Run linting
cd backend && npm run lint
cd ../frontend && npm run lint

# Run backend tests
cd backend && npm test

# Build frontend
cd frontend && npm run build

# Build Docker images
docker build -t collab-task-hub-backend:test ./backend
docker build -t collab-task-hub-frontend:test ./frontend
```

### Test Production Build Locally

```bash
# Create .env.prod file (copy from .env.prod.example)
cp .env.prod.example .env.prod

# Edit .env.prod with your values
nano .env.prod

# Build and run production stack
docker-compose -f docker-compose.prod.yml up --build
```

## Production Deployment

### Manual Deployment

```bash
# SSH into production server
ssh user@production-server

# Navigate to application directory
cd /opt/collab-task-hub

# Pull latest changes
git pull origin main

# Pull latest images
docker-compose -f docker-compose.prod.yml pull

# Restart services
docker-compose -f docker-compose.prod.yml up -d

# Check health
curl http://localhost:3000/health
```

### Automated Deployment via GitHub

1. Push to `main` branch:

   ```bash
   git checkout main
   git merge develop
   git push origin main
   ```

2. Or create a version tag:
   ```bash
   git tag -a v1.0.0 -m "Release version 1.0.0"
   git push origin v1.0.0
   ```

## Monitoring

### Check Pipeline Status

- Visit `https://github.com/your-username/your-repo/actions`
- View workflow runs and logs

### Check Production Logs

```bash
# Backend logs
docker logs collab-task-hub-backend-prod -f

# Frontend logs
docker logs collab-task-hub-frontend-prod -f

# Database logs
docker logs collab-task-hub-db-prod -f

# Nginx logs
docker logs collab-task-hub-nginx-prod -f
```

## Troubleshooting

### Pipeline Fails

1. **Linting Errors**: Fix code style issues locally and re-run

   ```bash
   npm run lint -- --fix
   ```

2. **Test Failures**: Run tests locally to debug

   ```bash
   npm test
   ```

3. **Docker Build Failures**: Check Dockerfile and dependencies
   ```bash
   docker build -t test-image .
   ```

### Deployment Fails

1. **Check SSH Connection**:

   ```bash
   ssh -i ~/.ssh/production_key user@host
   ```

2. **Verify Docker Registry Access**:

   ```bash
   docker login your-registry.io
   ```

3. **Check Server Resources**:
   ```bash
   docker ps
   docker stats
   df -h
   ```

### Health Check Failures

1. **Check service status**:

   ```bash
   docker-compose -f docker-compose.prod.yml ps
   ```

2. **View service logs**:

   ```bash
   docker-compose -f docker-compose.prod.yml logs
   ```

3. **Restart specific service**:
   ```bash
   docker-compose -f docker-compose.prod.yml restart backend
   ```

## Best Practices

1. **Always test locally** before pushing to repository
2. **Use feature branches** and create pull requests
3. **Wait for CI to pass** before merging
4. **Tag releases** with semantic versioning
5. **Monitor logs** after deployment
6. **Keep secrets secure** - never commit them to repository
7. **Regularly update** dependencies and Docker images
8. **Backup database** before major deployments

## Security Considerations

1. **Secrets Management**: All sensitive data is stored in GitHub Secrets
2. **SSH Keys**: Use dedicated deployment keys with limited permissions
3. **Docker Registry**: Use private registries for production images
4. **Environment Variables**: Never hardcode secrets in code
5. **SSL/TLS**: Configure SSL certificates in nginx configuration
6. **Database**: Use strong passwords and restrict network access
7. **Rate Limiting**: Nginx configuration includes rate limiting
8. **Security Headers**: All security headers are configured in nginx

## Next Steps

1. Set up monitoring and alerting (e.g., Prometheus, Grafana)
2. Configure automated backups
3. Set up staging environment
4. Implement blue-green deployments
5. Add performance monitoring
6. Configure log aggregation (e.g., ELK stack)
7. Set up SSL certificates (Let's Encrypt)
8. Implement database migrations in CI/CD
