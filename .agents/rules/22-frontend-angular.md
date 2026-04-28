# Rule 22: Frontend — Angular

Applies to all Angular development tasks.

## Component Architecture

- Use Standalone Components (Angular 17+). NgModule declarations are only acceptable for integrating legacy third-party libraries.
- Components are presentational or orchestration (smart). Presentational components use `@Input()` and `@Output()` only — no service injection.
- Orchestration components inject services/store and pass data to presentational children. They do not contain template complexity.
- Apply `ChangeDetectionStrategy.OnPush` to all components unless a specific, documented reason prevents it.

## Dependency Injection

- Use the `inject()` function for constructor-free standalone components (Angular 14+).
- Services are `providedIn: 'root'` unless they must be scoped to a feature subtree.
- Never instantiate services manually (`new MyService()`).
- Use `InjectionToken<T>` for injecting primitive values, configuration objects, or factory functions.

## RxJS Discipline

- Observables are named with a `$` suffix (`users$`, `loading$`, `selectedId$`).
- Use `takeUntilDestroyed()` (Angular 16+) to unsubscribe. Never manually call `.unsubscribe()` in `ngOnDestroy` for routine subscriptions.
- Use the `async` pipe in templates for observable rendering — avoid manual subscriptions in components where `async` pipe works.
- `switchMap` for requests where newer values cancel in-flight older requests. `exhaustMap` for submit/save actions to prevent double-submission. `mergeMap` only when all parallel emissions are desired.
- Never subscribe inside another subscribe. Compose with operators.

## State Management

- Angular Signals for local and simple shared state (Angular 17+).
- NgRx Store + Effects for complex, cross-feature, or heavily asynchronous state.
- `BehaviorSubject` in a service for moderate shared state that does not warrant NgRx overhead.
- Never store derived or computed values in state. Compute them via `computed()` signals or NgRx selectors.

## Routing

- All feature routes use lazy loading via `loadComponent()` or `loadChildren()`.
- Route guards (`CanActivate`, `CanMatch`) for authentication and authorization — never inline auth logic in component lifecycle hooks.
- `Resolve` guards for data that must be present before component initialization.
- `CanDeactivate` for forms with unsaved changes.

## Forms

- Reactive Forms for all non-trivial forms. Typed `FormGroup<{}>` with explicit generic parameters (Angular 14+ typed forms).
- Custom validators are pure functions: `(control: AbstractControl) => ValidationErrors | null`.
- Template-driven forms only for single-field trivial inputs where no programmatic control is needed.

## HTTP

- All HTTP calls in injectable services — never `HttpClient` directly in components.
- HTTP interceptors for: auth token injection, global error handling, and loading state management.
- Typed `HttpClient` calls: `this.http.get<User[]>(...)` — never untyped.
