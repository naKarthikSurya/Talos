# Workflow: Documentation

## Objective

Generate, update, or audit technical documentation for a project or feature.

## Prerequisites

- `ai-control/state.md` at `DOCUMENTATION_PENDING` (or explicitly invoked by the user).
- Rules in effect: `documentation-standards.md`, `safety-gates.md`.

## Trigger Conditions

This workflow is invoked when:

- A new feature is completed and needs documentation.
- Existing documentation is outdated and needs a refresh.
- A new project or repo is being set up and needs its README and onboarding docs.
- An ADR needs to be written for a recent architectural decision.

## Steps

### Phase 1: Discovery

1. **Read State**: Read `ai-control/state.md`. If at `DOCUMENTATION_PENDING`, proceed.
2. **Activate Role**: Use the `documentation-writer` skill.
3. **Scope**: Determine what needs to be documented. Ask if not specified:
    - README update?
    - API documentation?
    - ADR?
    - Onboarding guide?
    - Inline code comments?
    - CHANGELOG update?
4. **Audit**: Read existing documentation. Identify gaps, outdated sections, broken examples.
5. **Document Findings**: Write a brief audit to `ai-control/doc-audit.md`.
6. **Update State**: Set to `DOCUMENTATION_DRAFTING`. Append to Execution Log.

### Phase 2: Drafting

7. **Apply Rule**: Follow `documentation-standards.md` for all written content.
8. **Write**: Draft the documentation in the appropriate location:
    - `README.md` at project root
    - `docs/adr/ADR-NNN-title.md` for ADRs
    - `docs/api/` for API references
    - `docs/guides/` for onboarding or operational guides
    - Inline comments in source files for complex logic
9. **Validate**:
    - All code examples are tested and accurate.
    - Environment variable table is complete.
    - No broken links.
    - No placeholder text.
10. **Update State**: Set to `DOCUMENTATION_REVIEW_PENDING`. Append to Execution Log.
11. **STOP**: Notify user to review the drafted documentation. Await feedback.

### Phase 3: Revision and Finalization

12. **Revise**: Incorporate user feedback.
13. **Final Check**: Run the documentation quality checklist from `documentation-standards.md`.
14. **Update State**: Set to `DOCUMENTATION_COMPLETE`. Append to Execution Log.
15. **Sync**: Use `obsidian-sync` skill to mirror docs to the Obsidian vault.
16. **Report**: Notify the user that documentation is complete. List files created or updated.
