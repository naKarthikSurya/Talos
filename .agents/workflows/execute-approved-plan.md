# Workflow: Execute Approved Plan

## Objective

Perform the actual code modifications after manual approval.

## Steps

1. **Read State**: Read `ai-control/state.md`. Stop if `Current Stage` is not `USER_APPROVAL_PENDING`.
2. **Verify Approval**: Ensure that the user has explicitly provided approval (this is a manual gate).
3. **Implement**: Follow the steps in `ai-control/implementation_steps.md` and `ai-control/full_implementation.md`.
4. **Verification**: After coding, run relevant tests and validation tools.
5. **Document**: Create a `walkthrough.md` summarizing the changes.
6. **Update State**:
    - Set `Current Stage` to `COMPLETED`.
    - Append the action to the `Execution Log` with a timestamp.
7. **Report**: Notify the user that the implementation is finished.
