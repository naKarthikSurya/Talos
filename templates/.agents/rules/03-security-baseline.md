# Rule 03: Security Baseline

Applies to all agents at all stages. Non-negotiable.

## Input Validation

- All external inputs (HTTP request bodies, query params, path params, form data, file uploads, environment variables) must be validated before use.
- Validation must be schema-based (DTOs + class-validator for NestJS, Pydantic for FastAPI, Zod for TypeScript frontends). Do not hand-roll validation logic for structured data.
- Reject unknown or unexpected fields explicitly (`whitelist: true, forbidNonWhitelisted: true` in NestJS; `model_config = ConfigDict(extra='forbid')` in FastAPI Pydantic models).

## Authentication and Authorization

- Every protected route/endpoint must have explicit auth enforcement — guard, middleware, or dependency injection. Never rely on "assumed" protection from a parent route.
- Authorization checks must happen at the service layer, not only at the controller layer.
- Do not widen permissions for convenience. If a task requires elevated access, document the justification in `security_review.md`.

## Secret and Credential Handling

- No secrets, API keys, tokens, passwords, or connection strings may appear in source code, committed files, or log output.
- All secrets must be sourced from environment variables or a secret manager.
- `.env` files must never be committed. `.env.example` with placeholder values is acceptable.
- Log statements must never include user passwords, tokens, PII, or full request bodies that may contain sensitive fields.

## Common Vulnerability Prevention

- **SQL/NoSQL Injection**: Always use ORM methods or parameterized queries. Never concatenate user input into query strings.
- **XSS**: Never render raw user-controlled HTML. Sanitize or use framework-safe rendering.
- **SSRF**: Never make outbound HTTP requests to user-provided URLs without explicit domain allowlisting.
- **Mass Assignment**: Never directly map raw request bodies to entities/models. Use explicit DTO-to-entity mapping.
- **Sensitive Data Exposure**: Never return full entity objects that include internal fields (passwords, hashes, internal IDs) to clients. Use dedicated response DTOs or response models.

## Dependency and Configuration Security

- Do not disable framework security features (CORS wildcards in production, `trust proxy` without understanding the impact, `synchronize: true` in TypeORM production).
- New dependencies require a stated reason. Do not add packages to solve one-line problems.
- Any identified security risk must be documented in `security_review.md` — even if it is assessed as low risk.
