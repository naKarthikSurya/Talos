# Rule 02: Testing Quality Gates

Applies to all implementation stages. Cannot be bypassed by the execution gate.

## Define Tests Before (or With) Implementation

- The `test_strategy.md` artifact must be populated by `testing-strategist` before implementation begins.
- Developers must read `test_strategy.md` and confirm their implementation plan covers the defined test cases.
- If the test strategy is not approved, the execution gate must not open.

## Coverage Expectations

- **Business logic** (service functions, domain calculations, validators): unit tests required. Every branch must be tested.
- **API endpoints**: integration tests required covering at least: happy path, invalid input, unauthorized access, not-found case.
- **Critical user flows**: e2e tests required for the most important journey. At minimum one success path and one failure path.
- **UI components** with state or interaction: component tests with React Testing Library / Angular TestBed required.

## Test Quality Constraints

- Tests must not be trivially asserting mock return values. The system under test must actually execute.
- Every test must follow Arrange / Act / Assert structure. Tests that mix setup and assertions are not acceptable.
- Test names must describe the scenario: `should return 400 when email is missing`, not `test1` or `works correctly`.
- Flaky tests (those that pass/fail non-deterministically) must be fixed before merge, not skipped.
- `describe.skip`, `it.skip`, `@pytest.mark.skip` are not acceptable for new tests. Fix or delete.

## Negative Cases Are Mandatory

- Every feature that validates input must have tests for at least 2 invalid input variants.
- Every feature with authorization must have a test for the unauthorized case.
- Every feature that can fail due to external conditions must have a test for that failure state.

## Completion Claim Constraints

- A skill cannot mark implementation complete without stating test coverage achieved.
- If tests were not written (e.g., time constraint or deferred), this must be explicitly noted in `execution_log.md` with justification — not silently skipped.
