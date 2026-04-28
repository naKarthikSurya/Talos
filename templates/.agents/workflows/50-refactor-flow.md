# Workflow 50: Refactor Flow

## Objective

Improve internal code structure without changing observable external behavior, with
safety verification at every step.

## Prerequisites

- `state.json` initialized, `task_type` is `refactor`.

## Core Rule

A refactor that changes external behavior is not a refactor — it is a feature or bugfix.
If external behavior changes emerge during this workflow, STOP and re-triage via `00-triage-and-route.md`.

---

## Phase 1: Refactor Objective Definition

**Stage**: `PM_ANALYSIS_PENDING`

1. Activate `product-manager-core` (in refactor scoping mode).
2. Write `feature.md` (used as refactor scope doc) with:
   - **Current pain point**: What specific problem does the current code have?
   - **Non-functional goal**: What improves after the refactor? (readability, testability, performance, modularity, reduced duplication)
   - **Scope boundary**: Exact files/modules in scope. Everything else is out of scope.
   - **Behavior invariant**: What external behavior must remain identical? (API contracts, public function signatures, UI outputs)
   - **Definition of done**: How will we know the refactor is complete and successful?
3. **STOP** — Confirm scope. Scope creep during a refactor is a primary failure mode.

---

## Phase 2: Current State Assessment

**Stage**: `ARCHITECT_DESIGN_PENDING`

1. Activate appropriate architect skill.
2. Write `solution.md`:
   - **Current structure**: Describe what the code currently does and why it is problematic.
   - **Target structure**: Describe the desired state after refactoring.
   - **Migration path**: How to move from current to target incrementally (small, reversible steps).
   - **Risk assessment**: What could break? Where are the fragile coupling points?
3. **STOP** — Confirm the target structure before implementation.

---

## Phase 3: Safety Net — Test Coverage

**Stage**: `TEST_STRATEGY_PENDING`

1. Activate `testing-strategist`.
2. Before any code changes: document the current test coverage for the in-scope code.
3. If coverage is insufficient to detect regressions:
   - **ADD TESTS FIRST** before refactoring. The tests must cover the behavior invariant.
   - This is non-negotiable. Refactoring without a safety net is reckless.
4. Write `test_strategy.md`: list the tests that protect the behavior invariant.

---

## Phase 4: Refactor Planning

**Stage**: `DEV_PLANNING_PENDING`

1. Activate appropriate developer skill.
2. Write `implementation_steps.md`:
   - Break the refactor into **small, independently verifiable steps**.
   - Each step must have a validation command (tests pass, compiles, no lint errors).
   - Steps must be reversible — if a step breaks things, it can be rolled back independently.
   - No step should mix refactoring with feature changes.

---

## Phase 5: Tech Lead Review

1. Verify refactor is strictly within scope.
2. Verify behavior invariant is protected by tests.
3. Verify each step is independently verifiable.
4. Write `tech_lead_review.md`. **STOP** — Await execution approval.

---

## Phase 6: Execution Gate + Refactoring

1. Invoke `90-execution-gate.md`.
2. Execute each step. After each step: run full test suite. All must pass before proceeding to next step.
3. If any step causes a test failure: revert that step. Redesign the migration path.
4. After all steps: confirm behavior invariant tests still pass.
5. Confirm non-functional goal is achieved (document evidence: lint pass, metric improvement, test coverage number).
6. Set `COMPLETED`. Report: steps executed, tests maintained, goal achieved.
