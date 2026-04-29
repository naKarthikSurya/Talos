---
name: docker-containerization
description: >
  Writes Dockerfiles, docker-compose configurations, and multi-stage builds for Node.js,
  Python, and other services. Defines health checks, volume mounts, and network configuration.
---

# Docker Containerization Skill

## Goal

Containerize every application service so it runs identically in development, staging,
and production without environment-specific configuration.

## When to Use

- A new service must be containerized.
- An existing Dockerfile is outdated, insecure, or producing a bloated image.
- A `docker-compose.yml` must be set up or updated for local development.
- A multi-stage build is needed to reduce production image size.

## Node.js Dockerfile (Multi-Stage)

```dockerfile
# ---- Build Stage ----
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ---- Production Stage ----
FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force
COPY --from=builder /app/dist ./dist
EXPOSE 3000
USER node
HEALTHCHECK --interval=30s --timeout=5s CMD wget -qO- http://localhost:3000/health || exit 1
CMD ["node", "dist/main.js"]
```

## Python/FastAPI Dockerfile

```dockerfile
FROM python:3.12-slim AS base
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
USER nobody
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## docker-compose.yml (Development)

```yaml
version: '3.9'
services:
  api:
    build: .
    ports: ["3000:3000"]
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/mydb
    depends_on:
      db:
        condition: service_healthy
    volumes:
      - ./src:/app/src   # Hot reload in dev

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: mydb
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
    volumes:
      - pg_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d mydb"]
      interval: 10s
      retries: 5

volumes:
  pg_data:
```

## Rules

- Never run containers as root. Use `USER node` or `USER nobody`.
- Never copy `.env` files into images. Inject at runtime.
- Use `HEALTHCHECK` in every service container.
- Use `npm ci` not `npm install` in Dockerfiles (deterministic installs).
- Use Alpine or slim base images to minimize attack surface and image size.

## Review Checklist

- [ ] Multi-stage build used for production images
- [ ] Container runs as non-root user
- [ ] No secrets or `.env` files baked into image
- [ ] `HEALTHCHECK` defined
- [ ] `depends_on` with health conditions in docker-compose
- [ ] Image size < 500MB (use `docker image ls` to verify)
