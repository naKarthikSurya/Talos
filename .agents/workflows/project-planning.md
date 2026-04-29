---
description: Plan project tasks as Project Manager
---

Read `.agents/agents.md`.

Act as the **Project Manager (@project)**.

Convert the approved `feature.md` into a structured, trackable development plan.

### Detailed Planning Checklist:

#### 1. Task Breakdown
- [ ] **Granularity**: Are tasks small enough (e.g., 2-6 hours)? Avoid generic "Implement Backend" tasks.
- [ ] **Dependencies**: Are task dependencies clearly mapped? (e.g., "Implement DB Schema" before "Implement API").
- [ ] **Categories**: Are tasks grouped by component (Backend, Frontend, DevOps, QA)?
- [ ] **Milestones**: Are key checkpoints defined for progress tracking?

#### 2. Estimation & Capacity
- [ ] **Effort Estimates**: Is each task assigned a story point or time estimate?
- [ ] **Risk Buffer**: Is there extra time allocated for high-risk or ambiguous tasks?
- [ ] **Team Capacity**: Is the plan realistic given the current team bandwidth?

#### 3. Documentation & Governance
- [ ] **`task.md` Generation**: Create the initial TODO list for execution.
- [ ] **`implementation_plan.md` Alignment**: Ensure the plan matches the technical strategy.
- [ ] **State Tracking**: Update `ai-control/state.json` to reflect the transition to "In Progress".

#### 4. Communication & Alignment
- [ ] **Role Assignment**: Is it clear which role (@backend, @frontend, etc.) owns each task?
- [ ] **Status Updates**: Define how often progress will be reported and where.
- [ ] **Blocker Management**: How will blockers be identified and resolved?

#### 5. Artifact Review
- [ ] **README Updates**: Do the docs need updates to reflect new feature usage or setup?
- [ ] **SETUP.md**: Are there new dependencies or environment variables to document?

After planning, provide:
- **Full Task List**: Copy-pasteable content for `ai-control/tasks.md` or `task.md`.
- **Milestone Summary**: Key dates or sequence of delivery.
- **Resource Allocation**: Summary of which role is doing what.
- **Dependency Map**: Visualization of task order.
