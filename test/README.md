# Test Suite

This directory contains unit tests for the AI Magic Meme Generator application.

## Test Framework

We use [Vitest](https://vitest.dev/) as our testing framework, which is optimized for Vite projects.

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Test Files

- **constants.test.ts**: Tests for meme template constants
- **types.test.ts**: Tests for TypeScript type definitions
- **canvasUtils.test.ts**: Tests for canvas rendering utilities
- **geminiService.test.ts**: Tests for Gemini AI service integration

## Test Coverage

Current test coverage includes:

- ✅ Constants validation (6 tests)
- ✅ Type definitions (5 tests)
- ✅ Canvas utilities (7 tests)
- ✅ Gemini service integration (9 tests)

**Total: 27 tests**

## Writing New Tests

1. Create a new test file with `.test.ts` extension
2. Import the necessary testing utilities from `vitest`
3. Follow the existing test patterns for consistency
4. Run tests to ensure they pass

Example:

```typescript
import { describe, it, expect } from 'vitest';

describe('MyComponent', () => {
  it('should do something', () => {
    expect(true).toBe(true);
  });
});
```
