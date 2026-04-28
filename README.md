# Antigravity AI Agents Squad

A stack-aware, deterministic, production-grade AI engineering squad. Scaffolds a complete
multi-agent workflow system into any project with `npx antigravity-squad init`.

## Features

- **Stack-specific architect + developer skills** for NestJS, FastAPI, React, Next.js, Angular.
- **Cross-cutting governance skills**: PM, state manager, testing strategist, security reviewer, API contract reviewer.
- **Numbered, enforceable rules**: cross-stack baselines (00–04) + stack-specific architecture rules (10–22).
- **Deterministic workflows**: triage → architecture → tests → security → planning → gate → execution.
- **Canonical machine-readable state**: `ai-control/state.json` + human-readable `state.md` mirror.
- **Execution gate**: hard stop before code changes — all approvals and quality gates must pass.
- **Fullstack coordination**: shared contract-first workflows for NestJS+React and FastAPI+Next.js.
- **Git exclusion**: `.agents/` and `ai-control/` excluded from project history automatically.

## Installation

```bash
# Install from private repo
npm install git+ssh://git@github.com:naKarthikSurya/ai-agents-squad.git

# Initialize the squad in your project
npx antigravity-squad init
```

### Hidden install (no package.json entry)

```bash
npm install git+ssh://github-personal:naKarthikSurya/ai-agents-squad.git --no-save
```

### Removal

```bash
npm uninstall ai-agents-squad --no-save
rm -rf .agents ai-control
```

## How to Start a Task

1. Describe your task to Claude.
2. Claude runs workflow `00-triage-and-route.md` — classifies the task and initializes `state.json`.
3. The correct stack workflow starts (e.g., `10-backend-nestjs-feature.md`).
4. Each phase runs its designated skill, writes an artifact, and stops for your review.
5. You approve or send back. No code is written until the execution gate clears.

## Workflow Stages (Standard Feature)

```text
TASK_TRIAGE_PENDING
  → PM_ANALYSIS_PENDING          (product-manager-core → feature.md)
  → USER_REVIEW_FEATURE_PENDING  [USER APPROVAL GATE]
  → ARCHITECT_DESIGN_PENDING     (stack-architect → solution.md)
  → USER_REVIEW_DESIGN_PENDING   [USER APPROVAL GATE]
  → CONTRACT_REVIEW_PENDING      (api-contract-reviewer → backend/frontend_contract.md)
  → TEST_STRATEGY_PENDING        (testing-strategist → test_strategy.md)
  → SECURITY_REVIEW_PENDING      (security-reviewer → security_review.md)
  → DEV_PLANNING_PENDING         (stack-developer → implementation_steps.md)
  → PM_VERIFICATION_PENDING      (product-manager-core → pm_review.md)
  → TECH_LEAD_REVIEW_PENDING     → tech_lead_review.md
  → USER_APPROVAL_PENDING        [USER APPROVAL GATE]
  → EXECUTION_PENDING            (90-execution-gate.md passes all checks)
  → COMPLETED
```

## Skills

### Cross-Cutting Skills (All Stacks)

| Skill | Purpose | Writes |
| --- | --- | --- |
| `product-manager-core` | Requirements, acceptance criteria, edge cases, NFRs | `feature.md` |
| `state-manager` | State transitions, gate checks, state.md sync | `state.json`, `state.md`, `execution_log.md` |
| `testing-strategist` | Stack-tailored test strategy: unit/integration/e2e/negative | `test_strategy.md` |
| `security-reviewer` | Input validation, auth/authz, secrets, injection risks | `security_review.md` |
| `api-contract-reviewer` | Request/response schema alignment, breaking change detection | `backend_contract.md`, `frontend_contract.md` |

### Backend Skills

| Skill | Stack | Writes |
| --- | --- | --- |
| `backend-nestjs-architect` | NestJS | `solution.md` — module/controller/service/DTO/entity design |
| `backend-nestjs-developer` | NestJS | `implementation_steps.md` — file-level ordered plan |
| `backend-fastapi-architect` | FastAPI | `solution.md` — router/schema/model/service/Alembic design |
| `backend-fastapi-developer` | FastAPI | `implementation_steps.md` — file-level ordered plan |

### Frontend Skills

| Skill | Stack | Writes |
| --- | --- | --- |
| `frontend-react-architect` | React 18+ | `solution.md` — component tree, state ownership, data fetching plan |
| `frontend-react-developer` | React 18+ | `implementation_steps.md` |
| `frontend-nextjs-architect` | Next.js App Router | `solution.md` — Server/Client boundaries, cache strategy, Server Actions |
| `frontend-nextjs-developer` | Next.js App Router | `implementation_steps.md` |
| `frontend-angular-architect` | Angular 17+ Standalone | `solution.md` — component hierarchy, NgRx/Signals, routing, RxJS |
| `frontend-angular-developer` | Angular 17+ Standalone | `implementation_steps.md` |

