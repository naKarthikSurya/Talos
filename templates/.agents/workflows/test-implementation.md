# Workflow: Test Implementation

## Objective

Write a comprehensive test suite for a feature, module, or codebase — covering unit, integration, and e2e tests as appropriate.

## Prerequisites

- `ai-control/state.md` at `TEST_IMPLEMENTATION_PENDING` (or explicitly invoked by the user).
- Rules in effect: `testing-standards.md`, `safety-gates.md`.
- Relevant stack rules active based on the project stack.

## Steps

### Phase 1: Scope and Strategy

1. **Read State**: Read `ai-control/state.md`. If at `TEST_IMPLEMENTATION_PENDING`, proceed.
2. **Activate Role**: Use the `test-engineer` skill.
3. **Read Context**: Read `ai-control/feature.md`, `ai-control/solution.md`, and `ai-control/implementation_steps.md` to understand what was built.
4. **Determine Coverage Gaps**: Identify what is currently untested:
    - Business logic without unit tests.
    - Endpoints without integration/e2e tests.
    - Critical user flows without e2e tests.
5. **Plan Test Suite**: Categorize by level:
    - **Unit tests**: Service functions, utility functions, validators, hooks, pure components.
    - **Integration tests**: Service + DB, API endpoint + real module.
    - **E2E tests**: Critical user flows end-to-end.
6. **Document Plan**: Write strategy to `ai-control/test-plan.md`.
7. **Update State**: Set to `TEST_WRITING_IN_PROGRESS`. Append to Execution Log.

### Phase 2: Unit Test Implementation

8. **Activate Role**: Use the `test-engineer` skill (stack-specific patterns).
9. **Write Unit Tests**:
    - Follow AAA (Arrange/Act/Assert) structure.
    - Cover: happy path, edge cases (null, empty, boundary), error paths.
    - Mock external dependencies only (DB, HTTP, file system).
    - Test names follow: `should <expected behavior> when <condition>`.
10. **Run**: Execute unit tests. All must pass before proceeding.

### Phase 3: Integration Test Implementation

11. **Write Integration Tests**:
    - Use real DB (in-memory SQLite or test container).
    - Seed known state before each test, clean up after.
    - Test full endpoint request/response cycle.
    - Cover auth-protected endpoints with and without valid tokens.
12. **Run**: Execute integration tests. All must pass before proceeding.

### Phase 4: E2E Test Implementation (if applicable)

13. **Write E2E Tests** (Playwright / Cypress / Supertest):
    - Cover the most critical user journey (happy path).
    - Cover at least one failure scenario (invalid input, unauthorized).
    - Use role-based or data-testid selectors — never CSS class selectors.
14. **Run**: Execute e2e tests. All must pass before proceeding.

### Phase 5: Coverage Report and Finalization

15. **Generate Coverage**: Run the coverage report for the project.
16. **Review**: Check that all business logic reaches the minimum 70% coverage threshold.
17. **Document**: Write a summary to `ai-control/test-report.md`:
    - Tests written (count by type).
    - Coverage percentage for the affected modules.
    - Any known gaps and the justification for leaving them.
18. **Update State**: Set to `TEST_COMPLETE`. Append to Execution Log.
19. **Sync**: Use `obsidian-sync` skill to mirror the test report to the Obsidian vault.
20. **Report**: Notify the user that the test suite is complete with a summary.
