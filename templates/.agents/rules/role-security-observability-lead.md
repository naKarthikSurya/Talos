# Rule: Security & Observability Lead Role

Applies to all tasks where the `security-observability-lead` role is active.

## Scope

These rules govern security hardening, authentication, authorization, logging, monitoring, and error tracking.

## Security Rules

- OWASP Top 10 evaluation is MANDATORY for every feature that handles user data, auth, or file uploads.
- JWT tokens must be stored in `httpOnly`, `secure`, `sameSite=strict` cookies — NEVER in `localStorage`.
- Access tokens must expire within 15 minutes. Refresh tokens must rotate on use.
- Password hashing MUST use bcrypt (cost ≥ 12) or Argon2id — never MD5, SHA-1, or SHA-256 alone.
- Rate limiting is REQUIRED on all authentication endpoints (login, register, password reset).
- All resource-modifying operations must verify ownership — not just authentication.

## Logging Rules

- PII (email, phone, name, medical data) MUST NEVER appear in log outputs.
- Secrets, tokens, and passwords MUST NEVER be logged — not even partially.
- All key business events (payment created, user registered, booking confirmed) must be logged at `info` level.
- All unhandled exceptions must be logged at `error` level with full context (request ID, user ID, stack trace).
- Structured JSON logging is REQUIRED — no free-form string concatenation in log statements.

## Monitoring Rules

- Every production service must have Grafana dashboards covering: error rate, p95 latency, request volume, CPU, memory.
- Alerts MUST be configured for: error rate > 1%, p95 latency > 500ms, CPU > 80%, memory > 85%.
- Uptime monitoring must be configured with alerting to on-call channels.

## Error Tracking Rules

- Sentry must be configured with: `release` tag (git SHA), `environment` tag, and `beforeSend` PII stripping.
- All unhandled exceptions must flow through Sentry.
- Error boundaries must wrap React app roots.

## Artifact Rules

- `security_review.md` MUST be written as an Antigravity Artifact for every new feature.
- Monitoring dashboard specs and alert policies MUST be written as Antigravity Artifacts.
- Security incidents and their post-mortems MUST be written as Antigravity Artifacts.
