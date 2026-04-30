# Talos

**Talos** is an autonomous, role-based AI engineering engine built for Antigravity. It transforms raw requests into deterministic results through a governed lifecycle of Roles, Skills, and Artifacts.

---

## Installation

### Install into your project

```bash
# Via SSH (recommended)
npm install git+ssh://git@github.com:naKarthikSurya/Talos.git --no-save

# Via HTTPS
npm install https://github.com/naKarthikSurya/Talos.git --no-save
```

> `--no-save` keeps this out of your `package.json` — it's a local AI workflow tool, not a production dependency.

### Initialize Talos

```bash
npx talos init
```

This will:

1. **Auto-sync** `templates/` from the live `.agents/` and `ai-control/` in the package
2. **Copy** `.agents/`, `ai-control/`, and `.cursorrules` into your current project
3. **Add** all folders/files to `.git/info/exclude` to keep them out of version control
4. **Automate**: The `.cursorrules` file automatically instructs any AI assistant to follow the squad protocol without manual setup.

### After making changes to roles, skills, rules, or workflows

Run the sync command inside the squad package to rebuild `templates/` automatically:

```bash
npx talos sync
```

This deletes the old `templates/` contents and rebuilds them fresh from the current `.agents/` and `ai-control/`. No manual copying needed.

### Configure your stack

Open `ai-control/state.md` and update the `## Stack` section to match your project:

```markdown
frontend: nextjs      # react | nextjs | angular
backend: nestjs       # nestjs | fastapi | django
database: postgresql  # postgresql | mongodb | redis
cloud: aws            # aws | gcp | azure | none
```

Roles read this to automatically select the correct Skill (e.g. `nestjs-expert` vs `fastapi-expert`).

### Removal

```bash
npm uninstall talos-ai --no-save
rm -rf .agents ai-control
```

---

## How It Works

Talos is organized into four layers:

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
  skills/       # 41 Skills — technical deep-dives used by Roles
  rules/        # 11 Role-specific rule files — enforced constraints
  workflows/    # 12 Role-specific workflow files — phased procedures

ai-control/
  state.md      # Current task state, stage, stack config, and artifact status

templates/      # Scaffold source — auto-managed by the CLI
                # Rebuilt automatically on every `init` and `sync` run
                # Never edit manually — always edit .agents/ and ai-control/ directly
```

---

## The 11 Roles

Each Role has a `ROLE.md` in `.agents/roles/`, a dedicated rule file in `.agents/rules/`, and a workflow file in `.agents/workflows/`.

| Role | Domain | Mapped Skills |
|---|---|---|
| `product-manager` (@pm) | Requirements, MVP, user stories | `requirement-analysis`, `mvp-planning`, `user-story-definition` |
| `project-manager` (@project) | Sprint planning, estimation, documentation | `agile-scrum-master`, `task-estimation`, `technical-documentation` |
| `ux-ui-designer` (@designer) | UX flows, UI components, responsive design | `ux-research-flows`, `ui-component-design`, `responsive-design-expert` |
| `system-architect` (@architect) | Architecture, scalability, security design | `distributed-systems-design`, `scalability-architect`, `security-architecture` |
| `frontend-developer` (@frontend) | Frontend implementation | `react-expert`, `nextjs-expert`, `angular-expert`, `tailwind-styling` |
| `backend-developer` (@backend) | Backend APIs, services, database integration | `nestjs-expert`, `fastapi-expert`, `django-expert`, `api-design-standard` |
| `database-engineer` (@db) | Schema design, migrations, query optimization | `postgresql-optimization`, `nosql-modeling`, `database-migration-lead` |
| `devops-cloud-engineer` (@devops) | Containers, CI/CD, cloud infrastructure | `docker-containerization`, `ci-cd-pipelines`, `aws-infrastructure` |
| `qa-testing-engineer` (@qa) | Unit, integration, E2E, performance testing | `unit-integration-testing`, `e2e-playwright-cypress`, `performance-load-testing` |
| `security-observability-lead` (@security) | Auth, security hardening, logging, monitoring | `auth-security-hardening`, `logging-monitoring-grafana`, `error-tracking-sentry` |
| `maintenance-support-engineer` (@maintenance) | Bug fixes, refactoring, dependency management, incidents | `legacy-code-refactoring`, `dependency-lifecycle-management`, `incident-response-debugging` |

---

## The Standard Feature Workflow

Every new feature follows this stage progression. Each stage is owned by a Role and produces an Antigravity Artifact.

```
PM_ANALYSIS_PENDING        # Command: /pm-analysis
  └─ Role: @pm
  └─ Artifact: feature.md (type: other) ← USER APPROVAL REQUIRED

ARCHITECT_DESIGN_PENDING   # Command: /architect-design
  └─ Role: @architect
  └─ Artifact: solution.md (type: implementation_plan) ← USER APPROVAL REQUIRED
  └─ Artifact: backend_contract.md (type: other)

SECURITY_REVIEW_PENDING    # Command: /security-audit
  └─ Role: @security
  └─ Artifact: security_review.md (type: other) ← STOP if CRITICAL/HIGH issues

TEST_STRATEGY_PENDING      # Command: /qa-audit
  └─ Role: @qa
  └─ Artifact: test_strategy.md (type: other)

DEV_PLANNING_PENDING       # Command: /project-planning
  └─ Role: @backend or @frontend
  └─ Artifact: implementation_steps.md (type: task) ← USER APPROVAL REQUIRED

PM_VERIFICATION_PENDING    # Command: /pm-analysis (verify mode)
  └─ Role: @pm (verification pass)
  └─ Artifact: pm_view.md (type: other)

EXECUTION_PENDING
  └─ Role: @backend or @frontend
  └─ Code + tests written step by step

COMPLETED
  └─ Artifact: full_implementation.md (type: walkthrough)
```

---

## Slash Command Workflows

Talos is powered by custom slash commands in Antigravity. These commands chain together roles and skills to perform complex, multi-step tasks.

| Command | Role | Description |
|---|---|---|
| `/pm-analysis` | `@pm` | Extracts requirements, plans MVP, and writes user stories. |
| `/architect-design` | `@architect` | Defines architecture and API contracts. |
| `/security-audit` | `@security` | Audits for vulnerabilities and observability. |
| `/qa-audit` | `@qa` | Audits for bugs, edge cases, and test coverage. |
| `/project-planning` | `@project` | Estimates tasks and generates documentation. |
| `/ux-design-review` | `@designer` | Reviews UI consistency and UX flows. |
| `/backend-review` | `@backend` | Reviews server-side code and API standards. |
| `/frontend-review` | `@frontend` | Reviews UI implementation and state management. |
| `/db-optimization` | `@db` | Reviews schema design and optimizes queries. |
| `/devops-check` | `@devops` | Verifies CI/CD, Docker, and infrastructure. |
| `/maintenance-check` | `@maintenance` | Refactors debt and manages dependencies. |
| `/full-review` | `Talos` | Runs a comprehensive, multi-role project audit. |

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
