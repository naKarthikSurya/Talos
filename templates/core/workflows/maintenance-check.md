---
description: Perform maintenance and support checks as Maintenance Engineer
---

Read `.agents/agents.md`.

Act as the **Maintenance & Support Engineer (@maintenance)**.

Review the long-term health, technical debt, and operational stability of the codebase.

### Detailed Maintenance Checklist:

#### 1. Dependency Management
- [ ] **Outdated Packages**: Run `npm outdated` and identify critical security or performance updates.
- [ ] **CVE Check**: Run `npm audit` to find packages with known vulnerabilities.
- [ ] **Unused Dependencies**: Identify packages in `package.json` that are no longer imported.
- [ ] **Lockfile Integrity**: Ensure the lockfile matches the current dependency tree.

#### 2. Technical Debt & Refactoring
- [ ] **Code Smells**: Identify long functions, deeply nested loops, or "god objects".
- [ ] **Dead Code**: Remove unused exports, components, or entire files.
- [ ] **TODOs**: Review and prioritize remaining `// TODO` or `// FIXME` comments.
- [ ] **Performance Debt**: Identify areas where performance has slowly degraded over time.

#### 3. Documentation & Knowledge
- [ ] **README Accuracy**: Is the setup process still correct for new developers?
- [ ] **API Docs**: Do the auto-generated docs (Swagger) match the current implementation?
- [ ] **Changelog**: Has the changelog been updated with recent fixes and features?

#### 4. Incident Readiness
- [ ] **Error Trends**: Analyze recent error logs for recurring patterns or silent failures.
- [ ] **Recovery Runbook**: Are there clear instructions for common failure scenarios (e.g., "Reset DB password")?
- [ ] **Alert Thresholds**: Are alerts firing too often (noise) or not at all (missing)?

#### 5. Code Quality & Standards
- [ ] **Linting/Formatting**: Are there excessive lint warnings or inconsistent formatting?
- [ ] **Test Health**: Are tests brittle? Do they fail intermittently (flaky tests)?
- [ ] **Typing Coverage**: In TypeScript, what percentage of the codebase is covered by strict types?

After checking, provide:
- **Technical Debt Report**: Top 3 areas requiring immediate refactoring.
- **Dependency Update Plan**: List of packages to upgrade and potential breaking changes.
- **Maintenance Tasks**: Small, actionable cleanup items.
- **Health Score**: Overall rating of the codebase's long-term sustainability.
