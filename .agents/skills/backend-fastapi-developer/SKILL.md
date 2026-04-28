---
name: backend-fastapi-developer
description: >
  Use when converting an approved FastAPI architectural design into a detailed,
  ordered implementation plan. Produces implementation_steps.md with file-level
  specificity for routers, schemas, models, services, dependencies, and tests.
  Also executes the implementation when the execution gate is open.
---

# FastAPI Developer Skill

## Goal

Convert the approved FastAPI architecture into a precise, ordered implementation plan
that covers all files, test cases, and validation steps.

## When to Use

- Stage is `DEV_PLANNING_PENDING` (planning) or `EXECUTION_PENDING` (implementation).
- Stack is `fastapi`.
- `solution.md`, `test_strategy.md`, and `security_review.md` are all approved.

## Inputs Expected

- `ai-control/feature.md`, `ai-control/solution.md`, `ai-control/test_strategy.md`
- `ai-control/backend_contract.md`, `ai-control/security_review.md`

## Artifacts Written

- `ai-control/implementation_steps.md`
- Source code (during EXECUTION_PENDING)

## Operating Procedure — Planning Phase

1. **Confirm stage**: `DEV_PLANNING_PENDING`, stack `fastapi`.
2. **Read all input artifacts**. Flag any contradictions.
3. **Decompose into ordered steps**:
   a. Pydantic schemas (request + response)
   b. SQLAlchemy model
   c. Alembic migration
   d. Service functions
   e. Dependency injection functions (`Depends`)
   f. Router with endpoints
   g. Register router in `main.py`
   h. Unit tests (pytest for service functions)
   i. Integration/API tests (httpx AsyncClient)
4. **Write `implementation_steps.md`**.
5. **Update state**: `PM_VERIFICATION_PENDING`. Log.

## Output: implementation_steps.md Structure

```markdown
# Implementation Plan: <Feature Title>
**Stack**: FastAPI | **Stage**: DEV_PLANNING_PENDING

## Pre-Implementation Checklist
- [ ] solution.md approved
- [ ] test_strategy.md complete
- [ ] security_review.md cleared
- [ ] backend_contract.md finalized
- [ ] Alembic environment configured

## Implementation Steps

### Step 1: Pydantic Schemas
**File**: `app/schemas/<domain>.py`
**Action**: Implement CreateXRequest, UpdateXRequest, XResponse per solution.md.
- model_config = ConfigDict(extra='forbid') on input schemas
- model_config = ConfigDict(from_attributes=True) on response schema
- Field(...) with description and examples on all fields
**Validation**: `python -c "from app.schemas.<domain> import *"` — no import errors.

### Step 2: SQLAlchemy Model
**File**: `app/models/<domain>.py`
**Action**: Implement mapped class per solution.md model design.
- Use Mapped[type] with mapped_column() (SQLAlchemy 2.0 style)
- Add __tablename__, primary key, nullable constraints, indexes
**Validation**: `python -c "from app.models.<domain> import *"` — no errors.

### Step 3: Alembic Migration
**Command**: `alembic revision --autogenerate -m "add_<domain>_table"`
**Action**: Review generated migration SQL. Confirm it matches solution.md schema design.
**Validation**: `alembic upgrade head` on test DB — no errors.

### Step 4: Service Functions
**File**: `app/services/<domain>_service.py`
**Action**: Implement service functions per solution.md service design.
- All functions async
- Accept AsyncSession as first parameter
- Raise domain exceptions (ValueError, PermissionError) — not HTTPException
- Use ORM queries only (no raw SQL with user input)
**Validation**: `pytest tests/test_<domain>_service.py` (unit tests)

### Step 5: Dependencies
**File**: `app/dependencies/<domain>.py` (if new dependencies needed)
**Action**: Implement any feature-specific Depends functions.
**Validation**: Import check.

### Step 6: Router
**File**: `app/routers/<domain>.py`
**Action**: Implement endpoints per backend_contract.md.
- Every endpoint: response_model=, status_code=, summary=, tags=
- Depends(get_async_db), Depends(get_current_user) as required
- Call service functions — no business logic in handlers
- HTTPException for expected errors (translate from domain exceptions)
**Validation**: `uvicorn app.main:app --reload` — OpenAPI docs show all endpoints.

### Step 7: Register Router
**File**: `app/main.py`
**Action**: `app.include_router(domain_router)`.
**Validation**: `curl http://localhost:8000/openapi.json` — new paths appear.

### Step 8: Unit Tests (Service)
**File**: `tests/test_<domain>_service.py`
**Action**: Implement from test_strategy.md using pytest + async fixtures.
- Use in-memory SQLite or test DB fixture
- Cover: happy path, duplicate, not found, permission denied
**Validation**: `pytest tests/test_<domain>_service.py -v`

### Step 9: API Integration Tests
**File**: `tests/test_<domain>_api.py`
**Action**: Implement from test_strategy.md using httpx AsyncClient.
- POST/GET/PUT/DELETE happy paths
- Validation error (missing required field)
- Unauthorized (no token)
- Not found (invalid ID)
**Validation**: `pytest tests/test_<domain>_api.py -v`

### Step 10: Full Suite
**Validation**: `pytest --cov=app --cov-report=term-missing` — all tests pass.

## Rollout Considerations
- Run `alembic upgrade head` before deploying
- New env vars required: <list>
- Breaking changes: <none / describe>
```

## FastAPI Implementation Constraints

- All endpoint handlers `async def`.
- Business logic in service functions, not in route handlers.
- No `HTTPException` in service layer — only in router layer.
- `ConfigDict(extra='forbid')` on all request schemas.
- `response_model=` on every endpoint.
- No raw SQL with user input — ORM queries only.
- All new dependencies use `Depends()` — no inline instantiation.

## Review Checklist

- [ ] Every step names an exact file.
- [ ] Pydantic schemas match `backend_contract.md` field-for-field.
- [ ] Service functions listed with signatures matching `solution.md`.
- [ ] Security remediation items addressed.
- [ ] All test cases from `test_strategy.md` assigned to test files.
- [ ] Alembic migration step included.
- [ ] Rollout considerations documented.
