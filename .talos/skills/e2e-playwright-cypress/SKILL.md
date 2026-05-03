---
name: e2e-playwright-cypress
description: >
  Writes end-to-end browser tests using Playwright or Cypress covering critical user journeys,
  form submissions, navigation flows, and authentication flows. Integrates with CI pipelines.
---

# E2E Testing — Playwright & Cypress Skill

## Goal

Validate that the entire application — frontend, backend, and database — works correctly
together for the most critical user journeys that unit tests cannot cover.

## When to Use

- A user flow spans multiple pages or requires real browser interaction.
- Authentication, form submission, or navigation must be tested end-to-end.
- A critical regression in a user-facing flow must be prevented.
- A CI gate requires E2E tests to pass before production deployment.

## Tool Selection

| Use Playwright | Use Cypress |
|---|---|
| Cross-browser testing (Chrome, Firefox, Safari) | Chrome/Electron focused |
| API testing alongside UI tests | Existing Cypress setup |
| Multiple browser contexts (multi-user scenarios) | Component testing in React |

## Playwright Example

```typescript
// tests/auth.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('user can log in with valid credentials', async ({ page }) => {
    await page.goto('/login');
    await page.fill('[data-testid="email"]', 'user@example.com');
    await page.fill('[data-testid="password"]', 'password123');
    await page.click('[data-testid="login-button"]');
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByText('Welcome back')).toBeVisible();
  });

  test('shows error for invalid credentials', async ({ page }) => {
    await page.goto('/login');
    await page.fill('[data-testid="email"]', 'wrong@example.com');
    await page.fill('[data-testid="password"]', 'wrongpass');
    await page.click('[data-testid="login-button"]');
    await expect(page.getByText('Invalid credentials')).toBeVisible();
  });
});
```

## Cypress Example

```typescript
describe('Dashboard', () => {
  beforeEach(() => {
    cy.login('admin@example.com', 'password');
  });

  it('displays payment list on load', () => {
    cy.visit('/dashboard/payments');
    cy.get('[data-testid="payment-row"]').should('have.length.greaterThan', 0);
  });
});
```

## Testability Rules

- All interactive elements must have `data-testid` attributes.
- Never select by CSS class or text content in E2E tests — both change frequently.
- Use fixtures/seed data for consistent test data.
- Use `page.waitForResponse()` instead of arbitrary `page.waitForTimeout()`.

## CI Integration

```yaml
# GitHub Actions
- name: Run E2E Tests
  run: npx playwright test
  env:
    BASE_URL: http://localhost:3000
```

## Review Checklist

- [ ] All critical user journeys have E2E tests
- [ ] All interactive elements have `data-testid` attributes
- [ ] Tests run in CI on every PR to `main`
- [ ] Tests use fixtures, not production data
- [ ] Tests pass in headless mode