### Utility Skills (Task-Based)

| Skill | Purpose |
| --- | --- |
| `obsidian-sync` | Mirror `ai-control/` artifacts to your Obsidian vault |
| `documentation-writer` | READMEs, ADRs, API docs, onboarding guides |
| `code-reviewer` | Structured review: security, correctness, performance, tests |
| `test-engineer` | Write unit, integration, and e2e test suites |

## Rules

### Cross-Stack Rules (Applied to All Tasks)

| Rule | Purpose |
| --- | --- |
| `00-engineering-baseline.md` | Modularity, naming, readability, maintainability |
| `01-artifact-discipline.md` | Artifact ownership, completeness, log discipline |
| `02-testing-quality-gates.md` | Coverage requirements, test quality, completion gates |
| `03-security-baseline.md` | Input validation, auth/authz, secrets, OWASP prevention |
| `04-api-contract-consistency.md` | Schema alignment, breaking change declaration |

### Stack-Specific Architecture Rules

| Rule | Stack |
| --- | --- |
| `10-backend-nestjs.md` | NestJS — modules, DTOs, guards, DI, database |
| `11-backend-fastapi.md` | FastAPI — routers, Pydantic, async, service layer |
| `20-frontend-react.md` | React — component responsibility, state, forms, a11y |
| `21-frontend-nextjs.md` | Next.js — Server/Client components, caching, Server Actions |
| `22-frontend-angular.md` | Angular — OnPush, RxJS, reactive forms, lazy loading |

### Quality Rules

| Rule | Purpose |
| --- | --- |
| `code-review-standards.md` | Review severity model, merge requirements |
| `documentation-standards.md` | Writing standards for all documentation output |

## Workflows

### Stack Feature Workflows (Full 9-Phase Cycle)

| Workflow | Stack |
| --- | --- |
| `00-triage-and-route.md` | **Entry point** — classifies task and routes to correct workflow |
| `10-backend-nestjs-feature.md` | NestJS backend feature |
| `11-backend-fastapi-feature.md` | FastAPI backend feature |
| `20-frontend-react-feature.md` | React frontend feature |
| `21-frontend-nextjs-feature.md` | Next.js frontend feature |
| `22-frontend-angular-feature.md` | Angular frontend feature |
| `30-fullstack-nestjs-react.md` | NestJS + React — contract-first fullstack |
| `31-fullstack-fastapi-nextjs.md` | FastAPI + Next.js — contract-first fullstack |

### Task-Type Workflows

| Workflow | Purpose |
| --- | --- |
| `40-bugfix-flow.md` | Root cause analysis, minimal fix, regression test |
| `50-refactor-flow.md` | Safety-net-first, behavior-invariant refactoring |
| `90-execution-gate.md` | Hard gate — verifies all artifacts, approvals, and quality gates |

### Utility Workflows

| Workflow | Purpose |
| --- | --- |
| `documentation.md` | Generate or update technical documentation |
| `code-review.md` | Structured multi-dimensional code review |
| `test-implementation.md` | Write test suites with coverage analysis |

## State and Approvals

`ai-control/state.json` is the canonical workflow state. Key approval flags:

- `approvals.feature` — set to `true` after user reviews `feature.md`
- `approvals.design` — set to `true` after user reviews `solution.md`
- `approvals.execution` — set to `true` only by explicit user authorization

Quality gates that block execution:

- `quality_gates.tests_defined` — `testing-strategist` must complete `test_strategy.md`
- `quality_gates.security_checked` — `security-reviewer` must clear `security_review.md`
- `quality_gates.contracts_checked` — `api-contract-reviewer` must finalize contracts (API tasks)

Helper scripts:

```bash
# Validate state.json structure
python .agents/skills/state-manager/scripts/validate_state.py

# Update a field safely
python .agents/skills/state-manager/scripts/update_state.py --stage DEV_PLANNING_PENDING
python .agents/skills/state-manager/scripts/update_state.py --approve feature
python .agents/skills/state-manager/scripts/update_state.py --gate tests_defined
```

## Adding a New Stack

1. Create `rules/XX-<stack>.md` with the next available number.
2. Create `skills/<stack>-architect/SKILL.md` and `skills/<stack>-developer/SKILL.md`.
3. Create `workflows/XX-<stack>-feature.md`.
4. Add the stack to `00-triage-and-route.md` routing table.
5. Run `cp -r .agents templates/` to mirror.

## Git Management

`npx antigravity-squad init` adds `.agents/` and `ai-control/` to `.git/info/exclude` — keeping
your AI workflow context local and out of project history.

## License

ISC
