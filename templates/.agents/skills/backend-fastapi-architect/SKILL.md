---
name: backend-fastapi-architect
description: >
  Use when designing the technical architecture for a FastAPI backend feature.
  Defines router structure, Pydantic schema design, SQLAlchemy model design,
  dependency injection strategy, service layer boundaries, and async considerations.
  Produces solution.md. Activate after product-manager-core approves feature.md.
---

# FastAPI Architect Skill

## Goal

Produce a precise, FastAPI-idiomatic architectural design with clear router/service/schema separation,
correct async strategy, and dependency injection plan. Every structural decision justified.

## When to Use

- After `feature.md` is approved and stage is `ARCHITECT_DESIGN_PENDING`.
- Stack is `fastapi` (confirmed via `state.json`).

## Inputs Expected

- Approved `ai-control/feature.md`
- `ai-control/state.json` (stack must be `fastapi`)

## Artifacts Read

- `ai-control/feature.md`
- `ai-control/state.json`
- `ai-control/backend_contract.md` (if partially defined)

## Artifacts Written

- `ai-control/solution.md`

## Operating Procedure

1. **Confirm stage and stack**: `ARCHITECT_DESIGN_PENDING`, stack `fastapi`.
2. **Identify domain scope**: Does this belong in an existing router or does a new domain module need creating?
3. **Design the router structure**: Prefix, tags, and the endpoint signatures (path, method, response_model, status_code, dependencies).
4. **Design Pydantic schemas**: Create, Update, Response, and any nested schemas. Identify `model_config` settings. Note validation rules for each field.
5. **Design SQLAlchemy models**: Table name, columns with types/constraints, relationships, indexes, and whether soft-delete applies.
6. **Design the service layer**: Functions or class methods, their signatures, what they return, what exceptions they raise.
7. **Design dependency injection**: Which `Depends()` chains are needed for this feature (db session, current user, pagination, settings)?
8. **Identify async concerns**: Are there background tasks? External HTTP calls that must be async? Streaming responses?
9. **Identify migration needs**: New tables, new columns, altered constraints — Alembic migration plan.
10. **Document trade-offs**.
11. **Write `solution.md`**.
12. **Update state**: `USER_REVIEW_DESIGN_PENDING`. Log.
13. **Stop**: Await user design approval.

## Output: solution.md Structure

```markdown
# Architecture Design: <Feature Title>
**Stack**: FastAPI | **Date**: YYYY-MM-DD

## Overview

## Router Structure

### app/routers/<domain>.py
\`\`\`
router = APIRouter(prefix="/api/v1/<domain>", tags=["<Domain>"])

@router.post("/", response_model=XResponse, status_code=201)
async def create_x(body: CreateXRequest, db: AsyncSession = Depends(get_async_db), current_user: User = Depends(get_current_user)):
    ...

@router.get("/{x_id}", response_model=XResponse)
async def get_x(x_id: UUID, ...):
    ...
\`\`\`

## Pydantic Schema Design

### CreateXRequest
\`\`\`python
class CreateXRequest(BaseModel):
    model_config = ConfigDict(extra='forbid')
    name: str = Field(..., min_length=1, max_length=255, description="...")
    email: EmailStr
\`\`\`

### XResponse
\`\`\`python
class XResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: UUID
    name: str
    created_at: datetime
\`\`\`

## SQLAlchemy Model Design

\`\`\`python
class X(Base):
    __tablename__ = "x"
    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    created_at: Mapped[datetime] = mapped_column(server_default=func.now())
    # Relations, indexes...
\`\`\`

## Service Layer Design

### app/services/<domain>_service.py
| Function | Parameters | Returns | Raises |
| --- | --- | --- | --- |
| create_x(db, data) | AsyncSession, CreateXRequest | X | ValueError if duplicate |

## Dependency Injection Design
- db: `Depends(get_async_db)` — injected into all routes
- current_user: `Depends(get_current_user)` — for authenticated routes
- pagination: `Depends(PaginationParams)` — for list endpoints

## Alembic Migration Plan
- New table: `x` with columns [id, name, created_at]
- Command: `alembic revision --autogenerate -m "add_x_table"`

## Design Decisions and Trade-offs
| Decision | Chosen | Alternative | Rationale |
| --- | --- | --- | --- |
| ... | ... | ... | ... |

## Risks and Open Questions
- <item>
```

## Constraints

- Do not use vague descriptions like "create endpoints." Name each endpoint explicitly.
- Do not leave Pydantic schema fields untyped.
- Apply rule `11-backend-fastapi.md` and `00-engineering-baseline.md`.
- Do not proceed without user approval.

## Review Checklist

- [ ] Every endpoint has method, path, response_model, status_code, and dependencies named.
- [ ] All Pydantic schemas sketched with key fields and validation rules.
- [ ] SQLAlchemy model has types, constraints, and index strategy.
- [ ] Service functions listed with signatures and exception types.
- [ ] Alembic migration planned if schema changes.
- [ ] Design decisions documented.
- [ ] `state.json` updated to `USER_REVIEW_DESIGN_PENDING`.
