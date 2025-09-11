#!/usr/bin/env node

/**
 * MONONIO AI Backup Restore Script
 * Disaster recovery and backup restoration tool
 */

const path = require('path');
const fs = require('fs').promises;
const { config, validateConfig } = require('./scripts/backup/config');
const BackupUtils = require('./scripts/backup/utils');
const GoogleDriveBackup = require('./scripts/backup/google-drive');
const AWSS3Backup = require('./scripts/backup/aws-s3');
const NotificationService = require('./scripts/backup/notifications');

class BackupRestoreManager {
  constructor() {
    this.utils = new BackupUtils();
    this.logger = this.utils.logger;
    this.googleDrive = new GoogleDriveBackup();
    this.awsS3 = new AWSS3Backup();
    this.notifications = new NotificationService();
  }

  /**
   * List available backups
   */
  async listBackups(source = 'local') {
    try {
      this.logger.info(`Listing backups from ${source}`);
      
      switch (source) {
        case 'local':
          return await this.listLocalBackups();
        case 'google-drive':
          return await this.listGoogleDriveBackups();
        case 'aws-s3':
          return await this.listAWSBackups();
        default:
          throw new Error(`Unknown backup source: ${source}`);
      }
    } catch (error) {
      this.logger.error(`Failed to list backups: ${error.message}`);
      throw error;
    }
  }

  /**
   * List local backups
   */
  async listLocalBackups() {
    const backups = [];
    
    const directories = [
      { dir: config.dailyBackupDir, type: 'daily' },
      { dir: config.weeklyBackupDir, type: 'weekly' },
      { dir: config.monthlyBackupDir, type: 'monthly' }
    ];

    for (const { dir, type } of directories) {
      try {
        const files = await fs.readdir(dir);
        
        for (const file of files) {
          if (file.endsWith('.tar.gz')) {
            const filePath = path.join(dir, file);
            const stats = await fs.stat(filePath);
            const manifestPath = filePath.replace(/\.[^.]+$/, '.manifest.json');
            
            let manifest = null;
            try {
              const manifestContent = await fs.readFile(manifestPath, 'utf8');
              manifest = JSON.parse(manifestContent);
            } catch (error) {
              this.logger.warn(`No manifest found for ${file}`);
            }

            backups.push({
              source: 'local',
              type,
              filename: file,
              path: filePath,
              size: stats.size,
              sizeFormatted: this.utils.formatBytes(stats.size),
              created: stats.birthtime,
              modified: stats.mtime,
              manifest
            });
          }
        }
      } catch (error) {
        this.logger.warn(`Failed to read directory ${dir}: ${error.message}`);
      }
    }

    return backups.sort((a, b) => new Date(b.created) - new Date(a.created));
  }

  /**
   * List Google Drive backups
   */
  async listGoogleDriveBackups() {
    try {
      await this.googleDrive.initialize();
      const folders = await this.googleDrive.getOrCreateBackupFolder();
      const files = await this.googleDrive.listFiles(folders.dateFolder.id);
      
      return files
        .filter(file => file.name.endsWith('.tar.gz'))
        .map(file => ({
          source: 'google-drive',
          type: 'cloud',
          filename: file.name,
          fileId: file.id,
          size: parseInt(file.size) || 0,
          sizeFormatted: this.utils.formatBytes(parseInt(file.size) || 0),
          created: new Date(file.createdTime),
          modified: new Date(file.modifiedTime)
        }))
        .sort((a, b) => new Date(b.created) - new Date(a.created));
    } catch (error) {
      this.logger.error(`Failed to list Google Drive backups: ${error.message}`);
      return [];
    }
  }

  /**
   * List AWS S3 backups
   */
  async listAWSBackups() {
    try {
      await this.awsS3.initialize();
      const objects = await this.awsS3.listObjects('backups/');
      
      return objects
        .filter(obj => obj.Key.endsWith('.tar.gz'))
        .map(obj => ({
          source: 'aws-s3',
          type: 'cloud',
          filename: path.basename(obj.Key),
          s3Key: obj.Key,
          size: obj.Size,
          sizeFormatted: this.utils.formatBytes(obj.Size),
          created: obj.LastModified,
          modified: obj.LastModified
        }))
        .sort((a, b) => new Date(b.created) - new Date(a.created));
    } catch (error) {
      this.logger.error(`Failed to list AWS S3 backups: ${error.message}`);
      return [];
    }
  }

