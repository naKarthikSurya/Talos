<!-- TALOS_PROTOCOL_ACTIVE: ALWAYS_FOLLOW THE CURRENT STAGE IN THIS FILE -->
# AI Workflow State

## Task

Task ID: TASK-001
Description: Build or change feature X

Current Stage: PM_ANALYSIS_PENDING
Active Role: NONE

## 📋 Role-Based Workflow Instructions

1. **One Artifact at a Time**: The Active Role will create exactly one artifact per turn.
2. **Approval Gate**: You must approve the artifact (or provide feedback) before the role proceeds to the next stage.
3. **Role vs Skill**: Artifacts are owned by **Roles**. Technical **Skills** are tools the roles use internally.
4. **Self-Healing State**: If a new chat starts with a different task than what is listed below, the model MUST archive this task into the `Execution Log` and reset the state for the new task.
5. **Sync Requirement**: The model MUST update this file as the final action of every stage transition.

## Stack

> **Before starting a task:** Update the values below to match your project stack.
> Roles read this section to automatically select the correct Skill (e.g. `nestjs-expert` vs `fastapi-expert`).

frontend: react        # react | nextjs | angular
backend: nestjs        # nestjs | fastapi | django
database: postgresql   # postgresql | mongodb | redis
cloud: aws             # aws | gcp | azure | none

## Artifacts

All workflow artifacts MUST be created as **Antigravity Artifacts** — not as loose files
in `ai-control/`. The artifact paths below are automatically managed by Antigravity.

| Artifact | Antigravity Type | Status | Request Feedback |
|---|---|---|---|
| `feature.md` | `other` | PENDING | true |
| `solution.md` | `implementation_plan` | PENDING | true |
| `implementation_steps.md` | `task` | PENDING | false |
| `pm_view.md` | `other` | PENDING | false |
| `full_implementation.md` | `walkthrough` | PENDING | false |
| `test_strategy.md` | `other` | PENDING | false |
| `security_review.md` | `other` | PENDING | false |
| `backend_contract.md` | `other` | PENDING | false |

## Stage Gate Reference

| Stage | Artifact Produced | Needs User Approval |
|---|---|---|
| `PM_ANALYSIS_PENDING` | `feature.md` | YES |
| `ARCHITECT_DESIGN_PENDING` | `solution.md`, `backend_contract.md` | YES |
| `SECURITY_REVIEW_PENDING` | `security_review.md` | If CRITICAL/HIGH issues |
| `TEST_STRATEGY_PENDING` | `test_strategy.md` | NO |
| `DEV_PLANNING_PENDING` | `implementation_steps.md` | YES |
| `PM_VERIFICATION_PENDING` | `pm_view.md` | NO |
| `EXECUTION_PENDING` | Code + tests | NO |
| `COMPLETED` | `full_implementation.md` | NO |

## Execution Log
