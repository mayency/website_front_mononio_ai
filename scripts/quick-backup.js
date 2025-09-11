#!/usr/bin/env node

/**
 * Quick Backup Script for MONONIO AI
 * Simple backup to Google Drive with minimal setup
 */

const path = require('path');
const fs = require('fs').promises;
const { execSync } = require('child_process');

async function quickBackup() {
  console.log('🚀 MONONIO AI Quick Backup to Google Drive\n');
  
  try {
    // Check if dependencies are installed
    console.log('📦 Checking dependencies...');
    try {
      require('googleapis');
      require('tar');
      console.log('✓ Dependencies found');
    } catch (error) {
      console.log('📥 Installing required dependencies...');
      execSync('npm install googleapis tar', { stdio: 'inherit' });
      console.log('✓ Dependencies installed');
    }

    // Check if .env.backup.local exists
    const envPath = path.join(process.cwd(), '.env.backup.local');
    try {
      await fs.access(envPath);
      console.log('✓ Configuration file found');
    } catch (error) {
      console.log('❌ Configuration file not found. Please run setup first:');
      console.log('   node scripts/setup-google-drive-backup.js');
      process.exit(1);
    }

    // Check if Google Drive credentials are configured
    const envContent = await fs.readFile(envPath, 'utf8');
    if (envContent.includes('your_google_drive_client_id')) {
      console.log('❌ Google Drive credentials not configured. Please run setup first:');
      console.log('   node scripts/setup-google-drive-backup.js');
      process.exit(1);
    }

    console.log('✅ Configuration looks good');
    console.log('🔄 Starting backup...\n');

    // Run the backup
    execSync('node scripts/backup-to-google-drive.js', { stdio: 'inherit' });

  } catch (error) {
    console.error('❌ Backup failed:', error.message);
    process.exit(1);
  }
}

// Run the backup
quickBackup();
