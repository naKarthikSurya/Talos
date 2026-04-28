#!/usr/bin/env python3
"""
update_state.py
Safely updates ai-control/state.json fields and syncs ai-control/state.md.

Usage:
  python .agents/skills/state-manager/scripts/update_state.py --stage DEV_PLANNING_PENDING
  python .agents/skills/state-manager/scripts/update_state.py --skill backend-nestjs-developer
  python .agents/skills/state-manager/scripts/update_state.py --approve feature
  python .agents/skills/state-manager/scripts/update_state.py --gate tests_defined
  python .agents/skills/state-manager/scripts/update_state.py --log "Completed architect design"
"""

import argparse
import json
import os
import sys
from datetime import datetime, timezone
from pathlib import Path

STATE_FILE = Path("ai-control/state.json")
STATE_MD_FILE = Path("ai-control/state.md")
EXECUTION_LOG_FILE = Path("ai-control/execution_log.md")

VALID_STAGES = [
    "TASK_TRIAGE_PENDING",
    "PM_ANALYSIS_PENDING",
    "USER_REVIEW_FEATURE_PENDING",
    "ARCHITECT_DESIGN_PENDING",
    "USER_REVIEW_DESIGN_PENDING",
    "CONTRACT_REVIEW_PENDING",
    "TEST_STRATEGY_PENDING",
    "SECURITY_REVIEW_PENDING",
    "DEV_PLANNING_PENDING",
    "PM_VERIFICATION_PENDING",
    "TECH_LEAD_REVIEW_PENDING",
    "USER_APPROVAL_PENDING",
    "EXECUTION_PENDING",
    "GATE_BLOCKED",
    "COMPLETED",
]


def load_state():
    if not STATE_FILE.exists():
        print(f"ERROR: {STATE_FILE} not found.")
        sys.exit(1)
    with open(STATE_FILE, "r") as f:
        return json.load(f)


def save_state(state):
    with open(STATE_FILE, "w") as f:
        json.dump(state, f, indent=2)
        f.write("\n")


def sync_state_md(state):
    """Generate a human-readable state.md from state.json."""
    approvals = state.get("approvals", {})
    gates = state.get("quality_gates", {})
    artifacts = state.get("artifacts", {})

    def bool_icon(val):
        return "true" if val else "false"

    def artifact_status(path):
        if path and Path(path).exists() and Path(path).stat().st_size > 0:
            return "exists"
        return "missing"

    artifact_rows = "\n".join(
        f"| {key} | {path} | {artifact_status(path)} |"
        for key, path in artifacts.items()
    )

    timestamp = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")

    content = f"""# AI Control State

**Task ID**: {state.get('task_id', 'unset')}
**Task Title**: {state.get('task_title', 'unset')}
**Track**: {state.get('track', 'none')} | **Stack**: {state.get('stack', 'none')} | **Type**: {state.get('task_type', 'none')}
**Current Stage**: {state.get('current_stage', 'UNKNOWN')}
**Active Skill**: {state.get('active_skill', 'none')}

## Approvals

- Feature Definition: {bool_icon(approvals.get('feature'))}
- Design: {bool_icon(approvals.get('design'))}
- Execution: {bool_icon(approvals.get('execution'))}

## Quality Gates

- Tests Defined: {bool_icon(gates.get('tests_defined'))}
- Security Checked: {bool_icon(gates.get('security_checked'))}
- Contracts Checked: {bool_icon(gates.get('contracts_checked'))}

## Artifacts

| Artifact | File | Status |
| --- | --- | --- |
{artifact_rows}

_Last updated: {timestamp}_
"""

    with open(STATE_MD_FILE, "w") as f:
        f.write(content)


def append_log(message, from_stage=None, to_stage=None, skill=None):
    timestamp = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")

    if from_stage and to_stage:
        entry = f"[{timestamp}] TRANSITION | from: {from_stage} → to: {to_stage} | skill: {skill or 'unknown'} | {message}\n"
    else:
        entry = f"[{timestamp}] NOTE | skill: {skill or 'unknown'} | {message}\n"

    with open(EXECUTION_LOG_FILE, "a") as f:
        f.write(entry)

    print(f"Logged: {entry.strip()}")


def main():
    parser = argparse.ArgumentParser(description="Update ai-control/state.json safely.")
    parser.add_argument("--stage", help="Set current_stage to a new value")
    parser.add_argument("--skill", help="Set active_skill")
    parser.add_argument("--approve", choices=["feature", "design", "execution"], help="Mark an approval as true")
    parser.add_argument("--gate", choices=["tests_defined", "security_checked", "contracts_checked"], help="Mark a quality gate as true")
    parser.add_argument("--log", help="Append a message to execution_log.md without changing state")
    parser.add_argument("--task-id", help="Set task_id")
    parser.add_argument("--task-title", help="Set task_title")
    parser.add_argument("--track", choices=["backend", "frontend", "fullstack", "none"], help="Set track")
    parser.add_argument("--stack", help="Set stack (nestjs, fastapi, react, nextjs, angular, mixed)")
    parser.add_argument("--task-type", help="Set task_type (feature, bugfix, refactor, contract-change, fullstack)")

    args = parser.parse_args()
    state = load_state()
    old_stage = state.get("current_stage")
    changed = False

    if args.stage:
        if args.stage not in VALID_STAGES:
            print(f"ERROR: Invalid stage '{args.stage}'. Valid stages: {VALID_STAGES}")
            sys.exit(1)
        state["current_stage"] = args.stage
        changed = True
        print(f"Stage: {old_stage} → {args.stage}")

    if args.skill:
        state["active_skill"] = args.skill
        changed = True
        print(f"Active skill set to: {args.skill}")

    if args.approve:
        state["approvals"][args.approve] = True
        changed = True
        print(f"Approval set: approvals.{args.approve} = true")

    if args.gate:
        state["quality_gates"][args.gate] = True
        changed = True
        print(f"Gate set: quality_gates.{args.gate} = true")

    if args.task_id:
        state["task_id"] = args.task_id
        changed = True

    if args.task_title:
        state["task_title"] = args.task_title
        changed = True

    if args.track:
        state["track"] = args.track
        changed = True

    if args.stack:
        state["stack"] = args.stack
        changed = True

    if args.task_type:
        state["task_type"] = args.task_type
        changed = True

    if changed:
        save_state(state)
        sync_state_md(state)
        new_stage = state.get("current_stage")
        log_msg = args.log or f"State updated via update_state.py"
        append_log(log_msg, from_stage=old_stage if args.stage else None, to_stage=new_stage if args.stage else None, skill=args.skill or state.get("active_skill"))
        print(f"\nstate.json and state.md updated successfully.")
    elif args.log:
        append_log(args.log, skill=state.get("active_skill"))
    else:
        print("No changes specified. Use --help for usage.")
        sys.exit(0)


if __name__ == "__main__":
    main()
