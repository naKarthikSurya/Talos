# Rule 11: Backend — FastAPI

Applies to all FastAPI development tasks.

## Application and Router Structure

- Organize by feature domain under `app/routers/` — one router per domain (`users.py`, `orders.py`).
- `main.py` registers routers and mounts global middleware only. No endpoint definitions, no business logic.
- Every router has explicit `prefix` and `tags` parameters for clean OpenAPI grouping.
- Never define routes directly on the `app` instance except for health checks and root metadata.

## Endpoint Discipline

- All endpoint handler functions must be `async def` unless there is a specific, documented reason for synchronous execution.
- Every endpoint must specify: `response_model=`, `status_code=`, `summary=`, and `tags=`.
- Never return raw `dict` objects. Always return a Pydantic model or `Response`/`JSONResponse`.
- Path parameters are typed and validated via function signature type hints. Never use `str` when a more specific type applies.

## Pydantic Schema Discipline

- Define separate schemas for Create, Update, and Response use cases for every resource. Never reuse a single schema for all three.
- Response schemas must exclude sensitive fields (passwords, hashes, internal IDs not meant for clients) by design — not by post-hoc filtering.
- Use `Field(...)` with `description=` and `examples=` for all fields to maximize OpenAPI documentation quality.
- Use `model_config = ConfigDict(extra='forbid')` on input schemas to reject undeclared fields.

## Dependency Injection

- Database sessions via `Depends(get_async_db)` — never created inline.
- Current user via `Depends(get_current_user)` — never decode JWTs inline in route handlers.
- Pagination, filtering, and sorting parameters via typed `Depends` classes — not raw query params in every endpoint.
- Keep `Depends` chains shallow. Deep chains of 4+ levels indicate the need for redesign.

## Service Layer

- All business logic in service functions or service classes under `app/services/`. Route handlers call services — they do not contain logic.
- Services raise domain exceptions (`ValueError`, `PermissionError`, custom exceptions) — not `HTTPException`. The router layer translates domain exceptions to HTTP responses.
- Services are pure Python — no `Request` or `Response` object access inside service functions.

## Database (SQLAlchemy Async)

- Use `AsyncSession` and `async with` session context management throughout.
- Never construct queries with string interpolation or `text()` with user input. Use ORM query methods or fully parameterized `text()` calls.
- Use `selectinload()` or `joinedload()` explicitly to avoid N+1 queries. Never rely on lazy loading in async contexts.
- Alembic manages all schema changes. Never `Base.metadata.create_all()` outside of local development or test setup.

## Configuration

- All settings defined in a `pydantic-settings` `BaseSettings` subclass.
- Settings loaded once at module import time and injected via `Depends(get_settings)` or module-level singleton. Never read `.env` files manually.
- Provide `.env.example` with all required keys and their expected format.
