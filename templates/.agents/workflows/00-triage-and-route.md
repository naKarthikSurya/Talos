# Workflow 00: Triage and Route

## Objective

Classify an incoming task, initialize (or reset) `ai-control/state.json`, and route to the
correct stack-specific workflow. This is the entry point for every new task.

## When to Use

- At the start of any new task — feature, bugfix, refactor, or contract change.
- When `state.json` shows `TASK_TRIAGE_PENDING` or is being initialized fresh.

## Steps

### 1. Read Incoming Task

Read the user's task description. Extract the following:

- **What**: What change is being requested?
- **Why**: What is the business or technical goal?
- **Constraints**: Any known constraints (deadline, backwards compatibility, performance)?

### 2. Classify the Task

Determine three values:

**task_type** — choose one:
- `feature` — new capability being added
- `bugfix` — existing behavior is broken or incorrect
- `refactor` — internal improvement without changing external behavior
- `contract-change` — API shape is changing with consumer impact
- `fullstack` — spans both backend and frontend

**track** — choose one:
- `backend` — server-side only
- `frontend` — client-side only
- `fullstack` — both backend and frontend involved

**stack** — choose one or more:
- `nestjs` / `fastapi` (backend)
- `react` / `nextjs` / `angular` (frontend)
- `mixed` (if multiple stacks in one task)

### 3. Initialize state.json

Write or update `ai-control/state.json` with:

```json
{
  "task_id": "TASK-NNN",
  "task_title": "<brief title from the request>",
  "track": "<backend|frontend|fullstack>",
  "stack": "<nestjs|fastapi|react|nextjs|angular|mixed>",
  "task_type": "<feature|bugfix|refactor|contract-change|fullstack>",
  "current_stage": "PM_ANALYSIS_PENDING",
  "active_skill": "product-manager-core",
  "approvals": {
    "feature": false,
    "design": false,
    "execution": false
  },
  "quality_gates": {
    "tests_defined": false,
    "security_checked": false,
    "contracts_checked": false
  },
  "artifacts": {
    "feature": "ai-control/feature.md",
    "solution": "ai-control/solution.md",
    "implementation_steps": "ai-control/implementation_steps.md",
    "test_strategy": "ai-control/test_strategy.md",
    "security_review": "ai-control/security_review.md",
    "backend_contract": "ai-control/backend_contract.md",
    "frontend_contract": "ai-control/frontend_contract.md",
    "pm_review": "ai-control/pm_review.md",
    "tech_lead_review": "ai-control/tech_lead_review.md",
    "execution_log": "ai-control/execution_log.md"
  }
}
```

Initialize `ai-control/execution_log.md` with:
```
# Execution Log

[<timestamp>] INIT | Task: <task_title> | Type: <task_type> | Stack: <stack>
```

### 4. Validate State

Run or simulate `validate_state.py` to confirm `state.json` is valid before proceeding.

### 5. Route to Workflow

Based on the classification:

| task_type | track | stack | Route to |
| --- | --- | --- | --- |
| feature/contract-change | backend | nestjs | `10-backend-nestjs-feature.md` |
| feature/contract-change | backend | fastapi | `11-backend-fastapi-feature.md` |
| feature/contract-change | frontend | react | `20-frontend-react-feature.md` |
| feature/contract-change | frontend | nextjs | `21-frontend-nextjs-feature.md` |
| feature/contract-change | frontend | angular | `22-frontend-angular-feature.md` |
| feature | fullstack | nestjs+react | `30-fullstack-nestjs-react.md` |
| feature | fullstack | fastapi+nextjs | `31-fullstack-fastapi-nextjs.md` |
| bugfix | any | any | `40-bugfix-flow.md` |
| refactor | any | any | `50-refactor-flow.md` |

### 6. Report to User

Report the classification and confirm the route before starting:

```
Task classified:
  Type  : <task_type>
  Track : <track>
  Stack : <stack>
  Route : <workflow file>

Proceeding with: <workflow name>
```

Wait for user confirmation if the classification is ambiguous.
