# Changelog System

This folder contains the changelog for the Mononio AI website project. The changelog is automatically synchronized with a desktop folder for easy access.

## Structure

- `CHANGELOG.md` - Main changelog file with all changes
- `entries/` - Individual changelog entry files
  - `features/` - New features
  - `fixes/` - Bug fixes
  - `improvements/` - Improvements and enhancements
  - `breaking/` - Breaking changes
- `templates/` - Templates for different types of changes
- `scripts/` - Automation scripts for changelog management

## Usage

### Adding a new changelog entry:

```bash
npm run changelog:add -- --type feature --title "New authentication system" --description "Implemented OAuth2 authentication"
```

### Available types:
- `feature` - New features
- `fix` - Bug fixes
- `improvement` - Improvements and enhancements
- `breaking` - Breaking changes
- `docs` - Documentation updates
- `refactor` - Code refactoring

### Viewing the changelog:
```bash
npm run changelog:view
```

### Syncing with desktop:
```bash
npm run changelog:sync
```

## Desktop Sync

The changelog is automatically synchronized with: `/Users/eitansegev/Desktop/mononio-ai-changelog/`

This ensures you can access the changelog from your desktop without navigating to the project folder. 