# Configuration Management

This directory contains all configuration files for the Mononio AI website project.

## Configuration Structure

- `environment/` - Environment-specific configuration files
- `build/` - Build and deployment configuration
- `linting/` - ESLint, Prettier, and other code quality tools
- `testing/` - Jest, Playwright, and other testing configurations

## Configuration Files

### Environment Configuration
- `.env.local` - Local development environment variables
- `.env.production` - Production environment variables
- `.env.example` - Example environment file template

### Build Configuration
- `next.config.ts` - Next.js configuration
- `postcss.config.mjs` - PostCSS configuration
- `tailwind.config.ts` - Tailwind CSS configuration

### Code Quality
- `eslint.config.mjs` - ESLint configuration
- `.prettierrc` - Prettier configuration
- `tsconfig.json` - TypeScript configuration

## Usage

Configuration files are automatically loaded by their respective tools. Environment variables should be set according to the deployment environment. 