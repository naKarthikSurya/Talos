---
name: database-migration-lead
description: >
  Plans and executes safe database schema migrations for SQL databases using TypeORM,
  Alembic, or Prisma. Defines multi-phase migration strategies for zero-downtime deployments.
---

# Database Migration Lead Skill

## Goal

Execute schema changes with zero data loss and zero downtime by following a safe,
reversible, multi-phase migration strategy.

## When to Use

- A new table, column, index, or constraint must be added.
- An existing column must be renamed, retyped, or removed.
- A foreign key relationship is being added or modified.
- A migration must be tested and rolled back in staging before production.

## Zero-Downtime Migration Patterns

### Adding a Column (Safe)
```sql
-- Phase 1: Add nullable column (backward compatible)
ALTER TABLE users ADD COLUMN phone VARCHAR(20);

-- Phase 2: Backfill existing rows in batches
UPDATE users SET phone = '' WHERE phone IS NULL;

-- Phase 3: Add NOT NULL constraint after backfill
ALTER TABLE users ALTER COLUMN phone SET NOT NULL;
```

### Renaming a Column (Safe — 3 phases)
```sql
-- Phase 1: Add new column, write to both old and new
ALTER TABLE users ADD COLUMN full_name VARCHAR(255);

-- Phase 2: Deploy code that reads from new column, writes to both
-- (data sync via background job or trigger)

-- Phase 3: Drop old column after all reads switch to new
ALTER TABLE users DROP COLUMN name;
```

### Dropping a Table (Safe — 2 phases)
```
Phase 1: Stop writing to the table. Deploy code with table reads removed.
Phase 2: After one full deployment cycle with no reads, drop the table.
```

## TypeORM Migration Commands
```bash
# Generate migration from entity diff
npx typeorm migration:generate src/migrations/AddPhoneToUsers -d src/data-source.ts

# Run pending migrations
npx typeorm migration:run -d src/data-source.ts

# Revert last migration
npx typeorm migration:revert -d src/data-source.ts
```

## Alembic Migration Commands
```bash
alembic revision --autogenerate -m "add_phone_to_users"
alembic upgrade head
alembic downgrade -1
```

## Operating Procedure

1. Identify the schema change required.
2. Determine if the change is backward compatible (can old code run against new schema?).
3. For breaking changes, design a multi-phase migration plan.
4. Generate the migration file.
5. Test in a staging environment with a production data snapshot.
6. Define the rollback command.
7. Execute in production, verify, document completion.

## Review Checklist

- [ ] Migration is backward compatible OR a multi-phase plan is defined
- [ ] Rollback command is documented
- [ ] Migration tested on staging with realistic data volume
- [ ] No `synchronize: true` or `autogenerate` in production runtime
- [ ] Foreign key indexes created alongside foreign key constraints
