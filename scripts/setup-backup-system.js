#!/usr/bin/env node

/**
 * MONONIO AI Backup System Setup Script
 * Automated setup and configuration for the backup system
 */

const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

class BackupSystemSetup {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  /**
   * Main setup process
   */
  async setup() {
    try {
      console.log('🚀 MONONIO AI Backup System Setup');
      console.log('=====================================\n');
      
      // Check prerequisites
      await this.checkPrerequisites();
      
      // Install dependencies
      await this.installDependencies();
      
      // Configure environment
      await this.configureEnvironment();
      
      // Setup cron jobs
      await this.setupCronJobs();
      
      // Test configuration
      await this.testConfiguration();
      
      console.log('\n✅ Backup system setup completed successfully!');
      console.log('\nNext steps:');
      console.log('1. Review and update .env.backup.local with your API credentials');
      console.log('2. Run: npm run backup:daily (to test daily backup)');
      console.log('3. Run: npm run backup:verify:quick (to verify setup)');
      console.log('4. Monitor backup logs in backups/logs/');
      
    } catch (error) {
      console.error(`❌ Setup failed: ${error.message}`);
      process.exit(1);
    } finally {
      this.rl.close();
    }
  }

  /**
   * Check system prerequisites
   */
  async checkPrerequisites() {
    console.log('🔍 Checking prerequisites...');
    
    // Check Node.js version
    const nodeVersion = process.version;
    const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
    
    if (majorVersion < 16) {
      throw new Error(`Node.js version 16+ required. Current version: ${nodeVersion}`);
    }
    
    console.log(`✓ Node.js version: ${nodeVersion}`);
    
    // Check if we're in the right directory
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    try {
      await fs.access(packageJsonPath);
      console.log('✓ Project directory detected');
    } catch (error) {
      throw new Error('Please run this script from the MONONIO AI project root directory');
    }
    
    // Check available disk space
    const stats = await this.getDiskSpace();
    if (stats.available < 5 * 1024 * 1024 * 1024) { // 5GB
      console.warn('⚠️  Warning: Less than 5GB disk space available');
    } else {
      console.log(`✓ Available disk space: ${this.formatBytes(stats.available)}`);
    }
    
    console.log('✓ Prerequisites check completed\n');
  }

  /**
   * Install dependencies
   */
  async installDependencies() {
    console.log('📦 Installing backup system dependencies...');
    
    const backupPackagePath = path.join(__dirname, 'backup', 'package.json');
    
    try {
      // Install dependencies in backup directory
      execSync('npm install', {
        cwd: path.dirname(backupPackagePath),
        stdio: 'inherit'
      });
      
      console.log('✓ Dependencies installed successfully\n');
    } catch (error) {
      throw new Error(`Failed to install dependencies: ${error.message}`);
    }
  }

  /**
   * Configure environment
   */
  async configureEnvironment() {
    console.log('⚙️  Configuring environment...');
    
    // Check if .env.backup.local exists
    const envPath = path.join(process.cwd(), '.env.backup.local');
    const envTemplatePath = path.join(process.cwd(), '.env.backup');
    
    try {
      await fs.access(envPath);
      console.log('✓ Environment file already exists');
    } catch (error) {
      // Copy template
      try {
        await fs.copyFile(envTemplatePath, envPath);
        console.log('✓ Environment template copied to .env.backup.local');
      } catch (copyError) {
        throw new Error(`Failed to create environment file: ${copyError.message}`);
      }
    }
    
    // Generate encryption key if not set
    await this.generateEncryptionKey(envPath);
    
    console.log('✓ Environment configuration completed\n');
  }

  /**
   * Generate encryption key
   */
  async generateEncryptionKey(envPath) {
    try {
      const envContent = await fs.readFile(envPath, 'utf8');
      
      if (envContent.includes('your_32_character_encryption_key_here')) {
        const crypto = require('crypto');
        const key = crypto.randomBytes(32).toString('hex');
        
        const updatedContent = envContent.replace(
          'your_32_character_encryption_key_here',
          key
        );
        
        await fs.writeFile(envPath, updatedContent);
        console.log('✓ Encryption key generated');
      }
    } catch (error) {
      console.warn(`⚠️  Warning: Could not generate encryption key: ${error.message}`);
    }
  }

  /**
   * Setup cron jobs
   */
  async setupCronJobs() {
    console.log('⏰ Setting up automated backups...');
    
    const cronJobs = [
      {
        schedule: '0 2 * * *', // Daily at 2 AM
        command: `cd ${process.cwd()} && node scripts/backup-daily.js`,
        description: 'Daily backup'
      },
      {
        schedule: '0 3 * * 0', // Weekly on Sunday at 3 AM
        command: `cd ${process.cwd()} && node scripts/backup-daily.js --weekly`,
        description: 'Weekly backup'
      },
      {
        schedule: '0 4 1 * *', // Monthly on 1st at 4 AM
        command: `cd ${process.cwd()} && node scripts/backup-daily.js --monthly`,
        description: 'Monthly backup'
      }
    ];
    
    const cronContent = cronJobs.map(job => 
      `# ${job.description}\n${job.schedule} ${job.command} >> backups/logs/cron.log 2>&1`
    ).join('\n\n');
    
    const cronFilePath = path.join(process.cwd(), 'backups', 'crontab.txt');
    await fs.writeFile(cronFilePath, cronContent);
    
    console.log('✓ Cron jobs configured');
    console.log('  To install cron jobs, run: crontab backups/crontab.txt');
    console.log('✓ Automated backups setup completed\n');
  }

