#!/usr/bin/env node

/**
 * MONONIO AI Cloud Sync Script
 * Real-time synchronization with cloud providers
 */

const path = require('path');
const fs = require('fs').promises;
const chokidar = require('chokidar');
const { config, validateConfig } = require('./scripts/backup/config');
const BackupUtils = require('./scripts/backup/utils');
const GoogleDriveBackup = require('./scripts/backup/google-drive');
const AWSS3Backup = require('./scripts/backup/aws-s3');
const NotificationService = require('./scripts/backup/notifications');

class CloudSyncManager {
  constructor() {
    this.utils = new BackupUtils();
    this.logger = this.utils.logger;
    this.googleDrive = new GoogleDriveBackup();
    this.awsS3 = new AWSS3Backup();
    this.notifications = new NotificationService();
    
    this.watcher = null;
    this.syncQueue = new Map();
    this.isRunning = false;
    this.syncStats = {
      filesProcessed: 0,
      filesUploaded: 0,
      filesFailed: 0,
      startTime: Date.now()
    };
  }

  /**
   * Start cloud synchronization
   */
  async start() {
    try {
      this.logger.info('Starting MONONIO AI cloud synchronization');
      
      // Validate configuration
      validateConfig();
      
      // Initialize cloud providers
      await this.initializeCloudProviders();
      
      // Start file watcher
      await this.startFileWatcher();
      
      // Start sync processor
      this.startSyncProcessor();
      
      this.logger.info('Cloud synchronization started successfully');
      
    } catch (error) {
      this.logger.error(`Failed to start cloud sync: ${error.message}`);
      throw error;
    }
  }

  /**
   * Stop cloud synchronization
   */
  async stop() {
    this.logger.info('Stopping cloud synchronization');
    
    if (this.watcher) {
      await this.watcher.close();
    }
    
    this.isRunning = false;
    this.logger.info('Cloud synchronization stopped');
  }

  /**
   * Initialize cloud providers
   */
  async initializeCloudProviders() {
    const initPromises = [];
    
    if (config.googleDrive.clientId) {
      initPromises.push(
        this.googleDrive.initialize().catch(error => {
          this.logger.error(`Google Drive initialization failed: ${error.message}`);
        })
      );
    }
    
    if (config.aws.accessKeyId) {
      initPromises.push(
        this.awsS3.initialize().catch(error => {
          this.logger.error(`AWS S3 initialization failed: ${error.message}`);
        })
      );
    }
    
    await Promise.allSettled(initPromises);
  }

  /**
   * Start file watcher
   */
  async startFileWatcher() {
    const watchPaths = [
      path.join(config.projectRoot, 'app'),
      path.join(config.projectRoot, 'components'),
      path.join(config.projectRoot, 'lib'),
      path.join(config.projectRoot, 'scripts'),
      path.join(config.projectRoot, 'public')
    ];

    // Create ignore patterns
    const ignored = [
      ...config.excludePatterns.map(pattern => `**/${pattern}/**`),
      ...config.additionalExclusions.map(pattern => `**/${pattern}`),
      '**/node_modules/**',
      '**/.git/**',
      '**/backups/**',
      '**/*.log',
      '**/*.tmp'
    ];

    this.watcher = chokidar.watch(watchPaths, {
      ignored: ignored,
      persistent: true,
      ignoreInitial: true,
      awaitWriteFinish: {
        stabilityThreshold: 2000,
        pollInterval: 100
      }
    });

    // Handle file changes
    this.watcher
      .on('add', (filePath) => this.handleFileChange('add', filePath))
      .on('change', (filePath) => this.handleFileChange('change', filePath))
      .on('unlink', (filePath) => this.handleFileChange('unlink', filePath))
      .on('error', (error) => this.logger.error(`File watcher error: ${error.message}`));

    this.logger.info(`File watcher started for ${watchPaths.length} paths`);
  }

