# Workflow 10: Backend NestJS Feature

## Objective

Take a NestJS backend feature from requirements through tested, production-ready implementation.

## Prerequisites

- `state.json` initialized via `00-triage-and-route.md`
- `current_stage` is `PM_ANALYSIS_PENDING`
- `stack` is `nestjs`

## Active Rules

- `00-engineering-baseline.md`
- `01-artifact-discipline.md`
- `02-testing-quality-gates.md`
- `03-security-baseline.md`
- `04-api-contract-consistency.md` (if API endpoints involved)
- `10-backend-nestjs.md`

---

## Phase 1: Requirements

**Stage**: `PM_ANALYSIS_PENDING` → `USER_REVIEW_FEATURE_PENDING`

1. Activate skill: `product-manager-core`
2. Produce `ai-control/feature.md` with: task summary, user goal, acceptance criteria, edge cases, failure cases, NFRs, unknowns, risks.
3. Update `state.json`: `current_stage = USER_REVIEW_FEATURE_PENDING`.
4. **STOP** — Present `feature.md` to user. Await explicit approval.

**Gate**: User says "approved" or equivalent. Set `approvals.feature = true`. Advance to `ARCHITECT_DESIGN_PENDING`.

---

## Phase 2: Architecture Design

**Stage**: `ARCHITECT_DESIGN_PENDING` → `USER_REVIEW_DESIGN_PENDING`

1. Activate skill: `backend-nestjs-architect`
2. Produce `ai-control/solution.md` with: module structure, controller design, service design, DTO sketches, entity/schema design, guard/interceptor strategy, integrations, trade-offs.
3. If API endpoints are introduced or modified: Activate skill `api-contract-reviewer`. Produce `ai-control/backend_contract.md`. Set `quality_gates.contracts_checked = true`.
4. Update `state.json`: `current_stage = USER_REVIEW_DESIGN_PENDING`.
5. **STOP** — Present `solution.md` (and `backend_contract.md` if applicable). Await explicit design approval.

**Gate**: User approves design. Set `approvals.design = true`. Advance to `TEST_STRATEGY_PENDING`.

---

## Phase 3: Test Strategy

**Stage**: `TEST_STRATEGY_PENDING` → `SECURITY_REVIEW_PENDING`

1. Activate skill: `testing-strategist`
2. Produce `ai-control/test_strategy.md` with: unit tests (service methods), integration tests (endpoints), negative tests (validation failures, auth errors), regression tests.
3. Set `quality_gates.tests_defined = true`.
4. Update `state.json`: `current_stage = SECURITY_REVIEW_PENDING`.

---

## Phase 4: Security Review

**Stage**: `SECURITY_REVIEW_PENDING` → `DEV_PLANNING_PENDING`

1. Activate skill: `security-reviewer`
2. Produce `ai-control/security_review.md` covering: input validation, auth/authz, secret handling, injection risks, NestJS-specific patterns.
3. If CRITICAL or HIGH issues found: **STOP** — Report to user. Do not advance until resolved.
4. Set `quality_gates.security_checked = true`.
5. Update `state.json`: `current_stage = DEV_PLANNING_PENDING`.

---

## Phase 5: Developer Planning

**Stage**: `DEV_PLANNING_PENDING` → `PM_VERIFICATION_PENDING`

1. Activate skill: `backend-nestjs-developer`
2. Produce `ai-control/implementation_steps.md` with: ordered file-level steps for entity, migration, DTOs, service, controller, module, unit tests, e2e tests, Swagger annotations.
3. Security remediation items from `security_review.md` must be addressed in the plan.
4. Update `state.json`: `current_stage = PM_VERIFICATION_PENDING`.

---

## Phase 6: PM Verification

**Stage**: `PM_VERIFICATION_PENDING` → `TECH_LEAD_REVIEW_PENDING`

1. Activate skill: `product-manager-core`
2. Compare `feature.md` acceptance criteria against `implementation_steps.md`.
3. Decision:
   - **Mismatch found**: Set `current_stage = DEV_PLANNING_PENDING`. Document gaps in `pm_review.md`. Return to Phase 5.
   - **Aligned**: Write sign-off to `ai-control/pm_review.md`. Set `current_stage = TECH_LEAD_REVIEW_PENDING`.

---

## Phase 7: Tech Lead Review

**Stage**: `TECH_LEAD_REVIEW_PENDING` → `USER_APPROVAL_PENDING`

1. Review all artifacts: `feature.md`, `solution.md`, `implementation_steps.md`, `test_strategy.md`, `security_review.md`, `backend_contract.md` (if exists).
2. Evaluate:
   - Does the implementation plan reflect the approved architecture?
   - Are NestJS rules (`10-backend-nestjs.md`) satisfied?
   - Are all security remediation items addressed?
   - Are tests sufficient per `02-testing-quality-gates.md`?
3. Decision:
   - **Issues found**: Route back to appropriate phase. Document in `tech_lead_review.md`.
   - **Approved**: Write approval to `ai-control/tech_lead_review.md`. Set `current_stage = USER_APPROVAL_PENDING`.
4. **STOP** — Present `tech_lead_review.md` to user. Await explicit execution approval.

---

## Phase 8: Execution Gate

**Stage**: `USER_APPROVAL_PENDING` → `EXECUTION_PENDING`

1. Invoke workflow `90-execution-gate.md`. All gates must pass.
2. User explicitly approves. Set `approvals.execution = true`.
3. Set `current_stage = EXECUTION_PENDING`.

---

## Phase 9: Implementation

**Stage**: `EXECUTION_PENDING` → `COMPLETED`

1. Activate skill: `backend-nestjs-developer` (execution mode)
2. Follow `implementation_steps.md` step by step.
3. Run validation command after each step.
4. Run full test suite: `npm run test && npm run test:e2e` — all must pass.
5. Append completion summary to `execution_log.md`.
6. Set `current_stage = COMPLETED`.
7. Report to user: list of files created/modified and test results.
