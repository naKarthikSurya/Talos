# Workflow: Backend Developer Role

## Objective

Implement all backend features from the approved architecture and API contract
using the stack-appropriate framework skill.

## Active Rules

- `role-backend-developer.md`
- One of: `role-backend-developer.md` (nestjs / fastapi / django rules embedded)

## Prerequisites

- `solution.md` Antigravity Artifact is approved.
- `backend_contract.md` Antigravity Artifact exists (if endpoints involved).
- `state.md` → `stack.backend` is defined.
- `state.md` stage is `DEV_PLANNING_PENDING`.

---

## Phase 1: Framework Skill Selection

1. Read `state.md` → `stack.backend`.
2. Activate: `nestjs-expert`, `fastapi-expert`, or `django-expert`.
3. Always activate `api-design-standard` concurrently.

---

## Phase 2: Database & Migration Planning

1. If schema changes required, activate `database-engineer` role skills.
2. Define entities, relationships, and indexes.
3. Generate migration files.

---

## Phase 3: Implementation Steps Artifact

> [!IMPORTANT]
> Write `implementation_steps.md` as an **Antigravity Artifact**:
> - **Type**: `task`
> - **Name**: `implementation_steps.md`
> - **RequestFeedback**: `true` (user must approve before coding starts)
> - **Summary**: "Implementation steps for [feature name] — ordered file-level tasks from entity to tests."

Steps must be ordered: entity → migration → DTOs → service → controller → module → tests → Swagger.
Security items from `security_review.md` must appear as explicit steps.

**STOP** — Present artifact to user. Await approval before coding.

---

## Phase 4: Implementation

For each step in `implementation_steps.md` artifact:
1. Implement the file following the active framework skill rules.
2. All input validation applied via DTO/schema decorators.
3. All protected routes have auth guard applied.
4. Error handling uses domain exceptions.
5. Mark the step `[x]` complete in the artifact.

---

## Phase 5: PM View Artifact

> [!IMPORTANT]
> Write `pm_view.md` as an **Antigravity Artifact**:
> - **Type**: `other`
> - **Name**: `pm_view.md`
> - **RequestFeedback**: `false`
> - **Summary**: "PM verification for [feature name] — acceptance criteria mapped to implementation."

Compare every acceptance criterion from `feature.md` artifact against the implementation.
If mismatch found: flag in artifact, return to Phase 3.

---

## Phase 6: Verification & Full Implementation Artifact

1. Run: `npm run lint && npm run test && npm run test:e2e`
2. All tests must pass before proceeding.

> [!IMPORTANT]
> Write `full_implementation.md` as an **Antigravity Artifact**:
> - **Type**: `walkthrough`
> - **Name**: `full_implementation.md`
> - **RequestFeedback**: `false`
> - **Summary**: "Full implementation walkthrough for [feature name] — files created, tests passed, coverage results."

Update `state.md` stage to `COMPLETED`.
Report: files created/modified, test results, coverage, migration summary.
