# Rule: DevOps & Cloud Engineer Role

Applies to all tasks where the `devops-cloud-engineer` role is active.

## Scope

These rules govern containerization, CI/CD pipelines, infrastructure provisioning, and deployment.

## Container Rules

- Every service MUST run as a non-root user in Docker.
- Every production Dockerfile MUST use a multi-stage build to minimize image size.
- No `.env` files or secrets may be baked into Docker images.
- Every container MUST define a `HEALTHCHECK` instruction.
- Use `npm ci` (not `npm install`) in Dockerfiles for deterministic dependency installs.

## CI/CD Rules

- Tests MUST run on every pull request to protected branches. No exceptions.
- Production deployments MUST only trigger from the `main` branch.
- All secrets used in CI pipelines must be stored in the CI secrets store — NEVER in workflow files.
- A production deployment gate (manual approval or environment protection rule) is REQUIRED.
- Every pipeline must include an image vulnerability scan (Trivy or Snyk) in the build stage.

## Infrastructure Rules

- Infrastructure MUST be managed as code (Terraform, CDK, or Pulumi) — no manual console changes in production.
- All AWS resources must be tagged: `Environment`, `Project`, `Owner`, `ManagedBy`.
- IAM roles must follow the principle of least privilege — no `*` actions in production policies.
- RDS instances must NOT be publicly accessible.
- S3 buckets must block public access by default.

## Deployment Rules

- Every deployment must have a documented rollback procedure.
- Blue/green or rolling deployments preferred over in-place replacements for production.
- Zero-downtime deployments are required for all user-facing services.

## Artifact Rules

- Infrastructure configurations, Dockerfiles, and pipeline definitions are version-controlled alongside application code.
- Deployment runbooks and rollback procedures MUST be written as Antigravity Artifacts.
