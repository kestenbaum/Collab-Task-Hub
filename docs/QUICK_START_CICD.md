# 🚀 Quick Start: CI/CD Setup

Get your CI/CD pipeline running in under 15 minutes!

## Step 1: GitHub Secrets (5 minutes)

### Minimum Required Secrets for CI Pipeline

1. Go to your GitHub repo → Settings → Secrets and variables → Actions
2. Add these secrets:

```bash
DOCKER_REGISTRY=ghcr.io
DOCKER_USERNAME=your-github-username
DOCKER_PASSWORD=<your-github-token>  # Create at github.com/settings/tokens
```

**Generate GitHub Token:**

- Go to https://github.com/settings/tokens
- Click "Generate new token (classic)"
- Select scopes: `write:packages`, `read:packages`
- Copy the token

That's it for CI! The pipeline will now run on every PR.

## Step 2: Test CI Pipeline (2 minutes)

```bash
# Create a test branch
git checkout -b test-ci

# Make a small change
echo "# Test CI" >> TEST.md

# Push and create PR
git add .
git commit -m "test: CI pipeline"
git push origin test-ci
```

Go to GitHub → Pull Requests → Create PR → Watch the CI pipeline run! ✅

## Step 3: Production Secrets (Optional - for CD)

Add these additional secrets for automated deployment:

```bash
# Production Server
PRODUCTION_HOST=123.45.67.89
PRODUCTION_USER=deploy
PRODUCTION_SSH_KEY=<paste-entire-private-key>
PRODUCTION_DOMAIN=yourdomain.com

# Application
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
JWT_SECRET=$(openssl rand -hex 32)
DB_USERNAME=collab_user
DB_PASSWORD=$(openssl rand -base64 24)
CORS_ORIGIN=https://yourdomain.com
```

## Step 4: Deploy! (1 minute)

```bash
# Merge your PR to main
git checkout main
git merge test-ci
git push origin main
```

The CD pipeline automatically deploys to production! 🎉

## Troubleshooting

### CI Pipeline Fails?

**Linting errors:**

```bash
cd backend && npm run lint -- --fix
cd frontend && npm run lint -- --fix
git commit -am "fix: linting errors"
```

**Test failures:**

```bash
cd backend && npm test
# Fix failing tests, then commit
```

**Docker build fails:**

```bash
docker build -t test ./backend
# Check error message and fix Dockerfile
```

### CD Pipeline Fails?

**Can't connect to server:**

```bash
# Test SSH connection
ssh -i ~/.ssh/your-key user@server

# Verify PRODUCTION_SSH_KEY includes full key with headers
-----BEGIN OPENSSH PRIVATE KEY-----
...
-----END OPENSSH PRIVATE KEY-----
```

**Docker login fails:**

```bash
# Verify token has correct permissions
# Regenerate GitHub token with write:packages scope
```

## What's Next?

✅ **CI is working** - Every PR is automatically tested  
✅ **CD is working** - Every merge to main deploys automatically

Now you can:

- [ ] Setup monitoring (Prometheus, Grafana)
- [ ] Configure SSL certificates
- [ ] Add database migrations
- [ ] Setup staging environment
- [ ] Configure backup automation

## Full Documentation

- Complete setup: [Production Deployment Guide](PRODUCTION_DEPLOYMENT.md)
- All secrets explained: [GitHub Secrets Setup](GITHUB_SECRETS_SETUP.md)
- Pipeline details: [CI/CD Pipeline](CI_CD_PIPELINE.md)
- Full checklist: [CI/CD Checklist](CI_CD_CHECKLIST.md)

## Need Help?

1. Check [CI_CD_PIPELINE.md](CI_CD_PIPELINE.md) for detailed troubleshooting
2. Review GitHub Actions logs in the Actions tab
3. Verify all secrets are set correctly
4. Test commands locally before pushing

---

**You're all set!** Your CI/CD pipeline is ready to use. 🎊
