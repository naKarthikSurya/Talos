---
name: frontend-react-developer
description: >
  Use when converting an approved React architecture into a detailed, file-level
  implementation plan. Covers components, hooks, services, form handling, tests,
  and accessibility. Also executes the implementation when execution gate is open.
---

# React Developer Skill

## Goal

Convert approved React architecture into an ordered implementation checklist covering
every file, component, test, and validation step.

## When to Use

- Stage `DEV_PLANNING_PENDING` or `EXECUTION_PENDING`. Stack `react`.
- `solution.md`, `frontend_contract.md`, `test_strategy.md` approved.

## Artifacts Written

- `ai-control/implementation_steps.md`
- Source code (during EXECUTION_PENDING)

## Operating Procedure — Planning Phase

1. **Confirm stage**: `DEV_PLANNING_PENDING`, stack `react`.
2. **Read all input artifacts**.
3. **Decompose into ordered steps**:
   a. TypeScript type definitions
   b. API service functions
   c. Custom hooks (data fetching, shared logic)
   d. Zod validation schema (if forms)
   e. Presentational components (bottom-up, leaves first)
   f. Smart/container component
   g. Route addition
   h. Component tests (RTL)
   i. Hook tests (if complex logic)
4. **Write `implementation_steps.md`**.
5. **Update state**: `PM_VERIFICATION_PENDING`. Log.

## Output: implementation_steps.md Structure

```markdown
# Implementation Plan: <Feature Title>
**Stack**: React | **Stage**: DEV_PLANNING_PENDING

## Pre-Implementation Checklist
- [ ] solution.md approved
- [ ] frontend_contract.md finalized
- [ ] test_strategy.md complete
- [ ] API endpoint available or mocked with MSW

## Implementation Steps

### Step 1: Type Definitions
**File**: `src/types/feature.types.ts`
**Action**: Define Feature, CreateFeatureInput interfaces per frontend_contract.md.
**Validation**: `npx tsc --noEmit` — no errors.

### Step 2: Service Functions
**File**: `src/services/features.service.ts`
**Action**: Implement getFeatures, createFeature.
- Use configured axios instance or fetch wrapper
- Typed return values — no `any`
- No error handling here — let TanStack Query handle it
**Validation**: Import check + `npx tsc --noEmit`.

### Step 3: Custom Hook — useFeatures
**File**: `src/hooks/useFeatures.ts`
**Action**: Wrap service with useQuery('features', getFeatures).
- Return { data, isLoading, isError, error }
- staleTime and gcTime per solution.md
**Validation**: `npx tsc --noEmit`.

### Step 4: Custom Hook — useCreateFeature
**File**: `src/hooks/useCreateFeature.ts`
**Action**: Wrap with useMutation. On success: invalidateQueries(['features']).
**Validation**: `npx tsc --noEmit`.

### Step 5: Zod Schema
**File**: `src/components/FeatureForm/schema.ts`
**Action**: Define createFeatureSchema per solution.md form design.
**Validation**: Unit test the schema with valid and invalid inputs.

### Step 6: Presentational Components
**Files**:
- `src/components/FeatureListItem/FeatureListItem.tsx` + `.test.tsx`
- `src/components/FeatureList/FeatureList.tsx` + `.test.tsx`
- `src/components/EmptyState/EmptyState.tsx`

**Action per component**: Props interface, functional component, semantic HTML.
**Accessibility**: Labels on interactive elements, semantic tags.
**Validation**: `npm test -- --testPathPattern=<ComponentName>` after each.

### Step 7: FeatureForm Component
**Files**: `src/components/FeatureForm/FeatureForm.tsx` + `.test.tsx`
**Action**: React Hook Form + zodResolver(createFeatureSchema).
- Submit button disabled during mutation (isLoading state)
- Display server errors mapped to fields where available
- Test: renders form, validates, submits, shows error
**Validation**: `npm test -- --testPathPattern=FeatureForm`

### Step 8: FeaturePage (Smart Component)
**Files**: `src/pages/FeaturePage/FeaturePage.tsx` + `.test.tsx`
**Action**: Compose all components. Use useFeatures, useCreateFeature.
- Loading state: render <LoadingSkeleton />
- Error state: render <ErrorMessage error={error} />
- Empty state: render <EmptyState />
- Success: render <FeatureList />
**Validation**: `npm test -- --testPathPattern=FeaturePage`

### Step 9: Route
**File**: `src/router.tsx` (or App.tsx)
**Action**: Add `/features` route pointing to FeaturePage.
**Validation**: Navigate to /features in browser — page renders.

### Step 10: Full Test Suite
**Validation**: `npm test -- --coverage` — all tests pass, coverage meets targets.
```

## React Implementation Constraints

- All components: functional, TypeScript, no `any` props.
- No inline `fetch` in component bodies — use service layer.
- Every async component: explicit loading, error, and empty states.
- Forms: React Hook Form + Zod only. No per-field useState.
- Apply accessibility: semantic HTML, `alt` on images, keyboard navigability.
- Tests: React Testing Library — query by role/label/text. No implementation details in tests.

## Review Checklist

- [ ] Every component in solution.md has an implementation step.
- [ ] Types match `frontend_contract.md` field-for-field.
- [ ] All three UI states (loading/error/empty) addressed.
- [ ] Form validation schema defined.
- [ ] Accessibility considerations noted per component.
- [ ] Test cases from `test_strategy.md` assigned to specific files.
