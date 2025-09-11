/**
 * MONONIO AI Backup System - Google Drive Integration
 * Handles Google Drive API operations for cloud backup
 */

const { google } = require('googleapis');
const fs = require('fs').promises;
const path = require('path');
const { config } = require('./config');
const BackupUtils = require('./utils');

class GoogleDriveBackup {
  constructor() {
    this.utils = new BackupUtils();
    this.logger = this.utils.logger;
    this.drive = null;
    this.initialized = false;
  }

  /**
   * Initialize Google Drive API client
   */
  async initialize() {
    try {
      if (!config.googleDrive.clientId || !config.googleDrive.clientSecret) {
        throw new Error('Google Drive credentials not configured');
      }

      const oauth2Client = new google.auth.OAuth2(
        config.googleDrive.clientId,
        config.googleDrive.clientSecret,
        'urn:ietf:wg:oauth:2.0:oob'
      );

      oauth2Client.setCredentials({
        refresh_token: config.googleDrive.refreshToken
      });

      this.drive = google.drive({ version: 'v3', auth: oauth2Client });
      this.initialized = true;
      
      this.logger.info('Google Drive API initialized successfully');
    } catch (error) {
      this.logger.error(`Failed to initialize Google Drive: ${error.message}`);
      throw error;
    }
  }

  /**
   * Ensure Google Drive is initialized
   */
  async ensureInitialized() {
    if (!this.initialized) {
      await this.initialize();
    }
  }

  /**
   * Create a folder in Google Drive
   */
  async createFolder(name, parentId = null) {
    await this.ensureInitialized();

    try {
      const folderMetadata = {
        name: name,
        mimeType: 'application/vnd.google-apps.folder',
        parents: parentId ? [parentId] : undefined
      };

      const response = await this.drive.files.create({
        resource: folderMetadata,
        fields: 'id,name'
      });

      this.logger.info(`Created folder: ${name} (ID: ${response.data.id})`);
      return response.data;
    } catch (error) {
      this.logger.error(`Failed to create folder: ${error.message}`);
      throw error;
    }
  }

