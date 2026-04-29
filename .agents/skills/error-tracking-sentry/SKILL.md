---
name: error-tracking-sentry
description: >
  Configures Sentry for exception tracking, release tracking, performance monitoring,
  and alert routing in Node.js, Python, and React applications. Defines issue triage
  workflows and alert policies.
---

# Error Tracking — Sentry Skill

## Goal

Capture, group, and route all production exceptions to the right team members with
enough context to reproduce and fix issues before users report them.

## When to Use

- A new service or frontend app needs Sentry configured.
- Sentry is generating too much noise (needs filtering/grouping rules).
- A new alert policy must be configured for a critical error type.
- Release tracking must be added to correlate deployments with error spikes.

## NestJS Sentry Setup

```typescript
// main.ts
import * as Sentry from '@sentry/node';
import { nodeProfilingIntegration } from '@sentry/profiling-node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  release: process.env.APP_VERSION,
  integrations: [nodeProfilingIntegration()],
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  beforeSend(event) {
    // Strip PII from events
    if (event.user) delete event.user.email;
    return event;
  },
});
```

## React Sentry Setup

```typescript
// index.tsx
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  integrations: [Sentry.browserTracingIntegration()],
  tracesSampleRate: 0.1,
  environment: process.env.NODE_ENV,
});

// Wrap root with ErrorBoundary
<Sentry.ErrorBoundary fallback={<ErrorPage />}>
  <App />
</Sentry.ErrorBoundary>
```

## Sentry Global Exception Filter (NestJS)

```typescript
@Catch()
export class SentryExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    Sentry.captureException(exception);
    // Then handle normally...
  }
}
```

## Alert Policy Rules

| Condition | Alert To |
|---|---|
| New issue first seen | #alerts-critical Slack channel |
| Issue regression (reoccurs after resolve) | Engineer who resolved it |
| Error rate > 10 events/min | On-call engineer |
| Performance degradation > 2x baseline | DevOps on-call |

## Issue Triage Workflow

1. New issue appears in Sentry.
2. Check: Is it a known issue? Merge with existing group.
3. Reproduce using breadcrumbs and context in Sentry.
4. Assign to the team that owns the affected service.
5. Fix, deploy, resolve in Sentry, and link to the PR.
6. Add regression test to prevent recurrence.

## Review Checklist

- [ ] Sentry DSN stored in environment variables, not code
- [ ] `release` tag set to git SHA or version for each deployment
- [ ] `environment` tag set (development/staging/production)
- [ ] PII stripped from events via `beforeSend`
- [ ] Alert policies configured for critical error thresholds
- [ ] Error boundary wrapping the React app root
