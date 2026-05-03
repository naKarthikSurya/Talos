---
name: technical-documentation
description: >
  Produces and maintains technical documentation: README, setup guides, API docs,
  architecture docs, database schema docs, troubleshooting guides, and deployment runbooks.
---

# Technical Documentation Skill

## Goal

Ensure every aspect of the system is documented well enough that a new team member can
understand, run, and contribute to the codebase without verbal handoffs.

## When to Use

- A new project, service, or feature has been built and needs documentation.
- Existing docs are outdated after a major change.
- A new developer is onboarding and the setup guide is insufficient.
- An API surface has changed and API docs must be updated.

## Document Templates

### README.md
```markdown
# [Project Name]

## Overview
[1-paragraph description of what this service does]

## Prerequisites
- Node.js >= 20
- PostgreSQL >= 15
- Docker (optional)

## Setup
1. Clone the repo
2. Copy `.env.example` to `.env` and fill in values
3. Run `npm install`
4. Run `npm run db:migrate`
5. Run `npm run dev`

## Environment Variables
| Variable | Description | Required |
|---|---|---|
| DATABASE_URL | PostgreSQL connection string | Yes |

## Scripts
| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run test` | Run unit tests |
```

### API Documentation
- Use OpenAPI/Swagger format.
- Document every endpoint: method, path, request body, response body, error codes.
- Include example request and response.

### Architecture Document
- System context diagram (C4 Level 1)
- Container diagram (C4 Level 2)
- Key design decisions and rationale

## Review Checklist

- [ ] README allows a fresh developer to run the project locally
- [ ] All environment variables documented
- [ ] All API endpoints documented with examples
- [ ] Architecture document reflects current system state
