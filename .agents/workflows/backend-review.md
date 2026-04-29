---
description: Review backend code as Backend Engineer
---

Read `.agents/agents.md`.

Act as the **Backend Engineer (@backend)**.

Review the current backend codebase with a focus on production-readiness, security, and performance.

### Detailed Review Checklist:

#### 1. API & Contract Integrity
- [ ] **Contract Alignment**: Does the implementation match the defined API spec (Swagger/OpenAPI)?
- [ ] **DTO Usage**: Are DTOs used for all requests and responses? Are they strictly typed?
- [ ] **Validation**: Is `class-validator` (or equivalent) applied to all incoming data?
- [ ] **Versioning**: Is the API versioned correctly (e.g., `/v1/`)?

#### 2. Business Logic & Architecture
- [ ] **Service Layer**: Is business logic isolated in services, or leaking into controllers?
- [ ] **Dependency Injection**: Are dependencies properly injected, avoiding hard coupling?
- [ ] **Modularity**: Is the code organized into logical modules (e.g., NestJS modules)?
- [ ] **DRY Principle**: Are there significant code duplications that should be refactored?

#### 3. Data Layer & Performance
- [ ] **N+1 Queries**: Check for common ORM pitfalls in loops or nested relations.
- [ ] **Indexing**: Are foreign keys and filter columns properly indexed in the database?
- [ ] **Transactions**: Are multi-step write operations wrapped in database transactions?
- [ ] **Caching**: Are expensive queries or static data cached where appropriate?

#### 4. Security & Error Handling
- [ ] **Auth Guards**: Are all protected routes covered by appropriate Authentication/Authorization guards?
- [ ] **Error Responses**: Does the API return consistent error structures and appropriate HTTP status codes?
- [ ] **Input Sanitization**: Is there any risk of SQL injection or XSS?
- [ ] **Sensitive Data**: Are passwords/secrets properly hashed and NEVER returned in API responses?

#### 5. Maintainability
- [ ] **Logging**: Is structured logging implemented for critical flows and errors?
- [ ] **Comments/Docs**: Is complex logic explained with clear comments?
- [ ] **Type Safety**: Are `any` types avoided in favor of strict interfaces or classes?

After reviewing, provide:
- **Critical Issues**: Immediate risks (Security, Data Loss, Crashes).
- **Improvements**: Refactoring, performance, or maintainability suggestions.
- **Action Plan**: List of files to modify and specific changes needed.
