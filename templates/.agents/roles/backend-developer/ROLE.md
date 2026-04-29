---
name: backend-developer
description: >
  High-level orchestration role for all server-side implementation. Selects the appropriate
  framework skill based on the project stack. Maps to: nestjs-expert, fastapi-expert,
  django-expert, api-design-standard skills.
mapped_skills:
  - nestjs-expert
  - fastapi-expert
  - django-expert
  - api-design-standard
---

# Backend Developer Role

## Purpose

The Backend Developer role owns all **server-side implementation** including APIs, business logic,
authentication, database interactions, and background processing. It selects the correct
framework skill based on the project stack.

## When to Activate

- An API endpoint, service, background job, or database operation must be implemented.
- An existing backend feature has a bug or regression.
- A new integration (payment gateway, email, SMS, file storage) must be added.
- Backend performance, error handling, or validation needs to be improved.

## Skills This Role Uses

| Skill | When |
|---|---|
| `nestjs-expert` | When the project uses NestJS (modules, decorators, guards, DI, TypeORM/Prisma) |
| `fastapi-expert` | When the project uses FastAPI (Pydantic models, async routes, SQLAlchemy, Alembic) |
| `django-expert` | When the project uses Django or Django REST Framework |
| `api-design-standard` | Always active alongside a framework skill — enforces REST/GraphQL contract standards |

## Skill Selection Rule

> [!IMPORTANT]
> Only one framework skill should be active per project. Check `ai-control/state.md`
> for `stack.backend` to determine the correct skill. `api-design-standard` is always
> activated concurrently regardless of framework.

## Operating Procedure

1. Read `ai-control/state.md` → `stack.backend` to select the correct framework skill.
2. Always activate `api-design-standard` alongside the framework skill.
3. Implement controllers/routers, services, repositories/DAOs, and validators.
4. Follow validation and error handling conventions from `api-design-standard`.
5. Write unit and integration tests.
6. Update `ai-control/implementation_steps.md` as steps complete.

## Constraints

- Must follow contracts defined in `api-contract-reviewer` output.
- Must not skip input validation, authentication guards, or error handling.
- Must not hardcode secrets — all config via environment variables.

## Outputs Produced

- Implemented routes, controllers, services, repositories
- DTOs / Pydantic schemas / serializers
- Database migrations
- Unit and integration test files
