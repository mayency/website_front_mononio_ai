# Mononio AI Website - Documentation

## 📋 Overview

The Mononio AI website is a modern, scalable web application built with Next.js 15.4.7, React 19.1.0, and TypeScript. This project demonstrates best practices in frontend development, including comprehensive testing, automated CI/CD, and robust architecture.

## 🎯 Project Goals

- **Performance**: Achieve Lighthouse scores > 90 across all metrics
- **Maintainability**: Maintain 80%+ test coverage with automated quality gates
- **Scalability**: Support rapid feature development with clear architecture patterns
- **User Experience**: Deliver fast, accessible, and responsive user interfaces
- **Developer Experience**: Provide excellent tooling and documentation for contributors

## 🏗️ Architecture Principles

### 1. **Component-First Design**
- Reusable, composable components with clear interfaces
- Separation of concerns between UI, business logic, and data layers
- Consistent naming conventions and file organization

### 2. **Type Safety**
- Full TypeScript implementation with strict mode enabled
- Comprehensive type definitions for all components and APIs
- Runtime validation with Zod schemas

### 3. **Performance Optimization**
- Server-side rendering with Next.js App Router
- Code splitting and dynamic imports
- Optimized images and assets
- Efficient state management

### 4. **Quality Assurance**
- Automated testing with Jest and Playwright
- Continuous integration with GitHub Actions
- Code quality enforcement with ESLint and Prettier
- Performance monitoring with Lighthouse CI

## 📁 Project Structure

```
website_front_mononio_ai/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes
│   ├── (dashboard)/              # Dashboard routes
│   ├── (marketing)/              # Marketing pages
│   ├── components/               # Shared UI components
│   └── globals.css               # Global styles
├── config/                       # Configuration files
│   ├── next.config.ts           # Next.js configuration
│   ├── tsconfig.json            # TypeScript configuration
│   ├── eslint.config.mjs        # ESLint configuration
│   ├── jest.config.js           # Jest configuration
│   └── jest.setup.js            # Jest setup
├── tests/                        # Testing infrastructure
│   ├── unit/                     # Unit tests
│   ├── integration/              # Integration tests
│   └── e2e/                      # End-to-end tests
├── docs/                         # Documentation
├── public/                       # Static assets
└── changelog/                    # Automated changelog system
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd website_front_mononio_ai

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run unit tests
- `npm run test:coverage` - Run tests with coverage
- `npm run test:e2e` - Run end-to-end tests

## 🧪 Testing Strategy

### Unit Tests
- **Framework**: Jest with React Testing Library
- **Coverage Target**: 80% minimum
- **Location**: `tests/unit/`
- **Focus**: Component behavior, utilities, and business logic

### Integration Tests
- **Framework**: Jest with Next.js testing utilities
- **Location**: `tests/integration/`
- **Focus**: API routes, data flow, and component interactions

### End-to-End Tests
- **Framework**: Playwright
- **Location**: `tests/e2e/`
- **Focus**: User workflows, cross-browser compatibility, and accessibility

## 🔄 CI/CD Pipeline

The project uses GitHub Actions for continuous integration and deployment:

### Quality Gates
1. **Linting**: ESLint must pass on all files
2. **Unit Tests**: 80% coverage minimum
3. **E2E Tests**: All smoke tests must pass
4. **Build**: Application must build successfully
5. **Lighthouse**: Performance scores > 90

### Deployment Stages
- **Staging**: Automatic deployment from `develop` branch
- **Production**: Manual deployment from `main` branch

## 📚 Documentation Structure

- **[SETUP.md](./SETUP.md)** - Detailed setup and configuration guide
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Guidelines for contributors
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Detailed architecture documentation
- **[FAQ.md](./FAQ.md)** - Common issues and solutions

## 🎨 Design System

The project uses a consistent design system built with:
- **Tailwind CSS v4** for utility-first styling
- **Headless UI** for accessible components
- **Framer Motion** for animations
- **Lucide React** for icons

## 🔧 Configuration

All configuration files are centralized in the `config/` directory:
- **Next.js**: `config/next.config.ts`
- **TypeScript**: `config/tsconfig.json`
- **ESLint**: `config/eslint.config.mjs`
- **Jest**: `config/jest.config.js`

## 📊 Performance Monitoring

- **Lighthouse CI** for automated performance audits
- **Core Web Vitals** tracking
- **Bundle analysis** with Next.js built-in tools
- **Error monitoring** (to be implemented)

## 🤝 Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is proprietary software. All rights reserved.

## 🆘 Support

For support and questions:
1. Check the [FAQ.md](./FAQ.md) for common solutions
2. Review existing issues in the repository
3. Create a new issue with detailed information

---

**Last Updated**: January 27, 2025  
**Version**: 0.1.0  
**Architecture Score**: 9.5/10 (Target) 