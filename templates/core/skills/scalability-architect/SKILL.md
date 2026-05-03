---
name: scalability-architect
description: >
  Designs scalability strategies including load balancing, caching, CDN, database sharding,
  async processing, rate limiting, and horizontal scaling for production applications.
---

# Scalability Architect Skill

## Goal

Ensure the system can handle 10x current load without redesign, by identifying and
addressing bottlenecks before they become production incidents.

## When to Use

- A feature is expected to receive high traffic.
- Response times are degrading under load.
- A system needs to scale from hundreds to thousands of concurrent users.
- A caching, queue, or CDN layer must be introduced.

## Scalability Patterns

| Pattern | Problem Solved |
|---|---|
| Horizontal Scaling | Single server CPU/memory limit |
| Load Balancer (Nginx/ALB) | Distribute traffic across instances |
| Redis Cache | Reduce DB reads for hot data |
| CDN (CloudFront) | Offload static asset delivery |
| Message Queue | Decouple slow processing from fast APIs |
| Database Read Replicas | Separate read and write load |
| Database Indexing | Slow query performance |
| Rate Limiting | Prevent abuse and protect downstream services |
| Pagination | Prevent large result set fetches |

## Operating Procedure

1. **Identify the bottleneck** — Is it CPU, memory, DB, network, or I/O?
2. **Estimate load** — How many requests per second at peak? What is the expected growth?
3. **Select the correct scaling pattern** from the table above.
4. **Define caching strategy** — What is cached, for how long, and how is it invalidated?
5. **Define rate limiting rules** — Per-user limits, per-IP limits, burst allowance.
6. **Define async processing scope** — Which operations can be offloaded to a queue?

## Output Format

```markdown
## Bottleneck Analysis
- DB reads are the primary bottleneck at > 100 RPS

## Scaling Strategy
- Add Redis cache for [entity] with 5-minute TTL
- Add read replica for PostgreSQL
- Add rate limit: 60 req/min per user on [endpoint]

## Queue Offload
- File processing moved to background worker via SQS
```

## Review Checklist

- [ ] Bottleneck identified with evidence (metric or estimate)
- [ ] Caching strategy defined with TTL and invalidation
- [ ] Rate limiting rules defined
- [ ] Async operations moved to queue where latency allows
