# CI/CD Setup Checklist

Use this checklist to ensure your CI/CD pipeline is properly configured.

## ☐ Pre-Deployment Checklist

### GitHub Repository Setup

- [ ] Repository created and code pushed to GitHub
- [ ] Main branch protected (Settings > Branches)
- [ ] PR reviews required before merge (optional but recommended)

### GitHub Secrets Configuration

- [ ] `DOCKER_REGISTRY` - Docker registry URL
- [ ] `DOCKER_USERNAME` - Docker registry username
- [ ] `DOCKER_PASSWORD` - Docker registry password/token
- [ ] `NEXT_PUBLIC_API_URL` - Production API URL
- [ ] `JWT_SECRET` - JWT secret key (min 32 chars)
- [ ] `DB_USERNAME` - Database username
- [ ] `DB_PASSWORD` - Database password
- [ ] `CORS_ORIGIN` - Frontend domain

### Production Server Secrets (for CD)

- [ ] `PRODUCTION_HOST` - Server IP or hostname
- [ ] `PRODUCTION_USER` - SSH username
- [ ] `PRODUCTION_SSH_KEY` - SSH private key
- [ ] `PRODUCTION_DOMAIN` - Production domain
- [ ] `PRODUCTION_SSH_PORT` - SSH port (optional, defaults to 22)

## ☐ Production Server Setup

### Server Preparation

- [ ] Server provisioned (VPS, cloud instance, etc.)
- [ ] Docker installed
- [ ] Docker Compose installed
- [ ] Git installed
- [ ] Firewall configured (ports 80, 443, 22)

### Application Setup

- [ ] Application directory created (`/opt/collab-task-hub`)
- [ ] Repository cloned to server
- [ ] `.env.prod` file created and configured
- [ ] SSL certificates generated (if using HTTPS)
- [ ] Nginx configuration reviewed

### SSH Access

- [ ] SSH key pair generated
- [ ] Public key added to server's authorized_keys
- [ ] Private key added to GitHub Secrets
- [ ] SSH connection tested

## ☐ CI Pipeline Verification

### Test CI Pipeline

- [ ] Create test branch
- [ ] Push test commit
- [ ] Create pull request
- [ ] Verify linting jobs pass
- [ ] Verify testing jobs pass
- [ ] Verify Docker build jobs pass
- [ ] Check Actions tab for details

### Fix Any Issues

- [ ] Resolve linting errors
- [ ] Fix failing tests
- [ ] Correct Docker build errors
- [ ] Update GitHub Secrets if needed

## ☐ CD Pipeline Verification

### Test Deployment (Staging First - Recommended)

- [ ] Create staging environment
- [ ] Configure staging secrets
- [ ] Deploy to staging
- [ ] Verify services start correctly
- [ ] Test application functionality
- [ ] Check logs for errors

### Production Deployment

- [ ] Review all changes in PR
- [ ] Ensure all CI checks pass
- [ ] Merge PR to main branch
- [ ] Monitor CD pipeline execution
- [ ] Verify deployment success
- [ ] Test production application
- [ ] Check health endpoints

## ☐ Post-Deployment

### Verification

- [ ] Backend health check: `https://yourdomain.com/api/health`
- [ ] Frontend accessible: `https://yourdomain.com`
- [ ] Database connection working
- [ ] All services running: `docker ps`
- [ ] No errors in logs: `docker-compose logs`

### Monitoring Setup

- [ ] Log monitoring configured
- [ ] Uptime monitoring enabled
- [ ] Error alerting setup
- [ ] Performance monitoring active

### Backups

- [ ] Database backup script configured
- [ ] Backup cron job created
- [ ] Backup restoration tested
- [ ] Backup retention policy set

## ☐ Security Hardening

### Server Security

- [ ] Firewall enabled and configured
- [ ] SSH root login disabled
- [ ] SSH password authentication disabled
- [ ] Fail2ban installed and configured
- [ ] System updates applied
- [ ] Security patches current

### Application Security

- [ ] Strong passwords for all services
- [ ] JWT secret is secure and random
- [ ] CORS properly configured
- [ ] Rate limiting enabled in Nginx
- [ ] Security headers configured
- [ ] SSL/TLS certificates valid

### Secret Management

- [ ] No secrets in code or git history
- [ ] All secrets in GitHub Secrets
- [ ] `.env.prod` not committed to git
- [ ] SSL private keys protected
- [ ] Database credentials secure

## ☐ Documentation

### Team Documentation

- [ ] Team members have access to docs
- [ ] Deployment process documented
- [ ] Troubleshooting guide reviewed
- [ ] Emergency contacts listed
- [ ] Rollback procedure understood

### Knowledge Base

- [ ] CI/CD pipeline documented
- [ ] Server setup documented
- [ ] Monitoring procedures documented
- [ ] Incident response plan created

## ☐ Maintenance

### Regular Tasks

- [ ] Weekly backup verification
- [ ] Monthly security updates
- [ ] Quarterly dependency updates
- [ ] Log rotation configured
- [ ] Disk space monitoring
- [ ] Performance review scheduled

### Emergency Procedures

- [ ] Rollback procedure tested
- [ ] Emergency contacts listed
- [ ] Backup restoration tested
- [ ] Incident response plan ready

## 📋 Quick Reference

### Important URLs

- GitHub Repository: `https://github.com/your-username/collab-task-hub`
- GitHub Actions: `https://github.com/your-username/collab-task-hub/actions`
- Production Site: `https://yourdomain.com`
- Production API: `https://api.yourdomain.com`

### Important Commands

```bash
# View CI/CD logs
gh workflow view ci
gh workflow view cd

# Check production status
docker-compose -f docker-compose.prod.yml ps
docker-compose -f docker-compose.prod.yml logs -f

# Restart services
docker-compose -f docker-compose.prod.yml restart

# View health
curl https://yourdomain.com/api/health
```

### Documentation Links

- [CI/CD Pipeline](docs/CI_CD_PIPELINE.md)
- [Production Deployment](docs/PRODUCTION_DEPLOYMENT.md)
- [GitHub Secrets Setup](docs/GITHUB_SECRETS_SETUP.md)
- [Implementation Summary](CI_CD_IMPLEMENTATION.md)

## ✅ Completion

When all items are checked:

- [ ] **CI/CD pipeline is fully operational**
- [ ] **Production deployment is complete**
- [ ] **Monitoring and backups are active**
- [ ] **Team is trained and documentation is current**

---

**Last Updated**: January 7, 2026  
**Version**: 1.0.0  
**Status**: Production Ready
