# Workflow: Frontend Developer Role

## Objective

Implement all frontend features from the approved UX spec and API contract,
using the stack-appropriate framework skill.

## Active Rules

- `role-frontend-developer.md`

## Prerequisites

- UX/UI spec Antigravity Artifact is approved.
- `backend_contract.md` Antigravity Artifact is available.
- `state.md` → `stack.frontend` is defined.
- `state.md` stage is `EXECUTION_PENDING`.

---

## Phase 1: Framework Skill Selection

1. Read `state.md` → `stack.frontend`.
2. Activate: `react-expert`, `nextjs-expert`, or `angular-expert`.
3. If Tailwind CSS in use, also activate `tailwind-styling`.

---

## Phase 2: Implementation Steps Artifact

> [!IMPORTANT]
> Write `implementation_steps.md` as an **Antigravity Artifact**:
> - **Type**: `task`
> - **Name**: `implementation_steps.md`
> - **RequestFeedback**: `true` (user must approve before coding starts)
> - **Summary**: "Frontend implementation steps for [feature name] — ordered from types → services → hooks → components → pages → tests."

**STOP** — Present artifact to user. Await approval before coding.

---

## Phase 3: Implementation

For each step in `implementation_steps.md` artifact:
1. Implement the file following the framework skill rules.
2. Handle loading, error, and empty states.
3. Verify TypeScript types — no `any`.
4. Write unit/component tests.
5. Mark the step `[x]` complete in the artifact.

---

## Phase 4: Verification & Full Implementation Artifact

1. Run: `npm run lint && npm run test -- --coverage && npm run build`
2. Verify all screens match the UX spec artifact.
3. Verify accessibility and responsive breakpoints.
4. Run E2E tests via `e2e-playwright-cypress` skill for critical flows.

> [!IMPORTANT]
> Write `full_implementation.md` as an **Antigravity Artifact**:
> - **Type**: `walkthrough`
> - **Name**: `full_implementation.md`
> - **RequestFeedback**: `false`
> - **Summary**: "Frontend implementation walkthrough for [feature name] — components built, test results, coverage."

Update `state.md` stage to `COMPLETED`.
