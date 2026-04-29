# Workflow: Database Engineer Role

## Objective

Design safe schema changes, generate migrations, and optimize query performance.
All decisions and plans are written as Antigravity Artifacts.

## Active Rules

- `role-database-engineer.md`

## Prerequisites

- Feature schema requirements defined in `feature.md` or `solution.md` artifacts.
- `state.md` → `stack.database` is defined.

---

## Phase 1: Database Type Selection

1. Read `state.md` → `stack.database`.
2. Activate `postgresql-optimization` for relational databases.
3. Activate `nosql-modeling` for document/key-value databases.
4. Always activate `database-migration-lead` when schema changes are involved.

---

## Phase 2: Schema Design

1. Review feature requirements for new entities and relationships.
2. Design the ER diagram update (draw using Mermaid in artifact).
3. Apply normalization rules. Define embed vs. reference decisions for NoSQL.
4. Define all indexes: FK indexes, filter indexes, sort indexes, unique constraints.

> [!IMPORTANT]
> Write schema design as an **Antigravity Artifact**:
> - **Type**: `implementation_plan`
> - **Name**: `schema_design.md`
> - **RequestFeedback**: `true`
> - **Summary**: "Database schema design for [feature name] — entities, relationships, indexes, constraints."

**STOP** — Present to user/architect. Await approval.

---

## Phase 3: Migration Planning

1. Activate `database-migration-lead`.
2. Assess if change is backward compatible.
3. For breaking changes: design multi-phase migration plan.
4. Define rollback command for every migration.

> [!IMPORTANT]
> Write migration plan as an **Antigravity Artifact**:
> - **Type**: `other`
> - **Name**: `migration_plan.md`
> - **RequestFeedback**: `false`
> - **Summary**: "Migration plan for [schema change] — phases, rollback commands, staging test checklist."

---

## Phase 4: Migration Execution

1. Generate migration file using ORM CLI (TypeORM, Alembic, Prisma).
2. Test on staging with production-sized data.
3. Verify indexes with `EXPLAIN ANALYZE`.
4. Apply to production. Verify health.
5. Update `state.md` execution log.

---

## Phase 5: Query Optimization (if required)

1. Run `EXPLAIN ANALYZE` on all queries affected by schema changes.
2. Add targeted indexes for Seq Scans on large tables.
3. Resolve all N+1 patterns.

> [!IMPORTANT]
> Write optimization report as an **Antigravity Artifact**:
> - **Type**: `other`
> - **Name**: `query_optimization_report.md`
> - **RequestFeedback**: `false`
> - **Summary**: "Query optimization report for [feature name] — slow queries identified, indexes added, before/after EXPLAIN results."
