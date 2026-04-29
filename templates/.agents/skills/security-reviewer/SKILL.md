---
name: security-reviewer
description: >
  Use when a feature, API change, or implementation plan needs a security assessment.
  Reviews for input validation gaps, authentication/authorization weaknesses, secret
  exposure, injection vectors, and stack-specific security risks. Produces
  security_review.md and activates quality_gates.security_checked in state.json.
---

# Security Reviewer Skill

## Goal

Identify security risks introduced or exposed by the current task. Provide specific, actionable
remediation notes — not generic security checklists. Every risk must be assessed and documented,
even if the decision is "accepted as low risk."

## When to Use

- After architecture design and before developer planning begins.
- When any of the following are present: new API endpoints, authentication changes, data input from users, external integrations, file handling, database operations, or permission changes.
- When `ai-control/security_review.md` is missing.

## Inputs Expected

- `ai-control/feature.md` — to understand the attack surface and user interactions.
- `ai-control/solution.md` — to understand the technical architecture and data flows.
- `ai-control/state.json` — to identify stack and task_type.

## Artifacts Read

- `ai-control/feature.md`
- `ai-control/solution.md`
- `ai-control/state.json`

## Artifacts Written

- `ai-control/security_review.md`
- Updates `quality_gates.security_checked = true` in `state.json` when complete.

## Operating Procedure

1. **Read state**: Confirm stage allows security review.
2. **Map the attack surface**: List every entry point where external data enters the system (HTTP params, request bodies, file uploads, environment configs, third-party callbacks).
3. **Assess input validation**: Is every entry point validated before use? Are rejection behaviors correct?
4. **Assess auth/authz**: Which endpoints/actions require authentication? Which require authorization roles? Are these enforced at the service layer, not just the controller?
5. **Assess secret handling**: Are any secrets, tokens, or credentials hardcoded, logged, or exposed in responses?
6. **Assess injection risks**: SQL/NoSQL injection, command injection, path traversal, template injection — does the implementation prevent each applicable vector?
7. **Assess data exposure**: Do responses expose only the data the client needs? Are internal fields, hashes, or sensitive metadata excluded?
8. **Assess stack-specific risks**: Apply the relevant stack's security patterns (NestJS guards/filters, FastAPI middleware, Next.js middleware/server-only modules, Angular interceptors).
9. **Assess dependency risk**: Are any new dependencies introduced? Are they maintained, scoped, and necessary?
10. **Write `security_review.md`**: Document every identified risk with severity, description, and remediation.
11. **Update state**: Set `quality_gates.security_checked = true`. Log to `execution_log.md`.

## Risk Severity Scale

- **CRITICAL**: Exploitable vulnerability that could lead to data breach, unauthorized access, or system compromise. Must be fixed before any code is written.
- **HIGH**: Significant weakness that requires a specific mitigation. Implementation is blocked until mitigated.
- **MEDIUM**: Risk that should be addressed in this task. Acceptable to document and fix within the same PR.
- **LOW**: Minor risk or defense-in-depth improvement. Can be deferred with documentation.
- **INFORMATIONAL**: Not a current risk, but a future consideration to note.

## Output: security_review.md Structure

```markdown
# Security Review: <Feature Title>

**Reviewer**: security-reviewer
**Date**: YYYY-MM-DD
**Overall Assessment**: CLEAR / CONCERNS NOTED / BLOCKED

## Attack Surface

- Entry points reviewed: <list>

## Findings

### CRITICAL Issues
*(none / list)*

### HIGH Issues
*(none / list each as: [File/Component] Description — Remediation)*

### MEDIUM Issues
*(none / list)*

### LOW Issues
*(none / list)*

### INFORMATIONAL Notes
*(none / list)*

## Auth/Authz Assessment
- Authentication required: <yes/no — where enforced>
- Authorization checks: <description of role/permission model>
- Gaps identified: <none / description>

## Input Validation Assessment
- Validated via: <DTO class-validator / Pydantic / Zod / other>
- Unknown fields rejected: <yes/no>
- Validation gaps: <none / description>

## Secret and Data Exposure Assessment
- Secrets sourced from: <env vars / config service>
- Response schemas exclude sensitive fields: <yes/no>
- Logging review: <no sensitive data in logs / concerns noted>

## Stack-Specific Risk Notes
<Stack-specific findings>

## Remediation Required Before Execution
- [ ] <specific action item 1>
- [ ] <specific action item 2>
*(or: "None — cleared for execution")*
```

## Constraints

- Do not mark `security_checked = true` if any CRITICAL or HIGH issue is unresolved.
- Do not write generic guidance ("validate all inputs"). Write specific findings for this specific feature.
- Do not skip this review for "simple" features. Simple features often have the worst security hygiene.

## Review Checklist

- [ ] All entry points identified and assessed.
- [ ] Auth/authz model explicitly described.
- [ ] Input validation confirmed or gaps documented.
- [ ] Secret/credential handling confirmed safe.
- [ ] At least one stack-specific risk check performed.
- [ ] All CRITICAL and HIGH issues have remediation items.
- [ ] `quality_gates.security_checked` set to `true` in `state.json`.
