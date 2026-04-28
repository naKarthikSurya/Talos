# Workflow 22: Frontend Angular Feature

## Objective

Take an Angular feature from requirements through tested, production-built implementation.

## Prerequisites

- `state.json` initialized, `current_stage` is `PM_ANALYSIS_PENDING`, `stack` is `angular`.

## Active Rules

`00-engineering-baseline.md`, `01-artifact-discipline.md`, `02-testing-quality-gates.md`, `03-security-baseline.md`, `04-api-contract-consistency.md` (if API), `22-frontend-angular.md`

---

## Phase 1: Requirements

1. Activate `product-manager-core`. Produce `feature.md` including: UI flows, form validation rules, API data needs, authorization requirements. **STOP** — Await approval.

---

## Phase 2: Architecture Design

1. Activate `frontend-angular-architect`. Produce `solution.md`: feature folder structure, smart/presentational breakdown, OnPush strategy, state management choice (Signals/NgRx), service contracts, lazy-loaded routes, reactive form design, RxJS pipeline design.
2. If API consumed: Activate `api-contract-reviewer`. Produce `frontend_contract.md`. Set `quality_gates.contracts_checked = true`.
3. **STOP** — Await design approval. Set `approvals.design = true`.

---

## Phase 3: Test Strategy

Activate `testing-strategist`. Produce `test_strategy.md`: TestBed unit tests for service and smart component, presentational component tests, NgRx effects tests (if NgRx), Playwright e2e for critical flow. Set `quality_gates.tests_defined = true`.

---

## Phase 4: Security Review

Activate `security-reviewer`. Produce `security_review.md`. Angular-specific: HttpClient typed calls, interceptors for auth, no sensitive data in templates or browser storage without encryption, Angular DomSanitizer for any raw HTML (must be justified). Set `quality_gates.security_checked = true`.

---

## Phase 5: Developer Planning

Activate `frontend-angular-developer`. Produce `implementation_steps.md`: types → service → NgRx/Signals → presentational components → smart component → route file → app routes integration → tests → `ng build` verification.

---

## Phase 6: PM Verification

Activate `product-manager-core`. Compare acceptance criteria. Write `pm_review.md`. Route or advance.

---

## Phase 7: Tech Lead Review

Validate against `22-frontend-angular.md`. Check: all components standalone, OnPush applied, lazy routing, `takeUntilDestroyed()` on subscriptions, typed Reactive Forms, `ng build --configuration production` passes. Write `tech_lead_review.md`. **STOP** — Await execution approval.

---

## Phase 8: Execution Gate + Implementation

1. Invoke `90-execution-gate.md`.
2. Activate `frontend-angular-developer`.
3. `npm run test -- --no-watch` — all pass. `ng build --configuration production` — zero errors. Set `COMPLETED`.
