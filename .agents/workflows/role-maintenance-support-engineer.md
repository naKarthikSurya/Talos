# Workflow: Maintenance & Support Engineer Role

## Objective

Safely resolve production incidents, fix bugs with regression tests, update dependencies,
and refactor technical debt. All findings are written as Antigravity Artifacts.

## Active Rules

- `role-maintenance-support-engineer.md`

---

## Phase 1: Incident Triage (if active incident)

1. Activate skill: `incident-response-debugging`
2. Assess severity (P0–P3) within 5 minutes.
3. For P0/P1: **rollback first** if recent deployment is suspected.
4. Scope the impact, hypothesize root cause from logs and metrics.
5. Isolate root cause. Apply minimal fix. Verify via monitoring.

> [!IMPORTANT]
> Write post-mortem as an **Antigravity Artifact** within 48 hours of resolution:
> - **Type**: `other`
> - **Name**: `postmortem_[date].md`
> - **RequestFeedback**: `false`
> - **Summary**: "Post-mortem for [incident] — timeline, root cause, impact, resolution, preventive actions."

---

## Phase 2: Bug Fix

1. Reproduce the bug with a failing test first.
2. Apply the minimal code change that makes the test pass.
3. Run full test suite to verify no regressions.
4. Commit: bug fix and regression test in the same commit.

---

## Phase 3: Dependency Updates

1. Activate skill: `dependency-lifecycle-management`
2. Run: `npm audit` or `pip audit`
3. Patch CRITICAL/HIGH CVEs immediately on a hotfix branch.
4. For major version upgrades:

> [!IMPORTANT]
> Write upgrade plan as an **Antigravity Artifact**:
> - **Type**: `implementation_plan`
> - **Name**: `dependency_upgrade_[package].md`
> - **RequestFeedback**: `true`
> - **Summary**: "Upgrade plan for [package] vX → vY — breaking changes, migration steps, test plan."

---

## Phase 4: Refactoring

1. Activate skill: `legacy-code-refactoring`
2. Write characterization tests for current behavior (if none exist).

> [!IMPORTANT]
> Write refactoring plan as an **Antigravity Artifact**:
> - **Type**: `implementation_plan`
> - **Name**: `refactor_[module].md`
> - **RequestFeedback**: `true`
> - **Summary**: "Refactoring plan for [module] — code smells identified, steps, test coverage baseline."

3. Apply one small refactoring step per commit. Run tests. Confirm green.
4. Repeat until complete. Confirm coverage has not decreased.
