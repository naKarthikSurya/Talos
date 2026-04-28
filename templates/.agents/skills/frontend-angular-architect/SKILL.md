---
name: frontend-angular-architect
description: >
  Use when designing the feature module/component structure, service contracts,
  state management approach, routing, form architecture, and RxJS observable flow
  for an Angular feature. Produces solution.md and frontend_contract.md.
---

# Angular Architect Skill

## Goal

Produce an Angular architecture design that specifies standalone component hierarchy,
service contracts, NgRx/Signal state approach, lazy-loaded routing, and RxJS pipelines —
with enough precision that a developer can implement without re-making structural decisions.

## When to Use

- Stage `ARCHITECT_DESIGN_PENDING`, stack `angular`.

## Artifacts Written

- `ai-control/solution.md`
- `ai-control/frontend_contract.md` (if API consumed)

## Operating Procedure

1. **Confirm stage and stack**.
2. **Design feature folder structure** under `src/app/features/<feature>/`.
3. **Design component hierarchy**: Smart (orchestration) and presentational components.
4. **Define state management**: Signals / NgRx / BehaviorSubject in service — choose and justify.
5. **Define service contracts**: Injectable services, their methods, return types (Observable or Signal).
6. **Define routing**: Lazy-loaded route definition file. Guards, resolvers.
7. **Design forms**: Reactive Forms structure, typed FormGroup, custom validators.
8. **Design RxJS pipelines**: For HTTP calls, use `switchMap`, `catchError`, `tap` for side effects.
9. **Design HTTP interceptors** if new auth/error handling is needed.
10. **Write solution.md and frontend_contract.md**.
11. **Update state**: `USER_REVIEW_DESIGN_PENDING`. Stop.

## Output: solution.md Structure

```markdown
# Architecture Design: <Feature Title>
**Stack**: Angular 17+ Standalone | **Date**: YYYY-MM-DD

## Feature Folder Structure
\`\`\`
src/app/features/feature-x/
  components/
    feature-list/
      feature-list.component.ts    ← Presentational, OnPush
      feature-list.component.html
      feature-list.component.spec.ts
    feature-form/
      feature-form.component.ts    ← Presentational, Reactive Form
      feature-form.component.html
  containers/
    feature-page/
      feature-page.component.ts    ← Smart: injects store/service
      feature-page.component.html
  services/
    feature.service.ts
  store/ (if NgRx)
    feature.actions.ts
    feature.reducer.ts
    feature.effects.ts
    feature.selectors.ts
  feature-x.routes.ts
\`\`\`

## Component Design
| Component | Type | ChangeDetection | Inputs | Outputs |
| --- | --- | --- | --- | --- |
| FeaturePageComponent | Smart | Default | — | — |
| FeatureListComponent | Presentational | OnPush | features: Feature[] | selected: EventEmitter |
| FeatureFormComponent | Presentational | OnPush | loading: boolean | submitted: EventEmitter |

## State Management Approach
**Chosen**: <NgRx / Angular Signals / BehaviorSubject in service>
**Rationale**: <why this fits the complexity of this feature>

### NgRx (if chosen)
- Actions: LoadFeatures, LoadFeaturesSuccess, LoadFeaturesFailure, CreateFeature, CreateFeatureSuccess
- Reducer: handles loading/loaded/error states
- Effects: loadFeatures$ calls FeatureService.getAll()
- Selectors: selectAllFeatures, selectFeaturesLoading, selectFeaturesError

### Signals (if chosen)
\`\`\`typescript
// In FeatureService or dedicated store service
features = signal<Feature[]>([]);
loading = signal(false);
error = signal<string | null>(null);
// Methods update signals directly
\`\`\`

## Service Contract
**File**: \`services/feature.service.ts\`
| Method | Returns | Description |
| --- | --- | --- |
| getAll() | Observable<Feature[]> | Fetch all features |
| create(data) | Observable<Feature> | Create new feature |
| delete(id) | Observable<void> | Delete feature |

## Routing
\`\`\`typescript
// feature-x.routes.ts
export const FEATURE_X_ROUTES: Routes = [
  { path: '', component: FeaturePageComponent, canActivate: [AuthGuard] }
]
// In app.routes.ts:
{ path: 'features', loadChildren: () => import('./features/feature-x/feature-x.routes') }
\`\`\`

## Form Design (Reactive Forms)
\`\`\`typescript
form = new FormGroup<FeatureFormGroup>({
  name: new FormControl('', { validators: [Validators.required, Validators.maxLength(255)], nonNullable: true }),
  description: new FormControl('', { validators: [Validators.maxLength(500)], nonNullable: true })
})
\`\`\`

## RxJS Pipeline Design
\`\`\`typescript
// In Effect or smart component
loadFeatures$ = createEffect(() => this.actions$.pipe(
  ofType(FeatureActions.loadFeatures),
  switchMap(() => this.featureService.getAll().pipe(
    map(features => FeatureActions.loadFeaturesSuccess({ features })),
    catchError(error => of(FeatureActions.loadFeaturesFailure({ error: error.message })))
  ))
))
\`\`\`

## Design Decisions
| Decision | Chosen | Alternative | Rationale |
| --- | --- | --- | --- |
| ... | ... | ... | ... |
```

## Constraints

- Apply rule `22-frontend-angular.md`.
- `OnPush` on all presentational components.
- Lazy-loaded routes are non-negotiable.
- Every observable in a component must have a clear unsubscription strategy named.
- Do not proceed without design approval.

## Review Checklist

- [ ] Feature folder structure designed.
- [ ] Every component classified as smart/presentational with OnPush noted.
- [ ] State management approach chosen and justified.
- [ ] Service contract listed with method signatures.
- [ ] Routes use lazy loading.
- [ ] RxJS pipeline designed (switchMap, catchError, etc.).
- [ ] `state.json` updated to `USER_REVIEW_DESIGN_PENDING`.
