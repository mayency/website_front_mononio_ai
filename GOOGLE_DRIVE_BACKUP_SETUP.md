# Google Drive Backup Setup for MONONIO AI

This guide will help you set up automated backups to your Google Drive folder.

## Prerequisites

1. **Google Cloud Project**: You need a Google Cloud Project with the Drive API enabled
2. **OAuth 2.0 Credentials**: Client ID and Client Secret from Google Cloud Console
3. **Node.js Dependencies**: The required packages will be installed automatically

## Quick Setup

### Step 1: Install Dependencies
```bash
npm install googleapis tar
```

### Step 2: Set Up Google Drive API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Drive API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Drive API"
   - Click "Enable"
4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client ID"
   - Choose "Desktop application"
   - Set authorized redirect URI to: `urn:ietf:wg:oauth:2.0:oob`
   - Download the credentials JSON file

### Step 3: Configure Backup System
```bash
node scripts/setup-google-drive-backup.js
```

This interactive script will:
- Ask for your Google Drive Client ID and Client Secret
- Generate a refresh token for authentication
- Update your `.env.backup.local` file with the credentials
- Set the target folder ID to: `1LfklZQICNu-vBRY95BSx_YHzMKatdo65`

### Step 4: Run Backup
```bash
node scripts/backup-to-google-drive.js
```

## What Gets Backed Up

The backup includes:
- `/app` - All application code
- `/components` - React components
- `/lib` - Utility libraries
- `/scripts` - Backup and utility scripts
- `/public` - Static assets
- `/docs` - Documentation
- `/changelog` - Changelog files
- Configuration files (`package.json`, `tsconfig.json`, etc.)

## Excluded Files

The following are excluded from backups:
- `node_modules/`
- `.git/`
- `.next/`
- `dist/`
- `build/`
- `coverage/`
- `test-results/`
- `playwright-report/`
- `backups/`
- Environment files (`.env*`)

## Backup Structure

Backups are organized in your Google Drive folder as:
```
MONONIO-AI-Backups/
├── 2025-01-XX/
│   ├── mononio-ai-backup-YYYY-MM-DDTHH-MM-SS.tar.gz
│   └── mononio-ai-backup-YYYY-MM-DDTHH-MM-SS.metadata.json
└── sync/
    └── [real-time sync files]
```

## Automated Backups

To set up automated backups, you can:

1. **Daily Backups**: Use the existing daily backup script
   ```bash
   node scripts/backup-daily.js
   ```

2. **Real-time Sync**: Use the cloud sync script
   ```bash
   node scripts/backup-cloud-sync.js
   ```

3. **Cron Job**: Set up a cron job for regular backups
   ```bash
   # Add to crontab (crontab -e)
   0 2 * * * cd /path/to/project && node scripts/backup-to-google-drive.js
   ```

## Troubleshooting

### Common Issues

1. **"Configuration validation failed"**
   - Make sure `.env.backup.local` exists and is properly configured
   - Run the setup script again: `node scripts/setup-google-drive-backup.js`

2. **"Google Drive API not enabled"**
   - Go to Google Cloud Console and enable the Drive API
   - Make sure you're using the correct project

3. **"Invalid credentials"**
   - Check that your Client ID and Client Secret are correct
   - Regenerate the refresh token by running the setup script again

4. **"Permission denied"**
   - Make sure the Google Drive folder ID is correct
   - Verify that your Google account has access to the folder

### Getting Help

- Check the backup logs in `backups/logs/`
- Verify your Google Drive folder permissions
- Ensure all environment variables are set correctly

## Security Notes

- Your credentials are stored in `.env.backup.local` (not committed to git)
- Backups are encrypted using AES-256-GCM
- Only files with Drive API scope are accessible
- Refresh tokens are used for long-term access

## Next Steps

After successful setup:
1. Test the backup: `node scripts/backup-to-google-drive.js`
2. Check your Google Drive folder for the backup
3. Set up automated backups if desired
4. Monitor backup logs for any issues

Your Google Drive folder ID is already configured: `1LfklZQICNu-vBRY95BSx_YHzMKatdo65`

## Results:

1. **Google Cloud Storage Buckets**: You don't have any buckets configured yet, and you need to set up a project ID first.

2. **Current Project Status**: `(unset)` - No Google Cloud project is currently configured.

## Next Steps:

