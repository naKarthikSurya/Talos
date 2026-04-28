# Workflow 30: Fullstack — NestJS + React

## Objective

Coordinate a fullstack feature spanning a NestJS backend and React frontend, ensuring
the API contract is defined first and both sides implement against it.

## Prerequisites

- `state.json` initialized, `track` is `fullstack`, `stack` is `nestjs+react` (or `mixed`).

## Key Principle

**Contract-first**: The `backend_contract.md` and `frontend_contract.md` must be defined and agreed
before either side begins implementation. This prevents the most common fullstack integration bugs.

---

## Phase 1: Requirements

1. Activate `product-manager-core`. Produce `feature.md` that covers: the end-to-end user story, what data the frontend needs from the backend, what mutations the frontend must trigger, and the complete UI flow.
2. **STOP** — Await user approval. Set `approvals.feature = true`.

---

## Phase 2: Backend Architecture

1. Activate `backend-nestjs-architect`. Produce `solution.md` (backend section): module, controller, service, DTO, entity.
2. Set `current_stage = CONTRACT_REVIEW_PENDING`.

---

## Phase 3: Frontend Architecture

1. Activate `frontend-react-architect`. Produce additions to `solution.md` (frontend section): component tree, state ownership, data fetching plan.
2. Set `current_stage = CONTRACT_REVIEW_PENDING` (or continue if already there).

---

## Phase 4: API Contract Definition — CRITICAL

**Stage**: `CONTRACT_REVIEW_PENDING`

1. Activate `api-contract-reviewer`.
2. Read both backend and frontend sections of `solution.md`.
3. Produce `backend_contract.md`: all endpoints, request/response schemas, status codes.
4. Produce `frontend_contract.md`: TypeScript types, API consumption map, UI states.
5. **Alignment check**: Verify every response field from `backend_contract.md` exists with identical name/type in `frontend_contract.md`. Any mismatch is a blocker.
6. **STOP** — Present both contracts to user. Await explicit approval of the contract before any implementation begins.
7. Set `quality_gates.contracts_checked = true`. Set `approvals.design = true`.

---

## Phase 5: Test Strategy (Both Sides)

Activate `testing-strategist`. Produce `test_strategy.md` covering:
- Backend: service unit tests + Supertest e2e
- Frontend: RTL component tests + MSW API mocking
- Integration: Playwright e2e testing the full flow end-to-end

Set `quality_gates.tests_defined = true`.

---

## Phase 6: Security Review

Activate `security-reviewer`. Review both backend (NestJS: DTOs, guards, auth) and frontend (XSS, env var exposure, form validation aligned with backend). Set `quality_gates.security_checked = true`.

---

## Phase 7: Backend Developer Planning

Activate `backend-nestjs-developer`. Produce backend section of `implementation_steps.md`.

---

## Phase 8: Frontend Developer Planning

Activate `frontend-react-developer`. Produce frontend section of `implementation_steps.md`. Confirm TypeScript types are sourced from `frontend_contract.md`.

---

## Phase 9: PM Verification + Tech Lead Review

1. PM: verify both backend and frontend plans satisfy `feature.md`. Write `pm_review.md`.
2. Tech Lead: verify architectural integrity, contract alignment, test coverage, security. Write `tech_lead_review.md`.
3. **STOP** — Await execution approval.

---

## Phase 10: Execution Gate + Implementation

1. Invoke `90-execution-gate.md`.
2. Implement backend first (so API is available or mockable for frontend).
3. Implement frontend second, using the contract types from `frontend_contract.md`.
4. Run full test suite for both: `npm run test && npm run test:e2e` (backend) + `npm test` (frontend).
5. Optional: Playwright e2e against running full stack.
6. Set `COMPLETED`. Report.
