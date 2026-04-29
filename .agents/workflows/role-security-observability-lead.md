# Workflow: Security & Observability Lead Role

## Objective

Audit a feature for security vulnerabilities, instrument logging and metrics, and configure
error tracking before release. All findings are written as Antigravity Artifacts.

## Active Rules

- `role-security-observability-lead.md`

## Prerequisites

- Feature implementation is complete or implementation plan exists.
- `feature.md` Antigravity Artifact is approved.
- `state.md` stage is `SECURITY_REVIEW_PENDING`.

---

## Phase 1: Security Audit

1. Activate skill: `auth-security-hardening`
2. Evaluate against OWASP Top 10 for the feature scope.
3. Verify JWT in httpOnly cookie, bcrypt ≥ 12, rate limiting on auth endpoints.
4. Verify all resource mutations have ownership checks.

> [!IMPORTANT]
> Write `security_review.md` as an **Antigravity Artifact**:
> - **Type**: `other`
> - **Name**: `security_review.md`
> - **RequestFeedback**: `false` (set to `true` if CRITICAL/HIGH issues found)
> - **Summary**: "Security review for [feature name] — OWASP Top 10 evaluation, findings, and mitigations."

If CRITICAL or HIGH issues found: set `RequestFeedback: true` and **STOP** — user must resolve before proceeding.
Update `state.md`: `security_review.md` → `DONE`.

---

## Phase 2: Logging & Monitoring

1. Activate skill: `logging-monitoring-grafana`
2. Verify all key business events logged at `info` level.
3. Verify no PII or secrets in logs.
4. Verify Prometheus metrics instrumented for request duration, count, DB query duration.
5. Verify/create Grafana dashboard panels: RPS, error rate, p95 latency, CPU, memory.
6. Configure alerts: error rate > 1%, p95 > 500ms, CPU > 80%.

---

## Phase 3: Error Tracking

1. Activate skill: `error-tracking-sentry`
2. Verify Sentry configured with `release`, `environment`, `beforeSend` PII stripping.
3. Verify all unhandled exceptions captured.
4. Configure alert routing for critical thresholds.

---

## Phase 4: Sign-Off

Update `state.md`: security stage → `DONE`. Report findings to user.
