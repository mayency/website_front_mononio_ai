# MONONIO AI Enterprise Backup System

## Overview

The MONONIO AI Backup System is a comprehensive, enterprise-grade backup solution designed to protect your project data with multi-cloud redundancy, encryption, and automated disaster recovery capabilities.

## Features

### 🔒 Security & Encryption
- **AES-256-GCM encryption** for all backup files
- **Secure API key management** with environment variables
- **Integrity verification** with SHA-256 hashing
- **Access logging** for all backup operations

### ☁️ Multi-Cloud Support
- **Google Drive** integration with API v3
- **AWS S3** with server-side encryption
- **GitHub** automated commits (planned)
- **Vercel** deployment backup (planned)

### 📊 Backup Management
- **Automated daily, weekly, and monthly backups**
- **Incremental backup support** for efficiency
- **Retention policies** with automatic cleanup
- **Real-time cloud synchronization**

### 🔔 Monitoring & Notifications
- **Email notifications** for backup success/failure
- **Detailed logging** with multiple log levels
- **Health checks** and integrity verification
- **Performance monitoring** and statistics

## Quick Start

### 1. Installation

```bash
# Run the setup script
node scripts/setup-backup-system.js

# Or for interactive configuration
node scripts/setup-backup-system.js config
```

### 2. Configuration

Copy the environment template and configure your credentials:

```bash
cp .env.backup .env.backup.local
# Edit .env.backup.local with your API credentials
```

### 3. Test the System

```bash
# Run a test backup
npm run backup:daily

# Verify backup integrity
npm run backup:verify:quick

# List available backups
node scripts/restore-backup.js list
```

## Configuration

### Environment Variables

Create a `.env.backup.local` file with the following variables:

```env
# Google Drive API Configuration
GOOGLE_DRIVE_CLIENT_ID=your_google_drive_client_id
GOOGLE_DRIVE_CLIENT_SECRET=your_google_drive_client_secret
GOOGLE_DRIVE_REFRESH_TOKEN=your_google_drive_refresh_token
GOOGLE_DRIVE_FOLDER_ID=your_google_drive_folder_id

# AWS S3 Configuration
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
AWS_REGION=us-east-1
AWS_S3_BUCKET=mononio-ai-backups

# Backup Encryption
BACKUP_ENCRYPTION_KEY=your_32_character_encryption_key_here
BACKUP_ENCRYPTION_ALGORITHM=aes-256-gcm

# Email Notifications
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
NOTIFICATION_EMAIL=admin@mononio.ai

# Backup Settings
BACKUP_RETENTION_DAYS=30
BACKUP_MAX_SIZE_GB=10
BACKUP_COMPRESSION_LEVEL=6
BACKUP_EXCLUDE_PATTERNS=node_modules,.git,.next,dist,build,coverage,test-results,playwright-report
```

### API Setup

#### Google Drive API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google Drive API
4. Create credentials (OAuth 2.0 Client ID)
5. Download the credentials and extract Client ID and Secret
6. Generate a refresh token using the OAuth flow

#### AWS S3 Setup

1. Create an AWS account and S3 bucket
2. Create an IAM user with S3 permissions
3. Generate access keys for the user
4. Configure bucket policies for backup access

## Usage

### Daily Backup

```bash
# Manual daily backup
node scripts/backup-daily.js

# With npm script
npm run backup:daily
```

### Cloud Synchronization

```bash
# Start real-time cloud sync
node scripts/backup-cloud-sync.js

# With npm script
npm run backup:cloud-sync
```

### Backup Restoration

```bash
# Interactive restore
node scripts/restore-backup.js

# List available backups
node scripts/restore-backup.js list local
node scripts/restore-backup.js list google-drive
node scripts/restore-backup.js list aws-s3
```

### Backup Verification

```bash
# Full verification
node scripts/verify-backups.js

# Quick health check
node scripts/verify-backups.js quick

# With npm scripts
npm run backup:verify
npm run backup:verify:quick
```

## Automation

### Cron Jobs

The setup script creates cron job configurations. To install them:

```bash
# Install cron jobs
crontab backups/crontab.txt

# View current cron jobs
crontab -l
```

### Default Schedule

- **Daily Backup**: 2:00 AM every day
- **Weekly Backup**: 3:00 AM every Sunday
- **Monthly Backup**: 4:00 AM on the 1st of each month

## Directory Structure

```
backups/
├── daily/           # Daily backup archives
├── weekly/          # Weekly backup archives
├── monthly/         # Monthly backup archives
├── cloud-sync/      # Real-time sync files
├── logs/            # Backup operation logs
└── temp/            # Temporary files during restore

scripts/
├── backup/
│   ├── config.js           # Configuration management
│   ├── utils.js            # Core utility functions
│   ├── google-drive.js     # Google Drive integration
│   ├── aws-s3.js          # AWS S3 integration
│   ├── notifications.js    # Email notifications
│   └── package.json        # Backup system dependencies
├── backup-daily.js         # Daily backup script
├── backup-cloud-sync.js    # Cloud synchronization
├── restore-backup.js       # Backup restoration
├── verify-backups.js       # Backup verification
└── setup-backup-system.js  # System setup
```

## Backup Types

