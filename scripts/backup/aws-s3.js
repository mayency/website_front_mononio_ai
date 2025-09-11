/**
 * MONONIO AI Backup System - AWS S3 Integration
 * Handles AWS S3 operations for cloud backup
 */

const AWS = require('aws-sdk');
const fs = require('fs').promises;
const path = require('path');
const { config } = require('./config');
const BackupUtils = require('./utils');

class AWSS3Backup {
  constructor() {
    this.utils = new BackupUtils();
    this.logger = this.utils.logger;
    this.s3 = null;
    this.initialized = false;
  }

  /**
   * Initialize AWS S3 client
   */
  async initialize() {
    try {
      if (!config.aws.accessKeyId || !config.aws.secretAccessKey) {
        throw new Error('AWS credentials not configured');
      }

      AWS.config.update({
        accessKeyId: config.aws.accessKeyId,
        secretAccessKey: config.aws.secretAccessKey,
        region: config.aws.region
      });

      this.s3 = new AWS.S3({
        apiVersion: '2006-03-01',
        signatureVersion: 'v4'
      });

      this.initialized = true;
      this.logger.info('AWS S3 client initialized successfully');
    } catch (error) {
      this.logger.error(`Failed to initialize AWS S3: ${error.message}`);
      throw error;
    }
  }

  /**
   * Ensure S3 is initialized
   */
  async ensureInitialized() {
    if (!this.initialized) {
      await this.initialize();
    }
  }

  /**
   * Check if bucket exists and create if necessary
   */
  async ensureBucketExists() {
    await this.ensureInitialized();

    try {
      await this.s3.headBucket({ Bucket: config.aws.bucket }).promise();
      this.logger.info(`Bucket exists: ${config.aws.bucket}`);
    } catch (error) {
      if (error.statusCode === 404) {
        this.logger.info(`Creating bucket: ${config.aws.bucket}`);
        await this.s3.createBucket({ Bucket: config.aws.bucket }).promise();
        this.logger.info(`Bucket created: ${config.aws.bucket}`);
      } else {
        throw error;
      }
    }
  }

  /**
   * Generate S3 key for backup file
   */
  generateS3Key(fileName, type = 'daily') {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `backups/${type}/${year}/${month}/${day}/${fileName}`;
  }

  /**
   * Upload file to S3
   */
  async uploadFile(filePath, s3Key, metadata = {}) {
    await this.ensureInitialized();
    await this.ensureBucketExists();

    try {
      const fileStats = await fs.stat(filePath);
      const fileSize = fileStats.size;

      this.logger.info(`Uploading ${path.basename(filePath)} (${this.utils.formatBytes(fileSize)}) to S3`);

      const fileContent = await fs.readFile(filePath);

      const uploadParams = {
        Bucket: config.aws.bucket,
        Key: s3Key,
        Body: fileContent,
        ContentType: 'application/gzip',
        Metadata: {
          'backup-type': metadata.type || 'full',
          'backup-date': new Date().toISOString(),
          'original-size': fileSize.toString(),
          'project': 'mononio-ai',
          ...metadata
        },
        ServerSideEncryption: 'AES256'
      };

      // Create progress indicator
      const progress = this.utils.createProgressIndicator(100, 'S3 Upload Progress');

      const result = await this.s3.upload(uploadParams, {
        partSize: 10 * 1024 * 1024, // 10MB parts
        queueSize: 1
      }).promise();

      progress.complete();

      this.logger.info(`File uploaded to S3: ${result.Location}`);
      return result;
    } catch (error) {
      this.logger.error(`Failed to upload file to S3: ${error.message}`);
      throw error;
    }
  }

  /**
   * Download file from S3
   */
  async downloadFile(s3Key, outputPath) {
    await this.ensureInitialized();

    try {
      this.logger.info(`Downloading ${s3Key} from S3 to ${outputPath}`);

      const downloadParams = {
        Bucket: config.aws.bucket,
        Key: s3Key
      };

      const result = await this.s3.getObject(downloadParams).promise();
      await fs.writeFile(outputPath, result.Body);

      this.logger.info(`File downloaded from S3: ${outputPath}`);
      return outputPath;
    } catch (error) {
      this.logger.error(`Failed to download file from S3: ${error.message}`);
      throw error;
    }
  }

  /**
   * List objects in S3 bucket
   */
  async listObjects(prefix = '', maxKeys = 1000) {
    await this.ensureInitialized();

    try {
      const params = {
        Bucket: config.aws.bucket,
        Prefix: prefix,
        MaxKeys: maxKeys
      };

      const result = await this.s3.listObjectsV2(params).promise();
      return result.Contents || [];
    } catch (error) {
      this.logger.error(`Failed to list S3 objects: ${error.message}`);
      throw error;
    }
  }

