# Workflow 90: Execution Gate

## Objective

Perform a final checkpoint before any code is written or modified. If any required condition
is not satisfied, block execution and report the specific blocker. Do not proceed unless
all conditions are green.

## When to Use

- Called by any workflow just before entering `EXECUTION_PENDING`.
- Can also be invoked manually to check readiness without proceeding.

---

## Gate Checks

### Gate 1: State File Integrity

1. Read `ai-control/state.json`.
2. Run `validate_state.py` logic:
   - JSON is valid.
   - All required keys present.
   - `current_stage` is a valid value.
3. **BLOCK** if state file is invalid or missing.

### Gate 2: Required Artifacts Exist and Are Non-Empty

For the task's track and type, verify these files exist with content:

| Artifact | Required For |
| --- | --- |
| `ai-control/feature.md` | All tasks |
| `ai-control/solution.md` | All tasks |
| `ai-control/implementation_steps.md` | All tasks |
| `ai-control/test_strategy.md` | All tasks |
| `ai-control/security_review.md` | All tasks |
| `ai-control/backend_contract.md` | Backend or fullstack tasks |
| `ai-control/frontend_contract.md` | Frontend or fullstack tasks |
| `ai-control/pm_review.md` | All tasks |
| `ai-control/tech_lead_review.md` | All tasks |

**BLOCK** if any required artifact is missing or empty.

### Gate 3: Approval Flags

Check `state.json`:
- `approvals.feature` must be `true`
- `approvals.design` must be `true`
- `approvals.execution` must be `true`

**BLOCK** if any approval flag is `false`.

The `approvals.execution` flag may ONLY be set to `true` by explicit user confirmation
in the conversation. The state-manager skill must not set this automatically.

### Gate 4: Quality Gates

Check `state.json`:
- `quality_gates.tests_defined` must be `true`
- `quality_gates.security_checked` must be `true`
- `quality_gates.contracts_checked` must be `true` (if track is backend or fullstack)

**BLOCK** if any required quality gate is `false`.

### Gate 5: Security Blockers

1. Read `ai-control/security_review.md`.
2. Check for any unresolved CRITICAL or HIGH issues.
3. **BLOCK** if any CRITICAL or HIGH security issue is unresolved.

### Gate 6: Implementation Steps Quality

1. Read `ai-control/implementation_steps.md`.
2. Confirm it contains:
   - Ordered, numbered steps.
   - File names specified in each step.
   - A validation command for each step.
   - A full test suite run as the final step.
3. **BLOCK** if `implementation_steps.md` is a stub or lacks file-level specificity.

---

## Gate Report

After all checks, report to the user:

```
EXECUTION GATE REPORT
=====================
State File         : PASS / FAIL
Artifacts          : PASS / FAIL — <missing files if any>
Feature Approval   : PASS / FAIL
Design Approval    : PASS / FAIL
Execution Approval : PASS / FAIL
Tests Defined      : PASS / FAIL
Security Checked   : PASS / FAIL
Contracts Checked  : PASS / FAIL
Security Blockers  : PASS / FAIL — <issues if any>
Implementation Steps Quality : PASS / FAIL

OVERALL: CLEARED / BLOCKED
Reason (if blocked): <specific blocker>
```

---

## On CLEARED

1. Set `state.json` `current_stage = EXECUTION_PENDING`.
2. Append to `execution_log.md`: `[timestamp] GATE_CLEARED | All checks passed. Execution authorized.`
3. Report: "Execution gate cleared. Proceeding with implementation."

## On BLOCKED

1. Set `state.json` `current_stage = GATE_BLOCKED`.
2. Append to `execution_log.md`: `[timestamp] GATE_BLOCKED | Reason: <specific blocker>`
3. Report the exact blocker to the user.
4. Do NOT proceed with any code changes until the blocker is resolved and the gate is re-run.
