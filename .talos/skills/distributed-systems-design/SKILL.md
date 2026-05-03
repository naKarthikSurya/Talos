---
name: distributed-systems-design
description: >
  Designs service boundaries, communication protocols (REST, gRPC, events), data ownership,
  and integration patterns for distributed or microservices architectures.
---

# Distributed Systems Design Skill

## Goal

Define how services communicate, where data lives, and how failure in one component is
isolated from the rest of the system.

## When to Use

- A monolithic service needs to be split or a new microservice added.
- An event-driven or queue-based integration pattern is being designed.
- Service-to-service communication needs to be formalized.

## Architecture Patterns

| Pattern | Use When |
|---|---|
| REST | Synchronous request-response between services |
| gRPC | High-performance internal service communication |
| Message Queue (RabbitMQ/SQS) | Async processing, decoupling producers from consumers |
| Event Bus (Kafka/EventBridge) | Broadcast events to multiple consumers |
| Saga Pattern | Distributed transactions across multiple services |

## Operating Procedure

1. **Define service boundaries** — What is each service responsible for?
2. **Define data ownership** — Which service owns each entity?
3. **Define communication protocol** — REST, gRPC, or event-based?
4. **Define failure isolation** — How does service A fail when service B is down?
5. **Define the API contract** — Request/response format for each interaction.
6. **Identify shared infrastructure** — Auth service, message broker, service registry.

## Output Format

```markdown
## Service Map
- Service A: Owns [domain], exposes [endpoints]
- Service B: Owns [domain], subscribes to [events]

## Communication
- A → B: REST POST /api/resource (synchronous)
- B → C: SQS event `resource.created` (async)

## Failure Modes
- B unavailable: A returns cached result, queues retry
```

## Review Checklist

- [ ] Every service has a single clear responsibility
- [ ] No circular dependencies between services
- [ ] All async operations have retry and dead-letter queue handling
- [ ] Data ownership is unambiguous
