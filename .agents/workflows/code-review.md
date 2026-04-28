# Workflow: Code Review

## Objective

Perform a structured, multi-dimensional code review of a PR, branch, or set of files.

## Prerequisites

- `ai-control/state.md` at `CODE_REVIEW_PENDING` (or explicitly invoked by the user).
- Rules in effect: `code-review-standards.md`, `safety-gates.md`, `testing-standards.md`.
- Relevant stack rules active: `nestjs-architecture.md`, `fastapi-architecture.md`, `frontend-react.md`, `frontend-nextjs.md`, or `frontend-angular.md`.

## Steps

### Phase 1: Scope Definition

1. **Read State**: Read `ai-control/state.md`. If at `CODE_REVIEW_PENDING`, proceed.
2. **Activate Role**: Use the `code-reviewer` skill.
3. **Identify Scope**: Confirm with the user what is being reviewed:
    - Specific files or diff?
    - A PR branch (provide branch name)?
    - A feature described in `ai-control/feature.md`?
4. **Load Context**: Read `ai-control/feature.md` and `ai-control/solution.md` to understand the original intent.
5. **Update State**: Set to `CODE_REVIEW_IN_PROGRESS`. Append to Execution Log.

### Phase 2: Review Execution

6. **Apply Rules**: Load the relevant stack rule(s) for the code being reviewed.
7. **Review Dimensions** (from `code-review-standards.md`):
    - **Security**: Credentials, injection vectors, auth/authz, sensitive data in logs.
    - **Correctness**: Logic errors, unhandled edge cases, async issues, race conditions.
    - **Performance**: N+1 queries, blocking operations, missing pagination, unnecessary re-renders.
    - **Maintainability**: Naming, SRP, DRY, magic values, missing comments for complex logic.
    - **Test Coverage**: New logic has tests, both happy and sad paths covered, no trivial mock-only tests.
8. **Categorize**: Label every finding with `[BLOCKER]`, `[REQUIRED]`, `[SUGGESTION]`, `[NOTE]`, or `[QUESTION]`.

### Phase 3: Report

9. **Document**: Write the structured review report to `ai-control/code-review.md` using the format from `code-reviewer` skill.
10. **Decision**:
    - BLOCKER or REQUIRED issues found: Set state to `CODE_REVIEW_CHANGES_REQUESTED`.
    - No blockers: Set state to `CODE_REVIEW_APPROVED`.
11. **Update State**: Append to Execution Log.
12. **Sync**: Use `obsidian-sync` skill to mirror the review to the Obsidian vault.
13. **Report**: Present the review summary to the user. Highlight blockers first.

### Phase 4: Re-review (if changes requested)

14. **Re-review Trigger**: After the author addresses issues, re-invoke this workflow.
15. **Verify Fixes**: Check only the items that were flagged as BLOCKER or REQUIRED.
16. **Final Decision**:
    - All addressed: Set state to `CODE_REVIEW_APPROVED`.
    - Still unresolved: Repeat Phase 3.