  /**
   * Handle file changes
   */
  async handleFileChange(event, filePath) {
    if (this.utils.shouldExclude(filePath)) {
      return;
    }

    const relativePath = path.relative(config.projectRoot, filePath);
    const syncKey = `${event}:${relativePath}`;

    // Add to sync queue
    this.syncQueue.set(syncKey, {
      event,
      filePath,
      relativePath,
      timestamp: Date.now()
    });

    this.logger.debug(`File ${event}: ${relativePath}`);
  }

  /**
   * Start sync processor
   */
  startSyncProcessor() {
    this.isRunning = true;
    this.processSyncQueue();
  }

  /**
   * Process sync queue
   */
  async processSyncQueue() {
    while (this.isRunning) {
      try {
        if (this.syncQueue.size > 0) {
          const entries = Array.from(this.syncQueue.entries());
          this.syncQueue.clear();

          // Process entries in batches
          const batchSize = 5;
          for (let i = 0; i < entries.length; i += batchSize) {
            const batch = entries.slice(i, i + batchSize);
            await this.processBatch(batch);
          }
        }

        // Wait before next iteration
        await new Promise(resolve => setTimeout(resolve, 5000));
      } catch (error) {
        this.logger.error(`Sync processor error: ${error.message}`);
        await new Promise(resolve => setTimeout(resolve, 10000));
      }
    }
  }

  /**
   * Process a batch of sync entries
   */
  async processBatch(batch) {
    const promises = batch.map(([key, entry]) => this.processSyncEntry(entry));
    await Promise.allSettled(promises);
  }

  /**
   * Process individual sync entry
   */
  async processSyncEntry(entry) {
    try {
      this.syncStats.filesProcessed++;

      switch (entry.event) {
        case 'add':
        case 'change':
          await this.syncFile(entry.filePath, entry.relativePath);
          break;
        case 'unlink':
          await this.removeFile(entry.relativePath);
          break;
      }
    } catch (error) {
      this.syncStats.filesFailed++;
      this.logger.error(`Failed to process ${entry.event} for ${entry.relativePath}: ${error.message}`);
    }
  }

