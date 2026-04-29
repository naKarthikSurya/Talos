# Rule: QA & Testing Engineer Role

Applies to all tasks where the `qa-testing-engineer` role is active.

## Scope

These rules govern unit testing, integration testing, E2E testing, and performance testing.

## Test Coverage Rules

- Minimum coverage thresholds (enforced in CI): Services: 90%, Controllers: 80%, Utilities: 100%.
- Coverage checks must run on every PR. PRs that drop coverage below threshold are BLOCKED from merge.
- Test coverage is measured on production code paths only — test utilities are excluded.

## Test Independence Rules

- Tests MUST NOT share state. Each test must be independently runnable in any order.
- Database state must be reset between integration tests using transactions or seed/teardown scripts.
- External dependencies (HTTP services, email, SMS) MUST be mocked — no real external calls in tests.

## Test Quality Rules

- Snapshot tests are NOT a substitute for behavioral assertions.
- `data-testid` attributes are REQUIRED on all interactive elements for E2E tests.
- Tests must be named to describe the expected behavior, not the implementation: `it('should return 404 when user not found')` — not `it('test user route')`.
- At least one negative/failure test case is required per acceptance criterion.

## E2E Rules

- E2E tests cover critical user journeys only — not every unit of code.
- E2E tests must run in headless mode in CI.
- E2E tests must use fixture data — never production data.

## Performance Test Rules

- Load tests must run in staging, not production.
- Performance thresholds (p95, error rate) must be derived from NFRs in `feature.md`.
- Results must be compared against a baseline, not evaluated in isolation.

## Artifact Rules

- Test strategy documents MUST be written as Antigravity Artifacts before implementation begins.
- Load test reports MUST be written as Antigravity Artifacts after execution.
- Test failure analysis for incidents must be documented as Antigravity Artifacts.