  /**
   * Restore backup
   */
  async restoreBackup(backupInfo, restorePath = null) {
    try {
      this.logger.info(`Starting restore from ${backupInfo.source}: ${backupInfo.filename}`);
      
      const targetPath = restorePath || config.projectRoot;
      const tempPath = path.join(config.backupRoot, 'temp', `restore-${Date.now()}`);
      
      // Ensure temp directory exists
      await fs.mkdir(tempPath, { recursive: true });
      
      let backupFilePath;
      
      // Download backup if from cloud
      if (backupInfo.source === 'google-drive') {
        backupFilePath = await this.downloadFromGoogleDrive(backupInfo, tempPath);
      } else if (backupInfo.source === 'aws-s3') {
        backupFilePath = await this.downloadFromAWS(backupInfo, tempPath);
      } else {
        backupFilePath = backupInfo.path;
      }
      
      // Verify backup integrity
      await this.verifyBackupIntegrity(backupFilePath, backupInfo);
      
      // Extract backup
      await this.extractBackup(backupFilePath, targetPath);
      
      // Clean up temp files
      await fs.rmdir(tempPath, { recursive: true });
      
      this.logger.info(`Restore completed successfully to ${targetPath}`);
      
      // Send notification
      await this.sendRestoreNotification(backupInfo, targetPath, true);
      
    } catch (error) {
      this.logger.error(`Restore failed: ${error.message}`);
      await this.sendRestoreNotification(backupInfo, restorePath, false, error);
      throw error;
    }
  }

  /**
   * Download backup from Google Drive
   */
  async downloadFromGoogleDrive(backupInfo, tempPath) {
    const outputPath = path.join(tempPath, backupInfo.filename);
    await this.googleDrive.downloadFile(backupInfo.fileId, outputPath);
    return outputPath;
  }

  /**
   * Download backup from AWS S3
   */
  async downloadFromAWS(backupInfo, tempPath) {
    const outputPath = path.join(tempPath, backupInfo.filename);
    await this.awsS3.downloadFile(backupInfo.s3Key, outputPath);
    return outputPath;
  }

  /**
   * Verify backup integrity
   */
  async verifyBackupIntegrity(backupPath, backupInfo) {
    this.logger.info('Verifying backup integrity');
    
    if (backupInfo.manifest && backupInfo.manifest.hash) {
      const isValid = await this.utils.verifyBackup(backupPath, backupInfo.manifest.hash);
      if (!isValid) {
        throw new Error('Backup integrity check failed - hash mismatch');
      }
    } else {
      this.logger.warn('No manifest found, skipping integrity check');
    }
  }

  /**
   * Extract backup archive
   */
  async extractBackup(backupPath, targetPath) {
    this.logger.info(`Extracting backup to ${targetPath}`);
    
    const tar = require('tar');
    
    // Create target directory if it doesn't exist
    await fs.mkdir(targetPath, { recursive: true });
    
    // Extract archive
    await tar.extract({
      file: backupPath,
      cwd: targetPath,
      strip: 1 // Remove the root directory from the archive
    });
    
    this.logger.info('Backup extraction completed');
  }

  /**
   * Send restore notification
   */
  async sendRestoreNotification(backupInfo, restorePath, success, error = null) {
    if (!config.email.host) {
      return;
    }

    try {
      const subject = success 
        ? `✅ MONONIO AI Restore Successful - ${new Date().toLocaleDateString()}`
        : `❌ MONONIO AI Restore Failed - ${new Date().toLocaleDateString()}`;

      const content = {
        backupInfo,
        restorePath,
        success,
        error: error ? {
          message: error.message,
          stack: error.stack
        } : null,
        timestamp: new Date().toISOString()
      };

      if (success) {
        await this.notifications.sendEmail(subject, this.generateRestoreSuccessHTML(content), this.generateRestoreSuccessText(content));
      } else {
        await this.notifications.sendEmail(subject, this.generateRestoreFailureHTML(content), this.generateRestoreFailureText(content));
      }
    } catch (notificationError) {
      this.logger.error(`Failed to send restore notification: ${notificationError.message}`);
    }
  }

