# Workflow: System Architect Role

## Objective

Produce an approved `solution.md` Antigravity Artifact covering service design,
scalability strategy, and security model before any implementation begins.

## Active Rules

- `role-system-architect.md`

## Prerequisites

- `feature.md` Antigravity Artifact is approved.
- `state.md` stage is `ARCHITECT_DESIGN_PENDING`.

---

## Phase 1: Service Boundary Design

1. Activate skill: `distributed-systems-design`
2. Define service boundaries and data ownership.
3. Define communication patterns (REST, events, queues) for each interaction.
4. Define failure isolation strategy for external dependencies.
5. Produce architecture diagrams using Mermaid (sequence, component).

---

## Phase 2: Scalability Planning

1. Activate skill: `scalability-architect`
2. Identify the primary bottleneck for the feature's expected load.
3. Define caching strategy: what, TTL, invalidation.
4. Define rate limiting rules for public-facing endpoints.
5. Define async processing scope.

---

## Phase 3: Security Architecture

1. Activate skill: `security-architecture`
2. Draw the trust boundary diagram.
3. Apply STRIDE threat model to each new component.
4. Define mitigations for identified threats.
5. Define secrets management and encryption strategy.

---

## Phase 4: API Contract (if endpoints are involved)

> [!IMPORTANT]
> Write `backend_contract.md` as an **Antigravity Artifact**:
> - **Type**: `other`
> - **Name**: `backend_contract.md`
> - **RequestFeedback**: `false`
> - **Summary**: "API contract for [feature name] — endpoints, request/response shapes, error codes."

---

## Phase 5: Solution Artifact Production

> [!IMPORTANT]
> Write `solution.md` as an **Antigravity Artifact**:
> - **Type**: `implementation_plan`
> - **Name**: `solution.md`
> - **RequestFeedback**: `true` (user must approve before proceeding)
> - **Summary**: "Architecture solution for [feature name] — service design, scalability plan, security model, open risks."

The artifact must include:
- Architecture decisions with rationale (options considered → chosen → why)
- Mermaid diagrams (component, sequence)
- Scalability plan (caching, rate limiting, async)
- Security model (trust boundaries, STRIDE mitigations)
- Open risks

Update `state.md`: set `solution.md` status to `REVIEW_PENDING`.

**STOP** — Present artifact to user. Do NOT proceed until explicitly approved.

---

## Gate

User approves `solution.md` artifact → Update `state.md` stage to `DEV_PLANNING_PENDING`.
