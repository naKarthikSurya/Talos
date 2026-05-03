---
name: nosql-modeling
description: >
  Designs document, key-value, and wide-column data models for MongoDB, Redis, and DynamoDB.
  Defines access patterns, document structure, key design, TTL, and indexing strategy.
---

# NoSQL Modeling Skill

## Goal

Design NoSQL data models that optimize for the application's primary read and write access
patterns, avoiding the common mistake of applying relational thinking to document databases.

## When to Use

- A feature requires MongoDB, Redis, or DynamoDB as its primary data store.
- An existing NoSQL schema is causing slow queries or complex application-level joins.
- A caching layer with Redis must be designed (key schema, TTL, eviction policy).

## MongoDB Modeling Rules

### Embed vs. Reference Decision
| Embed When | Reference When |
|---|---|
| Data is always read together | Data is read independently |
| Child data is small and bounded | Child data can grow unboundedly |
| 1-to-few relationship | 1-to-many or many-to-many |

### Document Design
```js
// Good: Embed address inside user (always read together)
{
  _id: ObjectId,
  name: "John",
  address: { street: "123 Main St", city: "Chennai" }
}

// Good: Reference orders from user (orders are many and read separately)
{
  _id: ObjectId,
  name: "John",
  orderIds: [ObjectId, ObjectId]   // Or use reverse reference in orders
}
```

### MongoDB Indexes
```js
// Single field
db.users.createIndex({ email: 1 }, { unique: true })

// Compound (order matters — matches query field order)
db.orders.createIndex({ userId: 1, status: 1 })

// TTL index (auto-expire documents)
db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 })
```

## Redis Key Design Rules

- Format: `<service>:<entity>:<id>:<field>` — e.g., `auth:user:123:session`
- Always set a TTL — no indefinitely persisting keys.
- Use Redis Hashes for objects, Strings for simple values, Sorted Sets for leaderboards.
- Use `SCAN` not `KEYS *` in production.

## Operating Procedure

1. List all primary access patterns (what queries the app runs).
2. Design the document/key structure to serve those patterns without joins.
3. Define indexes for secondary access patterns.
4. Define TTL for cache and session data.
5. Define eviction policy (`allkeys-lru` for pure cache, `noeviction` for persistent data).

## Review Checklist

- [ ] Document structure designed around access patterns, not data relationships
- [ ] Embed/reference decision documented for each relationship
- [ ] All queried fields have indexes
- [ ] All cache keys have TTL
- [ ] No unbounded array growth in embedded documents
