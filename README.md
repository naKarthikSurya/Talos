# AI Agents Squad

A **Role-based, artifact-driven AI engineering squad** built for Antigravity. Every task flows through defined Roles, activates the right Skills, enforces specific Rules, and follows a phased Workflow — all producing Antigravity Artifacts at every stage.

---

## How It Works

The squad is organized into four layers:

```
Role → selects → Skills
Role → enforces → Rules
Role → follows → Workflow
Workflow → produces → Antigravity Artifacts
```

A task always moves forward through **stages**, each stage owned by a **Role**, producing an **Artifact** that must be reviewed before the next stage begins.

---

## Project Structure

```
.agents/
  roles/        # 11 Role definitions — each Role owns a domain
  skills/       # 35 Skills — technical deep-dives used by Roles
  rules/        # 11 Role-specific rule files — enforced constraints
  workflows/    # 11 Role-specific workflow files — phased procedures

ai-control/
  state.md      # Current task state, stage, and artifact status table
```

---

## The 11 Roles

Each Role has a `ROLE.md` in `.agents/roles/`, a dedicated rule file in `.agents/rules/`, and a workflow file in `.agents/workflows/`.

| Role | Domain | Mapped Skills |
|---|---|---|
| `product-manager` | Requirements, MVP, user stories | `requirement-analysis`, `mvp-planning`, `user-story-definition` |
| `project-manager` | Sprint planning, estimation, documentation | `agile-scrum-master`, `task-estimation`, `technical-documentation` |
| `ux-ui-designer` | UX flows, UI components, responsive design | `ux-research-flows`, `ui-component-design`, `responsive-design-expert` |
| `system-architect` | Architecture, scalability, security design | `distributed-systems-design`, `scalability-architect`, `security-architecture` |
| `frontend-developer` | Frontend implementation | `react-expert`, `nextjs-expert`, `angular-expert`, `tailwind-styling` |
| `backend-developer` | Backend APIs, services, database integration | `nestjs-expert`, `fastapi-expert`, `django-expert`, `api-design-standard` |
| `database-engineer` | Schema design, migrations, query optimization | `postgresql-optimization`, `nosql-modeling`, `database-migration-lead` |
| `devops-cloud-engineer` | Containers, CI/CD, cloud infrastructure | `docker-containerization`, `ci-cd-pipelines`, `aws-infrastructure` |
| `qa-testing-engineer` | Unit, integration, E2E, performance testing | `unit-integration-testing`, `e2e-playwright-cypress`, `performance-load-testing` |
| `security-observability-lead` | Auth, security hardening, logging, monitoring | `auth-security-hardening`, `logging-monitoring-grafana`, `error-tracking-sentry` |
| `maintenance-support-engineer` | Bug fixes, refactoring, dependency management, incidents | `legacy-code-refactoring`, `dependency-lifecycle-management`, `incident-response-debugging` |

---

## The Standard Feature Workflow

Every new feature follows this stage progression. Each stage is owned by a Role and produces an Antigravity Artifact.

```
PM_ANALYSIS_PENDING
  └─ Role: product-manager
  └─ Artifact: feature.md (type: other) ← USER APPROVAL REQUIRED

ARCHITECT_DESIGN_PENDING
  └─ Role: system-architect
  └─ Artifact: solution.md (type: implementation_plan) ← USER APPROVAL REQUIRED
  └─ Artifact: backend_contract.md (type: other)

SECURITY_REVIEW_PENDING
  └─ Role: security-observability-lead
  └─ Artifact: security_review.md (type: other) ← STOP if CRITICAL/HIGH issues

TEST_STRATEGY_PENDING
  └─ Role: qa-testing-engineer
  └─ Artifact: test_strategy.md (type: other)

DEV_PLANNING_PENDING
  └─ Role: backend-developer or frontend-developer
  └─ Artifact: implementation_steps.md (type: task) ← USER APPROVAL REQUIRED

PM_VERIFICATION_PENDING
  └─ Role: product-manager (verification pass)
  └─ Artifact: pm_view.md (type: other)

EXECUTION_PENDING
  └─ Role: backend-developer or frontend-developer
  └─ Code + tests written step by step

COMPLETED
  └─ Artifact: full_implementation.md (type: walkthrough)
```

---

## Artifact Reference

All workflow documents are **Antigravity Artifacts** — not loose files. They are written with `IsArtifact: true` and appear in the Antigravity UI.

| Artifact | Antigravity Type | Needs User Approval |
|---|---|---|
| `feature.md` | `other` | ✅ Yes |
| `solution.md` | `implementation_plan` | ✅ Yes |
| `backend_contract.md` | `other` | ❌ No |
| `implementation_steps.md` | `task` | ✅ Yes |
| `pm_view.md` | `other` | ❌ No |
| `full_implementation.md` | `walkthrough` | ❌ No |
| `test_strategy.md` | `other` | ❌ No |
| `security_review.md` | `other` | ⚠️ Only if CRITICAL/HIGH |
| `schema_design.md` | `implementation_plan` | ✅ Yes |
| `deployment_runbook.md` | `other` | ❌ No |
| `postmortem_[date].md` | `other` | ❌ No |

