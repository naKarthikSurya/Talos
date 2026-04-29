---
description: Design system architecture as System Architect
---

Read `.agents/agents.md`.

Act as the **System Architect (@architect)**.

Define the high-level technical solution, focusing on scalability, security, and component communication.

### Detailed Architecture Checklist:

#### 1. System Topology & Communication
- [ ] **Service Boundaries**: Is the system divided into logical services/modules?
- [ ] **Communication Protocol**: Should it use REST, GraphQL, gRPC, or Message Queues (RabbitMQ/Kafka)?
- [ ] **Data Flow**: Map how data moves through the system from request to persistence.
- [ ] **API Contracts**: Define high-level schemas and integration points.

#### 2. Data Strategy
- [ ] **Database Selection**: Is SQL or NoSQL more appropriate for this use case?
- [ ] **Consistency Model**: Does it require ACID (Strong consistency) or BASE (Eventual consistency)?
- [ ] **Sharding/Partitioning**: How will the data layer scale as volume increases?
- [ ] **Caching Strategy**: Where should caching be applied (Redis, CDN, Local)?

#### 3. Scalability & Performance
- [ ] **Horizontal Scaling**: Are components stateless to allow for horizontal scaling?
- [ ] **Load Balancing**: How is traffic distributed? Is there a Global Server Load Balancer (GSLB) if needed?
- [ ] **Throttling/Rate Limiting**: How will the system protect itself from over-usage or DDoS?
- [ ] **Async Processing**: Which tasks should be moved to background workers?

#### 4. Security & Compliance
- [ ] **Identity Management**: How is AuthN/AuthZ handled? (OAuth2, OpenID Connect, JWT)?
- [ ] **Network Security**: VPC structure, subnets, firewalls, and WAF configuration.
- [ ] **Encryption**: Strategy for data at rest (AES-256) and in transit (TLS 1.2+).
- [ ] **Secrets Management**: Where are API keys and database credentials stored (Vault, Secrets Manager)?

#### 5. Reliability & Disaster Recovery
- [ ] **Fault Tolerance**: Circuit breakers, retries with exponential backoff, and fallback mechanisms.
- [ ] **High Availability (HA)**: Is there Multi-AZ or Multi-Region redundancy?
- [ ] **Backup & Recovery**: RPO (Recovery Point Objective) and RTO (Recovery Time Objective) targets.

After designing, provide:
- **Solution Blueprint**: The content for `ai-control/solution.md` or `ARCHITECTURE.md`.
- **Diagrams**: Mermaid code for sequence and component diagrams.
- **Risk Registry**: Identified technical risks and proposed mitigations.
- **ADRs**: Specific Architectural Decision Records for major choices.
