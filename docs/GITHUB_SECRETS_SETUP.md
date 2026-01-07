# GitHub Secrets Configuration Guide

This document provides a comprehensive guide for configuring GitHub Secrets required for the CI/CD pipeline.

## Required Secrets

### 1. Docker Registry Secrets

These secrets are required for building and pushing Docker images to your container registry.

#### `DOCKER_REGISTRY`

- **Description**: URL of your Docker registry
- **Examples**:
  - GitHub Container Registry: `ghcr.io`
  - Docker Hub: `docker.io`
  - Private registry: `registry.yourdomain.com`
- **How to set**:
  ```
  ghcr.io
  ```

#### `DOCKER_USERNAME`

- **Description**: Username for Docker registry authentication
- **For GitHub Container Registry**: Your GitHub username
- **For Docker Hub**: Your Docker Hub username
- **How to set**:
  ```
  your-github-username
  ```

#### `DOCKER_PASSWORD`

- **Description**: Password or token for Docker registry
- **For GitHub Container Registry**:
  1. Go to GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)
  2. Generate new token with `write:packages` and `read:packages` permissions
  3. Use the generated token
- **For Docker Hub**: Use your Docker Hub access token
- **How to set**: Copy the generated token

---

### 2. Application Configuration Secrets

#### `NEXT_PUBLIC_API_URL`

- **Description**: Public URL where your backend API is accessible
- **Format**: Must include protocol (http/https)
- **Examples**:
  - `https://api.yourdomain.com`
  - `https://yourdomain.com/api`
- **How to set**:
  ```
  https://api.yourdomain.com
  ```

#### `JWT_SECRET`

- **Description**: Secret key for JWT token generation and validation
- **Requirements**:
  - Minimum 32 characters
  - Use random, cryptographically secure string
  - Never reuse across environments
- **How to generate**:

  ```bash
  # Using Node.js
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

  # Using OpenSSL
  openssl rand -hex 32
  ```

- **How to set**: Copy the generated string

#### `CORS_ORIGIN`

- **Description**: Allowed origin for CORS (Cross-Origin Resource Sharing)
- **Format**: Your frontend domain
- **Examples**:
  - `https://yourdomain.com`
  - `https://app.yourdomain.com`
- **How to set**:
  ```
  https://yourdomain.com
  ```

---

### 3. Database Secrets

#### `DB_USERNAME`

- **Description**: PostgreSQL database username
- **Recommendations**:
  - Use a dedicated user (not `postgres`)
  - Follow principle of least privilege
- **How to set**:
  ```
  collab_app_user
  ```

#### `DB_PASSWORD`

- **Description**: PostgreSQL database password
- **Requirements**:
  - Minimum 16 characters
  - Include uppercase, lowercase, numbers, and special characters
  - Use a password manager to generate
- **How to generate**:
  ```bash
  # Using OpenSSL
  openssl rand -base64 24
  ```
- **How to set**: Copy the generated password

---

### 4. Production Server Secrets (for CD pipeline)

#### `PRODUCTION_HOST`

- **Description**: IP address or hostname of your production server
- **Examples**:
  - `123.45.67.89`
  - `server.yourdomain.com`
- **How to set**:
  ```
  123.45.67.89
  ```

#### `PRODUCTION_USER`

- **Description**: SSH username for deployment
- **Recommendations**:
  - Use a dedicated deployment user (not root)
  - Configure with minimal required permissions
- **How to set**:
  ```
  deploy
  ```

#### `PRODUCTION_SSH_KEY`

- **Description**: Private SSH key for server authentication
- **How to generate**:

  ```bash
  # On your local machine
  ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_deploy_key

  # Copy public key to server
  ssh-copy-id -i ~/.ssh/github_deploy_key.pub user@server

  # Display private key
  cat ~/.ssh/github_deploy_key
  ```

- **How to set**: Copy entire private key including headers
  ```
  -----BEGIN OPENSSH PRIVATE KEY-----
  b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAMwAAAAtz
  ...
  -----END OPENSSH PRIVATE KEY-----
  ```

#### `PRODUCTION_SSH_PORT` (Optional)

- **Description**: SSH port (defaults to 22 if not set)
- **Default**: `22`
- **How to set**:
  ```
  22
  ```

#### `PRODUCTION_DOMAIN`

- **Description**: Production domain name (for environment URL)
- **Example**: `yourdomain.com`
- **How to set**:
  ```
  yourdomain.com
  ```

---

## Step-by-Step Setup Instructions

### Method 1: Using GitHub Web Interface

1. **Navigate to Repository Settings**

   - Go to your GitHub repository
   - Click on `Settings` tab
   - Click on `Secrets and variables` in left sidebar
   - Click on `Actions`

2. **Add Repository Secrets**

   - Click `New repository secret`
   - Enter secret name (exact match from above)
   - Enter secret value
   - Click `Add secret`
   - Repeat for each secret

3. **Verify Secrets**
   - Secrets will appear in the list (values are hidden)
   - Secret names must match exactly (case-sensitive)

