---
name: performance-load-testing
description: >
  Designs and executes load tests using k6, Artillery, or Locust. Measures throughput,
  latency (p95/p99), error rate, and identifies system breaking points.
---

# Performance & Load Testing Skill

## Goal

Measure the system's behavior under expected and peak load to identify breaking points,
verify SLA compliance, and validate that optimizations have the intended effect.

## When to Use

- A high-traffic feature (payment, booking, search) is being released.
- A performance regression is suspected after a code change.
- Infrastructure is being scaled and the impact must be verified.
- SLA requirements (e.g., p95 < 200ms at 500 RPS) must be validated.

## k6 Load Test Example

```javascript
// tests/load/payment-api.js
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

const errorRate = new Rate('errors');

export const options = {
  stages: [
    { duration: '1m', target: 50 },   // Ramp up
    { duration: '3m', target: 200 },  // Sustained load
    { duration: '1m', target: 0 },    // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],  // 95% of requests < 500ms
    errors: ['rate<0.01'],             // < 1% error rate
  },
};

export default function () {
  const res = http.post(
    'http://localhost:3000/api/v1/payments',
    JSON.stringify({ amount: 100 }),
    { headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ...' } }
  );

  check(res, {
    'status is 201': (r) => r.status === 201,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });

  errorRate.add(res.status !== 201);
  sleep(1);
}
```

## Metrics to Capture

| Metric | Target |
|---|---|
| p50 latency | < 100ms |
| p95 latency | < 500ms |
| p99 latency | < 1000ms |
| Error rate | < 1% |
| Throughput | ≥ defined RPS target |
| CPU under load | < 70% |
| Memory under load | < 80% |

## Operating Procedure

1. Define the target RPS and latency thresholds from NFRs in `feature.md`.
2. Write the k6/Artillery script for the critical endpoint.
3. Run baseline test against a clean environment.
4. Ramp to target load and record results.
5. Identify bottlenecks (CPU, DB, network).
6. Apply optimizations (index, cache, scale).
7. Re-run test and compare results.
8. Document results in `load_test_report.md`.

## Review Checklist

- [ ] Load test covers the highest-traffic endpoint
- [ ] Thresholds match NFRs in `feature.md`
- [ ] Test runs in staging, not production
- [ ] Results documented with comparison to baseline
- [ ] Bottlenecks identified and remediated
