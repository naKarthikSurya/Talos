---
name: ux-research-flows
description: >
  Defines user journeys, user flows, empty states, error states, and loading states for
  a feature. Produces a UX flow specification that frontend developers and designers use.
---

# UX Research & Flows Skill

## Goal

Map every path a user can take through a feature, including the happy path, error paths,
empty states, and edge case states. Ensure no user state is left undefined.

## When to Use

- A new feature introduces screens or user interactions.
- A UI flow is broken or confusing and needs to be redesigned.
- Empty state, error state, or loading state is missing from a screen.

## States to Define for Every Screen

For every screen or component in the feature:

1. **Loading state** — What does the user see while data is fetching?
2. **Empty state** — What does the user see when there is no data?
3. **Error state** — What does the user see when an API call fails?
4. **Success state** — What does the user see when the action succeeds?
5. **Disabled/locked state** — What if the user lacks permission?

## User Flow Format

```
[Entry Point] → [Screen A]
  ├── Happy Path: [Action] → [Screen B] → [Success State]
  ├── Error Path: [API Fails] → [Error State] → [Retry Option]
  └── Empty Path: [No Data] → [Empty State with CTA]
```

## Operating Procedure

1. Identify all entry points to the feature.
2. Map the happy path from entry to success.
3. Identify all branch points (conditions that change the path).
4. Define error paths for each branch point.
5. Define empty and loading states for each data-dependent screen.
6. Specify accessibility notes (keyboard navigation, screen reader labels).

## Review Checklist

- [ ] Happy path fully mapped
- [ ] All error states defined with user-friendly messages
- [ ] Loading state defined for every async operation
- [ ] Empty state defined with a clear call-to-action
- [ ] Accessibility considerations noted
