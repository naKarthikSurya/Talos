---
name: frontend-angular-developer
description: >
  Use when converting an approved Angular architectural design into a file-level
  implementation plan. Covers standalone components, services, NgRx/Signals state,
  reactive forms, routing, RxJS pipelines, and tests. Also executes when gate is open.
---

# Angular Developer Skill

## Goal

Convert the approved Angular architecture into an ordered, file-by-file implementation
plan that enforces Angular 17+ standalone patterns, OnPush, and RxJS discipline.

## When to Use

- Stage `DEV_PLANNING_PENDING` or `EXECUTION_PENDING`. Stack `angular`.

## Artifacts Written

- `ai-control/implementation_steps.md`
- Source code (during EXECUTION_PENDING)

## Operating Procedure — Planning Phase

1. **Confirm stage and stack**.
2. **Read all input artifacts**.
3. **Decompose into ordered steps** (bottom-up — leaves before containers):
   a. TypeScript interfaces and enums
   b. Injectable service
   c. NgRx actions/reducer/effects/selectors (if NgRx) OR Signal store service
   d. Presentational components (with TestBed specs)
   e. Smart/container component (with TestBed specs)
   f. Reactive form
   g. Route definition file
   h. App routes integration
   i. Guard (if new)
   j. HTTP interceptor update (if needed)
4. **Write `implementation_steps.md`**.
5. **Update state**: `PM_VERIFICATION_PENDING`. Log.

## Output: implementation_steps.md Structure

```markdown
# Implementation Plan: <Feature Title>
**Stack**: Angular 17+ Standalone | **Stage**: DEV_PLANNING_PENDING

## Pre-Implementation Checklist
- [ ] solution.md approved
- [ ] frontend_contract.md finalized
- [ ] test_strategy.md complete
- [ ] NgRx installed (if chosen)

## Implementation Steps

### Step 1: TypeScript Interfaces
**File**: `src/app/features/feature-x/models/feature.model.ts`
**Action**: Define Feature interface and CreateFeaturePayload per frontend_contract.md.
**Validation**: `npx ng build --configuration development` — no type errors.

### Step 2: Feature Service
**File**: `src/app/features/feature-x/services/feature.service.ts`
**Action**: Implement injectable service.
\`\`\`typescript
@Injectable({ providedIn: 'root' })
export class FeatureService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Feature[]> {
    return this.http.get<Feature[]>('/api/features');
  }

  create(data: CreateFeaturePayload): Observable<Feature> {
    return this.http.post<Feature>('/api/features', data);
  }
}
\`\`\`
**Validation**: Unit test service — `npm run test -- --include="**/feature.service.spec.ts"`

### Step 3: NgRx Store (if NgRx chosen)

#### Step 3a: Actions
**File**: `store/feature.actions.ts`
**Action**: Define all actions per solution.md NgRx design.
\`\`\`typescript
export const FeatureActions = createActionGroup({
  source: 'Feature',
  events: {
    'Load Features': emptyProps(),
    'Load Features Success': props<{ features: Feature[] }>(),
    'Load Features Failure': props<{ error: string }>(),
    'Create Feature': props<{ payload: CreateFeaturePayload }>(),
    'Create Feature Success': props<{ feature: Feature }>(),
  }
})
\`\`\`

#### Step 3b: Reducer
**File**: `store/feature.reducer.ts`
**Action**: Implement with on() handlers. Typed State interface.

#### Step 3c: Effects
**File**: `store/feature.effects.ts`
**Action**: Implement loadFeatures$ and createFeature$ effects.
- switchMap for load (cancel in-flight requests on re-trigger)
- exhaustMap for create (prevent double-submission)
- catchError → return failure action

#### Step 3d: Selectors
**File**: `store/feature.selectors.ts`
**Action**: Implement selectAllFeatures, selectFeaturesLoading, selectFeaturesError.
**Validation**: Full NgRx unit test — `npm run test -- --include="**/feature.*.spec.ts"`

### Step 4: Presentational Component — FeatureListComponent
**Files**: `components/feature-list/feature-list.component.ts` + `.html` + `.spec.ts`
**Action**: Standalone, OnPush, @Input() features, @Output() selected.
\`\`\`typescript
@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-feature-list',
  imports: [CommonModule],
  templateUrl: './feature-list.component.html'
})
\`\`\`
**Test**: Renders items from @Input, emits event on click.
**Validation**: `npm run test -- --include="**/feature-list*"`

### Step 5: Presentational Component — FeatureFormComponent
**Files**: `components/feature-form/feature-form.component.ts` + `.html` + `.spec.ts`
**Action**: Standalone, OnPush, typed Reactive Form.
\`\`\`typescript
form = new FormGroup({
  name: new FormControl('', { validators: [Validators.required], nonNullable: true }),
})
\`\`\`
- @Output() submitted emits form value
- Submit button [disabled]="form.invalid || loading"
**Test**: Form invalid with empty name, emits on valid submit.

### Step 6: Smart Component — FeaturePageComponent
**Files**: `containers/feature-page/feature-page.component.ts` + `.html` + `.spec.ts`
**Action**: Injects Store (NgRx) or FeatureService (Signals). Dispatches actions or calls service.
- Subscribes via async pipe in template
- Uses takeUntilDestroyed() for any manual subscriptions
**Test**: Dispatches load action on init, renders features$ via async pipe.

### Step 7: Route Definition
**File**: `feature-x.routes.ts`
**Action**: Implement per solution.md routing design.
**Validation**: `ng build` — no routing errors.

### Step 8: App Routes Integration
**File**: `src/app/app.routes.ts`
**Action**: Add lazy-loaded route entry.
**Validation**: Navigate to `/features` in browser — component loads.

### Step 9: Full Test Suite
**Validation**: `npm run test -- --no-watch --code-coverage` — all tests pass.

### Step 10: Build Verification
**Validation**: `ng build --configuration production` — zero errors, bundle size noted.
```

## Angular Implementation Constraints

- All components standalone and OnPush where applicable.
- Lazy-loaded routes — no eagerly-loaded feature routes.
- `takeUntilDestroyed()` for all subscriptions in components.
- `async` pipe in templates — no manual subscribe in component.
- TypeScript strict mode — no `any`.
- Typed Reactive Forms (Angular 14+) — no untyped FormControl/FormGroup.

## Review Checklist

- [ ] Every component from `solution.md` has a step.
- [ ] All components: standalone + OnPush.
- [ ] Service methods return typed Observables.
- [ ] NgRx effects use correct merge strategy (switchMap vs exhaustMap).
- [ ] Routes lazy-loaded.
- [ ] TestBed tests included for service and components.
- [ ] Build verification step included.
