# Workflow 20: Frontend React Feature

## Objective

Take a React frontend feature from requirements through tested, accessible, production-ready implementation.

## Prerequisites

- `state.json` initialized, `current_stage` is `PM_ANALYSIS_PENDING`, `stack` is `react`.

## Active Rules

`00-engineering-baseline.md`, `01-artifact-discipline.md`, `02-testing-quality-gates.md`, `03-security-baseline.md`, `04-api-contract-consistency.md` (if API consumed), `20-frontend-react.md`

---

## Phase 1: Requirements

**Stage**: `PM_ANALYSIS_PENDING` → `USER_REVIEW_FEATURE_PENDING`

1. Activate skill: `product-manager-core`
2. Produce `feature.md`. Include: component behavior, UI states (loading/error/empty/success), accessibility requirements, API data dependencies.
3. **STOP** — Await user approval. Set `approvals.feature = true`.

---

## Phase 2: Architecture Design

**Stage**: `ARCHITECT_DESIGN_PENDING` → `USER_REVIEW_DESIGN_PENDING`

1. Activate skill: `frontend-react-architect`
2. Produce `solution.md`: component tree, state ownership table, data fetching plan (TanStack Query), service layer, form design, routing changes, UI state map.
3. If API consumed or changed: Activate `api-contract-reviewer`. Produce `frontend_contract.md` (TypeScript types, API consumption, UI state map). Set `quality_gates.contracts_checked = true`.
4. **STOP** — Await design approval. Set `approvals.design = true`.

---

## Phase 3: Test Strategy

**Stage**: `TEST_STRATEGY_PENDING` → `SECURITY_REVIEW_PENDING`

1. Activate skill: `testing-strategist`
2. Produce `test_strategy.md`: RTL component tests (per component state), hook tests if complex logic, negative tests (invalid form submission, network error handling).
3. Set `quality_gates.tests_defined = true`.

---

## Phase 4: Security Review

**Stage**: `SECURITY_REVIEW_PENDING` → `DEV_PLANNING_PENDING`

1. Activate skill: `security-reviewer`
2. Produce `security_review.md`. Frontend-specific: XSS via dangerouslySetInnerHTML (prohibited), env vars not leaked to client bundle, no secrets in frontend code, form input validation matches backend constraints.
3. Set `quality_gates.security_checked = true`.

---

## Phase 5: Developer Planning

**Stage**: `DEV_PLANNING_PENDING` → `PM_VERIFICATION_PENDING`

1. Activate skill: `frontend-react-developer`
2. Produce `implementation_steps.md`: TypeScript types → services → hooks → Zod schema → presentational components (bottom-up) → smart component → route → tests.

---

## Phase 6: PM Verification

**Stage**: `PM_VERIFICATION_PENDING` → `TECH_LEAD_REVIEW_PENDING`

1. Compare `feature.md` AC against `implementation_steps.md`. UI states and edge cases covered?
2. Mismatch → back to planning. Aligned → write `pm_review.md`, advance.

---

## Phase 7: Tech Lead Review

**Stage**: `TECH_LEAD_REVIEW_PENDING` → `USER_APPROVAL_PENDING`

1. Review all artifacts. Validate against `20-frontend-react.md`.
2. Check: state placement correct, no inline fetching in components, accessibility planned, TypeScript types match `frontend_contract.md`.
3. Issues → route back. Approved → write `tech_lead_review.md`. **STOP** — Await execution approval.

---

## Phase 8: Execution Gate + Implementation

1. Invoke `90-execution-gate.md`.
2. User approves. Set `approvals.execution = true`, `EXECUTION_PENDING`.
3. Activate skill: `frontend-react-developer`.
4. `npm test -- --coverage` — all pass. Set `COMPLETED`. Report.
