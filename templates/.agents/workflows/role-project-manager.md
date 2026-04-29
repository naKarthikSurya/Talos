# Workflow: Project Manager Role

## Objective

Break an approved `feature.md` Antigravity Artifact into sprint-sized tasks with estimates,
and produce or update all required technical documentation as Antigravity Artifacts.

## Active Rules

- `role-project-manager.md`

## Prerequisites

- `feature.md` Antigravity Artifact is approved.
- `state.md` stage is `ARCHITECT_DESIGN_PENDING` or later.

---

## Phase 1: Sprint Planning

1. Activate skill: `agile-scrum-master`
2. Pull all P0 user stories from `feature.md` artifact.
3. Break each story into sub-tasks (< 1 day each).
4. Define the sprint goal — one clear sentence.

---

## Phase 2: Task Estimation

1. Activate skill: `task-estimation`
2. Estimate each story using Fibonacci (1, 2, 3, 5, 8, 13).
3. Apply risk multipliers for third-party integrations and legacy code.
4. Flag any story > 8 SP for decomposition.

> [!IMPORTANT]
> Write sprint plan as an **Antigravity Artifact**:
> - **Type**: `task`
> - **Name**: `sprint_plan.md`
> - **RequestFeedback**: `false`
> - **Summary**: "Sprint plan for [feature name] — stories, story points, sub-tasks, sprint goal."

---

## Phase 3: Documentation Update

1. Activate skill: `technical-documentation`
2. Identify which docs need creation or update: README, API docs, setup guide, architecture doc.

> [!IMPORTANT]
> Write each documentation artifact using Antigravity Artifacts:
> - README updates → **Type**: `other`, **Name**: `readme_update.md`
> - API docs → **Type**: `other`, **Name**: `api_documentation.md`
> - Architecture doc → **Type**: `other`, **Name**: `architecture_document.md`
> - All with **RequestFeedback**: `false`

---

## Phase 4: State Update

Update `state.md` and report to user: sprint scope, story point total, sprint goal, and docs updated.
