# Safety Gates Rule

This rule ensures that all agent actions follow the deterministic workflow defined in `ai-control/state.md`.

## Constraints:
- **State Check**: Before performing any task, you MUST read `ai-control/state.md` to verify the `Current Stage`.
- **Authorization**: You are only authorized to act if the `Current Stage` matches your assigned role's task.
- **No Shortcuts**: Never skip a required artifact or review step.
- **Code Execution Lock**: Codebase modifications are STRICTLY FORBIDDEN unless the `Current Stage` is `USER_APPROVAL_PENDING`.
- **Manual Gate**: If you reach a stage requiring manual review (e.g., `USER_REVIEW_FEATURE_PENDING`), you must stop and wait for user feedback.
- **Documentation Sync**: Every stage completion MUST be followed by an Obsidian sync to ensure documentation is persistent and searchable.

## Failure to follow these gates will result in an immediate rollback of the current session.
