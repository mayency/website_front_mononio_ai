#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class GitHookManager {
  constructor() {
    this.projectRoot = process.cwd();
    this.changelogDir = path.join(this.projectRoot, 'changelog');
    this.entriesDir = path.join(this.changelogDir, 'entries');
    this.desktopSyncDir = '/Users/eitansegev/Desktop/mononio-ai-changelog';
  }

  // Get staged files that have been modified
  getStagedFiles() {
    try {
      const output = execSync('git diff --cached --name-only', { encoding: 'utf8' });
      return output.trim().split('\n').filter(file => file.length > 0);
    } catch (error) {
      return [];
    }
  }

  // Get commit message
  getCommitMessage() {
    try {
      const output = execSync('git log -1 --pretty=%B', { encoding: 'utf8' });
      return output.trim();
    } catch (error) {
      return '';
    }
  }

  // Parse commit message to determine changelog entry type
  parseCommitMessage(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('feat:') || lowerMessage.includes('add:') || lowerMessage.includes('new:')) {
      return 'features';
    } else if (lowerMessage.includes('fix:') || lowerMessage.includes('bug:') || lowerMessage.includes('patch:')) {
      return 'fixes';
    } else if (lowerMessage.includes('improve:') || lowerMessage.includes('enhance:') || lowerMessage.includes('update:')) {
      return 'improvements';
    } else if (lowerMessage.includes('breaking:') || lowerMessage.includes('major:')) {
      return 'breaking';
    } else if (lowerMessage.includes('docs:') || lowerMessage.includes('documentation:')) {
      return 'docs';
    } else if (lowerMessage.includes('refactor:') || lowerMessage.includes('cleanup:')) {
      return 'refactor';
    }
    
    return 'improvements'; // Default to improvements
  }

  // Extract title from commit message
  extractTitle(message) {
    // Remove prefixes like "feat:", "fix:", etc.
    const cleanMessage = message.replace(/^(feat|fix|improve|breaking|docs|refactor):\s*/i, '');
    
    // Take the first line and limit to 100 characters
    const firstLine = cleanMessage.split('\n')[0];
    return firstLine.length > 100 ? firstLine.substring(0, 97) + '...' : firstLine;
  }

  // Create changelog entry from commit
  createEntryFromCommit() {
    const stagedFiles = this.getStagedFiles();
    const commitMessage = this.getCommitMessage();
    
    if (!commitMessage) {
      console.log('No commit message found, skipping changelog entry');
      return;
    }

    // Skip if no files were staged or if only changelog files were modified
    const nonChangelogFiles = stagedFiles.filter(file => !file.startsWith('changelog/'));
    if (nonChangelogFiles.length === 0) {
      console.log('Only changelog files modified, skipping changelog entry');
      return;
    }

    const type = this.parseCommitMessage(commitMessage);
    const title = this.extractTitle(commitMessage);
    const description = commitMessage;
    
    // Create the entry
    const ChangelogManager = require('./changelog-manager');
    const manager = new ChangelogManager();
    
    try {
      manager.addEntry(type, title, description, {
        files: stagedFiles.join(', '),
        commitHash: this.getCommitHash()
      });
      
      console.log(`Created changelog entry for commit: ${title}`);
    } catch (error) {
      console.error('Error creating changelog entry:', error.message);
    }
  }

  // Get current commit hash
  getCommitHash() {
    try {
      const output = execSync('git rev-parse HEAD', { encoding: 'utf8' });
      return output.trim().substring(0, 8);
    } catch (error) {
      return '';
    }
  }

  // Setup Git hooks
  setupHooks() {
    const gitHooksDir = path.join(this.projectRoot, '.git', 'hooks');
    
    if (!fs.existsSync(gitHooksDir)) {
      console.error('Git hooks directory not found. Make sure this is a Git repository.');
      return;
    }

    const hookScript = `#!/bin/sh
# Auto-generated changelog hook
node "${path.join(this.changelogDir, 'scripts', 'git-hook.js')}" post-commit
`;

    const postCommitHook = path.join(gitHooksDir, 'post-commit');
    fs.writeFileSync(postCommitHook, hookScript);
    fs.chmodSync(postCommitHook, '755');
    
    console.log('Git hooks installed successfully');
  }
}

// CLI Interface
function main() {
  const args = process.argv.slice(2);
  const hookManager = new GitHookManager();
  
  const command = args[0];
  
  switch (command) {
    case 'post-commit':
      hookManager.createEntryFromCommit();
      break;
      
    case 'setup':
      hookManager.setupHooks();
      break;
      
    default:
      console.log(`
Git Hook Manager Usage:

  node git-hook.js post-commit
    Create changelog entry from last commit (called by Git hook)
  
  node git-hook.js setup
    Install Git hooks for automatic changelog updates
      `);
  }
}

if (require.main === module) {
  main();
}

module.exports = GitHookManager; 