  /**
   * Generate restore success email HTML
   */
  generateRestoreSuccessHTML(content) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Restore Successful</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #4CAF50; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; }
            .success { color: #4CAF50; font-weight: bold; }
            .info-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .info-table th, .info-table td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
            .info-table th { background-color: #f2f2f2; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>✅ Restore Successful</h1>
                <p>MONONIO AI Backup System</p>
            </div>
            <div class="content">
                <p class="success">Your backup has been restored successfully!</p>
                
                <table class="info-table">
                    <tr><th>Backup Source</th><td>${content.backupInfo.source}</td></tr>
                    <tr><th>Backup File</th><td>${content.backupInfo.filename}</td></tr>
                    <tr><th>Restore Path</th><td>${content.restorePath}</td></tr>
                    <tr><th>Restore Time</th><td>${content.timestamp}</td></tr>
                    <tr><th>Backup Size</th><td>${content.backupInfo.sizeFormatted}</td></tr>
                </table>

                <p>Your data has been successfully restored from the backup.</p>
                
                <p><strong>Next Steps:</strong></p>
                <ul>
                    <li>Verify the restored files and directories</li>
                    <li>Test application functionality</li>
                    <li>Update any necessary configurations</li>
                    <li>Resume normal operations</li>
                </ul>
            </div>
        </div>
    </body>
    </html>
    `;
  }

  /**
   * Generate restore success email text
   */
  generateRestoreSuccessText(content) {
    return `
MONONIO AI Restore Successful

Your backup has been restored successfully!

Restore Details:
- Backup Source: ${content.backupInfo.source}
- Backup File: ${content.backupInfo.filename}
- Restore Path: ${content.restorePath}
- Restore Time: ${content.timestamp}
- Backup Size: ${content.backupInfo.sizeFormatted}

Your data has been successfully restored from the backup.

Next Steps:
- Verify the restored files and directories
- Test application functionality
- Update any necessary configurations
- Resume normal operations

MONONIO AI Backup System
    `;
  }

  /**
   * Generate restore failure email HTML
   */
  generateRestoreFailureHTML(content) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Restore Failed</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #f44336; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; }
            .error { color: #f44336; font-weight: bold; }
            .error-details { background: #fff; border: 1px solid #ddd; padding: 15px; margin: 15px 0; border-radius: 5px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>❌ Restore Failed</h1>
                <p>MONONIO AI Backup System</p>
            </div>
            <div class="content">
                <p class="error">Your backup restore has failed!</p>
                
                <div class="error-details">
                    <h3>Error Details:</h3>
                    <p><strong>Message:</strong> ${content.error.message}</p>
                    <p><strong>Backup File:</strong> ${content.backupInfo.filename}</p>
                    <p><strong>Restore Path:</strong> ${content.restorePath}</p>
                </div>

                <p><strong>Immediate Actions Required:</strong></p>
                <ul>
                    <li>Check backup file integrity</li>
                    <li>Verify restore path permissions</li>
                    <li>Check available disk space</li>
                    <li>Review restore logs for more details</li>
                </ul>
            </div>
        </div>
    </body>
    </html>
    `;
  }

  /**
   * Generate restore failure email text
   */
  generateRestoreFailureText(content) {
    return `
MONONIO AI Restore Failed

Your backup restore has failed!

Error Details:
- Message: ${content.error.message}
- Backup File: ${content.backupInfo.filename}
- Restore Path: ${content.restorePath}
- Time: ${content.timestamp}

Immediate Actions Required:
- Check backup file integrity
- Verify restore path permissions
- Check available disk space
- Review restore logs for more details

MONONIO AI Backup System
    `;
  }

  /**
   * Interactive restore menu
   */
  async interactiveRestore() {
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const question = (query) => new Promise(resolve => rl.question(query, resolve));

    try {
      console.log('\n=== MONONIO AI Backup Restore ===\n');
      
      // Select backup source
      console.log('Select backup source:');
      console.log('1. Local backups');
      console.log('2. Google Drive');
      console.log('3. AWS S3');
      
      const sourceChoice = await question('Enter choice (1-3): ');
      const sources = ['local', 'google-drive', 'aws-s3'];
      const source = sources[parseInt(sourceChoice) - 1];
      
      if (!source) {
        throw new Error('Invalid source choice');
      }
      
      // List available backups
      console.log(`\nFetching backups from ${source}...`);
      const backups = await this.listBackups(source);
      
      if (backups.length === 0) {
        console.log('No backups found.');
        return;
      }
      
      // Display backups
      console.log('\nAvailable backups:');
      backups.forEach((backup, index) => {
        console.log(`${index + 1}. ${backup.filename}`);
        console.log(`   Size: ${backup.sizeFormatted}`);
        console.log(`   Created: ${backup.created.toLocaleString()}`);
        console.log(`   Source: ${backup.source}`);
        console.log('');
      });
      
      // Select backup
      const backupChoice = await question(`Select backup (1-${backups.length}): `);
      const selectedBackup = backups[parseInt(backupChoice) - 1];
      
      if (!selectedBackup) {
        throw new Error('Invalid backup choice');
      }
      
      // Get restore path
      const restorePath = await question('Enter restore path (press Enter for project root): ');
      const targetPath = restorePath.trim() || config.projectRoot;
      
      // Confirm restore
      console.log(`\nYou are about to restore:`);
      console.log(`- Backup: ${selectedBackup.filename}`);
      console.log(`- To: ${targetPath}`);
      console.log(`- Size: ${selectedBackup.sizeFormatted}`);
      
      const confirm = await question('\nAre you sure? (yes/no): ');
      
      if (confirm.toLowerCase() !== 'yes') {
        console.log('Restore cancelled.');
        return;
      }
      
      // Perform restore
      console.log('\nStarting restore...');
      await this.restoreBackup(selectedBackup, targetPath);
      console.log('Restore completed successfully!');
      
    } finally {
      rl.close();
    }
  }
}

// Main execution
if (require.main === module) {
  const restoreManager = new BackupRestoreManager();
  
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    // Interactive mode
    restoreManager.interactiveRestore().catch(error => {
      console.error('Restore failed:', error);
      process.exit(1);
    });
  } else {
    // Command line mode
    const command = args[0];
    
    switch (command) {
      case 'list':
        const source = args[1] || 'local';
        restoreManager.listBackups(source).then(backups => {
          console.log(`\nBackups from ${source}:`);
          backups.forEach(backup => {
            console.log(`- ${backup.filename} (${backup.sizeFormatted}) - ${backup.created.toLocaleString()}`);
          });
        }).catch(error => {
          console.error('Failed to list backups:', error);
          process.exit(1);
        });
        break;
        
      default:
        console.log('Usage: node restore-backup.js [list <source>]');
        console.log('Sources: local, google-drive, aws-s3');
        process.exit(1);
    }
  }
}

module.exports = BackupRestoreManager;
