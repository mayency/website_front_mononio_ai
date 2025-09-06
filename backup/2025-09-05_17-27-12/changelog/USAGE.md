# Changelog System Usage Guide

## Quick Start

### 1. Adding a Changelog Entry

```bash
# Add a new feature
npm run changelog:add -- features "User Authentication" "Implemented OAuth2 authentication system"

# Add a bug fix
npm run changelog:add -- fixes "Login Button Not Working" "Fixed login button click handler"

# Add an improvement
npm run changelog:add -- improvements "Performance Optimization" "Optimized image loading with lazy loading"

# Add documentation update
npm run changelog:add -- docs "API Documentation" "Updated API documentation with new endpoints"

# Add breaking change
npm run changelog:add -- breaking "Database Schema Change" "Updated user table schema, requires migration"

# Add refactoring
npm run changelog:add -- refactor "Component Restructure" "Refactored user profile component for better maintainability"
```

### 2. Viewing the Changelog

```bash
# View the main changelog
npm run changelog:view

# List all individual entries
npm run changelog:list

# Sync to desktop
npm run changelog:sync
```

### 3. Automatic Updates with Git

The system automatically creates changelog entries when you commit code. Use these commit message prefixes:

- `feat:` or `add:` or `new:` → Creates a feature entry
- `fix:` or `bug:` or `patch:` → Creates a fix entry
- `improve:` or `enhance:` or `update:` → Creates an improvement entry
- `breaking:` or `major:` → Creates a breaking change entry
- `docs:` or `documentation:` → Creates a documentation entry
- `refactor:` or `cleanup:` → Creates a refactor entry

Example commit messages:
```bash
git commit -m "feat: Add user dashboard with analytics"
git commit -m "fix: Resolve login button not responding"
git commit -m "improve: Optimize database queries for better performance"
```

## File Structure

```
changelog/
├── CHANGELOG.md              # Main changelog file
├── README.md                 # System documentation
├── USAGE.md                  # This usage guide
├── config.json              # Configuration settings
├── entries/                 # Individual changelog entries
│   ├── features/           # New features
│   ├── fixes/              # Bug fixes
│   ├── improvements/       # Improvements
│   ├── breaking/           # Breaking changes
│   ├── docs/               # Documentation updates
│   └── refactor/           # Code refactoring
├── templates/              # Entry templates
│   ├── feature.md
│   ├── fix.md
│   ├── improvement.md
│   ├── breaking.md
│   ├── docs.md
│   └── refactor.md
└── scripts/                # Management scripts
    ├── changelog-manager.js
    └── git-hook.js
```

## Desktop Synchronization

The changelog is automatically synchronized to: `/Users/eitansegev/Desktop/mononio-ai-changelog/`

This allows you to:
- Access the changelog from your desktop without navigating to the project
- Share changelog information easily
- Keep a backup of changelog entries

## Templates

Each changelog entry type has a specific template that includes relevant sections:

- **Features**: Title, description, impact, technical details, testing, screenshots
- **Fixes**: Title, description, issue, solution, technical details, testing, impact
- **Improvements**: Title, description, before/after, technical details, benefits, testing
- **Breaking Changes**: Title, description, migration guide, impact, technical details
- **Documentation**: Title, description, type of documentation, changes made, impact
- **Refactoring**: Title, description, what was refactored, motivation, benefits, risks

## Configuration

Edit `changelog/config.json` to customize:

- Desktop sync path
- Auto-sync settings
- Git hook settings
- Commit message prefixes
- Formatting options

## Best Practices

1. **Be Descriptive**: Write clear, concise descriptions of changes
2. **Use Templates**: Fill out all relevant sections in the templates
3. **Include Impact**: Always describe how changes affect users/developers
4. **Test Entries**: Verify that entries are properly formatted
5. **Regular Updates**: Keep the changelog updated with every significant change
6. **Use Git Hooks**: Leverage automatic changelog generation with proper commit messages

## Troubleshooting

### Common Issues

1. **Permission Denied**: Make sure scripts are executable
   ```bash
   chmod +x changelog/scripts/*.js
   ```

2. **Desktop Sync Fails**: Check if the desktop directory exists and is writable
   ```bash
   mkdir -p /Users/eitansegev/Desktop/mononio-ai-changelog
   ```

3. **Git Hooks Not Working**: Ensure Git hooks are properly installed
   ```bash
   npm run changelog:setup-hooks
   ```

4. **Template Not Found**: Verify template files exist in the templates directory

### Getting Help

- Check the main README.md for system overview
- Review the configuration in config.json
- Examine existing entries for examples
- Use `npm run changelog:list` to see all entries 