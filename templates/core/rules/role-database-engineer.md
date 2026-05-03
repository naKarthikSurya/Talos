# Rule: Database Engineer Role

Applies to all tasks where the `database-engineer` role is active.

## Scope

These rules govern schema design, migrations, query optimization, and data integrity.

## Schema Design Rules

- Every table must have: `id` (PK), `created_at`, `updated_at`.
- Every foreign key must have a corresponding index.
- All columns commonly used in `WHERE`, `JOIN ON`, or `ORDER BY` clauses must be indexed.
- `NOT NULL` constraints must be enforced for all fields that cannot logically be null.
- `UNIQUE` constraints must be enforced at the database level — not just the application level.

## Migration Safety Rules

- NEVER drop a column or table without a rollback plan and data backup.
- NEVER add a `NOT NULL` column without a default value in the same migration (multi-phase instead).
- All migrations must be reversible (include a `down` method).
- `synchronize: true` is PERMANENTLY BANNED outside of local development.
- Migrations must be tested on a staging environment with a production-sized dataset before production.

## Query Rules

- `SELECT *` is PROHIBITED in any production query path.
- All production queries must be reviewed with `EXPLAIN ANALYZE` before shipping.
- N+1 patterns are a blocking code review issue — use JOINs, `include`, or batch loading.
- Queries that touch > 1M rows MUST use pagination or streaming — never full result sets.

## Data Integrity Rules

- All financial amounts stored as integers (cents/paise) — never floating point.
- Timestamps always stored in UTC — conversion to local time is a display concern only.
- Soft deletes (`deleted_at`) preferred over hard deletes for user-facing entities.

## Artifact Rules

- Database schema changes, index strategies, and migration plans MUST be documented as Antigravity Artifacts.
- No schema change may be applied to production without an artifact documenting the rollback plan.