---

## How to Start a Task

### Step 1 — Describe your task

Tell Antigravity what you want to build or fix in plain language. No special syntax needed.

> Example: *"I want to add a payment history page to the admin dashboard."*

### Step 2 — Product Manager Role activates

Antigravity activates the `product-manager` role. It runs three skills in sequence:

- `requirement-analysis` → extracts functional and non-functional requirements
- `mvp-planning` → scopes the MVP (P0 only) and defers non-essentials
- `user-story-definition` → writes formal user stories with acceptance criteria

A `feature.md` Antigravity Artifact is produced. **You must approve it** before anything else happens.

### Step 3 — Approve or send back

Review the `feature.md` artifact in Antigravity. Either:

- ✅ Approve → moves to `ARCHITECT_DESIGN_PENDING`
- 💬 Comment → the Product Manager Role revises and resubmits

### Step 4 — System Architect Role activates

Produces `solution.md` (architecture) and `backend_contract.md` (API contract) as Antigravity Artifacts. **You must approve `solution.md`** before implementation planning begins.

### Step 5 — Security + QA runs automatically

`security-observability-lead` produces `security_review.md`. If no CRITICAL/HIGH issues, it clears automatically.

`qa-testing-engineer` produces `test_strategy.md` mapping every acceptance criterion to test cases.

### Step 6 — Developer Role plans implementation

`backend-developer` or `frontend-developer` produces `implementation_steps.md` as a `task` artifact — a checklist of every file to create, in order. **You must approve it** before coding starts.

### Step 7 — Execution

The developer role follows `implementation_steps.md` step by step, checking off each item. Tests are written alongside code.

### Step 8 — Completion

`full_implementation.md` walkthrough artifact is produced summarizing all changes, test results, and coverage.

---

## How to Start a Bug Fix

Tell Antigravity about the bug.

> Example: *"The payment status is not updating correctly after a successful Stripe webhook."*

The `maintenance-support-engineer` role activates:

1. `incident-response-debugging` skill → triages, isolates root cause
2. Writes a failing regression test first
3. Applies the minimal fix
4. Runs full test suite
5. Produces a post-mortem Antigravity Artifact (for P0/P1 incidents)

---

## How to Start a Refactor

> Example: *"The BookingsService is 800 lines and very hard to maintain."*

The `maintenance-support-engineer` role activates `legacy-code-refactoring`:

1. Writes a `refactor_[module].md` plan as an `implementation_plan` artifact
2. **You approve the plan** before any code changes
3. Refactoring proceeds one small step per commit with test coverage verified at each step

---

## How to Set Up Infrastructure / Deploy

> Example: *"Containerize the API and set up a GitHub Actions pipeline to deploy to AWS ECS."*

The `devops-cloud-engineer` role activates:

1. `docker-containerization` → writes Dockerfile + docker-compose
2. `ci-cd-pipelines` → writes GitHub Actions workflow
3. `aws-infrastructure` → writes Terraform for ECS, RDS, ALB
4. `deployment_runbook.md` artifact produced with rollback procedures

---

## Adding a New Role

1. Create `.agents/roles/<role-name>/ROLE.md` — define purpose, mapped skills, and constraints.
2. Create `.agents/rules/role-<role-name>.md` — define enforceable rules for this role.
3. Create `.agents/workflows/role-<role-name>.md` — define the phased workflow with Artifact creation specs.
4. Add the role to this README's role table.

## Adding a New Skill

1. Create `.agents/skills/<skill-name>/SKILL.md` — define goal, implementation rules, code examples, review checklist.
2. Add the skill to the appropriate Role's `ROLE.md` `mapped_skills` list.
3. Reference the skill in the Role's workflow at the appropriate phase.

---

## Updating Task State

The `ai-control/state.md` file tracks the current stage and artifact status. Update it manually or ask Antigravity to update it as stages complete.

```markdown
# AI Workflow State

Task ID: TASK-002
Description: Add payment history page to admin dashboard

Current Stage: PM_ANALYSIS_PENDING
Active Agent: product-manager
```

Advance the stage by updating `Current Stage` after each artifact is approved.

---

## Git Management

`.agents/` and `ai-control/` are local-only AI context. Add them to `.git/info/exclude` to keep them out of project history:

```bash
echo ".agents/" >> .git/info/exclude
echo "ai-control/" >> .git/info/exclude
```

This keeps your repository clean while preserving full AI workflow context locally.

---

## Stack Selection Reference

The `frontend-developer` and `backend-developer` roles select a framework skill based on your stack. Define your stack in `ai-control/state.md`:

```markdown
Stack:
  frontend: nextjs     # react | nextjs | angular
  backend: nestjs      # nestjs | fastapi | django
  database: postgresql # postgresql | mongodb | redis
  cloud: aws           # aws | gcp | azure
```

---

## License

ISC
