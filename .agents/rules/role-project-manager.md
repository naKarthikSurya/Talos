# Rule: Project Manager Role

Applies to all tasks where the `project-manager` role is active.

## Scope

These rules govern sprint planning, backlog management, documentation, and task estimation.

## Task Planning Rules

- No story enters a sprint without: a user story statement, acceptance criteria, and a story point estimate.
- Stories larger than 8 story points MUST be broken down before sprint commitment.
- All sub-tasks must be scoped to < 1 day of work to enable daily progress tracking.

## Estimation Rules

- Estimates must be based on sub-task decomposition — never gut feel alone.
- All third-party integrations receive a 2x risk multiplier on base estimates.
- All estimates must include testing and documentation time, not just development.

## Documentation Rules

- Documentation is NOT optional. Every shipped feature must update: README, API docs, or setup guide.
- Documentation must be written using Antigravity Artifacts — NOT stored as loose markdown files outside the artifact system.
- The README must always allow a new developer to run the project locally without verbal assistance.

## Agile Process Rules

- Sprint retros must produce at least one actionable item with an owner and due date.
- Blockers must be surfaced in writing (not just verbally) so they are tracked.
- Backlog grooming sessions must result in all stories having complete acceptance criteria before the next sprint.

## Artifact Rules

- Sprint plans, task breakdowns, and milestone documents MUST be created as Antigravity Artifacts.
- Documentation artifacts (README, API docs, architecture docs) must be linked from the artifact index.
