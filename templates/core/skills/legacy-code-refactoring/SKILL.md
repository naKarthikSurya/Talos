---
name: legacy-code-refactoring
description: >
  Safely refactors existing code to improve maintainability, readability, and testability
  without changing external behavior. Applies Extract Method, Extract Service, Replace
  Conditional with Polymorphism, and Strangler Fig patterns.
---

# Legacy Code Refactoring Skill

## Goal

Improve the internal quality of existing code incrementally, with test coverage as
a safety net, so that the system remains fully functional throughout the process.

## When to Use

- A module has grown too large (> 500 lines) and is hard to maintain.
- A function has too many responsibilities (> 20 lines, multiple levels of abstraction).
- Test coverage is too low to refactor safely — tests must be added first.
- Technical debt is slowing down feature delivery in a specific area.

## Refactoring Rules

> [!CAUTION]
> NEVER refactor without a test suite. If tests don't exist, write them first (characterization tests).

## Refactoring Patterns

### Extract Method
```typescript
// Before
async createOrder(dto) {
  const tax = dto.amount * 0.18;
  const total = dto.amount + tax;
  const discount = dto.coupon ? dto.amount * 0.1 : 0;
  const finalTotal = total - discount;
  // ... 40 more lines
}

// After
async createOrder(dto) {
  const total = this.calculateTotal(dto.amount, dto.coupon);
  // ...
}

private calculateTotal(amount: number, coupon?: string): number {
  const tax = amount * 0.18;
  const discount = coupon ? amount * 0.1 : 0;
  return amount + tax - discount;
}
```

### Extract Service
- Move a group of related methods from a large service into a dedicated service class.
- The original service delegates to the new service via dependency injection.

### Strangler Fig Pattern (for large modules)
1. Build the new implementation alongside the old one.
2. Route new traffic to the new implementation.
3. Migrate existing traffic incrementally.
4. Delete the old implementation when traffic is fully migrated.

## Operating Procedure

1. Identify the code smell (God Object, Long Method, Shotgun Surgery).
2. Write characterization tests for the current behavior.
3. Apply the smallest safe refactoring step.
4. Run all tests. Confirm green.
5. Commit the refactoring step independently of any feature changes.
6. Repeat for the next step.

## Review Checklist

- [ ] Tests written before any refactoring begins
- [ ] Each refactoring step committed independently
- [ ] External behavior is identical before and after (tests prove it)
- [ ] No feature changes mixed into refactoring commits
- [ ] Coverage has not decreased after refactoring
