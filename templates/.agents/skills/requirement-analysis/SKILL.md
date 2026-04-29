---
name: requirement-analysis
description: >
  Extracts functional and non-functional requirements from a raw user request.
  Produces a structured requirements document for use by downstream skills.
---

# Requirement Analysis Skill

## Goal

Transform an unstructured request into a clear, testable, and complete set of functional and
non-functional requirements.

## When to Use

- A new feature or task has been requested and no formal specification exists.
- An existing `feature.md` is incomplete or ambiguous.

## Inputs Expected

- Raw user task description (from conversation or issue tracker)
- Any existing `feature.md`, wireframes, or context files

## Operating Procedure

1. **Extract the user goal** — What problem does this solve? Who benefits?
2. **List functional requirements** — What must the system do? (CRUD operations, flows, states)
3. **List non-functional requirements** — Performance, security, accessibility, uptime.
4. **Identify constraints** — Budget, timeline, technology, compliance.
5. **Identify assumptions** — List anything assumed, not stated.
6. **Identify open questions** — List anything ambiguous that needs owner clarification.

## Output Format

```markdown
## Functional Requirements
- FR-01: [The system shall...]
- FR-02: [The system shall...]

## Non-Functional Requirements
- NFR-01: Response time < 200ms under 1,000 concurrent users
- NFR-02: All PII must be encrypted at rest

## Constraints
- Must work within existing NestJS/PostgreSQL stack
- No new cloud services without infrastructure review

## Assumptions
- Users are authenticated before accessing this feature

## Open Questions
- [Q1]: What is the maximum file upload size? (Owner: Product Manager)
```

## Review Checklist

- [ ] At least 3 functional requirements defined
- [ ] At least 2 non-functional requirements defined
- [ ] All assumptions explicitly listed
- [ ] All ambiguities flagged as open questions
