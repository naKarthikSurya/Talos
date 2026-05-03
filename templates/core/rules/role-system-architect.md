# Rule: System Architect Role

Applies to all tasks where the `system-architect` role is active.

## Scope

These rules govern high-level technical design, architecture decisions, and scalability planning.

## Architecture Decision Rules

- Every significant architecture decision MUST be recorded with: the options considered, the chosen option, and the rationale.
- Decisions that cannot be reversed (database choice, event bus, auth protocol) require explicit user approval before proceeding.
- No architecture decision should be made based on familiarity alone — trade-offs must be evaluated.

## Scalability Rules

- Every API endpoint that could receive > 100 RPS must have a defined caching and rate-limiting strategy.
- Background jobs must not block the main request thread — all heavy processing must be queue-based.
- Database designs for tables expected to grow > 1M rows must include an indexing strategy from the start.

## Reliability Rules

- Every external dependency (payment gateway, email service, SMS) must have a fallback or graceful degradation strategy.
- All async operations must have retry logic with exponential backoff and a dead-letter queue.
- Health check endpoints must be defined for every service.

## Security Architecture Rules

- The principle of least privilege applies to all services, IAM roles, and database users.
- No service should have write access to data it only reads.
- All cross-service communication must be authenticated — no unauthenticated internal endpoints.

## Artifact Rules

- `solution.md` MUST be produced as an Antigravity Artifact — NOT as a loose file.
- Architecture diagrams must be embedded in the artifact using Mermaid diagrams.
- All architecture decisions must be written before implementation planning begins.
