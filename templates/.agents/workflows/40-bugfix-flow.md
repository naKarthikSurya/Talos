# Workflow 40: Bugfix Flow

## Objective

Identify, plan, and fix a bug with minimum blast radius — defining regression tests
to prevent recurrence without over-scoping into unrelated refactoring.

## Prerequisites

- `state.json` initialized, `task_type` is `bugfix`.

---

## Phase 1: Bug Characterization

**Stage**: `PM_ANALYSIS_PENDING`

1. Activate `product-manager-core` (in bug analysis mode).
2. Document in `feature.md`:
   - **Symptom**: What observable behavior is wrong?
   - **Expected behavior**: What should happen?
   - **Reproduction steps**: Precise steps to reproduce.
   - **Affected scope**: Which stack, which module, which users?
   - **Frequency and severity**: How often? Data loss / security / UX degradation?
   - **Known constraints**: What must NOT change (API contracts, backward compatibility)?
3. **STOP** — Confirm bug characterization with user before digging into fix.

---

## Phase 2: Root Cause Analysis

**Stage**: `ARCHITECT_DESIGN_PENDING`

1. Activate the appropriate stack architect skill:
   - `backend-nestjs-architect`, `backend-fastapi-architect`, `frontend-react-architect`, `frontend-nextjs-architect`, or `frontend-angular-architect`.
2. Identify the root cause. Write to `solution.md`:
   - **Root cause**: The actual technical cause (not just the symptom).
   - **Affected code locations**: Exact files and functions.
   - **Side-effect risk**: What other behavior could break if this is changed?
   - **Fix approach**: The minimal change that resolves the root cause.
   - **Alternative approaches considered**: And why they were rejected.
3. **IMPORTANT**: Do not scope the fix beyond the root cause. If related technical debt is found, log it separately — do not fix it as part of this bugfix.
4. **STOP** — Confirm the root cause analysis with user.

---

## Phase 3: Regression Test Design

**Stage**: `TEST_STRATEGY_PENDING`

1. Activate `testing-strategist`.
2. Write `test_strategy.md`:
   - **Regression test**: A test that would have caught this bug. This test MUST be written.
   - **Side-effect tests**: Tests for any code paths the fix touches.
   - **Existing test gaps**: Any pre-existing tests that failed to catch this bug — document why.

---

## Phase 4: Security Check (if applicable)

If the bug involves auth, input validation, data exposure, or permissions:
1. Activate `security-reviewer`.
2. Confirm the bug is not a security vulnerability (or document it as one if it is).
3. Write `security_review.md`.

---

## Phase 5: Fix Planning

**Stage**: `DEV_PLANNING_PENDING`

1. Activate the appropriate developer skill.
2. Write `implementation_steps.md`:
   - List exact files and lines to change.
   - The fix must be minimal — only change what is necessary to resolve the root cause.
   - Include the regression test as a required step.
   - Include validation: run the reproduction steps after the fix to confirm resolution.

---

## Phase 6: Tech Lead Review

1. Review `solution.md` and `implementation_steps.md`.
2. Verify the fix is minimal and does not introduce new risks.
3. Verify regression test is included.
4. Write `tech_lead_review.md`. **STOP** — Await execution approval.

---

## Phase 7: Execution Gate + Fix

1. Invoke `90-execution-gate.md`.
2. Implement the fix per `implementation_steps.md`.
3. Verify reproduction steps no longer reproduce the bug.
4. Run regression test. Must pass.
5. Run full test suite — no regressions.
6. Set `COMPLETED`. Report: root cause, fix applied, regression test added.
