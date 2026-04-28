---
name: backend-nestjs-architect
description: >
  Use when designing the technical architecture for a NestJS backend feature.
  Defines module boundaries, provider structure, controller/service decomposition,
  guard/interceptor/filter needs, database schema design, and integration patterns.
  Produces solution.md. Activate after product-manager-core approves feature.md.
---

# NestJS Architect Skill

## Goal

Produce a precise, NestJS-idiomatic architectural design that developers can implement
without ambiguity. Every structural decision must be justified. Alternatives must be documented.

## When to Use

- After `feature.md` is approved and stage is `ARCHITECT_DESIGN_PENDING`.
- For NestJS stack tasks only (confirmed via `state.json` stack field).

## Inputs Expected

- Approved `ai-control/feature.md`.
- `ai-control/state.json` (stack must be `nestjs`).

## Artifacts Read

- `ai-control/feature.md`
- `ai-control/state.json`
- `ai-control/backend_contract.md` (if already partially defined)

## Artifacts Written

- `ai-control/solution.md`

## Operating Procedure

1. **Confirm stage and stack**: State must be `ARCHITECT_DESIGN_PENDING`, stack must be `nestjs`.
2. **Identify module boundaries**: What is the bounded context? Does this belong in an existing module or does a new module need to be created? What does it import, what does it export?
3. **Design the module structure**:
   - Module class (`@Module({ imports, controllers, providers, exports })`)
   - Controllers: list each endpoint with its HTTP method, path, DTO types, and guard requirements
   - Services: list each service with its injected dependencies and public methods
   - Providers: any custom providers, factories, or tokens needed
4. **Design DTOs**: For each request body and response payload, sketch the DTO shape and relevant validation decorators.
5. **Design the entity/schema**: If database access is involved, design the TypeORM entity or Prisma schema fields, relations, and indexes.
6. **Design the guard/interceptor/filter strategy**: What authentication/authorization is needed? Which existing guards apply? Does a new guard need to be created?
7. **Identify external integrations**: Third-party APIs, queues, caches, storage services — how are they injected and abstracted?
8. **Document trade-offs**: Note any alternatives considered and why the chosen approach is preferred.
9. **Write `solution.md`**: Use the structure below.
10. **Update state**: Set `current_stage` to `USER_REVIEW_DESIGN_PENDING`. Log to `execution_log.md`.
11. **Stop**: Present `solution.md` to the user. Do not proceed until design is approved.

## Output: solution.md Structure

```markdown
# Architecture Design: <Feature Title>
**Stack**: NestJS | **Date**: YYYY-MM-DD

## Overview
Brief description of the solution.

## Module Structure

### <FeatureName>Module
\`\`\`
<FeatureName>Module
  imports: [TypeOrmModule.forFeature([Entity]), SharedModule]
  controllers: [<FeatureName>Controller]
  providers: [<FeatureName>Service]
  exports: [<FeatureName>Service]  ← only if consumed externally
\`\`\`

## Controller Design
| Endpoint | Method | Path | Guards | Request DTO | Response DTO |
| --- | --- | --- | --- | --- | --- |
| createX | POST | /x | JwtAuthGuard, RolesGuard | CreateXDto | XResponseDto |

## Service Design
| Method | Inputs | Returns | Throws |
| --- | --- | --- | --- |
| create(dto) | CreateXDto | XResponseDto | ConflictException |

## DTO Designs

### CreateXDto
\`\`\`typescript
class CreateXDto {
  @IsString() @IsNotEmpty()
  name: string;
  // ...
}
\`\`\`

## Entity / Schema Design
\`\`\`typescript
@Entity('x')
class X {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column() name: string;
  @CreateDateColumn() createdAt: Date;
  // indexes, relations...
}
\`\`\`

## Guard / Interceptor / Filter Strategy
- Authentication: JwtAuthGuard on all routes (global or per-controller)
- Authorization: RolesGuard with @Roles() decorator
- Exception filter: Global HttpExceptionFilter already registered
- Logging interceptor: Already global

## External Integrations
- <Service>: injected as <Provider>, abstracted behind <interface>

## Data Flow
Request → Controller (validate DTO) → Service (business logic) → Repository (DB) → Service → Controller (transform response DTO) → Response

## Design Decisions and Trade-offs
| Decision | Chosen Approach | Alternative Considered | Rationale |
| --- | --- | --- | --- |
| ... | ... | ... | ... |

## Risks and Open Questions
- <risk or question>
```

## Constraints

- Do not design in generic terms. Name actual NestJS constructs (`@UseGuards(JwtAuthGuard)`, not "auth is handled").
- Do not leave DTO shapes undefined. Sketch the key fields even if not exhaustive.
- Do not proceed to developer planning without user approval of this design.
- Apply rule `10-backend-nestjs.md` and `00-engineering-baseline.md` to every design decision.

## Review Checklist

- [ ] Module boundaries are clearly defined with imports/exports.
- [ ] Every endpoint has its DTO, guard, and response type identified.
- [ ] Every service method has its signature, return type, and exceptions listed.
- [ ] Entity/schema is designed with appropriate types, constraints, and indexes.
- [ ] At least one design decision and its alternative is documented.
- [ ] `state.json` updated to `USER_REVIEW_DESIGN_PENDING`.
