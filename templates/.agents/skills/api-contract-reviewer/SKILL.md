---
name: api-contract-reviewer
description: >
  Use when a task introduces, modifies, or depends on API endpoints shared between a
  backend and frontend (or external consumers). Defines and validates request/response
  schemas, identifies breaking changes, aligns DTO shapes with frontend type expectations,
  and activates quality_gates.contracts_checked in state.json.
---

# API Contract Reviewer Skill

## Goal

Ensure that the backend API contract and the frontend consumption contract are explicitly defined,
structurally aligned, and free of breaking changes before implementation begins. Prevent
"backend says one thing, frontend expects another" integration bugs.

## When to Use

- When a task introduces new API endpoints.
- When a task modifies an existing endpoint's request shape, response shape, path, method, or status codes.
- When a frontend feature consumes or depends on a backend API.
- When `ai-control/backend_contract.md` or `ai-control/frontend_contract.md` is missing or outdated.

## Inputs Expected

- `ai-control/feature.md` — to understand what data flows are required.
- `ai-control/solution.md` — to understand the proposed API structure.
- `ai-control/state.json` — to identify track and stack.

## Artifacts Read

- `ai-control/feature.md`
- `ai-control/solution.md`
- `ai-control/state.json`

## Artifacts Written

- `ai-control/backend_contract.md`
- `ai-control/frontend_contract.md` (if track is frontend or fullstack)
- Updates `quality_gates.contracts_checked = true` in `state.json` when complete.

## Operating Procedure

1. **Read state and solution**: Identify all new or modified API endpoints in `solution.md`.
2. **For each endpoint — define the backend contract**:
   - HTTP method and path.
   - Authentication requirement.
   - Request body schema (field name, type, required/optional, validation constraints).
   - Query/path parameters.
   - Response body schema for success (include all fields the client receives).
   - Status codes: success + all expected error codes with their response bodies.
   - Breaking change assessment: does this change any existing endpoint a consumer depends on?
3. **For each endpoint — define the frontend contract** (if applicable):
   - Which page, component, or hook consumes this endpoint.
   - The TypeScript type or Zod schema the frontend expects.
   - UI states: loading, success, error, empty — what data drives each.
   - Form fields and their mapping to request body fields.
4. **Alignment check**: Verify that every field in the backend response exists with the same name and type in the frontend type. Flag any mismatch.
5. **Breaking change check**: If any existing endpoint is modified, document what changed and who the affected consumers are.
6. **Write artifacts**: Write `backend_contract.md` and `frontend_contract.md`.
7. **Update state**: Set `quality_gates.contracts_checked = true`. Log to `execution_log.md`.

## Output: backend_contract.md Structure

```markdown
# Backend API Contract: <Feature Title>

## Endpoints

### POST /api/v1/<resource>

**Description**: ...
**Authentication**: Required (Bearer JWT) / None
**Authorization**: <roles required>

**Request Body**:
| Field | Type | Required | Validation | Description |
| --- | --- | --- | --- | --- |
| field_name | string | yes | minLength(1), maxLength(255) | ... |

**Response: 201 Created**:
| Field | Type | Always Present | Description |
| --- | --- | --- | --- |
| id | uuid | yes | ... |

**Error Responses**:
| Status | Code | Description |
| --- | --- | --- |
| 400 | VALIDATION_ERROR | Request body failed validation |
| 401 | UNAUTHORIZED | Missing or invalid token |
| 409 | CONFLICT | Resource already exists |

**Breaking Change**: None / Yes — <description of what changed and migration path>
```

## Output: frontend_contract.md Structure

```markdown
# Frontend Contract: <Feature Title>

## Pages / Routes Affected
- /path/to/page — <description of change>

## API Consumption

### POST /api/v1/<resource>
**Consumed by**: <ComponentName> via <useCreateResource hook / direct fetch>

**TypeScript Request Type**:
\`\`\`typescript
interface CreateResourceRequest {
  fieldName: string;
}
\`\`\`

**TypeScript Response Type**:
\`\`\`typescript
interface ResourceResponse {
  id: string;
  fieldName: string;
  createdAt: string;
}
\`\`\`

## UI States
| State | Condition | UI Behavior |
| --- | --- | --- |
| loading | Request in flight | Skeleton / spinner shown |
| success | 2xx response | Display resource |
| error | 4xx/5xx | Error message + retry option |
| empty | 200 with empty array | Empty state illustration |

## Form → Request Field Mapping
| Form Field | Request Field | Validation |
| --- | --- | --- |
| email input | email | required, valid email format |
```

## Constraints

- Do not leave any field in the response schema as "TBD." Every field returned by the endpoint must be documented.
- Do not mark contracts complete if the frontend and backend types for the same resource have field name or type mismatches.
- Do not omit error response schemas. Frontend must know what shape an error response has.
- Breaking changes must be explicitly declared — not silently introduced.

## Review Checklist

- [ ] Every new/modified endpoint has a complete entry in `backend_contract.md`.
- [ ] Request schema: all fields with types, required/optional, and validation constraints.
- [ ] Response schema: all fields the client receives, including error response shapes.
- [ ] Frontend contract: TypeScript types match backend response schema field-for-field.
- [ ] UI states defined for all data-fetching components.
- [ ] Breaking changes declared or confirmed absent.
- [ ] `quality_gates.contracts_checked` set to `true` in `state.json`.
