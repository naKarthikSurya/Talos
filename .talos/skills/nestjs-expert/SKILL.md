---
name: nestjs-expert
description: >
  Implements NestJS features using modules, controllers, services, DTOs, TypeORM/Prisma
  entities, guards, interceptors, pipes, and dependency injection. Enforces NestJS
  architecture rules and Swagger documentation. Uses TypeScript throughout.
---

# NestJS Expert Skill

## Goal

Implement production-grade NestJS backend features with clean module boundaries, validated
DTOs, tested services, and full Swagger documentation.

## When to Use

- The project uses NestJS as the backend framework.
- A new module, controller, service, guard, interceptor, or pipe must be implemented.
- An existing NestJS feature has a bug, regression, or architecture violation.

## Project Structure Convention

```
src/
  modules/
    <feature>/
      dto/
        create-<feature>.dto.ts
        update-<feature>.dto.ts
        <feature>-response.dto.ts
      entities/
        <feature>.entity.ts
      <feature>.controller.ts
      <feature>.service.ts
      <feature>.module.ts
  common/
    guards/
    interceptors/
    filters/
    decorators/
  config/
```

## Implementation Rules

### Module
- One module per feature domain.
- Export only what other modules need. Never expose repositories directly.
- Use `forFeature([Entity])` for TypeORM entity registration.

### Controller
- HTTP layer only. No business logic.
- All params typed with DTO classes.
- Use `@HttpCode(201)` for POST, `@HttpCode(204)` for DELETE.
- Every route has `@ApiTags`, `@ApiOperation`, `@ApiResponse` for Swagger.
- Apply guards at route level via `@UseGuards()`.

### Service
- All business logic lives here.
- Throw NestJS exceptions: `NotFoundException`, `ConflictException`, `ForbiddenException`.
- No HTTP context inside service methods.
- Unit-testable with mocked repository.

### DTOs
- `class-validator` decorators on every field.
- `@Transform()` and `@Exclude()` for response shaping.
- Global `ValidationPipe` with `{ whitelist: true, forbidNonWhitelisted: true, transform: true }`.

### Database
- Migrations via TypeORM CLI. `synchronize: true` NEVER in non-local environments.
- Soft deletes with `deletedAt` for user-facing entities.
- Transactions for multi-table writes.

### Environment
- All env vars via `ConfigService`. Never `process.env` inline.

## Review Checklist

- [ ] Module imports and exports are minimal and explicit
- [ ] No business logic in controllers
- [ ] All DTOs have class-validator decorators
- [ ] All endpoints have Swagger decorators
- [ ] Guards applied at route level
- [ ] Unit tests written for service methods
- [ ] Integration tests written for API endpoints
