# Antigravity AI Agents Squad

A structured, deterministic AI engineering squad for your project. This package scaffolds a multi-agent workflow using the finite-state machine pattern, enforcing rigorous engineering guardrails and multi-step artifact verification.

## 🚀 Features

- **Role-Based Skills**: Specialized skills for Product Manager, Architect, Developer, and Tech Lead.
- **Deterministic Workflows**: Multi-stage workflows that move from requirements to design to implementation.
- **Shared State (Blackboard)**: Observability via `ai-control/state.md` to track the current stage and active agent.
- **Safety Gates**: Built-in rules for backend architecture and safety verification.
- **Git Exclusion**: Automatically adds generated folders to `.git/info/exclude` to keep them local-only.

## 📦 Installation (Private Git Repo)

Since this is a private toolkit, you can install it directly from your private Git repository without needing a paid NPM account.

1.  **Add to your project**:
    ```bash
    npm install git+ssh://git@github.com:naKarthikSurya/ai-agents-squad.git
    ```

2.  **Initialize the squad**:
    ```bash
    npx antigravity-squad init
    ```

## 🛠️ Included Roles

### 📋 Product Manager (PM)
Defines user goals, acceptance criteria, and edge cases. Outputs to `ai-control/feature.md`.

### 📐 Architect
Evaluates architecture options and proposes preferred solutions. Outputs to `ai-control/solution.md`.

### 👨‍💻 Developer
Translates designs into implementation steps and high-quality code. Outputs to `ai-control/implementation_steps.md`.

### 🛡️ Tech Lead
Audits design and planning for security, consistency, and operational risk.

## 🚦 Workflow Stages

The workflow progresses through the following stages as tracked in `ai-control/state.md`:

1. `PM_ANALYSIS_PENDING`
2. `USER_REVIEW_FEATURE_PENDING`
3. `ARCHITECT_DESIGN_PENDING`
4. `DEV_PLANNING_PENDING`
5. `TECH_LEAD_AUDIT_PENDING`
6. `USER_APPROVAL_PENDING`
7. `EXECUTION_PENDING`
8. `PM_VERIFICATION_PENDING`

## 🔒 Git Management

The `init` command automatically adds `.agents/` and `ai-control/` to your project's `.git/info/exclude`. This ensures that your local AI context remains private to your machine and doesn't pollute the project's repository or history.

## 📄 License

ISC
