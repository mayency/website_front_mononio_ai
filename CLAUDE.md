# CLAUDE.md - Development Instructions

## 🔧 Essential Commands
Always run these commands after making changes:

```bash
# Type checking
npm run typecheck

# Linting
npm run lint

# Tests
npm run test:coverage

# Performance check (if significant UI changes)
npm run perf:check
```

## 📁 Project Structure
- `/app` - Next.js App Router pages
- `/components` - React components
- `/utils` - Utility functions and API client
- `/types` - TypeScript type definitions
- `/tests` - Test files

## 🧪 Testing Guidelines
- Minimum coverage: 50%
- Test all critical paths
- Mock external API calls
- Test error states

## 🚀 Deployment Checklist
1. Run all tests
2. Check TypeScript errors
3. Verify Lighthouse scores > 90%
4. Test on mobile devices
5. Verify API endpoints
