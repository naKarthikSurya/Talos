---
name: api-design-standard
description: >
  Enforces REST and GraphQL API design standards: versioning, pagination, filtering, sorting,
  error response format, HTTP status codes, and OpenAPI documentation. Applied alongside any
  backend framework skill.
---

# API Design Standard Skill

## Goal

Ensure every API endpoint follows consistent conventions so that frontend consumers,
external partners, and automated tools can integrate with confidence.

## When to Use

- Any new REST or GraphQL endpoint is being implemented.
- An existing endpoint has inconsistent response shape or error format.
- API documentation must be generated or updated.

## REST Conventions

### URL Design

- Use nouns, not verbs: `/users` not `/getUsers`
- Use plural resource names: `/orders`, `/products`
- Nest sub-resources: `/users/:id/orders`
- API versioning via URL prefix: `/api/v1/`

### HTTP Methods

| Method | Use | Success Code |
|---|---|---|
| GET | Read resource | 200 |
| POST | Create resource | 201 |
| PUT | Replace resource | 200 |
| PATCH | Partially update | 200 |
| DELETE | Remove resource | 204 |

### Standard Response Shape

```json
{
  "success": true,
  "data": { ... },
  "message": "Resource created successfully",
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 200,
    "totalPages": 10
  }
}
```

### Standard Error Shape

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [{ "field": "email", "issue": "Invalid email format" }]
  }
}
```

### Pagination

- Always paginate list endpoints: `?page=1&limit=20`
- Include `meta.total` and `meta.totalPages` in response.

### Filtering & Sorting

- Filter: `?filter={"status":"active"}`
- Sort: `?sortBy=createdAt&sortOrder=DESC`
- Search: `?search=keyword`

## Review Checklist

- [ ] All endpoints use correct HTTP method and status code
- [ ] All list endpoints are paginated
- [ ] All error responses use the standard error shape
- [ ] All endpoints documented in OpenAPI/Swagger
- [ ] No sensitive data (passwords, tokens) returned in responses
