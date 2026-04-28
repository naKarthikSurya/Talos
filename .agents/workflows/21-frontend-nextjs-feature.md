# Workflow 21: Frontend Next.js Feature

## Objective

Take a Next.js (App Router) feature from requirements through build-verified, tested, SEO-ready implementation.

## Prerequisites

- `state.json` initialized, `current_stage` is `PM_ANALYSIS_PENDING`, `stack` is `nextjs`.

## Active Rules

`00-engineering-baseline.md`, `01-artifact-discipline.md`, `02-testing-quality-gates.md`, `03-security-baseline.md`, `04-api-contract-consistency.md` (if API), `21-frontend-nextjs.md`

---

## Phase 1: Requirements

**Stage**: `PM_ANALYSIS_PENDING` → `USER_REVIEW_FEATURE_PENDING`

1. Activate skill: `product-manager-core`
2. Produce `feature.md`. Include: page routes needed, data requirements (static vs dynamic vs user-generated), SEO expectations, auth requirements, form interactions.
3. **STOP** — Await user approval.

---

## Phase 2: Architecture Design

**Stage**: `ARCHITECT_DESIGN_PENDING` → `USER_REVIEW_DESIGN_PENDING`

1. Activate skill: `frontend-nextjs-architect`
2. Produce `solution.md`: App Router structure, Server vs Client component decisions (justified per component), data fetching cache strategy, Server Actions or Route Handlers, loading/error/not-found plan, metadata plan, middleware/auth.
3. If API consumed: Activate `api-contract-reviewer`. Produce `frontend_contract.md`. Set `quality_gates.contracts_checked = true`.
4. **STOP** — Await design approval. Set `approvals.design = true`.

---

## Phase 3: Test Strategy

**Stage**: `TEST_STRATEGY_PENDING` → `SECURITY_REVIEW_PENDING`

1. Activate skill: `testing-strategist`
2. Produce `test_strategy.md`: unit tests for Server Actions (Zod validation, success/error paths), component tests (RTL for Client Components), Playwright e2e for critical user flows.
3. Set `quality_gates.tests_defined = true`.

---

## Phase 4: Security Review

**Stage**: `SECURITY_REVIEW_PENDING` → `DEV_PLANNING_PENDING`

1. Activate skill: `security-reviewer`
2. Produce `security_review.md`. Next.js-specific: secrets not in `NEXT_PUBLIC_` vars, Server Action inputs validated with Zod, auth enforced in middleware (not just client-side), no Server Components leaking sensitive data to client serialization.
3. Set `quality_gates.security_checked = true`.

---

## Phase 5: Developer Planning

**Stage**: `DEV_PLANNING_PENDING` → `PM_VERIFICATION_PENDING`

1. Activate skill: `frontend-nextjs-developer`
2. Produce `implementation_steps.md`: TypeScript types → Server Actions → route segments (page.tsx, loading.tsx, error.tsx, not-found.tsx) → Server Components → Client Components → generateMetadata → middleware update → tests → `next build` verification.

---

## Phase 6: PM Verification

Activate `product-manager-core`. Compare `feature.md` AC against `implementation_steps.md`. Route or advance as appropriate. Write `pm_review.md`.

---

## Phase 7: Tech Lead Review

1. Validate against `21-frontend-nextjs.md`.
2. Check: every `"use client"` justified, cache strategies correct, Server Actions have Zod, `loading.tsx`/`error.tsx` present on data-fetching segments, `generateMetadata` on every page.
3. Write `tech_lead_review.md`. **STOP** — Await execution approval.

---

## Phase 8: Execution Gate + Implementation

1. Invoke `90-execution-gate.md`.
2. Activate `frontend-nextjs-developer`.
3. `next build` must succeed. `npx playwright test` for e2e. Set `COMPLETED`.
