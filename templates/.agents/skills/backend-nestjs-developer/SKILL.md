---
name: backend-nestjs-developer
description: >
  Use when converting an approved NestJS architectural design into a detailed,
  ordered implementation plan. Produces implementation_steps.md with file-level
  specificity. Also executes the implementation when the execution gate is open.
  Activate after solution.md and test_strategy.md are approved.
---

# NestJS Developer Skill

## Goal

Convert the approved NestJS architecture into a precise, ordered implementation checklist
that can be executed without ambiguity. Every step names the file, the change, and the
validation to run after it.

## When to Use

- After `solution.md` is approved and `test_strategy.md` is defined.
- Stage is `DEV_PLANNING_PENDING` (planning) or `EXECUTION_PENDING` (implementation).
- Stack is `nestjs`.

## Inputs Expected

- Approved `ai-control/feature.md`
- Approved `ai-control/solution.md`
- `ai-control/test_strategy.md`
- `ai-control/backend_contract.md`
- `ai-control/security_review.md` (remediation items must be addressed in the plan)

## Artifacts Read

- All of the above

## Artifacts Written

- `ai-control/implementation_steps.md` (during DEV_PLANNING_PENDING)
- Source code files (during EXECUTION_PENDING)
- `ai-control/execution_log.md` (progress notes)

## Operating Procedure — Planning Phase

1. **Confirm stage**: `DEV_PLANNING_PENDING`.
2. **Read all input artifacts**. Identify any unresolved questions or contradictions. Stop and report if found.
3. **Decompose into ordered steps**:
   a. TypeORM entity or Prisma schema definition
   b. Database migration generation
   c. Request DTOs (with class-validator decorators)
   d. Response DTOs (with class-transformer exclusions)
   e. Service class with all methods, error handling, and injected dependencies
   f. Controller class with routes, guards, decorators, and Swagger annotations
   g. Module wiring
   h. Unit tests for service methods (from test_strategy.md)
   i. E2E tests for controller endpoints (from test_strategy.md)
   j. Swagger decorator completeness check
4. **Write `implementation_steps.md`**: Use the structure below. Every step names the exact file and what to write or change.
5. **Update state**: `current_stage` → `PM_VERIFICATION_PENDING`. Log.

## Operating Procedure — Execution Phase

1. **Confirm stage**: `EXECUTION_PENDING`. Verify `execution-gate` has cleared all checks.
2. **Execute each step in `implementation_steps.md` in order**.
3. **After each step**: run the validation command for that step (compile, lint, test).
4. **Do not proceed to the next step if the current step's validation fails.**
5. **After all steps complete**: run full test suite (`npm run test` and `npm run test:e2e`).
6. **All tests must pass before declaring completion.**
7. **Write walkthrough**: Append a summary to `execution_log.md` listing files changed.
8. **Update state**: `current_stage` → `COMPLETED`.

## Output: implementation_steps.md Structure

```markdown
# Implementation Plan: <Feature Title>
**Stack**: NestJS | **Stage**: DEV_PLANNING_PENDING

## Pre-Implementation Checklist
- [ ] solution.md approved
- [ ] test_strategy.md complete
- [ ] security_review.md cleared
- [ ] backend_contract.md finalized
- [ ] Database migration environment ready

## Implementation Steps

### Step 1: Entity Definition
**File**: `src/<feature>/<feature>.entity.ts`
**Action**: Create TypeORM entity with fields from solution.md entity design.
**Key points**:
- @PrimaryGeneratedColumn('uuid') for id
- @Column constraints matching validation rules
- Relation decorators if applicable
**Validation**: `npx tsc --noEmit` — no type errors.

### Step 2: Migration
**Command**: `npm run migration:generate -- -n Create<Feature>`
**Validation**: Migration file created in `src/migrations/`. Review SQL before running.

### Step 3: Create DTO — CreateXDto
**File**: `src/<feature>/dto/create-<feature>.dto.ts`
**Action**: Implement with class-validator decorators per backend_contract.md.
**Validation**: `npx tsc --noEmit`

### Step 4: Response DTO — XResponseDto
**File**: `src/<feature>/dto/<feature>-response.dto.ts`
**Action**: Implement with @Expose()/@Exclude() decorators. No sensitive fields exposed.
**Validation**: `npx tsc --noEmit`

### Step 5: Service
**File**: `src/<feature>/<feature>.service.ts`
**Action**: Implement methods per solution.md service design.
- Inject repository via @InjectRepository()
- Implement create/findById/findAll/update/delete as applicable
- Throw NestJS exceptions on error conditions (per security_review.md)
- No HTTP context in service
**Validation**: `npm run test src/<feature>/<feature>.service.spec.ts`

### Step 6: Controller
**File**: `src/<feature>/<feature>.controller.ts`
**Action**: Implement routes per backend_contract.md.
- @ApiTags, @ApiOperation, @ApiResponse on every route
- @UseGuards(JwtAuthGuard) as required
- Use @Body(), @Param(), @Query() with DTO types
- Return service method results (no business logic here)
**Validation**: `npx tsc --noEmit`

### Step 7: Module
**File**: `src/<feature>/<feature>.module.ts`
**Action**: Wire controller, service, TypeORM entity.
**Validation**: Application starts (`npm run start:dev`)

### Step 8: Unit Tests
**Files**: `src/<feature>/<feature>.service.spec.ts`
**Action**: Implement unit tests from test_strategy.md.
- createTestingModule with mocked repository
- Cover all service methods: happy path + all error paths
**Validation**: `npm run test -- --testPathPattern=<feature>`

### Step 9: E2E Tests
**File**: `test/<feature>.e2e-spec.ts`
**Action**: Implement e2e tests from test_strategy.md.
- Supertest against real NestJS app instance
- Cover all endpoints: success, validation error, auth error
**Validation**: `npm run test:e2e`

### Step 10: Full Suite
**Validation**: `npm run test && npm run test:e2e` — all tests pass.

## Rollout Considerations
- Migration must be run before deploying new code.
- Environment variables required: <list any new ones>
- Breaking changes to existing consumers: <none / describe>
```

## NestJS Implementation Constraints

- DTOs must use `class-validator` decorators — never manual validation in service.
- Controllers must use typed DTOs — no `body: any` or `@Body() body: object`.
- Services must throw NestJS exceptions, not raw Error objects or HTTP exceptions.
- All environment variables via `ConfigService` — no `process.env` inline.
- Global `ValidationPipe` must be registered before running tests.
- Swagger decorators required on every endpoint.
- No `synchronize: true` in any non-local environment config.

## Review Checklist

- [ ] Every step names an exact file.
- [ ] DTOs defined per `backend_contract.md`.
- [ ] Service methods match `solution.md` service design.
- [ ] Security review remediation items addressed in plan.
- [ ] Test cases from `test_strategy.md` assigned to specific test files.
- [ ] Migration step included if schema changes.
- [ ] Rollout considerations documented.
