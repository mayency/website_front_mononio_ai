#!/usr/bin/env node

/**
 * MONONIO AI Daily Backup Script
 * Enterprise-grade daily backup with multi-cloud support
 */

const path = require('path');
const fs = require('fs').promises;
const { config, validateConfig } = require('./scripts/backup/config');
const BackupUtils = require('./scripts/backup/utils');
const GoogleDriveBackup = require('./scripts/backup/google-drive');
const AWSS3Backup = require('./scripts/backup/aws-s3');
const NotificationService = require('./scripts/backup/notifications');

class DailyBackupManager {
  constructor() {
    this.utils = new BackupUtils();
    this.logger = this.utils.logger;
    this.googleDrive = new GoogleDriveBackup();
    this.awsS3 = new AWSS3Backup();
    this.notifications = new NotificationService();
    
    this.startTime = Date.now();
    this.backupInfo = {
      type: 'daily',
      timestamp: new Date().toISOString(),
      cloudProviders: [],
      errors: []
    };
  }

  /**
   * Main backup execution
   */
  async execute() {
    try {
      this.logger.info('Starting MONONIO AI daily backup process');
      
      // Validate configuration
      validateConfig();
      
      // Ensure backup directories exist
      await this.ensureBackupDirectories();
      
      // Create local backup
      const backupPath = await this.createLocalBackup();
      
      // Upload to cloud providers
      await this.uploadToCloudProviders(backupPath);
      
      // Clean up old backups
      await this.cleanupOldBackups();
      
      // Send success notification
      await this.sendSuccessNotification();
      
      this.logger.info('Daily backup process completed successfully');
      
    } catch (error) {
      this.logger.error(`Daily backup failed: ${error.message}`);
      this.backupInfo.errors.push(error.message);
      await this.sendFailureNotification(error);
      process.exit(1);
    }
  }

  /**
   * Ensure backup directories exist
   */
  async ensureBackupDirectories() {
    const directories = [
      config.backupRoot,
      config.dailyBackupDir,
      config.weeklyBackupDir,
      config.monthlyBackupDir,
      config.cloudSyncDir,
      config.logsDir
    ];

    for (const dir of directories) {
      try {
        await fs.mkdir(dir, { recursive: true });
        this.logger.debug(`Directory ensured: ${dir}`);
      } catch (error) {
        this.logger.error(`Failed to create directory ${dir}: ${error.message}`);
        throw error;
      }
    }
  }

  /**
   * Create local backup archive
   */
  async createLocalBackup() {
    this.logger.info('Creating local backup archive');
    
    const backupFileName = this.utils.generateBackupFilename('daily');
    const backupPath = path.join(config.dailyBackupDir, backupFileName);
    
    // Create archive
    await this.utils.createArchive(
      config.projectRoot,
      backupPath,
      config.excludePatterns
    );
    
    // Calculate file size and hash
    const stats = await fs.stat(backupPath);
    const hash = await this.utils.calculateHash(backupPath);
    
    // Create manifest
    const manifest = await this.utils.createManifest(backupPath, {
      type: 'daily',
      hash,
      size: stats.size,
      sizeFormatted: this.utils.formatBytes(stats.size)
    });
    
    this.backupInfo.size = this.utils.formatBytes(stats.size);
    this.backupInfo.hash = hash;
    this.backupInfo.localPath = backupPath;
    this.backupInfo.manifest = manifest;
    
    this.logger.info(`Local backup created: ${backupPath} (${this.backupInfo.size})`);
    return backupPath;
  }

