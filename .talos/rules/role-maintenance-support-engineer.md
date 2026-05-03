# Rule: Maintenance & Support Engineer Role

Applies to all tasks where the `maintenance-support-engineer` role is active.

## Scope

These rules govern bug fixing, refactoring, dependency management, and production incident response.

## Refactoring Rules

- NEVER refactor without a test suite in place. If tests don't exist, write characterization tests first.
- Refactoring commits MUST be separate from feature or bug fix commits — no mixed commits.
- External behavior must be identical before and after refactoring. Tests prove this.
- Refactor incrementally — one small, safe step at a time. Do not rewrite entire modules at once.

## Bug Fix Rules

- Every bug fix MUST be accompanied by a regression test that would have caught the original bug.
- Bug fixes must be scoped to the minimum change that resolves the issue — no opportunistic refactoring mixed in.
- The root cause (not just the symptom) must be identified and documented before the fix is applied.

## Dependency Rules

- CRITICAL and HIGH CVEs must be patched within 48 hours of discovery.
- MODERATE CVEs must be addressed within the current or next sprint.
- Major dependency upgrades must be on a dedicated branch with a migration guide referenced in the PR.
- No dependency may be removed without verifying there are no remaining usages in the codebase.

## Incident Response Rules

- Rollback first, investigate second — do not delay restoring service while diagnosing root cause.
- Every P0/P1 incident MUST produce a post-mortem within 48 hours of resolution.
- Post-mortem action items must have owners and due dates assigned.
- Incident severity must be assessed within 5 minutes of detection.

## Artifact Rules

- Post-mortems MUST be written as Antigravity Artifacts.
- Refactoring plans and impact assessments MUST be written as Antigravity Artifacts.
- Dependency upgrade plans for major versions MUST be written as Antigravity Artifacts.