### Method 2: Using GitHub CLI

```bash
# Install GitHub CLI if not already installed
# https://cli.github.com/

# Authenticate
gh auth login

# Add secrets
gh secret set DOCKER_REGISTRY -b "ghcr.io"
gh secret set DOCKER_USERNAME -b "your-username"
gh secret set DOCKER_PASSWORD < token.txt
gh secret set NEXT_PUBLIC_API_URL -b "https://api.yourdomain.com"
gh secret set JWT_SECRET -b "$(openssl rand -hex 32)"
gh secret set DB_USERNAME -b "collab_app_user"
gh secret set DB_PASSWORD -b "$(openssl rand -base64 24)"
gh secret set PRODUCTION_HOST -b "123.45.67.89"
gh secret set PRODUCTION_USER -b "deploy"
gh secret set PRODUCTION_SSH_KEY < ~/.ssh/github_deploy_key
gh secret set PRODUCTION_DOMAIN -b "yourdomain.com"
gh secret set CORS_ORIGIN -b "https://yourdomain.com"

# List secrets (values won't be shown)
gh secret list
```

---

## Environment-Specific Secrets

For multiple environments (staging, production), you can use GitHub Environments:

### Creating Environments

1. Go to `Settings` > `Environments`
2. Click `New environment`
3. Enter environment name (e.g., `production`, `staging`)
4. Add environment-specific secrets

### Using Environments in Workflows

Workflows will automatically use environment secrets when specified:

```yaml
jobs:
  deploy:
    environment: production
    steps:
      - name: Deploy
        env:
          API_URL: ${{ secrets.NEXT_PUBLIC_API_URL }}
```

---

## Security Best Practices

### 1. Secret Rotation

- Rotate secrets regularly (every 90 days minimum)
- Rotate immediately if compromised
- Update in both GitHub Secrets and production environment

### 2. Least Privilege

- Grant minimum required permissions
- Use dedicated service accounts
- Avoid using personal credentials

### 3. Secret Validation

- Test secrets in non-production first
- Validate format before setting
- Never log secret values

### 4. Monitoring

- Enable audit logging
- Monitor secret access
- Set up alerts for unauthorized access

### 5. Documentation

- Document which secrets are required
- Keep this guide updated
- Share securely with team members

---

## Troubleshooting

### Secret Not Found Error

```
Error: Secret DOCKER_REGISTRY not found
```

**Solution**:

- Verify secret name matches exactly (case-sensitive)
- Check secret is set in correct repository
- For environments, ensure secret is set in environment settings

### Authentication Failed

```
Error: Login failed for registry
```

**Solution**:

- Verify `DOCKER_USERNAME` and `DOCKER_PASSWORD` are correct
- For GitHub Container Registry, ensure token has `write:packages` permission
- Test credentials locally: `docker login ghcr.io`

### SSH Connection Failed

```
Error: Permission denied (publickey)
```

**Solution**:

- Verify `PRODUCTION_SSH_KEY` includes entire private key with headers
- Ensure public key is in server's `~/.ssh/authorized_keys`
- Check `PRODUCTION_USER` has SSH access
- Verify `PRODUCTION_HOST` is correct

### Invalid JWT Secret

```
Error: JWT secret must be at least 32 characters
```

**Solution**:

- Generate new secret: `openssl rand -hex 32`
- Ensure full secret was copied (no truncation)

---

## Quick Reference Checklist

Before running CI/CD pipeline, ensure you have set:

- [ ] `DOCKER_REGISTRY`
- [ ] `DOCKER_USERNAME`
- [ ] `DOCKER_PASSWORD`
- [ ] `NEXT_PUBLIC_API_URL`
- [ ] `JWT_SECRET`
- [ ] `DB_USERNAME`
- [ ] `DB_PASSWORD`
- [ ] `CORS_ORIGIN`

For CD pipeline (deployment), additionally set:

- [ ] `PRODUCTION_HOST`
- [ ] `PRODUCTION_USER`
- [ ] `PRODUCTION_SSH_KEY`
- [ ] `PRODUCTION_DOMAIN`

---

## Testing Secrets Configuration

### Test CI Pipeline

Create a test PR to verify CI secrets:

```bash
git checkout -b test-ci
git commit --allow-empty -m "Test CI pipeline"
git push origin test-ci
```

Check Actions tab for pipeline status.

### Test CD Pipeline

For CD testing, use a staging environment first:

1. Create staging environment in GitHub
2. Set staging-specific secrets
3. Test deployment to staging server
4. Verify all services start correctly

---

## Support

If you encounter issues:

1. Check [CI_CD_PIPELINE.md](CI_CD_PIPELINE.md) for pipeline details
2. Review GitHub Actions logs for specific errors
3. Verify all secrets are set correctly
4. Test credentials locally when possible

---

## Additional Resources

- [GitHub Encrypted Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [GitHub Environments Documentation](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment)
- [Docker Registry Authentication](https://docs.docker.com/registry/spec/auth/)
- [SSH Key Generation Guide](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
