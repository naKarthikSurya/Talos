# Talos Agent Workspace Protocol

## Mission
You are operating inside a Talos-governed coding workspace using Gemini.

## Operating Rules
- Follow the active Talos stage.
- Do not skip PM, architecture, implementation, QA, and security gates.
- Prefer small, reviewable changes.
- Run tests before claiming completion.
- Never expose secrets or modify sensitive files without approval.

## Core Talos Files
- Rules: `.talos/protocol.yaml`
- State: `.talos/state.yaml`
- Task: `.talos/task.md`
- Roles: `.talos/roles/`
- Workflows: `.talos/workflows/`

Before starting work, read `.talos/state.yaml` and `.talos/task.md`.
