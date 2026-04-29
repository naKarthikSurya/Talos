---
name: task-estimation
description: >
  Estimates effort for development tasks using story points, T-shirt sizing, or time-based
  estimates. Produces a milestone plan and flags high-risk estimates.
---

# Task Estimation Skill

## Goal

Provide accurate, defensible effort estimates for all tasks in the sprint backlog so that
the team can commit to a realistic scope and stakeholders can plan releases.

## When to Use

- A sprint is being planned and stories need point estimates.
- A stakeholder needs a release date estimate.
- A task seems larger than expected and must be broken down further.

## Estimation Methods

### Story Points (Fibonacci)
- 1 pt: Trivial change. Config update, copy change. < 1 hour.
- 2 pt: Small, well-understood task. 1–3 hours.
- 3 pt: Medium task. Some uncertainty. Half day.
- 5 pt: Large task. Multiple components. Full day.
- 8 pt: Very large. Multiple days. Consider splitting.
- 13 pt: Epic-sized. Must be split before sprint.

### Risk Multipliers
- Known technology: 1x
- New library or pattern: 1.5x
- Third-party integration: 2x
- Legacy code with no tests: 2x

## Operating Procedure

1. For each story, identify sub-tasks.
2. Estimate each sub-task individually using Fibonacci.
3. Sum sub-task estimates for the story total.
4. Apply risk multiplier if applicable.
5. Flag any story > 8 SP for decomposition review.
6. Sum all story points to produce sprint capacity commitment.

## Output Format

```markdown
| Story | Sub-tasks | Base SP | Risk | Final SP |
|---|---|---|---|---|
| US-001: User login | JWT validation, refresh token, guard | 5 | 1x | 5 |
| US-002: File upload | S3 integration, validation, DB record | 5 | 2x | 10 → SPLIT |
```

## Review Checklist

- [ ] Every story has sub-tasks listed
- [ ] No story exceeds 8 SP without justification
- [ ] Risk multipliers applied where relevant
- [ ] Sprint total does not exceed team velocity