  /**
   * Find folder by name
   */
  async findFolder(name, parentId = null) {
    await this.ensureInitialized();

    try {
      const query = `name='${name}' and mimeType='application/vnd.google-apps.folder' and trashed=false`;
      const parentQuery = parentId ? ` and '${parentId}' in parents` : '';
      
      const response = await this.drive.files.list({
        q: query + parentQuery,
        fields: 'files(id,name)'
      });

      return response.data.files.length > 0 ? response.data.files[0] : null;
    } catch (error) {
      this.logger.error(`Failed to find folder: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get or create backup folder structure
   */
  async getOrCreateBackupFolder() {
    await this.ensureInitialized();

    try {
      // Check if main backup folder exists
      let backupFolder = await this.findFolder('MONONIO-AI-Backups', config.googleDrive.folderId);
      
      if (!backupFolder) {
        backupFolder = await this.createFolder('MONONIO-AI-Backups', config.googleDrive.folderId);
      }

      // Create date-based subfolder
      const today = new Date().toISOString().split('T')[0];
      let dateFolder = await this.findFolder(today, backupFolder.id);
      
      if (!dateFolder) {
        dateFolder = await this.createFolder(today, backupFolder.id);
      }

      return {
        mainFolder: backupFolder,
        dateFolder: dateFolder
      };
    } catch (error) {
      this.logger.error(`Failed to get/create backup folder: ${error.message}`);
      throw error;
    }
  }

  /**
   * Upload file to Google Drive
   */
  async uploadFile(filePath, folderId, fileName = null) {
    await this.ensureInitialized();

    try {
      const fileStats = await fs.stat(filePath);
      const fileSize = fileStats.size;
      const fileNameToUse = fileName || path.basename(filePath);

      this.logger.info(`Uploading ${fileNameToUse} (${this.utils.formatBytes(fileSize)}) to Google Drive`);

      const fileMetadata = {
        name: fileNameToUse,
        parents: [folderId]
      };

      const media = {
        mimeType: 'application/gzip',
        body: require('fs').createReadStream(filePath)
      };

      // Create progress indicator
      const progress = this.utils.createProgressIndicator(100, 'Upload Progress');
      let uploadedBytes = 0;

      const response = await this.drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id,name,size,createdTime'
      });

      progress.complete();
      
      this.logger.info(`File uploaded successfully: ${response.data.name} (ID: ${response.data.id})`);
      return response.data;
    } catch (error) {
      this.logger.error(`Failed to upload file: ${error.message}`);
      throw error;
    }
  }

  /**
   * Download file from Google Drive
   */
  async downloadFile(fileId, outputPath) {
    await this.ensureInitialized();

    try {
      this.logger.info(`Downloading file ${fileId} to ${outputPath}`);

      const response = await this.drive.files.get({
        fileId: fileId,
        alt: 'media'
      }, { responseType: 'stream' });

      const writeStream = require('fs').createWriteStream(outputPath);
      response.data.pipe(writeStream);

      return new Promise((resolve, reject) => {
        writeStream.on('finish', () => {
          this.logger.info(`File downloaded successfully: ${outputPath}`);
          resolve(outputPath);
        });
        writeStream.on('error', reject);
      });
    } catch (error) {
      this.logger.error(`Failed to download file: ${error.message}`);
      throw error;
    }
  }

  /**
   * List files in a folder
   */
  async listFiles(folderId, pageSize = 100) {
    await this.ensureInitialized();

    try {
      const response = await this.drive.files.list({
        q: `'${folderId}' in parents and trashed=false`,
        fields: 'files(id,name,size,createdTime,modifiedTime)',
        pageSize: pageSize
      });

      return response.data.files;
    } catch (error) {
      this.logger.error(`Failed to list files: ${error.message}`);
      throw error;
    }
  }

  /**
   * Delete file from Google Drive
   */
  async deleteFile(fileId) {
    await this.ensureInitialized();

    try {
      await this.drive.files.delete({
        fileId: fileId
      });

      this.logger.info(`File deleted: ${fileId}`);
    } catch (error) {
      this.logger.error(`Failed to delete file: ${error.message}`);
      throw error;
    }
  }

  /**
   * Clean up old backups from Google Drive
   */
  async cleanupOldBackups(retentionDays = 30) {
    await this.ensureInitialized();

    try {
      const backupFolder = await this.findFolder('MONONIO-AI-Backups', config.googleDrive.folderId);
      if (!backupFolder) {
        this.logger.warn('Backup folder not found, skipping cleanup');
        return;
      }

      const folders = await this.listFiles(backupFolder.id);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - retentionDays);

      let deletedCount = 0;

      for (const folder of folders) {
        if (folder.mimeType === 'application/vnd.google-apps.folder') {
          const folderDate = new Date(folder.createdTime);
          
          if (folderDate < cutoffDate) {
            // Delete all files in the folder first
            const files = await this.listFiles(folder.id);
            for (const file of files) {
              await this.deleteFile(file.id);
            }
            
            // Delete the folder
            await this.deleteFile(folder.id);
            deletedCount++;
            
            this.logger.info(`Deleted old backup folder: ${folder.name}`);
          }
        }
      }

      this.logger.info(`Google Drive cleanup completed: ${deletedCount} folders deleted`);
      return { deletedCount };
    } catch (error) {
      this.logger.error(`Google Drive cleanup failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get storage quota information
   */
  async getStorageQuota() {
    await this.ensureInitialized();

    try {
      const response = await this.drive.about.get({
        fields: 'storageQuota'
      });

      const quota = response.data.storageQuota;
      return {
        limit: parseInt(quota.limit),
        usage: parseInt(quota.usage),
        usageInDrive: parseInt(quota.usageInDrive),
        usageInDriveTrash: parseInt(quota.usageInDriveTrash),
        limitFormatted: this.utils.formatBytes(parseInt(quota.limit)),
        usageFormatted: this.utils.formatBytes(parseInt(quota.usage)),
        usagePercent: ((parseInt(quota.usage) / parseInt(quota.limit)) * 100).toFixed(2)
      };
    } catch (error) {
      this.logger.error(`Failed to get storage quota: ${error.message}`);
      throw error;
    }
  }

  /**
   * Backup file to Google Drive
   */
  async backupFile(filePath, metadata = {}) {
    try {
      const folders = await this.getOrCreateBackupFolder();
      const fileName = path.basename(filePath);
      
      // Upload the file
      const uploadedFile = await this.uploadFile(filePath, folders.dateFolder.id, fileName);
      
      // Create metadata file
      const metadataContent = {
        ...metadata,
        uploadedAt: new Date().toISOString(),
        fileId: uploadedFile.id,
        originalSize: (await fs.stat(filePath)).size
      };

      const metadataFileName = fileName.replace(/\.[^.]+$/, '.metadata.json');
      const metadataPath = path.join(path.dirname(filePath), metadataFileName);
      
      await fs.writeFile(metadataPath, JSON.stringify(metadataContent, null, 2));
      await this.uploadFile(metadataPath, folders.dateFolder.id, metadataFileName);
      
      // Clean up local metadata file
      await fs.unlink(metadataPath);

      this.logger.info(`Backup completed: ${fileName} -> Google Drive`);
      return {
        fileId: uploadedFile.id,
        fileName: uploadedFile.name,
        folderId: folders.dateFolder.id,
        metadata: metadataContent
      };
    } catch (error) {
      this.logger.error(`Google Drive backup failed: ${error.message}`);
      throw error;
    }
  }
}

module.exports = GoogleDriveBackup;
