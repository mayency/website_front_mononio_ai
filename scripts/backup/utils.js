/**
 * MONONIO AI Backup System Utilities
 * Core utility functions for backup operations
 */

const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');
const zlib = require('zlib');
const { promisify } = require('util');
const archiver = require('archiver');
const { config } = require('./config');

const gzip = promisify(zlib.gzip);
const gunzip = promisify(zlib.gunzip);

class BackupUtils {
  constructor() {
    this.logger = this.createLogger();
  }

  createLogger() {
    return {
      info: (message) => console.log(`[INFO] ${new Date().toISOString()} - ${message}`),
      warn: (message) => console.warn(`[WARN] ${new Date().toISOString()} - ${message}`),
      error: (message) => console.error(`[ERROR] ${new Date().toISOString()} - ${message}`),
      debug: (message) => {
        if (config.monitoring.logLevel === 'debug') {
          console.log(`[DEBUG] ${new Date().toISOString()} - ${message}`);
        }
      }
    };
  }

  /**
   * Generate a unique backup filename with timestamp
   */
  generateBackupFilename(type = 'full', extension = 'tar.gz') {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    return `mononio-ai-${type}-${timestamp}.${extension}`;
  }

  /**
   * Create a compressed archive of the project
   */
  async createArchive(sourceDir, outputPath, excludePatterns = []) {
    return new Promise((resolve, reject) => {
      const output = require('fs').createWriteStream(outputPath);
      const archive = archiver('tar', {
        gzip: true,
        gzipOptions: { level: config.compression.level }
      });

      output.on('close', () => {
        this.logger.info(`Archive created: ${archive.pointer()} bytes`);
        resolve(outputPath);
      });

      archive.on('error', (err) => {
        this.logger.error(`Archive error: ${err.message}`);
        reject(err);
      });

      archive.pipe(output);

      // Add files to archive with exclusions
      archive.directory(sourceDir, false, {
        filter: (entry) => {
          const relativePath = path.relative(sourceDir, entry.prefix + entry.name);
          return !this.shouldExclude(relativePath, excludePatterns);
        }
      });

      archive.finalize();
    });
  }

  /**
   * Check if a file should be excluded from backup
   */
  shouldExclude(filePath, excludePatterns = []) {
    const allExclusions = [...config.excludePatterns, ...config.additionalExclusions, ...excludePatterns];
    
    return allExclusions.some(pattern => {
      if (pattern.includes('*')) {
        const regex = new RegExp(pattern.replace(/\*/g, '.*'));
        return regex.test(filePath);
      }
      return filePath.includes(pattern);
    });
  }

  /**
   * Encrypt a file using AES-256-GCM
   */
  async encryptFile(inputPath, outputPath, key) {
    const algorithm = config.encryption.algorithm;
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipher(algorithm, key);
    cipher.setAAD(Buffer.from('mononio-ai-backup'));

    const input = await fs.readFile(inputPath);
    const encrypted = Buffer.concat([cipher.update(input), cipher.final()]);
    const authTag = cipher.getAuthTag();

    const encryptedData = {
      iv: iv.toString('hex'),
      authTag: authTag.toString('hex'),
      data: encrypted.toString('hex')
    };

    await fs.writeFile(outputPath, JSON.stringify(encryptedData));
    this.logger.info(`File encrypted: ${outputPath}`);
  }

  /**
   * Decrypt a file
   */
  async decryptFile(inputPath, outputPath, key) {
    const algorithm = config.encryption.algorithm;
    const encryptedData = JSON.parse(await fs.readFile(inputPath, 'utf8'));
    
    const decipher = crypto.createDecipher(algorithm, key);
    decipher.setAAD(Buffer.from('mononio-ai-backup'));
    decipher.setAuthTag(Buffer.from(encryptedData.authTag, 'hex'));

    const encrypted = Buffer.from(encryptedData.data, 'hex');
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);

