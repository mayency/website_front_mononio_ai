#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class ChangelogManager {
  constructor() {
    this.projectRoot = process.cwd();
    this.changelogDir = path.join(this.projectRoot, 'changelog');
    this.entriesDir = path.join(this.changelogDir, 'entries');
    this.templatesDir = path.join(this.changelogDir, 'templates');
    this.desktopSyncDir = '/Users/eitansegev/Desktop/mononio-ai-changelog';
    
    this.ensureDirectories();
  }

  ensureDirectories() {
    const dirs = [
      this.changelogDir,
      this.entriesDir,
      path.join(this.entriesDir, 'features'),
      path.join(this.entriesDir, 'fixes'),
      path.join(this.entriesDir, 'improvements'),
      path.join(this.entriesDir, 'breaking'),
      path.join(this.entriesDir, 'docs'),
      path.join(this.entriesDir, 'refactor'),
      this.templatesDir,
      this.desktopSyncDir
    ];

    dirs.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`Created directory: ${dir}`);
      }
    });
  }

  addEntry(type, title, description, options = {}) {
    const timestamp = new Date().toISOString().split('T')[0];
    const time = new Date().toISOString().split('T')[1].split('.')[0];
    const filename = `${timestamp}-${time.replace(/:/g, '-')}-${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.md`;
    
    // Ensure the type directory exists
    const entryDir = path.join(this.entriesDir, type);
    if (!fs.existsSync(entryDir)) {
      fs.mkdirSync(entryDir, { recursive: true });
    }
    
    const entryPath = path.join(entryDir, filename);
    
    const template = this.getTemplate(type);
    const content = this.generateEntryContent(template, {
      title,
      description,
      timestamp,
      time,
      ...options
    });

    fs.writeFileSync(entryPath, content);
    console.log(`Created changelog entry: ${entryPath}`);
    
    this.updateMainChangelog();
    this.syncToDesktop();
    
    return entryPath;
  }

  getTemplate(type) {
    const templatePath = path.join(this.templatesDir, `${type}.md`);
    if (fs.existsSync(templatePath)) {
      return fs.readFileSync(templatePath, 'utf8');
    }
    return this.getDefaultTemplate(type);
  }

  getDefaultTemplate(type) {
    return `# ${type} Entry

## Title
[Title]

## Description
[Description]

## Date
[Date]

## Technical Details
- **Files Modified**: [List of files]
- **Impact**: [Impact description]

## Testing
- [ ] Testing completed

## Related Issues
[Related issues or PRs]`;
  }

  generateEntryContent(template, data) {
    let content = template;
    
    // Replace placeholders with actual data
    content = content.replace(/\[Title\]/g, data.title);
    content = content.replace(/\[Description\]/g, data.description);
    content = content.replace(/\[Date\]/g, `${data.timestamp} ${data.time}`);
    
    // Add metadata at the top
    const metadata = `---
type: ${data.type || 'entry'}
title: ${data.title}
date: ${data.timestamp}
time: ${data.time}
description: ${data.description}
---

`;
    
    return metadata + content;
  }

  updateMainChangelog() {
    const changelogPath = path.join(this.changelogDir, 'CHANGELOG.md');
    let changelog = fs.readFileSync(changelogPath, 'utf8');
    
    // Find the [Unreleased] section
    const unreleasedIndex = changelog.indexOf('## [Unreleased]');
    if (unreleasedIndex === -1) {
      console.error('Could not find [Unreleased] section in CHANGELOG.md');
      return;
    }
    
    // Get all entry files
    const entries = this.getAllEntries();
    
    // Group entries by type
    const groupedEntries = this.groupEntriesByType(entries);
    
    // Generate the new unreleased section
    const newUnreleasedSection = this.generateUnreleasedSection(groupedEntries);
    
    // Replace the existing unreleased section
    const beforeUnreleased = changelog.substring(0, unreleasedIndex);
    const afterUnreleased = changelog.substring(changelog.indexOf('\n', unreleasedIndex));
    
    const updatedChangelog = beforeUnreleased + newUnreleasedSection + afterUnreleased;
    
    fs.writeFileSync(changelogPath, updatedChangelog);
    console.log('Updated main CHANGELOG.md');
  }

  getAllEntries() {
    const entries = [];
    const types = ['features', 'fixes', 'improvements', 'breaking', 'docs', 'refactor'];
    
    types.forEach(type => {
      const typeDir = path.join(this.entriesDir, type);
      if (fs.existsSync(typeDir)) {
        const files = fs.readdirSync(typeDir).filter(file => file.endsWith('.md'));
        files.forEach(file => {
          const filePath = path.join(typeDir, file);
          const content = fs.readFileSync(filePath, 'utf8');
          const metadata = this.parseMetadata(content);
          entries.push({
            type,
            file,
            path: filePath,
            metadata,
            content
          });
        });
      }
    });
    
    return entries.sort((a, b) => new Date(b.metadata.date) - new Date(a.metadata.date));
  }

  parseMetadata(content) {
    const metadataMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (metadataMatch) {
      const metadataStr = metadataMatch[1];
      const metadata = {};
      metadataStr.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split(': ');
        if (key && valueParts.length > 0) {
          metadata[key.trim()] = valueParts.join(': ').trim();
        }
      });
      return metadata;
    }
    return {};
  }

  groupEntriesByType(entries) {
    const grouped = {};
    entries.forEach(entry => {
      if (!grouped[entry.type]) {
        grouped[entry.type] = [];
      }
      grouped[entry.type].push(entry);
    });
    return grouped;
  }

  generateUnreleasedSection(groupedEntries) {
    let section = '## [Unreleased]\n\n';
    
    const typeLabels = {
      features: 'Added',
      fixes: 'Fixed',
      improvements: 'Changed',
      breaking: 'Breaking Changes',
      docs: 'Documentation',
      refactor: 'Refactored'
    };
    
    Object.keys(groupedEntries).forEach(type => {
      if (groupedEntries[type].length > 0) {
        const label = typeLabels[type] || type;
        section += `### ${label}\n`;
        groupedEntries[type].forEach(entry => {
          section += `- ${entry.metadata.title}\n`;
        });
        section += '\n';
      }
    });
    
    return section;
  }

  syncToDesktop() {
    try {
      // Copy changelog directory to desktop
      execSync(`cp -r "${this.changelogDir}" "${this.desktopSyncDir}"`, { stdio: 'inherit' });
      console.log(`Synced changelog to desktop: ${this.desktopSyncDir}`);
    } catch (error) {
      console.error('Error syncing to desktop:', error.message);
    }
  }

  viewChangelog() {
    const changelogPath = path.join(this.changelogDir, 'CHANGELOG.md');
    if (fs.existsSync(changelogPath)) {
      const content = fs.readFileSync(changelogPath, 'utf8');
      console.log(content);
    } else {
      console.error('CHANGELOG.md not found');
    }
  }

  listEntries() {
    const entries = this.getAllEntries();
    console.log('\nChangelog Entries:');
    console.log('==================\n');
    
    entries.forEach(entry => {
      console.log(`${entry.metadata.date} [${entry.type.toUpperCase()}] ${entry.metadata.title}`);
    });
  }
}