  /**
   * Upload backup to cloud providers
   */
  async uploadToCloudProviders(backupPath) {
    this.logger.info('Uploading backup to cloud providers');
    
    const uploadPromises = [];
    
    // Google Drive upload
    if (config.googleDrive.clientId) {
      uploadPromises.push(
        this.uploadToGoogleDrive(backupPath).catch(error => {
          this.logger.error(`Google Drive upload failed: ${error.message}`);
          this.backupInfo.errors.push(`Google Drive: ${error.message}`);
        })
      );
    }
    
    // AWS S3 upload
    if (config.aws.accessKeyId) {
      uploadPromises.push(
        this.uploadToAWS(backupPath).catch(error => {
          this.logger.error(`AWS S3 upload failed: ${error.message}`);
          this.backupInfo.errors.push(`AWS S3: ${error.message}`);
        })
      );
    }
    
    // Wait for all uploads to complete
    const results = await Promise.allSettled(uploadPromises);
    
    // Process results
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        this.backupInfo.cloudProviders.push(result.value.provider);
        this.logger.info(`Successfully uploaded to ${result.value.provider}`);
      } else {
        this.logger.error(`Upload failed: ${result.reason}`);
      }
    });
  }

  /**
   * Upload to Google Drive
   */
  async uploadToGoogleDrive(backupPath) {
    this.logger.info('Uploading to Google Drive');
    
    const result = await this.googleDrive.backupFile(backupPath, {
      type: 'daily',
      timestamp: this.backupInfo.timestamp,
      hash: this.backupInfo.hash
    });
    
    return {
      provider: 'Google Drive',
      fileId: result.fileId,
      folderId: result.folderId
    };
  }

  /**
   * Upload to AWS S3
   */
  async uploadToAWS(backupPath) {
    this.logger.info('Uploading to AWS S3');
    
    const result = await this.awsS3.backupFile(backupPath, 'daily', {
      type: 'daily',
      timestamp: this.backupInfo.timestamp,
      hash: this.backupInfo.hash
    });
    
    return {
      provider: 'AWS S3',
      s3Key: result.s3Key,
      location: result.location
    };
  }

  /**
   * Clean up old backups
   */
  async cleanupOldBackups() {
    this.logger.info('Cleaning up old backups');
    
    const cleanupPromises = [
      this.utils.cleanupOldBackups(config.dailyBackupDir, config.retention.daily),
      this.utils.cleanupOldBackups(config.weeklyBackupDir, config.retention.weekly * 7),
      this.utils.cleanupOldBackups(config.monthlyBackupDir, config.retention.monthly * 30)
    ];
    
    // Cloud cleanup
    if (config.googleDrive.clientId) {
      cleanupPromises.push(
        this.googleDrive.cleanupOldBackups(config.retention.daily).catch(error => {
          this.logger.error(`Google Drive cleanup failed: ${error.message}`);
        })
      );
    }
    
    if (config.aws.accessKeyId) {
      cleanupPromises.push(
        this.awsS3.cleanupOldBackups(config.retention.daily).catch(error => {
          this.logger.error(`AWS S3 cleanup failed: ${error.message}`);
        })
      );
    }
    
    const results = await Promise.allSettled(cleanupPromises);
    
    let totalDeleted = 0;
    let totalFreed = 0;
    
    results.forEach(result => {
      if (result.status === 'fulfilled' && result.value) {
        totalDeleted += result.value.deletedCount || 0;
        totalFreed += result.value.freedSpace || 0;
      }
    });
    
    this.logger.info(`Cleanup completed: ${totalDeleted} files deleted, ${this.utils.formatBytes(totalFreed)} freed`);
  }

  /**
   * Send success notification
   */
  async sendSuccessNotification() {
    if (!config.email.host) {
      this.logger.warn('Email not configured, skipping notification');
      return;
    }
    
    try {
      const duration = Date.now() - this.startTime;
      this.backupInfo.duration = this.formatDuration(duration);
      
      await this.notifications.sendBackupSuccessNotification(this.backupInfo);
    } catch (error) {
      this.logger.error(`Failed to send success notification: ${error.message}`);
    }
  }

  /**
   * Send failure notification
   */
  async sendFailureNotification(error) {
    if (!config.email.host) {
      this.logger.warn('Email not configured, skipping notification');
      return;
    }
    
    try {
      await this.notifications.sendBackupFailureNotification(error, this.backupInfo);
    } catch (notificationError) {
      this.logger.error(`Failed to send failure notification: ${notificationError.message}`);
    }
  }

  /**
   * Format duration in human readable format
   */
  formatDuration(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    } else {
      return `${seconds}s`;
    }
  }

  /**
   * Get backup statistics
   */
  async getBackupStats() {
    const stats = {
      daily: await this.utils.getBackupStats(config.dailyBackupDir),
      weekly: await this.utils.getBackupStats(config.weeklyBackupDir),
      monthly: await this.utils.getBackupStats(config.monthlyBackupDir)
    };
    
    return stats;
  }
}

// Main execution
if (require.main === module) {
  const backupManager = new DailyBackupManager();
  
  // Handle graceful shutdown
  process.on('SIGINT', async () => {
    console.log('\nReceived SIGINT, shutting down gracefully...');
    process.exit(0);
  });
  
  process.on('SIGTERM', async () => {
    console.log('\nReceived SIGTERM, shutting down gracefully...');
    process.exit(0);
  });
  
  // Execute backup
  backupManager.execute().catch(error => {
    console.error('Backup execution failed:', error);
    process.exit(1);
  });
}

module.exports = DailyBackupManager;
