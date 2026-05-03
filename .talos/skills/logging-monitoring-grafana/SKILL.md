---
name: logging-monitoring-grafana
description: >
  Implements structured logging with Winston or Pino, Prometheus metrics instrumentation,
  and Grafana dashboard configuration. Defines log levels, metric cardinality rules,
  and alerting thresholds.
---

# Logging & Monitoring — Grafana Skill

## Goal

Give the engineering team full observability into the running system through structured
logs, metrics dashboards, and proactive alerts — before users report issues.

## When to Use

- A new service is being deployed and needs logging/monitoring instrumentation.
- An existing service has insufficient observability for diagnosing incidents.
- A Grafana dashboard must be created for a new metric or service.
- An alert must be configured for an SLA threshold.

## Structured Logging (Winston — NestJS)

```typescript
// logger.service.ts
import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.json()  // Structured JSON for log aggregation tools
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
  ],
});

// Usage in service:
logger.info('Payment processed', {
  userId: user.id,
  paymentId: payment.id,
  amount: payment.amount,
  // NEVER log: password, token, card number, PII raw values
});
```

## Log Level Rules

| Level | When to Use |
|---|---|
| `error` | Unhandled exceptions, failed external calls, data corruption |
| `warn` | Recoverable errors, deprecated usage, rate limit approaching |
| `info` | Key business events (payment created, user registered) |
| `debug` | Verbose request/response details (dev/staging only) |

## Prometheus Metrics (NestJS)

```typescript
// Use @willsoto/nestjs-prometheus
const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 5],
});
```

## Key Metrics to Instrument

| Metric | Type | Labels |
|---|---|---|
| `http_request_duration_seconds` | Histogram | method, route, status |
| `http_requests_total` | Counter | method, route, status |
| `db_query_duration_seconds` | Histogram | query_name |
| `cache_hit_total` | Counter | cache_name |
| `background_job_duration` | Histogram | job_name |

## Grafana Dashboard — Essential Panels

1. **Request Rate** — RPS over time
2. **Error Rate** — % 4xx and 5xx over time
3. **Latency** — p50, p95, p99 over time
4. **Database** — Query duration, connection pool usage
5. **Infrastructure** — CPU, memory, disk

## Review Checklist

- [ ] All key business events logged at `info` level
- [ ] All errors logged at `error` level with stack trace
- [ ] No PII or secrets in log outputs
- [ ] Prometheus metrics endpoint `/metrics` exposed
- [ ] Grafana dashboard covers: RPS, error rate, p95 latency
- [ ] Alerts configured for: error rate > 1%, p95 > 500ms, CPU > 80%
