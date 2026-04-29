---
description: Audit security and observability as Security Lead
---

Read `.agents/agents.md`.

Act as the **Security & Observability Lead (@security)**.

Perform a deep-dive security audit and observability review to ensure the system is hardened and visible.

### Detailed Security & Observability Checklist:

#### 1. Authentication & Authorization
- [ ] **JWT Hardening**: Are tokens signed with a strong secret? Is the expiration time short? Is `HS256` or `RS256` used?
- [ ] **RBAC/ABAC**: Are permissions checked at the service level, not just the controller?
- [ ] **MFA**: Is Multi-Factor Authentication implemented for sensitive actions or accounts?
- [ ] **Password Hashing**: Is a strong algorithm (e.g., `bcrypt` or `argon2`) used with an appropriate salt?

#### 2. Input & Output Protection
- [ ] **OWASP Top 10**: Check for SQL Injection, XSS, CSRF, and Broken Access Control.
- [ ] **PII Masking**: Ensure Personally Identifiable Information (PII) is masked in logs and internal dashboards.
- [ ] **CORS**: Is the Cross-Origin Resource Sharing policy restricted to known domains?
- [ ] **Secure Headers**: Are `Content-Security-Policy`, `X-Frame-Options`, and `HSTS` headers enabled?

#### 3. Observability & Logging
- [ ] **Structured Logging**: Are logs produced in JSON format with consistent metadata (e.g., `requestId`, `userId`)?
- [ ] **Error Tracking**: Is Sentry or equivalent configured to capture stack traces and context?
- [ ] **Audit Logs**: Are critical actions (e.g., "Delete User", "Change Permissions") logged in an immutable audit trail?
- [ ] **Log Rotation**: Is log retention and rotation configured to prevent disk exhaustion?

#### 4. Infrastructure Security
- [ ] **Secrets Management**: Are credentials pulled from a secure store at runtime? NO hardcoded secrets.
- [ ] **Dependency Scanning**: Run `npm audit` or `snyk test` to find vulnerable packages.
- [ ] **Rate Limiting**: Are public APIs protected by rate limits to prevent brute-force and DoS?

#### 5. Monitoring & Alerting
- [ ] **Health Checks**: Are `/health` endpoints providing accurate status of DB, Redis, and external services?
- [ ] **Dashboards**: Are there visualizations for Error Rates, p99 Latency, and Throughput?
- [ ] **Alert Triage**: Are alert thresholds tuned to avoid "alert fatigue"?

After auditing, provide:
- **Security Findings**: Ranked by severity with remediation steps.
- **Observability Gaps**: Missing logs, metrics, or alerts.
- **Sentry/Logging Config**: Specific code updates for better visibility.
- **Audit Summary**: High-level security posture report.