To use Google Cloud Storage, you'll need to:

1. **Authenticate with Google Cloud**:
   ```bash
   gcloud auth login
   ```

2. **Set up a project** (either create a new one or use an existing one):
   ```bash
   gcloud projects list  # to see existing projects
   gcloud config set project YOUR_PROJECT_ID  # to set a project
   ```

3. **Enable the Cloud Storage API** for your project:
   ```bash
   gcloud services enable storage-api.googleapis.com
   ```

4. **Then you can list buckets**:
   ```bash
   gsutil ls
   ```

Would you like me to help you set up authentication and configure a project? You'll need to have a Google Cloud account and either create a new project or use an existing one.

Perfect! The environment variables have been successfully set and verified:

## Environment Variables Configured:

- **Project**: `mononio-ai`
- **Backup Bucket**: `mononio-ai-backups`
- **Dev Bucket**: `mononio-ai-dev-storage`
- **Prod Bucket**: `mononio-ai-production-storage`

These variables are now available in your current shell session. If you want to make them persistent across shell sessions, you can add them to your `~/.zshrc` file:

```bash
echo 'export PROJECT_ID="mononio-ai"' >> ~/.zshrc
echo 'export BACKUP_BUCKET="${PROJECT_ID}-backups"' >> ~/.zshrc
echo 'export DEV_BUCKET="${PROJECT_ID}-dev-storage"' >> ~/.zshrc
echo 'export PROD_BUCKET="${PROJECT_ID}-production-storage"' >> ~/.zshrc
```

Would you like me to add these to your shell configuration file so they persist across sessions?

## Issue: Billing Account Disabled

Your Google Cloud project `mononio-ai` has a billing account linked, but it's in a "closed" state, which prevents creating Cloud Storage buckets.

## Solution:

1. **Go to the Google Cloud Console**: https://console.cloud.google.com/
2. **Navigate to Billing**: 
   - Go to "Billing" in the left sidebar
   - Or visit: https://console.cloud.google.com/billing
3. **Activate Billing**:
   - Select your billing account
   - Make sure it's active and has a valid payment method
   - If needed, add a payment method

4. **Alternative - Create a new project with billing**:
   ```bash
   # Create a new project with a different name
   gcloud projects create mononio-ai-storage --name="MONONIO AI Storage"
   gcloud config set project mononio-ai-storage
   export PROJECT_ID="mononio-ai-storage"
   export DEV_BUCKET="${PROJECT_ID}-dev-storage"
   ```

5. **Or use the Google Cloud Free Tier**:
   - Google Cloud offers a free tier with $300 in credits
   - You can create a new project and enable the free tier

Would you like me to help you create a new project, or would you prefer to activate billing for the current project first?

## Summary

I've encountered the issue that all your Google Cloud billing accounts are disabled, which prevents creating Cloud Storage buckets. Here are your options:

### Option 1: Fix Google Cloud Billing (Recommended for Cloud Storage)
1. **Go to Google Cloud Console**: https://console.cloud.google.com/billing
2. **Activate billing** on one of your projects by adding a valid payment method
3. **Then run the original commands**:
   ```bash
   gsutil mb -p $PROJECT_ID -c STANDARD -l us-central1 gs://$BACKUP_BUCKET
   gsutil uniformbucketlevelaccess set on gs://$BACKUP_BUCKET
   gsutil -m cp -r ~/Desktop/Claude_memory/mononio_backups/* gs://$BACKUP_BUCKET/local-backups/
   ```

### Option 2: Use Google Drive Backup (No Billing Required)
Your project already has a Google Drive backup system set up. To use it:

1. **Get Google Drive API credentials**:
   - Go to https://console.cloud.google.com/
   - Create/select a project
   - Enable Google Drive API
   - Create OAuth 2.0 credentials
   - Set redirect URI to: `urn:ietf:wg:oauth:2.0:oob`

2. **Run the setup**:
   ```bash
   node scripts/setup-google-drive-backup.js
   ```

3. **Create backups**:
   ```bash
   node scripts/backup-to-google-drive.js
   ```

### Option 3: Use Local Backup System
Your project also has local backup scripts that don't require any cloud services:
```bash
node scripts/backup-daily.js
```

**Which option would you prefer?** The Google Drive option is probably the easiest since it doesn't require billing and your project is already configured for it.
