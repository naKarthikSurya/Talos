# Rule 10: Backend — NestJS

Applies to all NestJS development tasks.

## Module Architecture

- Every feature is a self-contained module: `<feature>.module.ts`, `<feature>.controller.ts`, `<feature>.service.ts`, DTOs, and entity/schema.
- `AppModule` imports only feature modules and global infrastructure modules. No business logic at the app level.
- Cross-module dependencies must be exported from their owning module and imported explicitly — never accessed via circular dependency.
- Use `forRoot()` / `forFeature()` for database, config, and queue modules.

## Controller Discipline

- Controllers are HTTP-layer translators only. No business logic, no direct repository access, no complex conditionals.
- All route parameters must be typed with DTOs or primitive types. No untyped `body: any` parameters.
- Use `@HttpCode()` explicitly for non-200 success responses (201 for creation, 204 for delete).
- Every endpoint must have `@ApiTags()`, `@ApiOperation()`, and `@ApiResponse()` decorators for Swagger.
- Guards (`@UseGuards()`) must be applied at the route level, not inside handler logic.

## Service Discipline

- Services own all business logic, data access, and external integrations.
- Services must be independently unit-testable — no HTTP context (no `Request`, no `Response`) inside service methods.
- Throw NestJS domain exceptions (`NotFoundException`, `ConflictException`, `ForbiddenException`) — do not throw raw `Error` or HTTP-specific errors.
- Use `@InjectRepository()` or `@InjectEntityManager()` for TypeORM, or `@Inject(PrismaService)` for Prisma — never instantiate repositories manually.

## DTO and Validation Discipline

- Every request body has a dedicated Create DTO and Update DTO. Response payloads have dedicated response DTOs or transformed entities.
- All DTO properties have `class-validator` decorators. Use `@IsNotEmpty()`, `@IsString()`, `@IsEmail()`, `@IsUUID()`, `@IsEnum()`, `@IsOptional()`, etc.
- Enable global `ValidationPipe` with `{ whitelist: true, forbidNonWhitelisted: true, transform: true }`.
- Use `@Transform()` and `@Exclude()` from `class-transformer` to shape response objects — never return raw entity objects.

## Exception Handling

- A global `HttpExceptionFilter` must format all exception responses consistently.
- Never expose stack traces, internal error messages, or database error details to API clients.
- Use a custom exception hierarchy for domain errors where the codebase warrants it.

## Configuration and Dependency Injection

- All environment variables accessed via `ConfigService` — never `process.env` inline in code.
- Validate env schema at startup with `Joi` or a class-based `ConfigModule` validator.
- Avoid circular provider dependencies. If two services need each other, extract the shared logic into a third service.

## Database

- Migrations are version-controlled with TypeORM CLI or Prisma Migrate. `synchronize: true` is prohibited in any non-local environment.
- Soft deletes (`deletedAt`) preferred for user-facing entities where audit trail matters.
- Use database transactions for any operation that touches more than one table/collection.
