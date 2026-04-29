# Workflow: Product Manager Role

## Objective

Transform a raw feature request into a formally approved `feature.md` Antigravity Artifact
with acceptance criteria, edge cases, NFRs, and identified risks.

## Active Rules

- `role-product-manager.md`

## Prerequisites

- Raw task description exists (from conversation, issue, or user request).
- `state.md` stage is `PM_ANALYSIS_PENDING`.

---

## Phase 1: Requirement Extraction

1. Activate skill: `requirement-analysis`
2. Parse the raw request into functional and non-functional requirements.
3. Identify all assumptions and open questions.

---

## Phase 2: MVP Scoping

1. Activate skill: `mvp-planning`
2. Categorize requirements into P0 (Must Have), P1 (Should Have), P2 (Nice to Have).
3. Define MVP scope (P0 only) with rough effort estimate.

---

## Phase 3: User Story Definition

1. Activate skill: `user-story-definition`
2. Write formal user stories with Given/When/Then acceptance criteria for all P0 requirements.
3. Write at least 1 edge case per story.
4. Define the Definition of Done for each story.

---

## Phase 4: Feature Artifact Production

> [!IMPORTANT]
> Write `feature.md` as an **Antigravity Artifact**:
> - **Type**: `other`
> - **Name**: `feature.md`
> - **RequestFeedback**: `true` (user must approve before proceeding)
> - **Summary**: "Feature definition for [feature name] — acceptance criteria, edge cases, NFRs, risks."

The artifact must include:
- Task Summary
- User Goal (As a... I want... So that...)
- Acceptance Criteria (testable, Given/When/Then)
- Edge Cases
- Failure Cases
- Non-Functional Requirements
- Unknowns / Open Questions
- Risks

Update `state.md`: 
- `Active Role`: `Product Manager`
- `feature.md` status: `REVIEW_PENDING`

**STOP** — Create the `feature.md` artifact and stop immediately. Do NOT move to any other phase or create another artifact until this one is approved.


---

## Gate

User approves `feature.md` artifact → Update `state.md` stage to `ARCHITECT_DESIGN_PENDING`.
