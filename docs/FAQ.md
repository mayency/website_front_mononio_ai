# Frequently Asked Questions (FAQ) - Mononio AI Website

## 📋 General Questions

### What is the Mononio AI website?
The Mononio AI website is a modern, scalable web application built with Next.js 15.4.7, React 19.1.0, and TypeScript. It serves as the main marketing and user interface for Mononio AI services.

### What technologies are used?
- **Frontend**: Next.js 15.4.7, React 19.1.0, TypeScript 5
- **Styling**: Tailwind CSS v4
- **Testing**: Jest, Playwright
- **CI/CD**: GitHub Actions
- **Performance**: Lighthouse CI

### How do I get started with development?
1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Open `http://localhost:3000`

## 🚀 Development Questions

### How do I run the development server?
```bash
npm run dev
```
The application will be available at `http://localhost:3000`

### How do I run tests?
```bash
# Unit tests
npm run test

# Unit tests with coverage
npm run test:coverage

# End-to-end tests
npm run test:e2e

# E2E tests with UI
npm run test:e2e:ui
```

### How do I check code quality?
```bash
# Run ESLint
npm run lint

# Run ESLint with auto-fix
npm run lint -- --fix

# Type checking
npx tsc --noEmit
```

### How do I build for production?
```bash
npm run build
npm run start
```

## 🔧 Configuration Questions

### Where are configuration files located?
All configuration files are centralized in the `config/` directory:
- `config/next.config.ts` - Next.js configuration
- `config/tsconfig.json` - TypeScript configuration
- `config/eslint.config.mjs` - ESLint configuration
- `config/jest.config.js` - Jest configuration

### How do I add environment variables?
Create a `.env.local` file in the root directory:
```bash
NEXT_PUBLIC_APP_NAME=Mononio AI
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### How do I configure Tailwind CSS?
Tailwind CSS is configured in the project. You can customize it by modifying the Tailwind configuration file or adding custom styles in `app/globals.css`.

## 🧪 Testing Questions

### What is the test coverage requirement?
The project requires a minimum of **80% test coverage** for all new code.

### How do I write unit tests?
Create test files with the `.test.tsx` or `.test.ts` extension in the `tests/unit/` directory:

```typescript
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import MyComponent from '@/app/components/MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})
```

### How do I write E2E tests?
Create test files in the `tests/e2e/` directory using Playwright:

```typescript
import { test, expect } from '@playwright/test'

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Mononio AI/)
})
```

### How do I run tests in watch mode?
```bash
npm run test:watch
```

## 🐛 Troubleshooting

### Port 3000 is already in use
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

### Dependencies are not installing correctly
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors
```bash
# Check TypeScript configuration
npx tsc --noEmit

# Restart TypeScript server in VS Code
# Cmd+Shift+P -> "TypeScript: Restart TS Server"
```

### Tests are failing
```bash
# Clear Jest cache
npm run test -- --clearCache

# Run tests with verbose output
npm run test -- --verbose
```

### Build is failing
1. Check for TypeScript errors: `npx tsc --noEmit`
2. Check for linting errors: `npm run lint`
3. Ensure all tests pass: `npm run test`
4. Check for missing dependencies

### Performance issues
```bash
# Analyze bundle size
npm run build
# Check .next/analyze/ for bundle analysis

