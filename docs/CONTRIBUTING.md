# Contributing Guidelines - Mononio AI Website

## 🤝 Welcome Contributors!

Thank you for your interest in contributing to the Mononio AI website! This document provides guidelines and standards for contributing to the project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Testing Requirements](#testing-requirements)
- [Pull Request Process](#pull-request-process)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Review Process](#review-process)

## 📜 Code of Conduct

### Our Standards
- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

### Enforcement
- Project maintainers are responsible for clarifying standards
- Unacceptable behavior will not be tolerated
- Violations will result in temporary or permanent ban from the project

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git
- Basic knowledge of React, TypeScript, and Next.js

### Setup
1. Fork the repository
2. Clone your fork locally
3. Install dependencies: `npm install`
4. Create a feature branch: `git checkout -b feature/your-feature`

### Development Environment
```bash
# Start development server
npm run dev

# Run tests
npm run test

# Run linting
npm run lint
```

## 🔄 Development Workflow

### 1. Issue Creation
Before starting work, create or claim an issue:
- **Bug reports**: Include steps to reproduce, expected vs actual behavior
- **Feature requests**: Describe the feature and its benefits
- **Enhancements**: Explain the improvement and rationale

### 2. Branch Naming Convention
Use descriptive branch names:
```
feature/add-user-authentication
fix/resolve-navigation-bug
docs/update-api-documentation
refactor/optimize-component-performance
```

### 3. Development Process
1. **Plan**: Understand the requirements and design the solution
2. **Code**: Implement the feature with tests
3. **Test**: Ensure all tests pass and coverage meets requirements
4. **Review**: Self-review your code before submitting
5. **Submit**: Create a pull request

## 📝 Code Standards

### TypeScript
- Use strict TypeScript configuration
- Define proper types for all functions and components
- Avoid `any` type - use proper type definitions
- Use interfaces for object shapes, types for unions/primitives

```typescript
// ✅ Good
interface User {
  id: string;
  name: string;
  email: string;
}

const getUser = async (id: string): Promise<User | null> => {
  // implementation
};

// ❌ Bad
const getUser = async (id: any): Promise<any> => {
  // implementation
};
```

### React Components
- Use functional components with hooks
- Follow naming conventions: PascalCase for components
- Implement proper prop types and default values
- Use React.memo for performance optimization when needed

```typescript
// ✅ Good
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  onClick,
  disabled = false,
}) => {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
```

### File Organization
- Use kebab-case for file names
- Group related files in directories
- Export components from index files
- Keep files focused and single-purpose

```
components/
├── ui/
│   ├── button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── index.ts
│   └── index.ts
└── layout/
    ├── Header.tsx
    └── Footer.tsx
```

### Styling
- Use Tailwind CSS for styling
- Follow mobile-first responsive design
- Use CSS custom properties for theming
- Maintain consistent spacing and typography

```typescript
// ✅ Good
<div className="flex flex-col md:flex-row gap-4 p-6 bg-white rounded-lg shadow-md">
  <h2 className="text-2xl font-bold text-gray-900">Title</h2>
  <p className="text-gray-600">Description</p>
</div>

// ❌ Bad
<div style={{ display: 'flex', padding: '24px', backgroundColor: 'white' }}>
  <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Title</h2>
</div>
```

## 🧪 Testing Requirements

### Test Coverage
- **Minimum Coverage**: 80% for new code
- **Coverage Areas**: Components, utilities, business logic
- **Test Types**: Unit tests, integration tests, E2E tests

### Unit Tests
- Test component behavior and edge cases
- Mock external dependencies
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)

```typescript
// ✅ Good
describe('Button Component', () => {
  it('should render with primary variant by default', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-primary');
  });

  it('should call onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Integration Tests
- Test component interactions
- Test API integrations
- Test user workflows

### E2E Tests
- Test critical user journeys
- Test cross-browser compatibility
- Test responsive design

## 🔀 Pull Request Process

### Before Submitting
1. **Self-Review**: Review your own code
2. **Tests**: Ensure all tests pass
3. **Linting**: Fix all linting errors
4. **Coverage**: Verify test coverage meets requirements
5. **Documentation**: Update documentation if needed

### Pull Request Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] E2E tests pass
- [ ] Coverage meets requirements

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console errors
- [ ] Performance impact considered

## Screenshots (if applicable)
Add screenshots for UI changes

## Related Issues
Closes #123
```

### Review Process
1. **Automated Checks**: CI/CD pipeline must pass
2. **Code Review**: At least one maintainer approval required
3. **Testing**: All tests must pass
4. **Documentation**: Documentation updated if needed

## 📝 Commit Message Guidelines

### Format
```
type(scope): description

[optional body]

[optional footer]
```

### Types
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Build process or auxiliary tool changes

### Examples
```bash
# ✅ Good
feat(auth): add user authentication with JWT
fix(navigation): resolve mobile menu toggle issue
docs(api): update API documentation
refactor(components): optimize Button component performance

# ❌ Bad
fix bug
update stuff
wip
```

## 🔍 Review Process

### What Reviewers Look For
1. **Functionality**: Does the code work as intended?
2. **Code Quality**: Is the code clean and maintainable?
3. **Testing**: Are there adequate tests?
4. **Performance**: Any performance implications?
5. **Security**: Any security concerns?
6. **Accessibility**: Is the code accessible?

### Review Guidelines
- Be constructive and respectful
- Focus on the code, not the person
- Provide specific feedback
- Suggest improvements when possible
- Approve only when satisfied

### Response Time
- **Initial Review**: Within 2 business days
- **Follow-up Reviews**: Within 1 business day
- **Emergency Fixes**: Within 4 hours

## 🏆 Recognition

### Contributors
- All contributors will be listed in the project README
- Significant contributions will be highlighted
- Regular contributors may be invited to join the maintainer team

### Contribution Levels
- **Bronze**: 1-5 contributions
- **Silver**: 6-15 contributions
- **Gold**: 16+ contributions
- **Platinum**: Core maintainer

## 🆘 Getting Help

### Questions and Support
- **GitHub Issues**: For bug reports and feature requests
- **Discussions**: For questions and general discussion
- **Documentation**: Check existing documentation first

### Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project.

---

**Thank you for contributing to Mononio AI!** 🚀

**Last Updated**: January 27, 2025  
**Version**: 0.1.0 