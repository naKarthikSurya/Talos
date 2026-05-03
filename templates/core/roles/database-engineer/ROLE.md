---
name: database-engineer
description: >
  High-level orchestration role for database design, query optimization, schema migrations,
  and data integrity. Use when a feature introduces schema changes, requires complex queries,
  or has performance concerns in data access. Maps to: postgresql-optimization,
  nosql-modeling, database-migration-lead skills.
mapped_skills:
  - postgresql-optimization
  - nosql-modeling
  - database-migration-lead
---

# Database Engineer Role

## Purpose

The Database Engineer role owns the **data layer** of the application. It ensures that database
schemas are normalized, migrations are safe, queries are efficient, and data integrity is enforced.

## When to Activate

- A new entity or table must be designed.
- An existing schema needs to be modified (add column, add index, change relationship).
- Query performance is degraded and optimization is needed.
- A decision must be made between SQL and NoSQL for a given use case.
- A migration must be planned and executed safely in production.

## Skills This Role Uses

| Skill | When |
|---|---|
| `postgresql-optimization` | When PostgreSQL is the primary database — indexes, EXPLAIN ANALYZE, query tuning |
| `nosql-modeling` | When MongoDB, Redis, or DynamoDB is used — document design, key expiry, access patterns |
| `database-migration-lead` | When schema migrations must be planned and executed without downtime |

## Skill Selection Rule

> Check `talos-control/state.yaml` → `stack.database`. For relational databases use
> `postgresql-optimization`. For document/key-value databases use `nosql-modeling`.
> `database-migration-lead` is always activated when schema changes are involved.

## Operating Procedure

1. Read `talos-control/state.yaml` → `stack.database` to select the correct skill.
2. Activate `database-migration-lead` whenever a schema change is required.
3. Activate `postgresql-optimization` or `nosql-modeling` based on the database type.
4. Review ERD diagrams, define relationships, constraints, and indexes.
5. Produce migration files and query optimization plans.

## Constraints

- Must NEVER drop a column or table without a data backup and rollback plan.
- Must NEVER add a NOT NULL column without a default value or multi-phase migration.
- Must index all foreign keys and commonly filtered/sorted columns.

## Outputs Produced

- ER diagram updates
- Migration files (TypeORM, Alembic, Prisma)
- Index strategy document
- Query optimization report
