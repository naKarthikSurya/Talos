# Workflow: QA & Testing Engineer Role

## Objective

Produce comprehensive test coverage — unit, integration, E2E, and performance — for all
acceptance criteria defined in the approved `feature.md` Antigravity Artifact.

## Active Rules

- `role-qa-testing-engineer.md`

## Prerequisites

- `feature.md` Antigravity Artifact is approved.
- Feature implementation is complete or in progress.
- `state.md` stage is `TEST_STRATEGY_PENDING` or `EXECUTION_PENDING`.

---

## Phase 1: Test Strategy Artifact

> [!IMPORTANT]
> Write `test_strategy.md` as an **Antigravity Artifact**:
> - **Type**: `other`
> - **Name**: `test_strategy.md`
> - **RequestFeedback**: `false`
> - **Summary**: "Test strategy for [feature name] — unit, integration, E2E, and performance test plan mapped to acceptance criteria."

Map every acceptance criterion from `feature.md` artifact to at least one test case.
Identify mocking requirements (DB, HTTP, queue, email).
Update `state.md`: set `test_strategy.md` status to `DONE`.

---

## Phase 2: Unit & Integration Tests

1. Activate skill: `unit-integration-testing`
2. Write service unit tests with mocked repositories.
3. Write API integration tests with Supertest or pytest.
4. Each acceptance criterion: minimum one happy path + one failure test.
5. Run: `npm run test -- --coverage`. Fix gaps above threshold.

---

## Phase 3: E2E Tests

1. Activate skill: `e2e-playwright-cypress`
2. Write E2E tests for each critical user journey.
3. Add `data-testid` to all interactive elements if missing.
4. Run E2E tests in headless mode. All must pass.

---

## Phase 4: Performance Tests (if required by NFRs)

1. Check NFRs in `feature.md` artifact for latency/throughput requirements.
2. If defined: activate `performance-load-testing`.
3. Write k6/Artillery test for highest-traffic endpoint.
4. Run in staging. Record p50, p95, p99, error rate.

> [!IMPORTANT]
> Write load test report as an **Antigravity Artifact**:
> - **Type**: `other`
> - **Name**: `load_test_report.md`
> - **RequestFeedback**: `false`
> - **Summary**: "Load test results for [feature name] — p50/p95/p99 latency, error rate, throughput vs. NFR thresholds."

---

## Phase 5: Coverage Report

1. Generate: `npm run test -- --coverage`
2. Verify: Services ≥ 90%, Controllers ≥ 80%, Utilities = 100%.
3. Update `state.md`: `test_strategy.md` → `DONE`.
