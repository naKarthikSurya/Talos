# Workflow: PM Verification

## Objective:
Verify that the implementation plan matches the original requirements.

## Steps:
1.  **Read State**: Read `ai-control/state.md`. Stop if `Current Stage` is not `PM_VERIFICATION_PENDING`.
2.  **Activate Role**: Use the `product-manager` skill.
3.  **Verify**: Compare `ai-control/feature.md` with `ai-control/implementation_steps.md`.
4.  **Decision**:
    - If mismatch: Set `Current Stage` to `DEV_PLANNING_PENDING` and document the gaps.
    - If match:
        - Write verification results to `ai-control/pm_view.md`.
        - Set `Current Stage` to `TECH_LEAD_AUDIT_PENDING`.
5.  **Sync**: Use the `obsidian-sync` skill to mirror `pm_view.md` to the Obsidian vault.
6.  **Update State**:
    - Mark `pm_view.md` as `DONE` in the artifacts list.
    - Append the action to the `Execution Log` with a timestamp.
7.  **Report**: Notify the user of the verification result.
