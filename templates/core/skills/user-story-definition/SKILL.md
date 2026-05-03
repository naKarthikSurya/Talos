---
name: user-story-definition
description: >
  Writes well-formed user stories with acceptance criteria, edge cases, and definition of
  done. Produces the story backlog section of feature.md for downstream development and QA.
---

# User Story Definition Skill

## Goal

Convert requirements into formal, testable user stories that can be directly used for
sprint planning, development, and acceptance testing.

## When to Use

- Requirements have been extracted and MVP scope has been defined.
- The backlog needs to be populated with actionable stories.
- A story is vague or lacks clear acceptance criteria.

## Story Format

```
As a [role], I want to [action] so that [outcome].

Acceptance Criteria:
- [ ] Given [context], when [action], then [expected result].
- [ ] Given [context], when [action], then [expected result].

Edge Cases:
- [Unusual input or state]: [expected behavior]

Definition of Done:
- Code reviewed and merged
- Unit tests passing (coverage >= 80%)
- E2E test covering the happy path
- Documentation updated
```

## Operating Procedure

1. For each MVP requirement, write one user story.
2. Write 2–5 acceptance criteria per story in Given/When/Then format.
3. Identify at least 1 edge case per story.
4. Define the done criteria including test and documentation requirements.
5. Assign a story ID (e.g., US-001, US-002).

## Review Checklist

- [ ] Every story has a clear role, action, and outcome
- [ ] Every acceptance criterion is testable
- [ ] At least 1 edge case per story
- [ ] Definition of Done includes tests and documentation
- [ ] Stories are independent of each other where possible
