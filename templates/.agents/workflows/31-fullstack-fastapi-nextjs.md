# Workflow 31: Fullstack — FastAPI + Next.js

## Objective

Coordinate a fullstack feature spanning a FastAPI backend and Next.js frontend with
contract-first development and aligned Server Component data fetching.

## Prerequisites

- `state.json` initialized, `track` is `fullstack`, `stack` reflects `fastapi+nextjs`.

## Key Principle

**Contract-first**: Define API contracts before either side implements. Next.js Server Components
and Server Actions must use TypeScript types derived from the agreed contract.

---

## Phase 1: Requirements

1. Activate `product-manager-core`. Feature must explicitly describe: what data Next.js pages need, what mutations Server Actions must perform, and any SSR vs ISR vs dynamic data requirements.
2. **STOP** — Await approval.

---

## Phase 2: Backend Architecture

1. Activate `backend-fastapi-architect`. Produce `solution.md` (backend): router structure, Pydantic schemas, SQLAlchemy models, service layer, Alembic plan.

---

## Phase 3: Frontend Architecture

1. Activate `frontend-nextjs-architect`. Add to `solution.md` (frontend): App Router structure, Server/Client component decisions, caching strategy, Server Actions design.

---

## Phase 4: API Contract Definition — CRITICAL

**Stage**: `CONTRACT_REVIEW_PENDING`

1. Activate `api-contract-reviewer`.
2. Produce `backend_contract.md` from FastAPI Pydantic schemas: exact JSON shapes that FastAPI endpoints return.
3. Produce `frontend_contract.md`: TypeScript types for Server Components and Server Actions to use, UI states.
4. **Alignment check**: FastAPI Pydantic response model fields must match TypeScript types field-for-field. Python snake_case → TypeScript camelCase mapping must be explicitly documented if FastAPI aliasing is used.
5. **STOP** — Await contract approval. Set `approvals.design = true`, `quality_gates.contracts_checked = true`.

---

## Phase 5–7: Test Strategy, Security Review, Planning

Follow the same pattern as Workflow 10/11 and 20/21 for each side:
- `testing-strategist` → `test_strategy.md`
- `security-reviewer` → `security_review.md` (FastAPI: Depends auth, Pydantic extra='forbid'; Next.js: secrets, Server Action Zod validation)
- `backend-fastapi-developer` → backend section of `implementation_steps.md`
- `frontend-nextjs-developer` → frontend section of `implementation_steps.md`

---

## Phase 8: PM Verification + Tech Lead Review

1. PM verifies both sides satisfy `feature.md`. Write `pm_review.md`.
2. Tech Lead reviews architectural integrity and contract alignment. Write `tech_lead_review.md`.
3. **STOP** — Await execution approval.

---

## Phase 9: Execution Gate + Implementation

1. Invoke `90-execution-gate.md`.
2. Implement FastAPI backend first. Run `pytest`.
3. Implement Next.js frontend. Use TypeScript types from `frontend_contract.md`.
4. `next build` must succeed.
5. Playwright e2e against full stack.
6. Set `COMPLETED`. Report.