  /**
   * Sync file to cloud providers
   */
  async syncFile(filePath, relativePath) {
    try {
      // Check if file exists and is readable
      await fs.access(filePath);
      const stats = await fs.stat(filePath);
      
      if (stats.size > 100 * 1024 * 1024) { // Skip files larger than 100MB
        this.logger.warn(`Skipping large file: ${relativePath} (${this.utils.formatBytes(stats.size)})`);
        return;
      }

      const syncPromises = [];

      // Google Drive sync
      if (config.googleDrive.clientId) {
        syncPromises.push(
          this.syncToGoogleDrive(filePath, relativePath).catch(error => {
            this.logger.error(`Google Drive sync failed for ${relativePath}: ${error.message}`);
          })
        );
      }

      // AWS S3 sync
      if (config.aws.accessKeyId) {
        syncPromises.push(
          this.syncToAWS(filePath, relativePath).catch(error => {
            this.logger.error(`AWS S3 sync failed for ${relativePath}: ${error.message}`);
          })
        );
      }

      await Promise.allSettled(syncPromises);
      this.syncStats.filesUploaded++;
      
    } catch (error) {
      this.logger.error(`Failed to sync file ${relativePath}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Sync file to Google Drive
   */
  async syncToGoogleDrive(filePath, relativePath) {
    // Create sync folder structure
    const folders = await this.googleDrive.getOrCreateBackupFolder();
    const syncFolder = await this.googleDrive.findFolder('sync', folders.mainFolder.id) ||
                      await this.googleDrive.createFolder('sync', folders.mainFolder.id);

    // Upload file
    const fileName = `sync-${relativePath.replace(/\//g, '-')}`;
    await this.googleDrive.uploadFile(filePath, syncFolder.id, fileName);
    
    this.logger.debug(`Synced to Google Drive: ${relativePath}`);
  }

  /**
   * Sync file to AWS S3
   */
  async syncToAWS(filePath, relativePath) {
    const s3Key = `sync/${relativePath}`;
    await this.awsS3.uploadFile(filePath, s3Key, {
      type: 'sync',
      relativePath,
      timestamp: new Date().toISOString()
    });
    
    this.logger.debug(`Synced to AWS S3: ${relativePath}`);
  }

  /**
   * Remove file from cloud providers
   */
  async removeFile(relativePath) {
    const removePromises = [];

    // Google Drive removal
    if (config.googleDrive.clientId) {
      removePromises.push(
        this.removeFromGoogleDrive(relativePath).catch(error => {
          this.logger.error(`Google Drive removal failed for ${relativePath}: ${error.message}`);
        })
      );
    }

    // AWS S3 removal
    if (config.aws.accessKeyId) {
      removePromises.push(
        this.removeFromAWS(relativePath).catch(error => {
          this.logger.error(`AWS S3 removal failed for ${relativePath}: ${error.message}`);
        })
      );
    }

    await Promise.allSettled(removePromises);
    this.logger.debug(`Removed from cloud: ${relativePath}`);
  }

  /**
   * Remove file from Google Drive
   */
  async removeFromGoogleDrive(relativePath) {
    // Implementation would depend on tracking file IDs
    // For now, we'll log the removal
    this.logger.debug(`Would remove from Google Drive: ${relativePath}`);
  }

  /**
   * Remove file from AWS S3
   */
  async removeFromAWS(relativePath) {
    const s3Key = `sync/${relativePath}`;
    await this.awsS3.deleteObject(s3Key);
    this.logger.debug(`Removed from AWS S3: ${s3Key}`);
  }

  /**
   * Get sync statistics
   */
  getSyncStats() {
    const duration = Date.now() - this.syncStats.startTime;
    return {
      ...this.syncStats,
      duration: this.formatDuration(duration),
      queueSize: this.syncQueue.size,
      isRunning: this.isRunning
    };
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
   * Send sync summary notification
   */
  async sendSyncSummary() {
    if (!config.email.host) {
      return;
    }

    try {
      const stats = this.getSyncStats();
      const summary = {
        totalBackups: stats.filesProcessed,
        successful: stats.filesUploaded,
        failed: stats.filesFailed,
        duration: stats.duration,
        recommendations: this.generateRecommendations(stats)
      };

      await this.notifications.sendBackupSummaryNotification(summary);
    } catch (error) {
      this.logger.error(`Failed to send sync summary: ${error.message}`);
    }
  }

  /**
   * Generate recommendations based on sync stats
   */
  generateRecommendations(stats) {
    const recommendations = [];

    if (stats.filesFailed > 0) {
      recommendations.push('Review failed sync operations and check cloud provider connectivity');
    }

    if (stats.filesProcessed > 1000) {
      recommendations.push('Consider implementing incremental sync to reduce processing load');
    }

    if (stats.queueSize > 50) {
      recommendations.push('Sync queue is large, consider increasing processing frequency');
    }

    return recommendations.length > 0 ? recommendations : ['No specific recommendations at this time'];
  }
}

// Main execution
if (require.main === module) {
  const syncManager = new CloudSyncManager();
  
  // Handle graceful shutdown
  process.on('SIGINT', async () => {
    console.log('\nReceived SIGINT, shutting down gracefully...');
    await syncManager.stop();
    process.exit(0);
  });
  
  process.on('SIGTERM', async () => {
    console.log('\nReceived SIGTERM, shutting down gracefully...');
    await syncManager.stop();
    process.exit(0);
  });

  // Send summary every hour
  setInterval(() => {
    syncManager.sendSyncSummary();
  }, 60 * 60 * 1000);
  
  // Start sync
  syncManager.start().catch(error => {
    console.error('Cloud sync failed:', error);
    process.exit(1);
  });
}

module.exports = CloudSyncManager;
