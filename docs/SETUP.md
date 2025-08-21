# Setup Guide - Mononio AI Website

## 📋 Prerequisites

Before setting up the Mononio AI website, ensure you have the following installed:

### Required Software
- **Node.js** 18.0.0 or higher
- **npm** 9.0.0 or higher (comes with Node.js)
- **Git** 2.30.0 or higher

### Optional but Recommended
- **VS Code** with recommended extensions
- **Docker** (for containerized development)
- **Postman** or **Insomnia** (for API testing)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd website_front_mononio_ai
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Application
NEXT_PUBLIC_APP_NAME=Mononio AI
NEXT_PUBLIC_APP_URL=http://localhost:3000

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Analytics (optional)
NEXT_PUBLIC_GA_TRACKING_ID=your-ga-tracking-id

# External Services (optional)
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
```

### Configuration Files

All configuration files are located in the `config/` directory:

- **`config/next.config.ts`** - Next.js configuration
- **`config/tsconfig.json`** - TypeScript configuration
- **`config/eslint.config.mjs`** - ESLint rules
- **`config/jest.config.js`** - Jest testing configuration
- **`config/jest.setup.js`** - Jest setup and mocks

## 🧪 Testing Setup

### Unit Tests
```bash
# Run all unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### End-to-End Tests
```bash
# Install Playwright browsers (first time only)
npx playwright install

# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui
```

### Test Coverage Requirements
- **Minimum Coverage**: 80%
- **Coverage Areas**: Components, utilities, business logic
- **Coverage Reports**: Generated in `coverage/` directory

## 🔧 Development Tools

### Code Quality
```bash
# Run ESLint
npm run lint

# Run ESLint with auto-fix
npm run lint -- --fix
```

### Type Checking
```bash
# Run TypeScript compiler
npx tsc --noEmit
```

### Build Process
```bash
# Build for production
npm run build

# Start production server
npm run start
```

## 📁 Project Structure

### Key Directories
```
website_front_mononio_ai/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Dashboard pages
│   ├── (marketing)/       # Marketing pages
│   └── components/        # Shared components
├── config/                # Configuration files
├── tests/                 # Test files
│   ├── unit/              # Unit tests
│   ├── integration/       # Integration tests
│   └── e2e/               # End-to-end tests
├── docs/                  # Documentation
├── public/                # Static assets
└── changelog/             # Changelog system
```

### Component Organization
- **`app/components/`** - Shared UI components
- **`app/components/ui/`** - Base UI components (buttons, inputs, etc.)
- **`app/(marketing)/components/`** - Marketing-specific components
- **`app/(dashboard)/components/`** - Dashboard-specific components

## 🎨 Styling and Design

### Tailwind CSS
The project uses Tailwind CSS v4 for styling:

```bash
# Tailwind configuration is in config/tailwind.config.js
# Global styles are in app/globals.css
```

### Design System
- **Colors**: Defined in Tailwind config
- **Typography**: Consistent font scales
- **Spacing**: 4px base unit system
- **Components**: Reusable component library

## 🔄 Development Workflow

### 1. Feature Development
```bash
# Create a new feature branch
git checkout -b feature/your-feature-name

# Make your changes
# Write tests for new functionality
npm run test

# Ensure code quality
npm run lint

# Commit your changes
git add .
git commit -m "feat: add your feature description"
```

### 2. Testing Your Changes
```bash
# Run all tests
npm run test
npm run test:e2e

# Check coverage
npm run test:coverage

# Build the application
npm run build
```

### 3. Code Review Process
1. Push your branch to the repository
2. Create a pull request
3. Ensure CI/CD pipeline passes
4. Request code review
5. Address feedback and merge

## 🚀 Deployment

### Staging Deployment
- **Trigger**: Push to `develop` branch
- **Environment**: Staging environment
- **URL**: `https://staging.mononio-ai.com`

### Production Deployment
- **Trigger**: Merge to `main` branch
- **Environment**: Production environment
- **URL**: `https://mononio-ai.com`

### Deployment Checklist
- [ ] All tests pass
- [ ] Code coverage meets requirements
- [ ] Lighthouse scores > 90
- [ ] No linting errors
- [ ] Build completes successfully

## 🔍 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

#### Dependency Issues
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### TypeScript Errors
```bash
# Check TypeScript configuration
npx tsc --noEmit

# Restart TypeScript server in VS Code
# Cmd+Shift+P -> "TypeScript: Restart TS Server"
```

#### Test Failures
```bash
# Clear Jest cache
npm run test -- --clearCache

# Run tests with verbose output
npm run test -- --verbose
```

### Performance Issues
```bash
# Analyze bundle size
npm run build
# Check .next/analyze/ for bundle analysis

# Run Lighthouse audit
npx lighthouse http://localhost:3000 --output html
```

## 📚 Additional Resources

- **[Architecture Documentation](./ARCHITECTURE.md)** - Detailed architecture guide
- **[Contributing Guidelines](./CONTRIBUTING.md)** - How to contribute
- **[FAQ](./FAQ.md)** - Common questions and answers
- **[API Documentation](./api/README.md)** - API specifications

## 🆘 Getting Help

If you encounter issues not covered in this guide:

1. Check the [FAQ](./FAQ.md) for common solutions
2. Search existing issues in the repository
3. Create a new issue with:
   - Detailed description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment information (OS, Node.js version, etc.)

---

**Last Updated**: January 27, 2025  
**Version**: 0.1.0 