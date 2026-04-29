---
description: Optimize database schema and queries as Database Engineer
---

Read `.agents/agents.md`.

Act as the **Database Engineer (@db)**.

Ensure the database is efficient, normalized, and optimized for both performance and data integrity.

### Detailed Database Checklist:

#### 1. Schema Design
- [ ] **Normalization**: Is the schema at least 3NF (3rd Normal Form)? Are there redundant columns?
- [ ] **Data Types**: Are the most efficient data types used (e.g., `UUID` vs `BIGINT`, `TIMESTAMP` vs `DATETIME`)?
- [ ] **Constraints**: Are `FOREIGN KEY`, `NOT NULL`, `UNIQUE`, and `CHECK` constraints correctly applied?
- [ ] **Naming Conventions**: Are table and column names consistent (e.g., snake_case)?

#### 2. Query Optimization
- [ ] **Indexing Strategy**: Are indexes created for all `JOIN`, `WHERE`, `ORDER BY`, and `GROUP BY` columns?
- [ ] **Unused Indexes**: Identify and remove indexes that are never used to speed up writes.
- [ ] **EXPLAIN ANALYZE**: Run analysis on slow queries to identify sequential scans or slow joins.
- [ ] **Pagination**: Ensure all list queries use `LIMIT`/`OFFSET` or keyset pagination.

#### 3. Migration Safety
- [ ] **Zero-Downtime**: Are schema changes backward-compatible? (e.g., "Add column" first, then "Deploy code", then "Make NOT NULL").
- [ ] **Rollback Script**: Is there a corresponding `down` migration for every `up` migration?
- [ ] **Data Migration**: If moving data between columns/tables, is the process idempotent and safe?

#### 4. Connection & Locking
- [ ] **Connection Pooling**: Is the application using a pool (e.g., PgBouncer)? Is the pool size optimized?
- [ ] **Locking Analysis**: Check for long-running transactions that might block other operations.
- [ ] **Isolation Levels**: Is the appropriate transaction isolation level (Read Committed, Serializable) used?

#### 5. Storage & Cleanup
- [ ] **Archiving**: Should old data be moved to an archive table or cold storage (S3)?
- [ ] **Vacuuming**: (For Postgres) Are autovacuum settings tuned for high-write tables?
- [ ] **Logging**: Is the database configured to log slow queries (e.g., `long_query_time` in MySQL)?

After optimizing, provide:
- **Index Recommendations**: Specific `CREATE INDEX` statements.
- **Query Refactors**: Optimized versions of problematic SQL queries.
- **Migration Plan**: Step-by-step procedure for deploying schema changes.
- **Performance Report**: Before/After metrics for optimized queries.