# Run Lighthouse audit
npx lighthouse http://localhost:3000 --output html
```

## 📁 Project Structure Questions

### Where should I add new components?
- **Shared components**: `app/components/`
- **UI components**: `app/components/ui/`
- **Page-specific components**: Within the respective page directory

### How do I organize new pages?
- **Marketing pages**: `app/(marketing)/`
- **Dashboard pages**: `app/(dashboard)/`
- **Authentication pages**: `app/(auth)/`

### Where should I add tests?
- **Unit tests**: `tests/unit/`
- **Integration tests**: `tests/integration/`
- **E2E tests**: `tests/e2e/`

### Where should I add documentation?
All documentation goes in the `docs/` directory:
- `docs/README.md` - Project overview
- `docs/SETUP.md` - Setup instructions
- `docs/CONTRIBUTING.md` - Contributing guidelines
- `docs/ARCHITECTURE.md` - Architecture documentation
- `docs/FAQ.md` - This file

## 🔄 CI/CD Questions

### How does the CI/CD pipeline work?
The project uses GitHub Actions for continuous integration:
1. **Push to branch** triggers CI/CD
2. **Linting** checks code quality
3. **Unit tests** run with coverage check
4. **E2E tests** verify functionality
5. **Build** creates production build
6. **Lighthouse** audits performance
7. **Deploy** to staging/production

### What are the quality gates?
- ESLint must pass
- 80% test coverage minimum
- All tests must pass
- Lighthouse score > 90
- Build must complete successfully

### How do I check CI/CD status?
- Go to the GitHub repository
- Click on the "Actions" tab
- View the latest workflow run

## 🎨 Styling Questions

### How do I add custom styles?
1. **Tailwind classes**: Use Tailwind utility classes directly
2. **Custom CSS**: Add to `app/globals.css`
3. **Component styles**: Use CSS modules or styled-components

### How do I use the design system?
The project uses a consistent design system with:
- **Colors**: Defined in Tailwind config
- **Typography**: Consistent font scales
- **Spacing**: 4px base unit system
- **Components**: Reusable component library

### How do I make components responsive?
Use Tailwind's responsive prefixes:
```typescript
<div className="flex flex-col md:flex-row lg:flex-row">
  <div className="w-full md:w-1/2 lg:w-1/3">Content</div>
</div>
```

## 🔒 Security Questions

### How is authentication handled?
The project uses JWT tokens for authentication:
1. User submits credentials
2. Server validates and generates JWT
3. Token stored in secure cookie
4. Protected routes check token validity

### How is data validation handled?
The project uses Zod for schema validation:
```typescript
import { z } from 'zod'

const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})
```

### What security measures are in place?
- Input validation with Zod
- XSS protection (React built-in)
- CSRF protection
- Content Security Policy
- HTTPS enforcement

## 📊 Performance Questions

### How do I optimize performance?
1. **Code splitting**: Automatic with Next.js
2. **Image optimization**: Use Next.js Image component
3. **Font optimization**: System fonts with fallbacks
4. **Bundle analysis**: Regular monitoring
5. **Caching**: Multiple layers

### How do I monitor performance?
- **Lighthouse CI**: Automated audits
- **Core Web Vitals**: Real user monitoring
- **Bundle analysis**: Regular checks
- **Error tracking**: Error boundaries

### What are the performance targets?
- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **First Input Delay (FID)**: < 100ms

## 🤝 Contributing Questions

### How do I contribute to the project?
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write tests
5. Submit a pull request

### What are the coding standards?
- Use TypeScript with strict mode
- Follow ESLint rules
- Write tests for new features
- Use descriptive commit messages
- Follow the component naming conventions

### How do I submit a pull request?
1. Ensure all tests pass
2. Check code coverage meets requirements
3. Update documentation if needed
4. Create a pull request with the template
5. Request review from maintainers

### What is the review process?
1. Automated checks must pass
2. At least one maintainer approval required
3. All tests must pass
4. Documentation updated if needed

## 🆘 Getting Help

### Where can I get help?
1. **Check this FAQ** for common solutions
2. **Search existing issues** in the repository
3. **Create a new issue** with detailed information
4. **Check documentation** in the `docs/` directory

### How do I report a bug?
Create an issue with:
- Detailed description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Environment information (OS, Node.js version, etc.)
- Screenshots if applicable

### How do I request a feature?
Create an issue with:
- Description of the feature
- Use cases and benefits
- Mockups or examples if applicable
- Priority level

### What information should I include when asking for help?
- **Environment**: OS, Node.js version, npm version
- **Error messages**: Full error text and stack trace
- **Steps to reproduce**: Detailed steps
- **Expected behavior**: What you expected to happen
- **Actual behavior**: What actually happened

## 📚 Additional Resources

### Documentation
- [Project README](../README.md)
- [Setup Guide](./SETUP.md)
- [Contributing Guidelines](./CONTRIBUTING.md)
- [Architecture Documentation](./ARCHITECTURE.md)

### External Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Jest Documentation](https://jestjs.io/docs)
- [Playwright Documentation](https://playwright.dev/docs)

### Community
- [GitHub Issues](https://github.com/your-repo/issues)
- [GitHub Discussions](https://github.com/your-repo/discussions)

---

**Last Updated**: January 27, 2025  
**Version**: 0.1.0

If you can't find the answer to your question here, please [create an issue](https://github.com/your-repo/issues/new) with the `question` label. 