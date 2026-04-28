---
name: product-manager-core
description: >
  Use when a task request needs to be translated into a formal feature definition with
  acceptance criteria, edge cases, non-functional requirements, and identified risks.
  Always the first skill activated for any new feature or task triage. Also used for
  re-verification after implementation planning to confirm the plan satisfies the original intent.
---

# Product Manager Core Skill

## Goal

Transform a raw task request into a precise, unambiguous feature definition that all downstream skills
(architect, developer, reviewer) can work from without needing to re-interpret the original request.

## When to Use

- At the start of any new feature task (before any design or implementation).
- When `ai-control/feature.md` is missing, incomplete, or marked as a stub.
- When re-verifying that the implementation plan matches the original requirements.
- When scope creep is suspected and the original requirements need to be reconfirmed.

## Inputs Expected

- The user's raw task description or request (provided in conversation).
- Any linked context: existing `ai-control/state.json`, prior `feature.md`, related `solution.md`.

## Artifacts Read

- `ai-control/state.json` (to confirm current stage is `TASK_TRIAGE_PENDING` or `PM_ANALYSIS_PENDING`)
- `ai-control/feature.md` (if exists, to build on or revise)

## Artifacts Written

- `ai-control/feature.md` — the primary deliverable of this skill.

## Operating Procedure

1. **Confirm stage**: Read `ai-control/state.json`. Proceed only if stage is `TASK_TRIAGE_PENDING` or `PM_ANALYSIS_PENDING`.
2. **Parse the request**: Identify the user goal (what the user wants to achieve), not the implementation method.
3. **Define acceptance criteria**: Write 3–8 specific, testable criteria. Each criterion must be falsifiable.
   - Good: "A user with the `admin` role can delete any post."
   - Bad: "Deletion works correctly."
4. **Identify edge cases**: Think through boundary conditions, unusual inputs, concurrent operations, empty states.
5. **Define failure cases**: What happens when things go wrong? Specify expected system behavior for each failure scenario.
6. **Specify NFRs**: Response time expectations, concurrency, rate limiting, data retention, accessibility level if UI.
7. **List unknowns**: Explicitly list anything not yet defined that a downstream skill would need to make a decision about. Do not let unknowns silently become assumptions.
8. **Identify risks**: Any dependency, technical debt, integration concern, or business risk that affects this task.
9. **Write `feature.md`**: Use the section structure below.
10. **Update state**: Set `current_stage` to `USER_REVIEW_FEATURE_PENDING`. Log to `execution_log.md`.
11. **Stop**: Present `feature.md` to the user. Do not proceed to architecture until the user explicitly approves.

## Output: feature.md Structure

```markdown
# Feature: <Title>

## Task Summary
One paragraph describing what this task does and why.

## User Goal
As a <role>, I want to <action> so that <outcome>.

## Acceptance Criteria
- [ ] <testable criterion 1>
- [ ] <testable criterion 2>
...

## Edge Cases
- <condition>: <expected behavior>
...

## Failure Cases
- <failure condition>: <expected system response>
...

## Non-Functional Requirements
- Performance: ...
- Security: ...
- Accessibility: ... (if UI)
- Concurrency: ...

## Unknowns / Open Questions
- <question> (owner: <who needs to answer this>)

## Risks
- <risk description> (severity: low/medium/high)
```

## Constraints

- Do not include implementation details in `feature.md`. What, not how.
- Do not assume acceptance criteria — derive them from the stated goal or ask explicitly.
- Do not mark this stage complete if any acceptance criterion is ambiguous.
- Do not proceed to architecture without user approval of `feature.md`.

## Review Checklist

- [ ] User goal is stated in outcome terms, not implementation terms.
- [ ] Every acceptance criterion is testable and unambiguous.
- [ ] At least 2 edge cases identified.
- [ ] At least 1 failure case identified with expected behavior.
- [ ] NFRs include at minimum: performance expectation, security consideration.
- [ ] All unknowns are listed, not silently resolved.
- [ ] `state.json` updated to `USER_REVIEW_FEATURE_PENDING`.

## Example Invocation

**User request**: "Add a user profile picture upload feature."

**PM Core produces `feature.md` containing**:
- Goal: "As a registered user, I can upload a profile picture so that other users recognize me."
- AC: "Images must be JPEG or PNG. Max size 5MB. Displayed at 128×128px. Old picture deleted when new one is uploaded."
- Edge cases: "User uploads a non-image file. User uploads a 0-byte file. User uploads an image larger than 5MB."
- Failure cases: "Storage service unavailable → 503 with retry message. Invalid file type → 422 with allowed types listed."
- NFR: "Upload must complete within 5s on a 10Mbps connection. Old image deleted within 60s of replacement."
- Unknown: "Which storage provider? (owner: architect to decide in solution.md)"
