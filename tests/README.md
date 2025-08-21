# Testing Infrastructure

This directory contains all test files for the Mononio AI website project.

## Test Structure

- `unit/` - Unit tests for individual components and functions
- `integration/` - Integration tests for component interactions
- `e2e/` - End-to-end tests using Playwright
- `__mocks__/` - Mock files for testing

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run e2e tests
npm run test:e2e
```

## Test Configuration

- Jest for unit and integration tests
- React Testing Library for component testing
- Playwright for e2e testing
- Coverage reporting with Istanbul 