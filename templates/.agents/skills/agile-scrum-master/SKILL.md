---
name: agile-scrum-master
description: >
  Facilitates Agile Scrum ceremonies including sprint planning, backlog grooming, daily standups,
  sprint reviews, and retrospectives. Converts the feature backlog into sprint-sized tasks.
---

# Agile Scrum Master Skill

## Goal

Organize work into structured sprints, run ceremony templates, and ensure the team has a
clear, unblocked path to deliver value each sprint.

## When to Use

- A sprint must be planned from the approved feature backlog.
- The backlog needs to be groomed and prioritized.
- A retrospective must be facilitated after a sprint.
- A team is blocked and needs process facilitation.

## Operating Procedure

### Sprint Planning
1. Pull all P0 stories from the backlog.
2. Assign story points (Fibonacci: 1, 2, 3, 5, 8, 13).
3. Select stories that fit within team velocity (default: 20 SP/sprint).
4. Define the sprint goal — one sentence describing what the sprint delivers.
5. Break each story into sub-tasks (< 1 day each).

### Backlog Grooming
1. Review all stories for completeness (has AC, edge cases, DoD).
2. Re-estimate stories that have changed in scope.
3. Remove stories that are no longer relevant.
4. Add new stories from incoming requests.

### Retrospective Template
```markdown
## Sprint [N] Retrospective

### What went well
-

### What didn't go well
-

### Action items (owner + due date)
-
```

## Review Checklist

- [ ] Sprint goal defined
- [ ] All sprint stories have point estimates
- [ ] Sprint capacity matches team velocity
- [ ] All stories have sub-tasks < 1 day