  /**
   * Delete object from S3
   */
  async deleteObject(s3Key) {
    await this.ensureInitialized();

    try {
      const params = {
        Bucket: config.aws.bucket,
        Key: s3Key
      };

      await this.s3.deleteObject(params).promise();
      this.logger.info(`Object deleted from S3: ${s3Key}`);
    } catch (error) {
      this.logger.error(`Failed to delete S3 object: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get object metadata
   */
  async getObjectMetadata(s3Key) {
    await this.ensureInitialized();

    try {
      const params = {
        Bucket: config.aws.bucket,
        Key: s3Key
      };

      const result = await this.s3.headObject(params).promise();
      return result;
    } catch (error) {
      this.logger.error(`Failed to get S3 object metadata: ${error.message}`);
      throw error;
    }
  }

  /**
   * Clean up old backups from S3
   */
  async cleanupOldBackups(retentionDays = 30) {
    await this.ensureInitialized();

    try {
      const objects = await this.listObjects('backups/');
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - retentionDays);

      let deletedCount = 0;
      let deletedSize = 0;

      for (const obj of objects) {
        if (obj.LastModified < cutoffDate) {
          await this.deleteObject(obj.Key);
          deletedCount++;
          deletedSize += obj.Size;
          this.logger.info(`Deleted old backup: ${obj.Key}`);
        }
      }

      this.logger.info(`S3 cleanup completed: ${deletedCount} objects deleted, ${this.utils.formatBytes(deletedSize)} freed`);
      return { deletedCount, deletedSize };
    } catch (error) {
      this.logger.error(`S3 cleanup failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get bucket storage statistics
   */
  async getBucketStats() {
    await this.ensureInitialized();

    try {
      const objects = await this.listObjects();
      
      let totalSize = 0;
      let totalCount = 0;
      const byType = {};

      for (const obj of objects) {
        totalSize += obj.Size;
        totalCount++;

        // Extract backup type from key
        const keyParts = obj.Key.split('/');
        if (keyParts.length >= 2) {
          const type = keyParts[1];
          if (!byType[type]) {
            byType[type] = { count: 0, size: 0 };
          }
          byType[type].count++;
          byType[type].size += obj.Size;
        }
      }

      return {
        totalCount,
        totalSize,
        totalSizeFormatted: this.utils.formatBytes(totalSize),
        byType: Object.keys(byType).reduce((acc, type) => {
          acc[type] = {
            count: byType[type].count,
            size: byType[type].size,
            sizeFormatted: this.utils.formatBytes(byType[type].size)
          };
          return acc;
        }, {})
      };
    } catch (error) {
      this.logger.error(`Failed to get bucket stats: ${error.message}`);
      throw error;
    }
  }

  /**
   * Generate presigned URL for download
   */
  async generatePresignedUrl(s3Key, expirationMinutes = 60) {
    await this.ensureInitialized();

    try {
      const params = {
        Bucket: config.aws.bucket,
        Key: s3Key,
        Expires: expirationMinutes * 60
      };

      const url = await this.s3.getSignedUrlPromise('getObject', params);
      this.logger.info(`Generated presigned URL for: ${s3Key}`);
      return url;
    } catch (error) {
      this.logger.error(`Failed to generate presigned URL: ${error.message}`);
      throw error;
    }
  }

  /**
   * Backup file to S3
   */
  async backupFile(filePath, type = 'daily', metadata = {}) {
    try {
      const fileName = path.basename(filePath);
      const s3Key = this.generateS3Key(fileName, type);
      
      const result = await this.uploadFile(filePath, s3Key, {
        type,
        ...metadata
      });

      this.logger.info(`Backup completed: ${fileName} -> S3 (${s3Key})`);
      return {
        s3Key,
        location: result.Location,
        etag: result.ETag,
        metadata: {
          type,
          uploadedAt: new Date().toISOString(),
          originalSize: (await fs.stat(filePath)).size,
          ...metadata
        }
      };
    } catch (error) {
      this.logger.error(`S3 backup failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Restore file from S3
   */
  async restoreFile(s3Key, outputPath) {
    try {
      await this.downloadFile(s3Key, outputPath);
      this.logger.info(`Restore completed: ${s3Key} -> ${outputPath}`);
      return outputPath;
    } catch (error) {
      this.logger.error(`S3 restore failed: ${error.message}`);
      throw error;
    }
  }
}

module.exports = AWSS3Backup;
