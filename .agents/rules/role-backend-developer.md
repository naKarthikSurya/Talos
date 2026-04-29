# Rule: Backend Developer Role

Applies to all tasks where the `backend-developer` role is active.

## Scope

These rules apply to all backend implementation regardless of framework (NestJS, FastAPI, Django).

## Framework Selection Rules

- The active backend framework is determined by `ai-control/state.json` → `stack.backend`.
- Only ONE framework skill may be active per project.
- `api-design-standard` skill is ALWAYS active alongside any framework skill.

## API Design Rules

- All endpoints follow the standard response shape: `{ success, data, message, meta }`.
- All error responses follow: `{ success: false, error: { code, message, details } }`.
- All list endpoints MUST be paginated. No endpoint returns unbounded lists.
- HTTP method and status code must match the API Design Standard — no creative use of 200 for everything.

## Input Validation Rules

- ALL incoming data must be validated before use. No exceptions.
- Validation errors must return 422 with field-level details — not 400 with a generic message.
- Never trust client-provided IDs for ownership — always verify server-side.

## Business Logic Rules

- All business logic lives in the service layer — never in controllers, guards, or middleware.
- Services must be unit-testable without HTTP context.
- Services must throw domain exceptions (`NotFoundException`, `ConflictException`) — never raw errors.

## Security Rules

- All environment variables accessed via config service — never `process.env` inline.
- No secrets in code, git history, or logs.
- All database operations use parameterized queries or ORM — never string interpolation.
- `synchronize: true` / `autogenerate` is PROHIBITED in any non-local environment.

## Database Rules

- Schema changes require migration files — never direct DB mutations.
- Multi-table write operations must use transactions.
- Soft deletes preferred for user-facing entities.

## Artifact Rules

- `implementation_steps.md` MUST be written as an Antigravity Artifact before execution begins.
- All API contracts must be documented in `backend_contract.md` Antigravity Artifact.