  /**
   * Test configuration
   */
  async testConfiguration() {
    console.log('🧪 Testing configuration...');
    
    try {
      // Test configuration loading
      const { config, validateConfig } = require('./backup/config');
      validateConfig();
      console.log('✓ Configuration validation passed');
      
      // Test backup directories
      const directories = [
        config.backupRoot,
        config.dailyBackupDir,
        config.weeklyBackupDir,
        config.monthlyBackupDir,
        config.cloudSyncDir,
        config.logsDir
      ];
      
      for (const dir of directories) {
        await fs.mkdir(dir, { recursive: true });
      }
      console.log('✓ Backup directories created');
      
      // Test utilities
      const BackupUtils = require('./backup/utils');
      const utils = new BackupUtils();
      console.log('✓ Backup utilities loaded');
      
      console.log('✓ Configuration test completed\n');
      
    } catch (error) {
      throw new Error(`Configuration test failed: ${error.message}`);
    }
  }

  /**
   * Get disk space information
   */
  async getDiskSpace() {
    try {
      const { execSync } = require('child_process');
      const output = execSync('df -k .', { encoding: 'utf8' });
      const lines = output.trim().split('\n');
      const data = lines[1].split(/\s+/);
      
      return {
        total: parseInt(data[1]) * 1024,
        used: parseInt(data[2]) * 1024,
        available: parseInt(data[3]) * 1024
      };
    } catch (error) {
      return { total: 0, used: 0, available: 0 };
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
   * Interactive configuration
   */
  async interactiveConfig() {
    console.log('\n🔧 Interactive Configuration');
    console.log('============================\n');
    
    const questions = [
      {
        key: 'GOOGLE_DRIVE_CLIENT_ID',
        prompt: 'Google Drive Client ID (optional): ',
        required: false
      },
      {
        key: 'GOOGLE_DRIVE_CLIENT_SECRET',
        prompt: 'Google Drive Client Secret (optional): ',
        required: false
      },
      {
        key: 'AWS_ACCESS_KEY_ID',
        prompt: 'AWS Access Key ID (optional): ',
        required: false
      },
      {
        key: 'AWS_SECRET_ACCESS_KEY',
        prompt: 'AWS Secret Access Key (optional): ',
        required: false
      },
      {
        key: 'SMTP_USER',
        prompt: 'Email address for notifications (optional): ',
        required: false
      },
      {
        key: 'SMTP_PASS',
        prompt: 'Email app password (optional): ',
        required: false
      }
    ];
    
    const answers = {};
    
    for (const question of questions) {
      const answer = await this.question(question.prompt);
      if (answer.trim()) {
        answers[question.key] = answer.trim();
      }
    }
    
    // Update environment file
    if (Object.keys(answers).length > 0) {
      await this.updateEnvironmentFile(answers);
      console.log('✓ Environment file updated');
    }
    
    return answers;
  }

  /**
   * Ask a question
   */
  question(prompt) {
    return new Promise(resolve => {
      this.rl.question(prompt, resolve);
    });
  }

  /**
   * Update environment file
   */
  async updateEnvironmentFile(updates) {
    const envPath = path.join(process.cwd(), '.env.backup.local');
    
    try {
      let content = await fs.readFile(envPath, 'utf8');
      
      for (const [key, value] of Object.entries(updates)) {
        const regex = new RegExp(`^${key}=.*$`, 'm');
        const replacement = `${key}=${value}`;
        
        if (regex.test(content)) {
          content = content.replace(regex, replacement);
        } else {
          content += `\n${replacement}`;
        }
      }
      
      await fs.writeFile(envPath, content);
    } catch (error) {
      throw new Error(`Failed to update environment file: ${error.message}`);
    }
  }
}

// Main execution
if (require.main === module) {
  const setup = new BackupSystemSetup();
  
  const args = process.argv.slice(2);
  const command = args[0] || 'setup';
  
  switch (command) {
    case 'setup':
      setup.setup().catch(error => {
        console.error('Setup failed:', error);
        process.exit(1);
      });
      break;
      
    case 'config':
      setup.interactiveConfig().then(() => {
        console.log('Configuration completed');
        process.exit(0);
      }).catch(error => {
        console.error('Configuration failed:', error);
        process.exit(1);
      });
      break;
      
    default:
      console.log('Usage: node setup-backup-system.js [setup|config]');
      console.log('  setup  - Full backup system setup (default)');
      console.log('  config - Interactive configuration');
      process.exit(1);
  }
}

module.exports = BackupSystemSetup;
