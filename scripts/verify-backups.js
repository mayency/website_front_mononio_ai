#!/usr/bin/env node

/**
 * MONONIO AI Backup Verification Script
 * Verifies backup integrity and health
 */

const path = require('path');
const fs = require('fs').promises;
const { config, validateConfig } = require('./scripts/backup/config');
const BackupUtils = require('./scripts/backup/utils');
const GoogleDriveBackup = require('./scripts/backup/google-drive');
const AWSS3Backup = require('./scripts/backup/aws-s3');

class BackupVerificationManager {
  constructor() {
    this.utils = new BackupUtils();
    this.logger = this.utils.logger;
    this.googleDrive = new GoogleDriveBackup();
    this.awsS3 = new AWSS3Backup();
    
    this.verificationResults = {
      local: { total: 0, valid: 0, invalid: 0, errors: [] },
      googleDrive: { total: 0, valid: 0, invalid: 0, errors: [] },
      awsS3: { total: 0, valid: 0, invalid: 0, errors: [] }
    };
  }

  /**
   * Verify all backups
   */
  async verifyAllBackups() {
    try {
      this.logger.info('Starting comprehensive backup verification');
      
      // Validate configuration
      validateConfig();
      
      // Verify local backups
      await this.verifyLocalBackups();
      
      // Verify cloud backups
      await this.verifyCloudBackups();
      
      // Generate verification report
      await this.generateVerificationReport();
      
      this.logger.info('Backup verification completed');
      
    } catch (error) {
      this.logger.error(`Backup verification failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Verify local backups
   */
  async verifyLocalBackups() {
    this.logger.info('Verifying local backups');
    
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
            await this.verifyLocalBackup(filePath, type);
          }
        }
      } catch (error) {
        this.logger.warn(`Failed to verify directory ${dir}: ${error.message}`);
        this.verificationResults.local.errors.push(`Directory ${dir}: ${error.message}`);
      }
    }
  }

  /**
   * Verify individual local backup
   */
  async verifyLocalBackup(backupPath, type) {
    try {
      this.verificationResults.local.total++;
      
      // Check if file exists and is readable
      await fs.access(backupPath);
      const stats = await fs.stat(backupPath);
      
      if (stats.size === 0) {
        throw new Error('Backup file is empty');
      }
      
      // Verify manifest if exists
      const manifestPath = backupPath.replace(/\.[^.]+$/, '.manifest.json');
      let manifest = null;
      
      try {
        const manifestContent = await fs.readFile(manifestPath, 'utf8');
        manifest = JSON.parse(manifestContent);
        
        // Verify hash
        const isValid = await this.utils.verifyBackup(backupPath, manifest.hash);
        if (!isValid) {
          throw new Error('Hash verification failed');
        }
        
        // Verify manifest structure
        this.verifyManifestStructure(manifest);
        
      } catch (error) {
        this.logger.warn(`Manifest verification failed for ${path.basename(backupPath)}: ${error.message}`);
        // Continue without manifest verification
      }
      
      // Test archive integrity
      await this.testArchiveIntegrity(backupPath);
      
      this.verificationResults.local.valid++;
      this.logger.info(`✓ Local backup verified: ${path.basename(backupPath)}`);
      
    } catch (error) {
      this.verificationResults.local.invalid++;
      this.verificationResults.local.errors.push(`${path.basename(backupPath)}: ${error.message}`);
      this.logger.error(`✗ Local backup verification failed: ${path.basename(backupPath)} - ${error.message}`);
    }
  }

  /**
   * Verify manifest structure
   */
  verifyManifestStructure(manifest) {
    const requiredFields = ['timestamp', 'filename', 'size', 'hash', 'type', 'version', 'project'];
    
    for (const field of requiredFields) {
      if (!manifest[field]) {
        throw new Error(`Missing required manifest field: ${field}`);
      }
    }
    
    // Validate hash format
    if (!/^[a-f0-9]{64}$/i.test(manifest.hash)) {
      throw new Error('Invalid hash format in manifest');
    }
    
    // Validate timestamp format
    if (isNaN(Date.parse(manifest.timestamp))) {
      throw new Error('Invalid timestamp format in manifest');
    }
  }

  /**
   * Test archive integrity
   */
  async testArchiveIntegrity(backupPath) {
    const tar = require('tar');
    
    return new Promise((resolve, reject) => {
      const stream = tar.list({
        file: backupPath,
        onentry: (entry) => {
          // Just verify we can read the entry
        }
      });
      
      stream.on('error', (error) => {
        reject(new Error(`Archive integrity test failed: ${error.message}`));
      });
      
      stream.on('end', () => {
        resolve();
      });
    });
  }

  /**
   * Verify cloud backups
   */
  async verifyCloudBackups() {
    // Verify Google Drive backups
    if (config.googleDrive.clientId) {
      await this.verifyGoogleDriveBackups();
    }
    
    // Verify AWS S3 backups
    if (config.aws.accessKeyId) {
      await this.verifyAWSBackups();
    }
  }

  /**
   * Verify Google Drive backups
   */
  async verifyGoogleDriveBackups() {
    try {
      this.logger.info('Verifying Google Drive backups');
      await this.googleDrive.initialize();
      
      const folders = await this.googleDrive.getOrCreateBackupFolder();
      const files = await this.googleDrive.listFiles(folders.dateFolder.id);
      
      for (const file of files) {
        if (file.name.endsWith('.tar.gz')) {
          await this.verifyGoogleDriveBackup(file);
        }
      }
      
    } catch (error) {
      this.logger.error(`Google Drive verification failed: ${error.message}`);
      this.verificationResults.googleDrive.errors.push(error.message);
    }
  }

  /**
   * Verify individual Google Drive backup
   */
  async verifyGoogleDriveBackup(file) {
    try {
      this.verificationResults.googleDrive.total++;
      
      // Check file size
      if (!file.size || parseInt(file.size) === 0) {
        throw new Error('Backup file is empty');
      }
      
      // Check file metadata
      if (!file.createdTime || !file.modifiedTime) {
        throw new Error('Missing file metadata');
      }
      
      // Verify file name format
      if (!file.name.match(/^mononio-ai-.*-\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}-.*\.tar\.gz$/)) {
        throw new Error('Invalid backup file name format');
      }
      
      this.verificationResults.googleDrive.valid++;
      this.logger.info(`✓ Google Drive backup verified: ${file.name}`);
      
    } catch (error) {
      this.verificationResults.googleDrive.invalid++;
      this.verificationResults.googleDrive.errors.push(`${file.name}: ${error.message}`);
      this.logger.error(`✗ Google Drive backup verification failed: ${file.name} - ${error.message}`);
    }
  }

  /**
   * Verify AWS S3 backups
   */
  async verifyAWSBackups() {
    try {
      this.logger.info('Verifying AWS S3 backups');
      await this.awsS3.initialize();
      
      const objects = await this.awsS3.listObjects('backups/');
      
      for (const obj of objects) {
        if (obj.Key.endsWith('.tar.gz')) {
          await this.verifyAWSBackup(obj);
        }
      }
      
    } catch (error) {
      this.logger.error(`AWS S3 verification failed: ${error.message}`);
      this.verificationResults.awsS3.errors.push(error.message);
    }
  }

  /**
   * Verify individual AWS S3 backup
   */
  async verifyAWSBackup(obj) {
    try {
      this.verificationResults.awsS3.total++;
      
      // Check object size
      if (!obj.Size || obj.Size === 0) {
        throw new Error('Backup object is empty');
      }
      
      // Check last modified date
      if (!obj.LastModified) {
        throw new Error('Missing last modified date');
      }
      
      // Verify S3 key format
      if (!obj.Key.match(/^backups\/.*\/\d{4}\/\d{2}\/\d{2}\/.*\.tar\.gz$/)) {
        throw new Error('Invalid S3 key format');
      }
      
      // Get object metadata
      const metadata = await this.awsS3.getObjectMetadata(obj.Key);
      
      // Verify metadata
      if (!metadata.Metadata || !metadata.Metadata['backup-type']) {
        throw new Error('Missing backup metadata');
      }
      
      this.verificationResults.awsS3.valid++;
      this.logger.info(`✓ AWS S3 backup verified: ${obj.Key}`);
      
    } catch (error) {
      this.verificationResults.awsS3.invalid++;
      this.verificationResults.awsS3.errors.push(`${obj.Key}: ${error.message}`);
      this.logger.error(`✗ AWS S3 backup verification failed: ${obj.Key} - ${error.message}`);
    }
  }

  /**
   * Generate verification report
   */
  async generateVerificationReport() {
    const report = {
      timestamp: new Date().toISOString(),
      summary: this.generateSummary(),
      details: this.verificationResults,
      recommendations: this.generateRecommendations()
    };
    
    // Save report to file
    const reportPath = path.join(config.logsDir, `verification-report-${Date.now()}.json`);
    await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
    
    // Display summary
    this.displaySummary(report.summary);
    
    this.logger.info(`Verification report saved: ${reportPath}`);
  }

  /**
   * Generate verification summary
   */
  generateSummary() {
    const total = this.verificationResults.local.total + 
                  this.verificationResults.googleDrive.total + 
                  this.verificationResults.awsS3.total;
    
    const valid = this.verificationResults.local.valid + 
                  this.verificationResults.googleDrive.valid + 
                  this.verificationResults.awsS3.valid;
    
    const invalid = this.verificationResults.local.invalid + 
                    this.verificationResults.googleDrive.invalid + 
                    this.verificationResults.awsS3.invalid;
    
    const totalErrors = this.verificationResults.local.errors.length + 
                        this.verificationResults.googleDrive.errors.length + 
                        this.verificationResults.awsS3.errors.length;
    
    return {
      total,
      valid,
      invalid,
      totalErrors,
      successRate: total > 0 ? ((valid / total) * 100).toFixed(2) : 0,
      status: invalid === 0 ? 'HEALTHY' : invalid <= total * 0.1 ? 'WARNING' : 'CRITICAL'
    };
  }

  /**
   * Generate recommendations
   */
  generateRecommendations() {
    const recommendations = [];
    
    // Check success rate
    const summary = this.generateSummary();
    if (summary.successRate < 90) {
      recommendations.push('Backup success rate is below 90%. Review failed backups and fix underlying issues.');
    }
    
    // Check for missing backups
    if (this.verificationResults.local.total === 0) {
      recommendations.push('No local backups found. Ensure backup scripts are running properly.');
    }
    
    // Check cloud backup availability
    if (config.googleDrive.clientId && this.verificationResults.googleDrive.total === 0) {
      recommendations.push('No Google Drive backups found. Check Google Drive integration.');
    }
    
    if (config.aws.accessKeyId && this.verificationResults.awsS3.total === 0) {
      recommendations.push('No AWS S3 backups found. Check AWS S3 integration.');
    }
    
    // Check for recent backups
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    
    if (this.verificationResults.local.total > 0) {
      recommendations.push('Verify that recent backups exist (within last 24 hours).');
    }
    
    if (recommendations.length === 0) {
      recommendations.push('All backup systems are functioning correctly.');
    }
    
    return recommendations;
  }

  /**
   * Display verification summary
   */
  displaySummary(summary) {
    console.log('\n=== BACKUP VERIFICATION SUMMARY ===');
    console.log(`Total Backups: ${summary.total}`);
    console.log(`Valid: ${summary.valid}`);
    console.log(`Invalid: ${summary.invalid}`);
    console.log(`Success Rate: ${summary.successRate}%`);
    console.log(`Status: ${summary.status}`);
    console.log(`Total Errors: ${summary.totalErrors}`);
    
    if (summary.totalErrors > 0) {
      console.log('\n=== ERRORS ===');
      
      if (this.verificationResults.local.errors.length > 0) {
        console.log('\nLocal Backups:');
        this.verificationResults.local.errors.forEach(error => console.log(`  - ${error}`));
      }
      
      if (this.verificationResults.googleDrive.errors.length > 0) {
        console.log('\nGoogle Drive:');
        this.verificationResults.googleDrive.errors.forEach(error => console.log(`  - ${error}`));
      }
      
      if (this.verificationResults.awsS3.errors.length > 0) {
        console.log('\nAWS S3:');
        this.verificationResults.awsS3.errors.forEach(error => console.log(`  - ${error}`));
      }
    }
    
    console.log('\n=== RECOMMENDATIONS ===');
    this.generateRecommendations().forEach(rec => console.log(`- ${rec}`));
    console.log('');
  }

  /**
   * Quick health check
   */
  async quickHealthCheck() {
    try {
      this.logger.info('Performing quick backup health check');
      
      // Check if backup directories exist
      const directories = [config.dailyBackupDir, config.weeklyBackupDir, config.monthlyBackupDir];
      for (const dir of directories) {
        try {
          await fs.access(dir);
        } catch (error) {
          throw new Error(`Backup directory missing: ${dir}`);
        }
      }
      
      // Check for recent backups
      const recentBackups = await this.getRecentBackups();
      if (recentBackups.length === 0) {
        throw new Error('No recent backups found');
      }
      
      // Check cloud connectivity
      if (config.googleDrive.clientId) {
        await this.googleDrive.initialize();
      }
      
      if (config.aws.accessKeyId) {
        await this.awsS3.initialize();
      }
      
      this.logger.info('Quick health check passed');
      return { status: 'HEALTHY', message: 'All backup systems operational' };
      
    } catch (error) {
      this.logger.error(`Quick health check failed: ${error.message}`);
      return { status: 'UNHEALTHY', message: error.message };
    }
  }

  /**
   * Get recent backups
   */
  async getRecentBackups() {
    const recentBackups = [];
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    try {
      const files = await fs.readdir(config.dailyBackupDir);
      
      for (const file of files) {
        if (file.endsWith('.tar.gz')) {
          const filePath = path.join(config.dailyBackupDir, file);
          const stats = await fs.stat(filePath);
          
          if (stats.mtime > oneDayAgo) {
            recentBackups.push({
              filename: file,
              path: filePath,
              modified: stats.mtime
            });
          }
        }
      }
    } catch (error) {
      this.logger.warn(`Failed to check recent backups: ${error.message}`);
    }
    
    return recentBackups;
  }
}

// Main execution
if (require.main === module) {
  const verificationManager = new BackupVerificationManager();
  
  const args = process.argv.slice(2);
  const command = args[0] || 'full';
  
  switch (command) {
    case 'full':
      verificationManager.verifyAllBackups().catch(error => {
        console.error('Verification failed:', error);
        process.exit(1);
      });
      break;
      
    case 'quick':
      verificationManager.quickHealthCheck().then(result => {
        console.log(`Health Check: ${result.status}`);
        console.log(`Message: ${result.message}`);
        process.exit(result.status === 'HEALTHY' ? 0 : 1);
      }).catch(error => {
        console.error('Health check failed:', error);
        process.exit(1);
      });
      break;
      
    default:
      console.log('Usage: node verify-backups.js [full|quick]');
      console.log('  full  - Complete backup verification (default)');
      console.log('  quick - Quick health check');
      process.exit(1);
  }
}

module.exports = BackupVerificationManager;
