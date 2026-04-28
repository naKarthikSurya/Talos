# Workflow 11: Backend FastAPI Feature

## Objective

Take a FastAPI backend feature from requirements through tested, production-ready implementation.

## Prerequisites

- `state.json` initialized, `current_stage` is `PM_ANALYSIS_PENDING`, `stack` is `fastapi`.

## Active Rules

`00-engineering-baseline.md`, `01-artifact-discipline.md`, `02-testing-quality-gates.md`, `03-security-baseline.md`, `04-api-contract-consistency.md` (if API), `11-backend-fastapi.md`

---

## Phase 1: Requirements

**Stage**: `PM_ANALYSIS_PENDING` → `USER_REVIEW_FEATURE_PENDING`

1. Activate skill: `product-manager-core`
2. Produce `feature.md`.
3. **STOP** — Await user approval. Set `approvals.feature = true` on approval.

---

## Phase 2: Architecture Design

**Stage**: `ARCHITECT_DESIGN_PENDING` → `USER_REVIEW_DESIGN_PENDING`

1. Activate skill: `backend-fastapi-architect`
2. Produce `solution.md` with: router structure, Pydantic schema designs, SQLAlchemy model, service layer, Depends chains, Alembic migration plan, trade-offs.
3. If API endpoints involved: Activate `api-contract-reviewer`. Produce `backend_contract.md`. Set `quality_gates.contracts_checked = true`.
4. **STOP** — Await design approval. Set `approvals.design = true`.

---

## Phase 3: Test Strategy

**Stage**: `TEST_STRATEGY_PENDING` → `SECURITY_REVIEW_PENDING`

1. Activate skill: `testing-strategist`
2. Produce `test_strategy.md`: pytest unit tests (service functions), httpx AsyncClient API tests, negative tests (validation errors, 401s, 404s).
3. Set `quality_gates.tests_defined = true`.

---

## Phase 4: Security Review

**Stage**: `SECURITY_REVIEW_PENDING` → `DEV_PLANNING_PENDING`

1. Activate skill: `security-reviewer`
2. Produce `security_review.md`. FastAPI-specific: extra='forbid' on schemas, Depends auth, no raw SQL with user input, JWT validation, CORS config.
3. Block on CRITICAL/HIGH issues.
4. Set `quality_gates.security_checked = true`.

---

## Phase 5: Developer Planning

**Stage**: `DEV_PLANNING_PENDING` → `PM_VERIFICATION_PENDING`

1. Activate skill: `backend-fastapi-developer`
2. Produce `implementation_steps.md`: Pydantic schemas → SQLAlchemy model → Alembic migration → service functions → Depends → router → register in main.py → unit tests → API tests.

---

## Phase 6: PM Verification

**Stage**: `PM_VERIFICATION_PENDING` → `TECH_LEAD_REVIEW_PENDING`

1. Activate skill: `product-manager-core`
2. Compare `feature.md` AC against `implementation_steps.md`.
3. Mismatch → back to `DEV_PLANNING_PENDING`. Aligned → write `pm_review.md`, advance.

---

## Phase 7: Tech Lead Review

**Stage**: `TECH_LEAD_REVIEW_PENDING` → `USER_APPROVAL_PENDING`

1. Review all artifacts. Validate against `11-backend-fastapi.md`.
2. Check: async correctness, Pydantic model config, service layer purity, Alembic migration present, security items addressed.
3. Issues → route back. Approved → write `tech_lead_review.md`. Set `current_stage = USER_APPROVAL_PENDING`.
4. **STOP** — Await execution approval.

---

## Phase 8: Execution Gate

Invoke `90-execution-gate.md`. User approves. Set `approvals.execution = true`, `EXECUTION_PENDING`.

---

## Phase 9: Implementation

1. Activate skill: `backend-fastapi-developer` (execution mode).
2. Follow `implementation_steps.md`. Validate each step.
3. `alembic upgrade head` after migration step.
4. `pytest --cov=app` — all tests pass.
5. Log completion. Set `COMPLETED`. Report to user.
