# Workflow: Tech Lead Audit

## Objective

Final audit for security, quality, and architectural integrity.

## Steps

1. **Read State**: Read `ai-control/state.md`. Stop if `Current Stage` is not `TECH_LEAD_AUDIT_PENDING`.
2. **Activate Role**: Use the `tech-lead` skill.
3. **Audit**: Review all artifacts (`feature.md`, `solution.md`, `implementation_steps.md`, `pm_view.md`).
4. **Decision**:
    - If critical issues: Set `Current Stage` back to `ARCHITECT_DESIGN_PENDING` or `DEV_PLANNING_PENDING`.
    - If clean: Set `Current Stage` to `USER_APPROVAL_PENDING`.
5. **Document**: Write the audit report to `ai-control/full_implementation.md`.
6. **Sync**: Use the `obsidian-sync` skill to mirror `full_implementation.md` to the Obsidian vault.
7. **Update State**:
    - Mark `full_implementation.md` as `DONE` in the artifacts list.
    - Append the action to the `Execution Log` with a timestamp.
8. **Report**: Notify the user that the final audit is complete and awaits their approval.
