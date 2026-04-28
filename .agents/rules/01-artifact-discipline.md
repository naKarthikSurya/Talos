# Rule 01: Artifact Discipline

Applies to all agents, all stages, all task types.

## Artifacts Are Canonical

- The `ai-control/` directory is the authoritative record of decisions, designs, and plans.
- Conversational output (chat responses) is ephemeral. Do not treat in-chat reasoning as a substitute for written artifacts.
- If a decision was made, it must be written to the appropriate artifact. If it is not written, it did not happen.

## Keep Artifacts Aligned With Reality

- When implementation diverges from `solution.md` or `implementation_steps.md`, the artifact must be updated immediately — not after the fact.
- Do not let artifacts drift. Stale artifacts are more dangerous than no artifacts.
- Every stage transition must result in a written artifact update or a written note in `execution_log.md` explaining why no update was needed.

## Artifact Ownership

- Each skill writes only its designated artifacts. Do not overwrite another skill's artifact without reading and reconciling its content.
- Artifact paths are defined in `state.json`. Do not write to ad-hoc filenames.

## Record Trade-offs and Decisions

- `solution.md` must contain the reasoning for the chosen approach, not just the approach itself.
- Alternatives considered and rejected must be documented with a short rationale.
- Do not document only the happy path. Risks, unknowns, and open questions belong in the artifact.

## Artifact Completeness

- A skill must not declare its stage complete if its output artifact is empty, a stub, or contains TODO placeholders.
- Artifacts must have all required sections filled. Sections that genuinely do not apply must say "N/A — <reason>" rather than being omitted.

## Execution Log

- Every state transition must append a timestamped entry to `ai-control/execution_log.md`.
- The entry must include: timestamp, from_stage, to_stage, active_skill, and a one-line summary of what was done.
