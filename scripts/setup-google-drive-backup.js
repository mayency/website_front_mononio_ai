#!/usr/bin/env node

/**
 * MONONIO AI Google Drive Backup Setup
 * Interactive setup for Google Drive API credentials
 */

const readline = require('readline');
const fs = require('fs').promises;
const path = require('path');
const { google } = require('googleapis');

class GoogleDriveSetup {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this.envPath = path.join(process.cwd(), '.env.backup.local');
  }

  async question(prompt) {
    return new Promise((resolve) => {
      this.rl.question(prompt, resolve);
    });
  }

  async setup() {
    console.log('🚀 MONONIO AI Google Drive Backup Setup\n');
    console.log('This script will help you configure Google Drive backup for your project.');
    console.log('You will need to create a Google Cloud Project and enable the Drive API.\n');

    try {
      // Check if .env.backup.local exists
      await fs.access(this.envPath);
      console.log('✓ Found .env.backup.local file');
    } catch (error) {
      console.log('❌ .env.backup.local not found. Please run the backup setup first.');
      process.exit(1);
    }

    console.log('\n📋 Google Drive API Setup Instructions:');
    console.log('1. Go to https://console.cloud.google.com/');
    console.log('2. Create a new project or select existing one');
    console.log('3. Enable the Google Drive API');
    console.log('4. Create credentials (OAuth 2.0 Client ID)');
    console.log('5. Set authorized redirect URI to: urn:ietf:wg:oauth:2.0:oob');
    console.log('6. Download the credentials JSON file\n');

    const clientId = await this.question('Enter your Google Drive Client ID: ');
    const clientSecret = await this.question('Enter your Google Drive Client Secret: ');
    
    console.log('\n🔐 Getting refresh token...');
    const refreshToken = await this.getRefreshToken(clientId, clientSecret);
    
    console.log('\n💾 Updating configuration...');
    await this.updateConfig({
      clientId,
      clientSecret,
      refreshToken,
      folderId: '1LfklZQICNu-vBRY95BSx_YHzMKatdo65'
    });

    console.log('\n✅ Google Drive backup configuration completed!');
    console.log('\n📝 Next steps:');
    console.log('1. Run: npm run backup:google-drive');
    console.log('2. Or run: node scripts/backup-daily.js');
    console.log('3. Check your Google Drive folder for backups');

    this.rl.close();
  }

  async getRefreshToken(clientId, clientSecret) {
    const oauth2Client = new google.auth.OAuth2(
      clientId,
      clientSecret,
      'urn:ietf:wg:oauth:2.0:oob'
    );

    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/drive.file']
    });

    console.log('\n🔗 Please visit this URL to authorize the application:');
    console.log(authUrl);
    console.log('\nAfter authorization, you will receive a code.');

    const code = await this.question('\nEnter the authorization code: ');

    try {
      const { tokens } = await oauth2Client.getToken(code);
      return tokens.refresh_token;
    } catch (error) {
      console.error('❌ Failed to get refresh token:', error.message);
      throw error;
    }
  }

  async updateConfig(credentials) {
    try {
      let envContent = await fs.readFile(this.envPath, 'utf8');
      
      envContent = envContent.replace(
        'GOOGLE_DRIVE_CLIENT_ID=your_google_drive_client_id',
        `GOOGLE_DRIVE_CLIENT_ID=${credentials.clientId}`
      );
      
      envContent = envContent.replace(
        'GOOGLE_DRIVE_CLIENT_SECRET=your_google_drive_client_secret',
        `GOOGLE_DRIVE_CLIENT_SECRET=${credentials.clientSecret}`
      );
      
      envContent = envContent.replace(
        'GOOGLE_DRIVE_REFRESH_TOKEN=your_google_drive_refresh_token',
        `GOOGLE_DRIVE_REFRESH_TOKEN=${credentials.refreshToken}`
      );
      
      envContent = envContent.replace(
        'GOOGLE_DRIVE_FOLDER_ID=1LfklZQICNu-vBRY95BSx_YHzMKatdo65',
        `GOOGLE_DRIVE_FOLDER_ID=${credentials.folderId}`
      );

      // Generate a random encryption key if not set
      if (envContent.includes('your_32_character_encryption_key_here')) {
        const crypto = require('crypto');
        const encryptionKey = crypto.randomBytes(32).toString('hex');
        envContent = envContent.replace(
          'BACKUP_ENCRYPTION_KEY=your_32_character_encryption_key_here',
          `BACKUP_ENCRYPTION_KEY=${encryptionKey}`
        );
      }

      await fs.writeFile(this.envPath, envContent);
      console.log('✓ Configuration updated successfully');
    } catch (error) {
      console.error('❌ Failed to update configuration:', error.message);
      throw error;
    }
  }
}

// Main execution
if (require.main === module) {
  const setup = new GoogleDriveSetup();
  setup.setup().catch(error => {
    console.error('Setup failed:', error);
    process.exit(1);
  });
}

module.exports = GoogleDriveSetup;
