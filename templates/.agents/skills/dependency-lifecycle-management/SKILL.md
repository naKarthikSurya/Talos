---
name: dependency-lifecycle-management
description: >
  Manages the dependency lifecycle including auditing for CVEs, planning and executing
  upgrades, testing compatibility, and automating updates via Dependabot or Renovate.
---

# Dependency Lifecycle Management Skill

## Goal

Keep all project dependencies current, secure, and tested so that the codebase does not
accumulate security debt or drift far behind upstream versions.

## When to Use

- A dependency has a known CVE that must be patched.
- Dependencies are significantly out of date (major versions behind).
- A new automated dependency update pipeline must be configured.
- A major framework upgrade (e.g., NestJS v9 → v10) must be planned.

## Audit Commands

```bash
# Node.js
npm audit                       # Show CVEs
npm audit fix                   # Auto-fix safe patches
npm audit fix --force           # Fix breaking changes (review first!)
npx npm-check-updates -u        # Show all outdated packages

# Python
pip audit                       # Show CVEs
pip list --outdated              # Show outdated packages
safety check                    # CVE scan
```

## Upgrade Strategy

### Patch/Minor Upgrades (e.g., 1.2.3 → 1.3.0)
- Generally safe. Batch these in a single PR.
- Run full test suite and verify.

### Major Upgrades (e.g., 5.x → 6.x)
1. Read the migration guide for the package.
2. Create a dedicated branch: `chore/upgrade-<package>-v<version>`.
3. Update the package. Fix all TypeScript errors and deprecations.
4. Run full test suite. Fix failures.
5. Test manually in staging.
6. Open a PR with migration notes.

## Dependabot Configuration

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
    open-pull-requests-limit: 5
    groups:
      dev-dependencies:
        patterns: ["@types/*", "eslint*", "jest*"]
```

## Operating Procedure

1. Run `npm audit` and identify CVEs by severity.
2. Patch CRITICAL and HIGH CVEs immediately.
3. Schedule MODERATE and LOW for next sprint.
4. For major upgrades, create a dedicated branch and follow the upgrade strategy.
5. After upgrades, run: `npm run test && npm run build && npm run test:e2e`.

## Review Checklist

- [ ] No CRITICAL or HIGH CVEs in production dependencies
- [ ] All dependencies updated within 2 major versions of latest
- [ ] Dependabot or Renovate configured for automated PRs
- [ ] `package-lock.json` or `poetry.lock` committed
- [ ] Full test suite passes after every upgrade
