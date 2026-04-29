# Workflow: DevOps & Cloud Engineer Role

## Objective

Containerize services, configure CI/CD pipelines, provision cloud infrastructure,
and ensure deployments are automated, reproducible, and safe. Plans written as Antigravity Artifacts.

## Active Rules

- `role-devops-cloud-engineer.md`

## Prerequisites

- Service implementation is complete or a new deployment environment is required.
- `state.md` → `stack.cloud` is defined.

---

## Phase 1: Containerization

1. Activate skill: `docker-containerization`
2. Write or update `Dockerfile` (multi-stage build, non-root user, HEALTHCHECK).
3. Update `docker-compose.yml` for local development.
4. Test: `docker build && docker run` — verify container starts and health check passes.

---

## Phase 2: CI/CD Pipeline

1. Activate skill: `ci-cd-pipelines`
2. Write or update GitHub Actions pipeline (lint → test → build → scan → deploy-staging → deploy-production).
3. Production deploy only from `main` branch.
4. Add environment protection rule for production.
5. Verify pipeline runs successfully.

---

## Phase 3: Cloud Infrastructure

1. Activate skill: `aws-infrastructure`
2. Write Terraform or CDK code for required resources.
3. Run `terraform plan`. Review. Apply to staging. Validate.
4. Apply to production. Verify health.
5. Tag all resources: `Environment`, `Project`, `Owner`, `ManagedBy=terraform`.

---

## Phase 4: Deployment Runbook Artifact

> [!IMPORTANT]
> Write deployment runbook as an **Antigravity Artifact**:
> - **Type**: `other`
> - **Name**: `deployment_runbook.md`
> - **RequestFeedback**: `false`
> - **Summary**: "Deployment runbook for [service name] — deployment steps, rollback procedure, smoke test commands, on-call escalation."

Update `state.md` with deployment configuration reference.