    await fs.writeFile(outputPath, decrypted);
    this.logger.info(`File decrypted: ${outputPath}`);
  }

  /**
   * Calculate file hash for integrity verification
   */
  async calculateHash(filePath, algorithm = 'sha256') {
    const hash = crypto.createHash(algorithm);
    const data = await fs.readFile(filePath);
    hash.update(data);
    return hash.digest('hex');
  }

  /**
   * Verify backup integrity
   */
  async verifyBackup(backupPath, expectedHash) {
    try {
      const actualHash = await this.calculateHash(backupPath);
      const isValid = actualHash === expectedHash;
      
      if (isValid) {
        this.logger.info('Backup integrity verified');
      } else {
        this.logger.error('Backup integrity check failed');
      }
      
      return isValid;
    } catch (error) {
      this.logger.error(`Integrity verification failed: ${error.message}`);
      return false;
    }
  }

  /**
   * Clean up old backups based on retention policy
   */
  async cleanupOldBackups(backupDir, retentionDays) {
    try {
      const files = await fs.readdir(backupDir);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - retentionDays);

      let deletedCount = 0;
      let freedSpace = 0;

      for (const file of files) {
        const filePath = path.join(backupDir, file);
        const stats = await fs.stat(filePath);
        
        if (stats.mtime < cutoffDate) {
          freedSpace += stats.size;
          await fs.unlink(filePath);
          deletedCount++;
          this.logger.info(`Deleted old backup: ${file}`);
        }
      }

      this.logger.info(`Cleanup completed: ${deletedCount} files deleted, ${(freedSpace / 1024 / 1024).toFixed(2)} MB freed`);
      return { deletedCount, freedSpace };
    } catch (error) {
      this.logger.error(`Cleanup failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get backup statistics
   */
  async getBackupStats(backupDir) {
    try {
      const files = await fs.readdir(backupDir);
      let totalSize = 0;
      let fileCount = 0;

      for (const file of files) {
        const filePath = path.join(backupDir, file);
        const stats = await fs.stat(filePath);
        totalSize += stats.size;
        fileCount++;
      }

      return {
        fileCount,
        totalSize,
        totalSizeMB: (totalSize / 1024 / 1024).toFixed(2),
        averageSizeMB: fileCount > 0 ? (totalSize / fileCount / 1024 / 1024).toFixed(2) : 0
      };
    } catch (error) {
      this.logger.error(`Failed to get backup stats: ${error.message}`);
      return { fileCount: 0, totalSize: 0, totalSizeMB: 0, averageSizeMB: 0 };
    }
  }

  /**
   * Create backup manifest
   */
  async createManifest(backupPath, metadata = {}) {
    const manifest = {
      timestamp: new Date().toISOString(),
      filename: path.basename(backupPath),
      size: (await fs.stat(backupPath)).size,
      hash: await this.calculateHash(backupPath),
      type: metadata.type || 'full',
      version: metadata.version || '1.0.0',
      project: 'mononio-ai',
      metadata
    };

    const manifestPath = backupPath.replace(/\.[^.]+$/, '.manifest.json');
    await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
    
    this.logger.info(`Manifest created: ${manifestPath}`);
    return manifest;
  }

  /**
   * Validate backup manifest
   */
  async validateManifest(backupPath) {
    const manifestPath = backupPath.replace(/\.[^.]+$/, '.manifest.json');
    
    try {
      const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
      const isValid = await this.verifyBackup(backupPath, manifest.hash);
      
      return {
        valid: isValid,
        manifest,
        errors: isValid ? [] : ['Hash mismatch']
      };
    } catch (error) {
      return {
        valid: false,
        manifest: null,
        errors: [error.message]
      };
    }
  }

  /**
   * Format bytes to human readable format
   */
  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  /**
   * Create progress indicator
   */
  createProgressIndicator(total, label = 'Progress') {
    let current = 0;
    
    return {
      update: (increment = 1) => {
        current += increment;
        const percentage = Math.round((current / total) * 100);
        process.stdout.write(`\r${label}: ${percentage}% (${current}/${total})`);
        
        if (current >= total) {
          console.log(); // New line when complete
        }
      },
      complete: () => {
        current = total;
        process.stdout.write(`\r${label}: 100% (${total}/${total})\n`);
      }
    };
  }
}

module.exports = BackupUtils;
