# Workflow: Product Manager Analysis

## Objective:
Analyze the requested feature and document requirements.

## Steps:
1.  **Read State**: Read `ai-control/state.md`. Stop if `Current Stage` is not `PM_ANALYSIS_PENDING`.
2.  **Activate Role**: Use the `product-manager` skill.
3.  **Analyze**: Define user goals, acceptance criteria, edge cases, and NFRs based on the user request.
4.  **Document**: Write the results to `ai-control/feature.md`.
5.  **Sync**: Use the `obsidian-sync` skill to mirror `feature.md` to the Obsidian vault.
6.  **Update State**:
    - Set `Current Stage` to `USER_REVIEW_FEATURE_PENDING`.
    - Mark `feature.md` as `DONE` in the artifacts list.
    - Append the action to the `Execution Log` with a timestamp.
7.  **Report**: Notify the user that requirements are ready for review.
