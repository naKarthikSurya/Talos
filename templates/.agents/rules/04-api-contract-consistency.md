# Rule 04: API Contract Consistency

Applies when any task introduces, modifies, or consumes API endpoints. Enforced by `api-contract-reviewer`.

## Contracts Must Be Written First

- Before any endpoint implementation begins, the request schema, response schema, status codes, and validation constraints must be written to `ai-control/backend_contract.md`.
- If the task involves a UI consuming this API, `ai-control/frontend_contract.md` must also be written, specifying what the frontend expects.
- Implementation must match the written contract. If divergence occurs, update the contract first and get re-approval — do not silently implement a different contract.

## Breaking Changes Must Be Declared

- Any change to an existing endpoint's path, method, request shape, or response shape is a breaking change if any external consumer exists.
- Breaking changes must be declared in `backend_contract.md` with a migration note.
- Non-breaking additions (new optional fields, new endpoints) do not require a migration note but must still be documented.

## Schema Alignment

- The backend DTO/response model and the frontend TypeScript type or Zod schema for the same resource must be structurally identical.
- Field names, types, nullability, and optional/required status must match exactly between backend contract and frontend contract.
- Any mismatch between backend and frontend contracts must be treated as a bug — not a "minor difference."

## Versioning Awareness

- If the project uses API versioning (e.g., `/v1/`, `/v2/`), new contracts belong in the correct version namespace.
- Do not modify a versioned endpoint's behavior without creating a new version.

## Validation Consistency

- Validation rules (required fields, length limits, format constraints, enum values) must be consistent between backend validation and frontend form validation.
- If the backend rejects a value, the frontend must prevent the user from submitting it — not just display a server error.

## Documentation Standard

- Every endpoint in `backend_contract.md` must include: HTTP method, path, description, request body schema, response schema, status codes (success + error), and auth requirement.
- Do not leave endpoint documentation as "to be defined" during implementation. Stubs must be filled before code is written.
