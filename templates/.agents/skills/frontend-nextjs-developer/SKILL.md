---
name: frontend-nextjs-developer
description: >
  Use when converting an approved Next.js architectural design into a file-level
  implementation plan covering pages, Server Components, Client Components, Server
  Actions, loading/error states, metadata, and tests. Also executes when execution gate is open.
---

# Next.js Developer Skill

## Goal

Convert approved Next.js architecture into an ordered, file-by-file implementation plan
that enforces App Router best practices at every step.

## When to Use

- Stage `DEV_PLANNING_PENDING` or `EXECUTION_PENDING`. Stack `nextjs`.

## Artifacts Written

- `ai-control/implementation_steps.md`
- Source code (during EXECUTION_PENDING)

## Operating Procedure — Planning Phase

1. **Confirm stage and stack**.
2. **Read all input artifacts**.
3. **Decompose into ordered steps**:
   a. TypeScript types (from `frontend_contract.md`)
   b. Server Actions file (if mutations)
   c. Route segment files: `page.tsx`, `layout.tsx` (if new), `loading.tsx`, `error.tsx`, `not-found.tsx`
   d. Server Components (data-fetching components)
   e. Client Components (interactive components)
   f. Forms (React Hook Form + Zod + Server Action)
   g. `generateMetadata` export
   h. Middleware update (if new protected route)
   i. Tests (unit for actions + Playwright e2e for critical flow)
4. **Write `implementation_steps.md`**.
5. **Update state**: `PM_VERIFICATION_PENDING`. Log.

## Output: implementation_steps.md Structure

```markdown
# Implementation Plan: <Feature Title>
**Stack**: Next.js App Router | **Stage**: DEV_PLANNING_PENDING

## Pre-Implementation Checklist
- [ ] solution.md approved
- [ ] frontend_contract.md finalized
- [ ] test_strategy.md complete
- [ ] Auth provider configured

## Implementation Steps

### Step 1: TypeScript Types
**File**: `types/feature.ts`
**Action**: Define Feature, CreateFeatureInput per frontend_contract.md.
**Validation**: `npx tsc --noEmit`

### Step 2: Server Actions
**File**: `app/features/actions.ts`
**Action**: Implement createFeature, deleteFeature Server Actions.
\`\`\`typescript
"use server"
const schema = z.object({ name: z.string().min(1, "Required") })
export async function createFeature(prevState: any, formData: FormData) {
  const parsed = schema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors }
  // db call
  revalidatePath('/features')
  return { success: true }
}
\`\`\`
**Validation**: `npx tsc --noEmit`

### Step 3: loading.tsx
**File**: `app/features/loading.tsx`
**Action**: Skeleton matching the page layout.
**Validation**: Navigate to /features with artificial delay — skeleton shows.

### Step 4: error.tsx
**File**: `app/features/error.tsx`
**Action**: `"use client"` error boundary with reset() button.
**Validation**: Throw error in page.tsx temporarily — error.tsx renders.

### Step 5: not-found.tsx (if dynamic route)
**File**: `app/features/[id]/not-found.tsx`
**Action**: Not-found page UI. Called via notFound() in page.tsx.
**Validation**: Navigate to /features/nonexistent-id — not-found page renders.

### Step 6: page.tsx (Server Component)
**File**: `app/features/page.tsx`
**Action**: Fetch data server-side with correct cache option.
- export generateMetadata()
- Await data fetch (Promise.all for independent fetches)
- Pass data to child Server Components
- auth() check → redirect('/login') if unauthenticated
**Validation**: `next build` — no build errors.

### Step 7: FeatureList.tsx (Server Component)
**File**: `app/features/_components/FeatureList.tsx`
**Action**: Pure rendering of feature list. No hooks.
**Validation**: `npx tsc --noEmit`

### Step 8: FeatureForm.tsx (Client Component)
**File**: `app/features/_components/FeatureForm.tsx`
**Action**: `"use client"` form using useFormState + createFeature action.
- React Hook Form + zodResolver or native form with useFormState
- Submit button disabled during pending state
- Display field errors from action response
**Validation**: `npx tsc --noEmit`

### Step 9: Middleware Update (if new protected route)
**File**: `middleware.ts`
**Action**: Add `/features` to matcher config.
**Validation**: Access /features without session → redirect to login.

### Step 10: Tests
**Files**:
- `__tests__/actions/feature.test.ts` — unit test Server Actions with mock db
- `e2e/features.spec.ts` — Playwright: load page, create item, see it listed
**Validation**: `npx vitest run` + `npx playwright test e2e/features.spec.ts`

### Step 11: Build Verification
**Validation**: `next build` — zero errors, zero type errors.
```

## Next.js Implementation Constraints

- Never add `"use client"` to silence a compiler error — fix the component boundary.
- `generateMetadata()` required on every page.
- `loading.tsx` and `error.tsx` required on every route segment that fetches data.
- All Server Action inputs validated with Zod before processing.
- `revalidatePath` or `revalidateTag` called after every mutation Server Action.
- Secrets without `NEXT_PUBLIC_` prefix only in server-side code.

## Review Checklist

- [ ] Every route segment from `solution.md` has a step.
- [ ] Server/Client component classification follows `solution.md`.
- [ ] `loading.tsx`, `error.tsx`, `not-found.tsx` planned where needed.
- [ ] Server Actions validated with Zod.
- [ ] `generateMetadata` step included for each new page.
- [ ] Build verification step included.
