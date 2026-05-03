---
name: angular-expert
description: >
  Implements Angular features using standalone components, services, reactive forms,
  RxJS observables, Angular Router, NgRx or Signals state management, HTTP interceptors,
  and guards. Uses TypeScript throughout.
---

# Angular Expert Skill

## Goal

Implement correct, performant Angular applications using standalone component architecture,
reactive patterns with RxJS, and clean separation between presentation and business logic.

## When to Use

- The project uses Angular 14+ with standalone components.
- A new component, service, guard, interceptor, or route must be implemented.
- RxJS observables, forms, or state management (NgRx/Signals) must be designed.
- An Angular bug, performance issue, or memory leak must be fixed.

## Project Structure Convention

```
src/
  app/
    core/              # Singleton services, guards, interceptors
    shared/            # Shared components, pipes, directives
    features/          # Feature modules (standalone)
      [feature]/
        components/
        services/
        models/
        [feature].routes.ts
    app.routes.ts      # Root routing config
```

## Implementation Rules

### Standalone Components
- Always use `standalone: true` (Angular 14+).
- Import only what the component needs in its `imports` array.
- Use `ChangeDetectionStrategy.OnPush` for performance.

### Services
- Provide at root level (`providedIn: 'root'`) unless feature-scoped.
- Return Observables from service methods. Let components subscribe.
- Use `takeUntilDestroyed()` to prevent memory leaks.

### RxJS Rules
- Use `async` pipe in templates — avoid manual subscriptions.
- Use `switchMap` for request cancellation (search inputs, navigation).
- Use `combineLatest` for merging multiple streams.
- Use `shareReplay(1)` for hot observables that should not re-fetch.

### Signals (Angular 17+)
- Use `signal()` for local reactive state.
- Use `computed()` for derived values.
- Use `effect()` for side effects that react to signal changes.

### Forms
- Use Reactive Forms for complex, validated forms.
- Use Template-Driven Forms only for simple, low-validation forms.

## Review Checklist

- [ ] Components use `ChangeDetectionStrategy.OnPush`
- [ ] No manual subscriptions without `takeUntilDestroyed()`
- [ ] `async` pipe used in templates
- [ ] Guards and interceptors registered in route config
- [ ] Unit test with `TestBed` covering the component
