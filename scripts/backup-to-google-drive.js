#!/usr/bin/env node

/**
 * MONONIO AI - Backup to Google Drive
 * Simple script to backup the current system to the specified Google Drive folder
 */

const path = require('path');
const fs = require('fs').promises;
const { config, validateConfig } = require('./backup/config');
const GoogleDriveBackup = require('./backup/google-drive');
const BackupUtils = require('./backup/utils');

class GoogleDriveBackupRunner {
  constructor() {
    this.utils = new BackupUtils();
    this.logger = this.utils.logger;
    this.googleDrive = new GoogleDriveBackup();
  }

  async run() {
    try {
      this.logger.info('🚀 Starting MONONIO AI backup to Google Drive');
      
      // Validate configuration
      try {
        validateConfig();
      } catch (error) {
        this.logger.error('Configuration validation failed. Please run setup first:');
        this.logger.error('node scripts/setup-google-drive-backup.js');
        process.exit(1);
      }

      // Initialize Google Drive
      await this.googleDrive.initialize();
      
      // Create backup
      await this.createBackup();
      
      this.logger.info('✅ Backup completed successfully!');
      
    } catch (error) {
      this.logger.error(`❌ Backup failed: ${error.message}`);
      process.exit(1);
    }
  }

  async createBackup() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupName = `mononio-ai-backup-${timestamp}`;
    
    this.logger.info(`Creating backup: ${backupName}`);

    // Create temporary backup directory
    const tempBackupDir = path.join(config.backupRoot, 'temp', backupName);
    await fs.mkdir(tempBackupDir, { recursive: true });

    try {
      // Create compressed backup
      const backupFile = await this.createCompressedBackup(tempBackupDir, backupName);
      
      // Upload to Google Drive
      const result = await this.googleDrive.backupFile(backupFile, {
        type: 'full_backup',
        timestamp: new Date().toISOString(),
        project: 'mononio-ai',
        version: await this.getProjectVersion()
      });

      this.logger.info(`Backup uploaded to Google Drive: ${result.fileId}`);
      
      // Clean up temporary files
      await fs.rm(tempBackupDir, { recursive: true, force: true });
      
    } catch (error) {
      // Clean up on error
      await fs.rm(tempBackupDir, { recursive: true, force: true });
      throw error;
    }
  }

  async createCompressedBackup(tempDir, backupName) {
    const tar = require('tar');
    const backupFile = path.join(tempDir, `${backupName}.tar.gz`);
    
    this.logger.info('Creating compressed backup...');
    
    const excludePatterns = [
      ...config.excludePatterns,
      ...config.additionalExclusions,
      'backups/**',
      'node_modules/**',
      '.git/**'
    ];

    await tar.create({
      gzip: true,
      file: backupFile,
      cwd: config.projectRoot,
      filter: (path) => {
        // Check if path should be excluded
        for (const pattern of excludePatterns) {
          if (path.includes(pattern.replace('**', ''))) {
            return false;
          }
        }
        return true;
      }
    }, [
      'app',
      'components',
      'lib',
      'scripts',
      'public',
      'docs',
      'changelog',
      'package.json',
      'tsconfig.json',
      'next.config.ts',
      'tailwind.config.js',
      'README.md'
    ]);

    const stats = await fs.stat(backupFile);
    this.logger.info(`Backup created: ${this.utils.formatBytes(stats.size)}`);
    
    return backupFile;
  }

  async getProjectVersion() {
    try {
      const packageJson = await fs.readFile(path.join(config.projectRoot, 'package.json'), 'utf8');
      const pkg = JSON.parse(packageJson);
      return pkg.version || '1.0.0';
    } catch (error) {
      return '1.0.0';
    }
  }
}

// Main execution
if (require.main === module) {
  const backupRunner = new GoogleDriveBackupRunner();
  backupRunner.run().catch(error => {
    console.error('Backup failed:', error);
    process.exit(1);
  });
}

module.exports = GoogleDriveBackupRunner;
