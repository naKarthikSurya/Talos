#!/usr/bin/env python3
"""
validate_state.py
Validates the structure and content of ai-control/state.json.
Run from the project root: python .agents/skills/state-manager/scripts/validate_state.py
"""

import json
import os
import sys
from pathlib import Path

STATE_FILE = Path("ai-control/state.json")

REQUIRED_TOP_LEVEL_KEYS = [
    "task_id",
    "task_title",
    "track",
    "stack",
    "task_type",
    "current_stage",
    "active_skill",
    "approvals",
    "quality_gates",
    "artifacts",
]

REQUIRED_APPROVAL_KEYS = ["feature", "design", "execution"]
REQUIRED_GATE_KEYS = ["tests_defined", "security_checked", "contracts_checked"]
REQUIRED_ARTIFACT_KEYS = [
    "feature",
    "solution",
    "implementation_steps",
    "test_strategy",
    "security_review",
    "backend_contract",
    "frontend_contract",
    "pm_review",
    "tech_lead_review",
    "execution_log",
]

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

VALID_TRACKS = ["backend", "frontend", "fullstack"]
VALID_STACKS = ["nestjs", "fastapi", "react", "nextjs", "angular", "mixed", "none"]
VALID_TASK_TYPES = ["feature", "bugfix", "refactor", "contract-change", "fullstack"]


def load_state():
    if not STATE_FILE.exists():
        print(f"ERROR: State file not found at '{STATE_FILE}'")
        print("Run 'npx antigravity-squad init' to initialize the project.")
        sys.exit(1)

    try:
        with open(STATE_FILE, "r") as f:
            return json.load(f)
    except json.JSONDecodeError as e:
        print(f"ERROR: state.json is not valid JSON: {e}")
        sys.exit(1)


def validate_structure(state):
    errors = []
    warnings = []

    # Top-level keys
    for key in REQUIRED_TOP_LEVEL_KEYS:
        if key not in state:
            errors.append(f"Missing required key: '{key}'")

    if errors:
        return errors, warnings

    # Approvals
    for key in REQUIRED_APPROVAL_KEYS:
        if key not in state.get("approvals", {}):
            errors.append(f"Missing approval key: 'approvals.{key}'")
        elif not isinstance(state["approvals"][key], bool):
            errors.append(f"'approvals.{key}' must be a boolean, got: {type(state['approvals'][key]).__name__}")

    # Quality gates
    for key in REQUIRED_GATE_KEYS:
        if key not in state.get("quality_gates", {}):
            errors.append(f"Missing quality gate key: 'quality_gates.{key}'")
        elif not isinstance(state["quality_gates"][key], bool):
            errors.append(f"'quality_gates.{key}' must be a boolean")

    # Artifacts
    for key in REQUIRED_ARTIFACT_KEYS:
        if key not in state.get("artifacts", {}):
            errors.append(f"Missing artifact key: 'artifacts.{key}'")

    # Enum validations
    if state.get("current_stage") not in VALID_STAGES:
        errors.append(f"Invalid current_stage: '{state.get('current_stage')}'. Valid: {VALID_STAGES}")

    if state.get("track") not in VALID_TRACKS + ["none", ""]:
        warnings.append(f"Unexpected track value: '{state.get('track')}'. Expected one of: {VALID_TRACKS}")

    if state.get("stack") not in VALID_STACKS:
        warnings.append(f"Unexpected stack value: '{state.get('stack')}'. Expected one of: {VALID_STACKS}")

    if state.get("task_type") not in VALID_TASK_TYPES + ["none", ""]:
        warnings.append(f"Unexpected task_type: '{state.get('task_type')}'. Expected one of: {VALID_TASK_TYPES}")

    # Check artifact file existence
    for artifact_key, artifact_path in state.get("artifacts", {}).items():
        if artifact_path and not Path(artifact_path).exists():
            warnings.append(f"Artifact file missing: '{artifact_path}' (key: {artifact_key})")

    return errors, warnings


def check_gate_readiness(state):
    """Check if all gates are satisfied for EXECUTION_PENDING."""
    issues = []
    approvals = state.get("approvals", {})
    gates = state.get("quality_gates", {})

    if not approvals.get("feature"):
        issues.append("approvals.feature is not true — feature definition not approved")
    if not approvals.get("design"):
        issues.append("approvals.design is not true — design not approved")
    if not approvals.get("execution"):
        issues.append("approvals.execution is not true — execution not approved by user")
    if not gates.get("tests_defined"):
        issues.append("quality_gates.tests_defined is not true — test strategy not defined")
    if not gates.get("security_checked"):
        issues.append("quality_gates.security_checked is not true — security review not done")

    return issues


def main():
    print(f"Validating {STATE_FILE}...\n")
    state = load_state()
    errors, warnings = validate_structure(state)

    if errors:
        print("ERRORS (must fix):")
        for e in errors:
            print(f"  [ERROR] {e}")
    else:
        print("Structure: OK")

    if warnings:
        print("\nWARNINGS:")
        for w in warnings:
            print(f"  [WARN]  {w}")

    print(f"\nCurrent Stage : {state.get('current_stage', 'UNKNOWN')}")
    print(f"Active Skill  : {state.get('active_skill', 'none')}")
    print(f"Track / Stack : {state.get('track', '?')} / {state.get('stack', '?')}")
    print(f"Task Type     : {state.get('task_type', '?')}")

    if state.get("current_stage") == "USER_APPROVAL_PENDING":
        print("\nGate Readiness Check (for EXECUTION_PENDING):")
        gate_issues = check_gate_readiness(state)
        if gate_issues:
            for issue in gate_issues:
                print(f"  [BLOCKED] {issue}")
        else:
            print("  All gates satisfied. Execution may proceed.")

    if errors:
        sys.exit(1)
    else:
        print("\nValidation passed.")
        sys.exit(0)


if __name__ == "__main__":
    main()
