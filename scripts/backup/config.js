/**
 * MONONIO AI Backup System Configuration
 * Enterprise-grade backup configuration with multi-cloud support
 */

const path = require('path');
const os = require('os');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '../../.env.backup.local') });

const config = {
  // Backup directories
  backupRoot: path.join(__dirname, '../../backups'),
  dailyBackupDir: path.join(__dirname, '../../backups/daily'),
  weeklyBackupDir: path.join(__dirname, '../../backups/weekly'),
  monthlyBackupDir: path.join(__dirname, '../../backups/monthly'),
  cloudSyncDir: path.join(__dirname, '../../backups/cloud-sync'),
  logsDir: path.join(__dirname, '../../backups/logs'),

  // Project root
  projectRoot: path.join(__dirname, '../..'),

  // Backup settings
  retention: {
    daily: parseInt(process.env.BACKUP_RETENTION_DAYS) || 30,
    weekly: 12, // 3 months
    monthly: 12  // 1 year
  },

  // Compression settings
  compression: {
    level: parseInt(process.env.BACKUP_COMPRESSION_LEVEL) || 6,
    algorithm: 'gzip'
  },

  // Encryption settings
  encryption: {
    algorithm: process.env.BACKUP_ENCRYPTION_ALGORITHM || 'aes-256-gcm',
    key: process.env.BACKUP_ENCRYPTION_KEY,
    keyLength: 32
  },

  // File exclusions
  excludePatterns: (process.env.BACKUP_EXCLUDE_PATTERNS || 'node_modules,.git,.next,dist,build,coverage,test-results,playwright-report').split(','),
  
  // Additional exclusions
  additionalExclusions: [
    'backups/',
    '.env.local',
    '.env.backup.local',
    '*.log',
    '*.tmp',
    '.DS_Store',
    'Thumbs.db'
  ],

  // Google Drive configuration
  googleDrive: {
    clientId: process.env.GOOGLE_DRIVE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_DRIVE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_DRIVE_REFRESH_TOKEN,
    folderId: process.env.GOOGLE_DRIVE_FOLDER_ID,
    scopes: ['https://www.googleapis.com/auth/drive.file']
  },

  // AWS S3 configuration
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION || 'us-east-1',
    bucket: process.env.AWS_S3_BUCKET
  },

  // Email configuration
  email: {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 587,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    to: process.env.NOTIFICATION_EMAIL
  },

  // GitHub configuration
  github: {
    token: process.env.GITHUB_TOKEN,
    repo: process.env.GITHUB_REPO,
    branch: process.env.GITHUB_BRANCH || 'backup'
  },

  // Vercel configuration
  vercel: {
    token: process.env.VERCEL_TOKEN,
    projectId: process.env.VERCEL_PROJECT_ID
  },

  // Monitoring
  monitoring: {
    enabled: process.env.BACKUP_MONITORING_ENABLED === 'true',
    healthCheckUrl: process.env.BACKUP_HEALTH_CHECK_URL,
    logLevel: process.env.BACKUP_LOG_LEVEL || 'info'
  },

  // System limits
  limits: {
    maxBackupSizeGB: parseInt(process.env.BACKUP_MAX_SIZE_GB) || 10,
    maxConcurrentUploads: 3,
    timeoutMs: 300000 // 5 minutes
  },

  // Backup types
  backupTypes: {
    FULL: 'full',
    INCREMENTAL: 'incremental',
    DIFFERENTIAL: 'differential'
  },

  // Cloud providers
  cloudProviders: {
    GOOGLE_DRIVE: 'google_drive',
    AWS_S3: 'aws_s3',
    GITHUB: 'github',
    VERCEL: 'vercel'
  }
};

// Validation
const validateConfig = () => {
  const errors = [];

  if (!config.encryption.key || config.encryption.key.length !== 32) {
    errors.push('BACKUP_ENCRYPTION_KEY must be exactly 32 characters');
  }

  if (!config.googleDrive.clientId) {
    errors.push('GOOGLE_DRIVE_CLIENT_ID is required');
  }

  if (!config.aws.accessKeyId) {
    errors.push('AWS_ACCESS_KEY_ID is required');
  }

  if (!config.email.host) {
    errors.push('SMTP_HOST is required for notifications');
  }

  if (errors.length > 0) {
    console.error('Configuration validation failed:');
    errors.forEach(error => console.error(`  - ${error}`));
    process.exit(1);
  }
};

module.exports = {
  config,
  validateConfig
};
