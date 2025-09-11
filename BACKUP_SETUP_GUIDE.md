# 🚀 MONONIO AI Backup System - Quick Setup Guide

## Phase 1: Immediate Setup (Google Drive + Daily Backups)

### Step 1: Install Dependencies
```bash
cd scripts/backup
npm install
cd ../..
```

### Step 2: Configure Environment
```bash
# Copy the template
cp .env.backup .env.backup.local

# Edit with your credentials
nano .env.backup.local
```

### Step 3: Google Drive API Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project: "MONONIO AI Backups"
3. Enable Google Drive API
4. Create OAuth 2.0 credentials
5. Download credentials and extract:
   - `GOOGLE_DRIVE_CLIENT_ID`
   - `GOOGLE_DRIVE_CLIENT_SECRET`
6. Generate refresh token using OAuth flow
7. Create a folder in Google Drive and get the folder ID

### Step 4: Test Daily Backup
```bash
# Run setup
node scripts/setup-backup-system.js

# Test backup
node scripts/backup-daily.js

# Verify backup
node scripts/verify-backups.js quick
```

### Step 5: Setup Automation
```bash
# Install cron jobs
crontab backups/crontab.txt

# Verify cron jobs
crontab -l
```

## Phase 2: AWS S3 Integration (Week 1)

### Step 1: AWS S3 Setup
1. Create AWS account
2. Create S3 bucket: `mononio-ai-backups`
3. Create IAM user with S3 permissions
4. Generate access keys

### Step 2: Configure AWS
```bash
# Add to .env.backup.local
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET=mononio-ai-backups
```

### Step 3: Test Multi-Cloud Backup
```bash
# Test with both Google Drive and AWS S3
node scripts/backup-daily.js

# Verify both cloud providers
node scripts/verify-backups.js
```

## Phase 3: Full Disaster Recovery (Week 2)

### Step 1: Test Restore Procedures
```bash
# List available backups
node scripts/restore-backup.js list

# Test restore to temporary directory
mkdir test-restore
node scripts/restore-backup.js
# Select a backup and restore to test-restore/
```

### Step 2: Setup Monitoring
```bash
# Configure email notifications
# Add to .env.backup.local:
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
NOTIFICATION_EMAIL=admin@mononio.ai
```

### Step 3: Performance Optimization
```bash
# Test cloud sync
node scripts/backup-cloud-sync.js

# Monitor backup performance
node scripts/verify-backups.js
```

## Quick Commands Reference

```bash
# Daily backup
npm run backup:daily

# Cloud sync
npm run backup:cloud-sync

# Restore backup
npm run backup:restore

# Verify backups
npm run backup:verify

# Quick health check
npm run backup:verify:quick
```

## Troubleshooting

### Common Issues:
1. **"Configuration validation failed"** → Check `.env.backup.local` exists and is configured
2. **"Google Drive upload failed"** → Verify API credentials and refresh token
3. **"AWS S3 upload failed"** → Check AWS credentials and bucket permissions
4. **"Email notifications not working"** → Verify SMTP credentials and app password

### Debug Mode:
```bash
# Enable debug logging
export BACKUP_LOG_LEVEL=debug
node scripts/backup-daily.js
```

## Security Checklist

- [ ] Encryption key is 32 characters long
- [ ] API keys are stored in `.env.backup.local` (not committed to git)
- [ ] Google Drive folder has proper permissions
- [ ] AWS S3 bucket has appropriate access policies
- [ ] Email credentials use app passwords (not regular passwords)
- [ ] Backup directories have restricted permissions

## Next Steps

1. **Week 1**: Complete Phase 1 and 2
2. **Week 2**: Implement Phase 3 and test disaster recovery
3. **Ongoing**: Monitor backup health and update retention policies

For detailed documentation, see `docs/BACKUP_SYSTEM.md`
