# Workflow: Developer Planning

## Objective:
Create a detailed implementation plan.

## Steps:
1.  **Read State**: Read `ai-control/state.md`. Stop if `Current Stage` is not `DEV_PLANNING_PENDING`.
2.  **Activate Role**: Use the `developer` skill.
3.  **Plan**: Read `ai-control/feature.md` and `ai-control/solution.md`. Detail the implementation steps.
4.  **Document**: Write the results to `ai-control/implementation_steps.md`.
5.  **Sync**: Use the `obsidian-sync` skill to mirror `implementation_steps.md` to the Obsidian vault.
6.  **Update State**:
    - Set `Current Stage` to `PM_VERIFICATION_PENDING`.
    - Mark `implementation_steps.md` as `DONE` in the artifacts list.
    - Append the action to the `Execution Log` with a timestamp.
7.  **Report**: Notify the user that implementation planning is complete.
