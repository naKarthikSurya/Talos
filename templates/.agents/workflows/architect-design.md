# Workflow: Architect Design

## Objective:
Design a technical solution for the approved requirements.

## Steps:
1.  **Read State**: Read `ai-control/state.md`. Stop if `Current Stage` is not `ARCHITECT_DESIGN_PENDING`.
2.  **Activate Role**: Use the `architect` skill.
3.  **Design**: Read `ai-control/feature.md` and design the technical solution, data flow, and service boundaries.
4.  **Document**: Write the results to `ai-control/solution.md`.
5.  **Sync**: Use the `obsidian-sync` skill to mirror `solution.md` to the Obsidian vault.
6.  **Update State**:
    - Set `Current Stage` to `DEV_PLANNING_PENDING`.
    - Mark `solution.md` as `DONE` in the artifacts list.
    - Append the action to the `Execution Log` with a timestamp.
7.  **Report**: Notify the user that the architectural design is complete.
