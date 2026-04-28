# Code Review Standards Rule

This rule defines how code reviews must be conducted and what quality gates must pass before any code is merged.

## Review Philosophy

- The goal of a review is to **improve code quality and share knowledge**, not to gatekeep or demonstrate expertise.
- Critique the code, not the author — frame feedback as questions or suggestions, not commands.
- Every piece of feedback must be **actionable** — explain what to change and why.
- Minor style issues should be automated (linter/formatter) — reviewers focus on logic, security, and design.

## What Must Be Reviewed

### Security (Non-Negotiable)

- No hardcoded credentials, API keys, or secrets.
- All user inputs validated before use — SQL injection, XSS, and SSRF mitigations in place.
- Auth/authz applied to every protected operation.
- Sensitive data not written to logs.

### Correctness

- Code does what the PR description claims.
- Edge cases (null, empty, boundary) handled.
- Error paths tested and handled gracefully.
- No race conditions or unhandled async errors.

### Maintainability

- Naming is clear — a new developer could understand intent without context.
- Functions do one thing (Single Responsibility Principle).
- No unnecessary complexity or over-abstraction.
- Complex logic has a comment explaining *why*.

### Test Coverage

- New logic has corresponding tests.
- Tests cover success and failure paths.
- Tests are not trivially testing mock behavior.

## Merge Requirements

A PR cannot be merged if:

- [ ] Any BLOCKER security issue exists.
- [ ] Any test is failing.
- [ ] The PR breaks existing API contracts without a versioning strategy.
- [ ] No tests are added for new business logic.
- [ ] Linting or type-checking is failing.

## Review Turnaround

- First review response within 1 business day.
- If a review is blocking a reviewer, they must say so and a second reviewer is assigned.
- Author is responsible for resolving all threads — not just fixing the code but confirming the resolution.

## Severity Labels

Reviewers must label every comment:

- **[BLOCKER]** — Must fix before merge.
- **[REQUIRED]** — Must fix or explicitly justify skipping.
- **[SUGGESTION]** — Recommended but not blocking.
- **[NOTE]** — Informational, no action required.
- **[QUESTION]** — Seeking understanding, not necessarily requesting a change.
