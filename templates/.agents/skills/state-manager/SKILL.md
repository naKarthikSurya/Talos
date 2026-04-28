---
name: state-manager
description: >
  Use when reading, validating, or updating workflow state. Handles all transitions in
  ai-control/state.json and syncs the human-readable ai-control/state.md summary.
  Must be invoked at the start of every workflow to verify the current stage and at
  the end of every stage to advance state safely.
---

# State Manager Skill

## Goal

Enforce deterministic, artifact-verified stage transitions. Prevent any skill from operating
out of sequence, and ensure `state.json` and `state.md` remain consistent canonical sources of truth.

## When to Use

- At the start of any workflow step, to verify the expected current stage.
- After a skill completes its deliverable, to advance to the next stage.
- When a gate check fails, to block progression and record why.
- When re-routing (e.g., PM sends back to planning due to mismatch).

## Artifacts Read

- `ai-control/state.json` — canonical machine-readable state.
- `ai-control/execution_log.md` — to append transition records.

## Artifacts Written

- `ai-control/state.json` — updated stage, approvals, quality gates.
- `ai-control/state.md` — human-readable summary synced from `state.json`.
- `ai-control/execution_log.md` — timestamped transition record appended.

## Operating Procedure

### Read and Validate State

1. Read `ai-control/state.json`.
2. Verify the JSON structure matches the expected schema (all required keys present).
3. Report the current stage, active skill, approval status, and quality gate status.
4. If the JSON is malformed, run `scripts/validate_state.py` to diagnose and report the issue. Do not proceed.

### Advance State

1. Confirm the current stage is the one expected before the transition.
2. Confirm the required artifact for the completed stage exists and is non-empty.
3. Update `state.json`:
   - Set `current_stage` to the next stage.
   - Set `active_skill` to the next skill or `"none"` if waiting for user input.
   - Update `approvals` or `quality_gates` if applicable.
4. Sync `state.md` from `state.json` using the format defined below.
5. Append to `execution_log.md`:
   ```
   [YYYY-MM-DDTHH:MM:SSZ] TRANSITION | from: <old_stage> → to: <new_stage> | skill: <skill_name> | <one-line summary>
   ```

### Gate Check

Before advancing to `EXECUTION_PENDING`, verify ALL of the following:
- `approvals.feature` is `true`
- `approvals.design` is `true`
- `approvals.execution` is `true`
- `quality_gates.tests_defined` is `true`
- `quality_gates.security_checked` is `true`
- `quality_gates.contracts_checked` is `true` (if API is involved)
- All required artifact files exist and are non-empty.

If any check fails: log the failure reason to `execution_log.md`, set `current_stage` to `GATE_BLOCKED`, and report to the user.

## state.md Sync Format

```markdown
# AI Control State

**Task ID**: <task_id>
**Task Title**: <task_title>
**Track**: <track> | **Stack**: <stack> | **Type**: <task_type>
**Current Stage**: <current_stage>
**Active Skill**: <active_skill>

## Approvals
- Feature Definition: <true/false>
- Design: <true/false>
- Execution: <true/false>

## Quality Gates
- Tests Defined: <true/false>
- Security Checked: <true/false>
- Contracts Checked: <true/false>

## Artifacts
| Artifact | File | Status |
| --- | --- | --- |
| feature | ai-control/feature.md | <exists/missing> |
| solution | ai-control/solution.md | <exists/missing> |
| ... | ... | ... |

_Last updated: <timestamp>_
```

## Scripts

Helper scripts are in `scripts/` relative to this skill directory:

- `validate_state.py` — validates `state.json` structure and reports missing or invalid fields.
- `update_state.py` — safely updates a specific field in `state.json` and syncs `state.md`.

Run via: `python .agents/skills/state-manager/scripts/validate_state.py`

## Constraints

- Never skip a stage by setting `current_stage` to a non-sequential value without a documented reason in `execution_log.md`.
- Never set `approvals.execution` to `true` without explicit user confirmation in the conversation.
- Never overwrite `execution_log.md` — append only.

## Review Checklist

- [ ] `state.json` is valid JSON with all required keys.
- [ ] Stage transition is sequential and justified.
- [ ] `state.md` reflects current `state.json` accurately.
- [ ] `execution_log.md` has a new entry for this transition.
- [ ] All gate checks passed before `EXECUTION_PENDING`.
