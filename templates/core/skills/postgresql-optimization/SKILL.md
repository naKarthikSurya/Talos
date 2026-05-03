---
name: postgresql-optimization
description: >
  Optimizes PostgreSQL database performance through indexing strategy, query analysis with
  EXPLAIN ANALYZE, connection pooling, vacuuming, and partitioning. Identifies and resolves
  slow queries and N+1 issues.
---

# PostgreSQL Optimization Skill

## Goal

Ensure all PostgreSQL database operations run within acceptable latency thresholds by
identifying bottlenecks and applying targeted optimizations.

## When to Use

- A query is running slower than 100ms under normal load.
- A new table or query pattern needs an indexing strategy defined upfront.
- N+1 query patterns have been identified in application logs.
- Database CPU or I/O is elevated in monitoring.

## Diagnostic Procedure

1. Run `EXPLAIN ANALYZE <query>` to inspect the execution plan.
2. Identify: Seq Scan on large tables, Nested Loop with large row counts, high cost nodes.
3. Check for missing indexes on WHERE, JOIN ON, and ORDER BY columns.
4. Check for unused indexes (bloating write performance).

## Indexing Rules

```sql
-- Single column index for simple filters
CREATE INDEX idx_users_email ON users(email);

-- Composite index — column order matters (most selective first)
CREATE INDEX idx_orders_user_status ON orders(user_id, status);

-- Partial index for filtered queries
CREATE INDEX idx_orders_pending ON orders(created_at) WHERE status = 'PENDING';

-- GIN index for full-text or JSONB search
CREATE INDEX idx_products_tags ON products USING GIN(tags);
```

## Query Optimization Rules

- Always use parameterized queries — never string interpolation.
- Use `SELECT` only required columns — no `SELECT *` in production.
- Replace `NOT IN (subquery)` with `NOT EXISTS` for large datasets.
- Use `LIMIT` and `OFFSET` for pagination. For large offsets, use keyset pagination.
- Prefer `JOIN` over nested subqueries for readability and optimizer hints.

## Connection Pooling

- Use PgBouncer or pg-pool in transaction mode for high-concurrency APIs.
- Set `max_connections` in PostgreSQL config based on: CPU cores × 4.

## Operating Procedure

1. Identify slow queries from application logs or `pg_stat_statements`.
2. Run `EXPLAIN (ANALYZE, BUFFERS) <query>` in a staging environment.
3. Add or modify indexes based on the plan output.
4. Re-run EXPLAIN to confirm improvement.
5. Document the index strategy in `database_index_strategy.md`.

## Review Checklist

- [ ] All foreign keys are indexed
- [ ] All columns used in WHERE clauses of hot queries are indexed
- [ ] No `SELECT *` in production queries
- [ ] Slow query log enabled (`log_min_duration_statement = 100`)
- [ ] N+1 patterns resolved with JOIN or batch loading
