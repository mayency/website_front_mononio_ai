/**
 * MONONIO AI Backup System - Email Notifications
 * Handles email notifications for backup operations
 */

const nodemailer = require('nodemailer');
const { config } = require('./config');
const BackupUtils = require('./utils');

class NotificationService {
  constructor() {
    this.utils = new BackupUtils();
    this.logger = this.utils.logger;
    this.transporter = null;
    this.initialized = false;
  }

  /**
   * Initialize email transporter
   */
  async initialize() {
    try {
      if (!config.email.host || !config.email.user || !config.email.pass) {
        throw new Error('Email configuration not complete');
      }

      this.transporter = nodemailer.createTransporter({
        host: config.email.host,
        port: config.email.port,
        secure: config.email.port === 465,
        auth: {
          user: config.email.user,
          pass: config.email.pass
        }
      });

      // Verify connection
      await this.transporter.verify();
      this.initialized = true;
      
      this.logger.info('Email notification service initialized successfully');
    } catch (error) {
      this.logger.error(`Failed to initialize email service: ${error.message}`);
      throw error;
    }
  }

  /**
   * Ensure email service is initialized
   */
  async ensureInitialized() {
    if (!this.initialized) {
      await this.initialize();
    }
  }

  /**
   * Send backup success notification
   */
  async sendBackupSuccessNotification(backupInfo) {
    await this.ensureInitialized();

    try {
      const subject = `✅ MONONIO AI Backup Successful - ${new Date().toLocaleDateString()}`;
      
      const html = this.generateSuccessEmailHTML(backupInfo);
      const text = this.generateSuccessEmailText(backupInfo);

      await this.sendEmail(subject, html, text);
      this.logger.info('Backup success notification sent');
    } catch (error) {
      this.logger.error(`Failed to send success notification: ${error.message}`);
      throw error;
    }
  }

  /**
   * Send backup failure notification
   */
  async sendBackupFailureNotification(error, backupInfo = {}) {
    await this.ensureInitialized();

    try {
      const subject = `❌ MONONIO AI Backup Failed - ${new Date().toLocaleDateString()}`;
      
      const html = this.generateFailureEmailHTML(error, backupInfo);
      const text = this.generateFailureEmailText(error, backupInfo);

      await this.sendEmail(subject, html, text);
      this.logger.info('Backup failure notification sent');
    } catch (error) {
      this.logger.error(`Failed to send failure notification: ${error.message}`);
      throw error;
    }
  }

  /**
   * Send backup summary notification
   */
  async sendBackupSummaryNotification(summary) {
    await this.ensureInitialized();

    try {
      const subject = `📊 MONONIO AI Backup Summary - ${new Date().toLocaleDateString()}`;
      
      const html = this.generateSummaryEmailHTML(summary);
      const text = this.generateSummaryEmailText(summary);

      await this.sendEmail(subject, html, text);
      this.logger.info('Backup summary notification sent');
    } catch (error) {
      this.logger.error(`Failed to send summary notification: ${error.message}`);
      throw error;
    }
  }

  /**
   * Send email
   */
  async sendEmail(subject, html, text) {
    await this.ensureInitialized();

    const mailOptions = {
      from: `"MONONIO AI Backup System" <${config.email.user}>`,
      to: config.email.to,
      subject: subject,
      text: text,
      html: html
    };

    const result = await this.transporter.sendMail(mailOptions);
    this.logger.info(`Email sent: ${result.messageId}`);
    return result;
  }

  /**
   * Generate success email HTML
   */
  generateSuccessEmailHTML(backupInfo) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Backup Successful</title>
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
                <h1>✅ Backup Successful</h1>
                <p>MONONIO AI Backup System</p>
            </div>
            <div class="content">
                <p class="success">Your backup has been completed successfully!</p>
                
                <table class="info-table">
                    <tr><th>Backup Type</th><td>${backupInfo.type || 'Full'}</td></tr>
                    <tr><th>Timestamp</th><td>${backupInfo.timestamp || new Date().toISOString()}</td></tr>
                    <tr><th>File Size</th><td>${backupInfo.size || 'N/A'}</td></tr>
                    <tr><th>Duration</th><td>${backupInfo.duration || 'N/A'}</td></tr>
                    <tr><th>Cloud Storage</th><td>${backupInfo.cloudProviders?.join(', ') || 'N/A'}</td></tr>
                </table>

                <p>Your data is now safely backed up and encrypted in the cloud.</p>
                