### Full Backup
- Complete project archive
- Includes all source code, assets, and configuration
- Compressed with gzip compression
- Encrypted with AES-256-GCM

### Incremental Backup
- Only changed files since last backup
- Faster and more efficient
- Maintains full backup chain

### Differential Backup
- All changes since last full backup
- Balance between speed and storage

## Security Features

### Encryption
- **Algorithm**: AES-256-GCM
- **Key Management**: 32-character hex key
- **Authentication**: Additional authenticated data (AAD)
- **IV**: Random initialization vector for each file

### Access Control
- **API Keys**: Stored in environment variables
- **File Permissions**: Restricted to backup system
- **Network Security**: HTTPS/TLS for all cloud communications

### Integrity Verification
- **SHA-256 Hashing**: For all backup files
- **Manifest Files**: JSON metadata with checksums
- **Verification Scripts**: Automated integrity checking

## Monitoring & Logging

### Log Levels
- **ERROR**: Critical failures and errors
- **WARN**: Warnings and non-critical issues
- **INFO**: General information and progress
- **DEBUG**: Detailed debugging information

### Log Files
- **cron.log**: Automated backup execution logs
- **verification-report-*.json**: Detailed verification reports
- **backup-*.log**: Individual backup operation logs

### Email Notifications
- **Success Notifications**: Backup completion with statistics
- **Failure Notifications**: Error details and troubleshooting steps
- **Summary Reports**: Periodic backup health summaries

## Troubleshooting

### Common Issues

#### Backup Fails with "Configuration validation failed"
- Check that `.env.backup.local` exists and is properly configured
- Verify all required environment variables are set
- Ensure encryption key is exactly 32 characters

#### Google Drive Upload Fails
- Verify Google Drive API credentials
- Check refresh token is valid and not expired
- Ensure folder ID is correct and accessible

#### AWS S3 Upload Fails
- Verify AWS credentials and permissions
- Check S3 bucket exists and is accessible
- Ensure region is correctly configured

#### Email Notifications Not Working
- Verify SMTP credentials
- Check email provider allows app passwords
- Test SMTP connection manually

### Debug Mode

Enable debug logging by setting:

```env
BACKUP_LOG_LEVEL=debug
```

### Manual Testing

```bash
# Test configuration
node -e "require('./scripts/backup/config').validateConfig()"

# Test Google Drive connection
node -e "require('./scripts/backup/google-drive').initialize()"

# Test AWS S3 connection
node -e "require('./scripts/backup/aws-s3').initialize()"
```

## Performance Optimization

### Backup Size Optimization
- **Exclusion Patterns**: Configured to skip unnecessary files
- **Compression**: gzip compression with configurable level
- **Incremental Backups**: Only backup changed files

### Cloud Upload Optimization
- **Parallel Uploads**: Multiple files uploaded simultaneously
- **Chunked Uploads**: Large files split into chunks
- **Retry Logic**: Automatic retry on network failures

### Storage Management
- **Retention Policies**: Automatic cleanup of old backups
- **Storage Monitoring**: Track usage across all providers
- **Cost Optimization**: Efficient storage utilization

## Disaster Recovery

### Recovery Procedures

1. **Assess the Situation**
   - Identify what data needs to be recovered
   - Determine the most recent valid backup
   - Check backup integrity

2. **Choose Recovery Method**
   - **Full Restore**: Complete system restoration
   - **Selective Restore**: Restore specific files/directories
   - **Point-in-Time Recovery**: Restore to specific date

3. **Execute Recovery**
   ```bash
   # List available backups
   node scripts/restore-backup.js list
   
   # Restore specific backup
   node scripts/restore-backup.js
   ```

4. **Verify Recovery**
   - Test application functionality
   - Verify data integrity
   - Update configurations if needed

### Recovery Time Objectives (RTO)
- **Local Restore**: < 5 minutes
- **Cloud Restore**: < 30 minutes
- **Full System Recovery**: < 2 hours

## Best Practices

### Regular Maintenance
- **Weekly**: Review backup logs and verify integrity
- **Monthly**: Test restore procedures
- **Quarterly**: Review and update retention policies

### Security
- **Rotate API Keys**: Regularly update cloud provider credentials
- **Monitor Access**: Review backup access logs
- **Update Dependencies**: Keep backup system dependencies current

### Performance
- **Monitor Storage**: Track backup storage usage
- **Optimize Schedules**: Adjust backup frequency based on needs
- **Test Regularly**: Verify backup and restore procedures

## Support

### Documentation
- **Setup Guide**: This document
- **API Documentation**: Inline code documentation
- **Troubleshooting**: Common issues and solutions

### Monitoring
- **Health Checks**: Automated system health monitoring
- **Alerts**: Email notifications for issues
- **Logs**: Comprehensive logging for debugging

### Maintenance
- **Updates**: Regular system updates and improvements
- **Security**: Security patches and vulnerability fixes
- **Performance**: Ongoing performance optimization

## License

This backup system is part of the MONONIO AI project and follows the same licensing terms.

---

**Note**: This backup system is designed for enterprise use and includes advanced features for security, reliability, and scalability. Always test backup and restore procedures in a non-production environment before deploying to production.
