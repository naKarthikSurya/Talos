# AI Workflow State

## Task

Task ID: TASK-001
Description: Build or change feature X

Current Stage: PM_ANALYSIS_PENDING
Active Agent: NONE

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