                <p><strong>Next Steps:</strong></p>
                <ul>
                    <li>Verify backup integrity in the dashboard</li>
                    <li>Test restore procedures if needed</li>
                    <li>Monitor backup logs for any issues</li>
                </ul>
            </div>
        </div>
    </body>
    </html>
    `;
  }

  /**
   * Generate success email text
   */
  generateSuccessEmailText(backupInfo) {
    return `
MONONIO AI Backup Successful

Your backup has been completed successfully!

Backup Details:
- Type: ${backupInfo.type || 'Full'}
- Timestamp: ${backupInfo.timestamp || new Date().toISOString()}
- File Size: ${backupInfo.size || 'N/A'}
- Duration: ${backupInfo.duration || 'N/A'}
- Cloud Storage: ${backupInfo.cloudProviders?.join(', ') || 'N/A'}

Your data is now safely backed up and encrypted in the cloud.

Next Steps:
- Verify backup integrity in the dashboard
- Test restore procedures if needed
- Monitor backup logs for any issues

MONONIO AI Backup System
    `;
  }

  /**
   * Generate failure email HTML
   */
  generateFailureEmailHTML(error, backupInfo) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Backup Failed</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #f44336; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; }
            .error { color: #f44336; font-weight: bold; }
            .error-details { background: #fff; border: 1px solid #ddd; padding: 15px; margin: 15px 0; border-radius: 5px; }
            .info-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .info-table th, .info-table td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
            .info-table th { background-color: #f2f2f2; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>❌ Backup Failed</h1>
                <p>MONONIO AI Backup System</p>
            </div>
            <div class="content">
                <p class="error">Your backup has failed and requires immediate attention!</p>
                
                <table class="info-table">
                    <tr><th>Error Time</th><td>${new Date().toISOString()}</td></tr>
                    <tr><th>Backup Type</th><td>${backupInfo.type || 'Full'}</td></tr>
                    <tr><th>Error Code</th><td>${error.code || 'N/A'}</td></tr>
                </table>

                <div class="error-details">
                    <h3>Error Details:</h3>
                    <p><strong>Message:</strong> ${error.message}</p>
                    <p><strong>Stack Trace:</strong></p>
                    <pre style="background: #f5f5f5; padding: 10px; border-radius: 3px; overflow-x: auto;">${error.stack || 'No stack trace available'}</pre>
                </div>

                <p><strong>Immediate Actions Required:</strong></p>
                <ul>
                    <li>Check system logs for more details</li>
                    <li>Verify cloud storage connectivity</li>
                    <li>Check available disk space</li>
                    <li>Review backup configuration</li>
                </ul>

                <p>Please address this issue promptly to ensure data protection.</p>
            </div>
        </div>
    </body>
    </html>
    `;
  }

  /**
   * Generate failure email text
   */
  generateFailureEmailText(error, backupInfo) {
    return `
MONONIO AI Backup Failed

Your backup has failed and requires immediate attention!

Error Details:
- Time: ${new Date().toISOString()}
- Type: ${backupInfo.type || 'Full'}
- Error Code: ${error.code || 'N/A'}
- Message: ${error.message}

Stack Trace:
${error.stack || 'No stack trace available'}

Immediate Actions Required:
- Check system logs for more details
- Verify cloud storage connectivity
- Check available disk space
- Review backup configuration

Please address this issue promptly to ensure data protection.

MONONIO AI Backup System
    `;
  }

  /**
   * Generate summary email HTML
   */
  generateSummaryEmailHTML(summary) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Backup Summary</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #2196F3; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; }
            .stats-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .stats-table th, .stats-table td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
            .stats-table th { background-color: #f2f2f2; }
            .success { color: #4CAF50; }
            .warning { color: #FF9800; }
            .error { color: #f44336; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>📊 Backup Summary</h1>
                <p>MONONIO AI Backup System - ${new Date().toLocaleDateString()}</p>
            </div>
            <div class="content">
                <h2>Backup Statistics</h2>
                <table class="stats-table">
                    <tr><th>Total Backups</th><td>${summary.totalBackups || 0}</td></tr>
                    <tr><th>Successful</th><td class="success">${summary.successful || 0}</td></tr>
                    <tr><th>Failed</th><td class="error">${summary.failed || 0}</td></tr>
                    <tr><th>Total Size</th><td>${summary.totalSize || 'N/A'}</td></tr>
                    <tr><th>Average Duration</th><td>${summary.averageDuration || 'N/A'}</td></tr>
                </table>

                <h2>Cloud Storage Status</h2>
                <table class="stats-table">
                    <tr><th>Google Drive</th><td class="${summary.googleDrive?.status === 'success' ? 'success' : 'error'}">${summary.googleDrive?.status || 'Unknown'}</td></tr>
                    <tr><th>AWS S3</th><td class="${summary.awsS3?.status === 'success' ? 'success' : 'error'}">${summary.awsS3?.status || 'Unknown'}</td></tr>
                </table>

                <h2>Storage Usage</h2>
                <table class="stats-table">
                    <tr><th>Local Storage</th><td>${summary.localStorage || 'N/A'}</td></tr>
                    <tr><th>Cloud Storage</th><td>${summary.cloudStorage || 'N/A'}</td></tr>
                    <tr><th>Retention Policy</th><td>${summary.retentionPolicy || 'N/A'}</td></tr>
                </table>

                <p><strong>Recommendations:</strong></p>
                <ul>
                    ${summary.recommendations?.map(rec => `<li>${rec}</li>`).join('') || '<li>No specific recommendations at this time</li>'}
                </ul>
            </div>
        </div>
    </body>
    </html>
    `;
  }

  /**
   * Generate summary email text
   */
  generateSummaryEmailText(summary) {
    return `
MONONIO AI Backup Summary - ${new Date().toLocaleDateString()}

Backup Statistics:
- Total Backups: ${summary.totalBackups || 0}
- Successful: ${summary.successful || 0}
- Failed: ${summary.failed || 0}
- Total Size: ${summary.totalSize || 'N/A'}
- Average Duration: ${summary.averageDuration || 'N/A'}

Cloud Storage Status:
- Google Drive: ${summary.googleDrive?.status || 'Unknown'}
- AWS S3: ${summary.awsS3?.status || 'Unknown'}

Storage Usage:
- Local Storage: ${summary.localStorage || 'N/A'}
- Cloud Storage: ${summary.cloudStorage || 'N/A'}
- Retention Policy: ${summary.retentionPolicy || 'N/A'}

Recommendations:
${summary.recommendations?.map(rec => `- ${rec}`).join('\n') || '- No specific recommendations at this time'}

MONONIO AI Backup System
    `;
  }
}

module.exports = NotificationService;