// CLI Interface
function main() {
  const args = process.argv.slice(2);
  const manager = new ChangelogManager();
  
  const command = args[0];
  
  switch (command) {
    case 'add':
      const type = args[1];
      const title = args[2];
      const description = args[3];
      
      if (!type || !title || !description) {
        console.error('Usage: node changelog-manager.js add <type> <title> <description>');
        process.exit(1);
      }
      
      manager.addEntry(type, title, description);
      break;
      
    case 'view':
      manager.viewChangelog();
      break;
      
    case 'list':
      manager.listEntries();
      break;
      
    case 'sync':
      manager.syncToDesktop();
      break;
      
    case 'update':
      manager.updateMainChangelog();
      manager.syncToDesktop();
      break;
      
    default:
      console.log(`
Changelog Manager Usage:

  node changelog-manager.js add <type> <title> <description>
    Add a new changelog entry
  
  node changelog-manager.js view
    View the main changelog
  
  node changelog-manager.js list
    List all changelog entries
  
  node changelog-manager.js sync
    Sync changelog to desktop
  
  node changelog-manager.js update
    Update main changelog and sync to desktop

Available types: features, fixes, improvements, breaking, docs, refactor
      `);
  }
}

if (require.main === module) {
  main();
}

module.exports = ChangelogManager; 