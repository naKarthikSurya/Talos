---
name: testing-strategist
description: >
  Use when a feature or task needs a defined testing strategy before implementation begins.
  Produces test_strategy.md covering unit, integration, e2e, negative, regression, and
  security test cases tailored to the specific stack and task type. Activates the
  quality_gates.tests_defined flag in state.json when complete.
---

# Testing Strategist Skill

## Goal

Define a concrete, stack-appropriate test strategy that developers can execute against.
Not a generic "write tests" directive — a specific enumeration of what to test, at what level,
with what coverage expectations and acceptance criteria.

## When to Use

- After architecture design is approved, before developer planning begins.
- When `ai-control/test_strategy.md` is missing or incomplete.
- When a bugfix or refactor needs regression test design.

## Inputs Expected

- Approved `ai-control/feature.md` with acceptance criteria and failure cases.
- Approved `ai-control/solution.md` with the proposed architecture.
- `ai-control/state.json` to identify stack and task_type.

## Artifacts Read

- `ai-control/feature.md`
- `ai-control/solution.md`
- `ai-control/state.json`

## Artifacts Written

- `ai-control/test_strategy.md`
- Updates `quality_gates.tests_defined = true` in `state.json` when complete.

## Operating Procedure

1. **Read state**: Confirm stage allows test strategy work.
2. **Read feature.md**: Extract all acceptance criteria and failure cases — these become test cases.
3. **Read solution.md**: Identify the technical components that need testing (services, endpoints, components, hooks, etc.).
4. **Identify stack**: Use `state.json` to determine testing framework and patterns.
5. **Design unit tests**: For each service method, hook, validator, or pure function — define the happy path and every error branch.
6. **Design integration tests**: For each API endpoint or DB operation — define the full request/response cycle tests.
7. **Design e2e tests**: For critical user journeys — define the sequence of actions and expected outcomes.
8. **Design negative tests**: For each validation rule and failure case in `feature.md` — define inputs that should be rejected and expected responses.
9. **Design regression tests**: Identify existing behavior that this change could break. List the test cases that protect it.
10. **Write `test_strategy.md`**: Use the structure below.
11. **Update state**: Set `quality_gates.tests_defined = true`. Log to `execution_log.md`.

## Output: test_strategy.md Structure

```markdown
# Test Strategy: <Feature Title>

## Stack and Frameworks
- Backend: <NestJS/FastAPI/none> — <Jest+Supertest / pytest+httpx>
- Frontend: <React/Next.js/Angular/none> — <Vitest+RTL / Playwright / TestBed>

## Unit Tests

### <Component/Service Name>
| Test Case | Input | Expected Output |
| --- | --- | --- |
| Happy path: ... | ... | ... |
| Error: ... | ... | ... |

## Integration Tests

### <Endpoint or Module>
| Test Case | Setup | Request | Expected Response |
| --- | --- | --- | --- |
| ... | ... | ... | ... |

## E2E Tests (if applicable)
| Flow | Steps | Expected Outcome |
| --- | --- | --- |
| ... | ... | ... |

## Negative / Validation Tests
| Rule | Invalid Input | Expected Error |
| --- | --- | --- |
| ... | ... | ... |

## Regression Tests
| Existing Behavior at Risk | Test to Protect It |
| --- | --- |
| ... | ... |

## Coverage Targets
- Unit: <module/service names> → 100% branch coverage of business logic
- Integration: All endpoints — happy + error + auth paths
- E2E: <list of critical flows>

## Known Testing Gaps / Deferred
- <gap description> — deferred because: <reason>
```

## Stack-Specific Guidance

**NestJS**: `createTestingModule` for unit, Supertest for e2e, test Postgres container or SQLite for integration.
**FastAPI**: `pytest-asyncio` + `httpx.AsyncClient` for API tests, `pytest` fixtures for DB setup/teardown.
**React**: React Testing Library — query by role/label/text. MSW for API mocking in component tests.
**Next.js**: RTL for component unit tests, Playwright for e2e flows, `next-test-api-route-handler` for API route tests.
**Angular**: `TestBed` + `HttpClientTestingModule` for unit/integration, Playwright for e2e.

## Constraints

- Do not list test cases without specifying the expected output or assertion.
- Do not defer all negative tests to "later." At minimum 2 negative cases per feature must be defined now.
- Do not generically say "test the service." Name the specific method and scenario.
- Coverage targets must be specific. "Good coverage" is not a target.

## Review Checklist

- [ ] Every acceptance criterion in `feature.md` maps to at least one test case.
- [ ] Every failure case in `feature.md` maps to at least one negative test.
- [ ] Stack-appropriate test frameworks specified.
- [ ] Unit, integration, and e2e levels addressed (or explicitly N/A with reason).
- [ ] Regression risk identified for existing code paths affected.
- [ ] `quality_gates.tests_defined` set to `true` in `state.json`.
