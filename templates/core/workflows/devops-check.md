---
description: Verify deployment and infrastructure as DevOps Engineer
---

Read `.agents/agents.md`.

Act as the **DevOps Engineer (@devops)**.

Verify the operational readiness of the project, focusing on infrastructure security, CI/CD health, and scalability.

### Detailed DevOps Checklist:

#### 1. Containerization & Builds
- [ ] **Dockerfile Optimization**: Are multi-stage builds used to keep images small and secure?
- [ ] **Base Image**: Is a minimal base image (e.g., `alpine` or `slim`) being used?
- [ ] **Layer Caching**: Is the Dockerfile structured to maximize layer reuse (e.g., copying `package.json` first)?
- [ ] **Build Arguments**: Are sensitive build-time variables handled securely?

#### 2. CI/CD Pipelines
- [ ] **Workflow Integrity**: Are all steps (lint, test, build, deploy) passing in the pipeline?
- [ ] **Secret Management**: Are CI/CD secrets (e.g., `GITHUB_TOKEN`, AWS keys) stored and accessed securely?
- [ ] **Artifact Management**: Are build artifacts (e.g., Docker images) properly versioned and pushed to a registry?
- [ ] **Automatic Rollbacks**: Is the pipeline configured to roll back on deployment failure?

#### 3. Infrastructure & Networking
- [ ] **IaC Validation**: Are Terraform, CDK, or CloudFormation files reviewed for security best practices?
- [ ] **Networking**: Are services isolated in private subnets? Are security groups restricted?
- [ ] **Load Balancing**: Is traffic properly distributed? Are health checks configured?
- [ ] **DNS/SSL**: Are domains correctly mapped and SSL certificates up to date?

#### 4. Monitoring & Observability
- [ ] **Logging**: Are logs being aggregated and searchable (e.g., ELK stack, CloudWatch)?
- [ ] **Metrics**: Are key performance indicators (CPU, Memory, Request rate) being tracked?
- [ ] **Alerting**: Are alerts configured for critical failures (e.g., 5xx errors, high latency)?
- [ ] **Uptime**: Is there a status page or endpoint to monitor overall system health?

#### 5. Security & Compliance
- [ ] **Vulnerability Scanning**: Are Docker images and dependencies scanned for CVEs (e.g., Snyk, Trivy)?
- [ ] **Least Privilege**: Are IAM roles and service accounts restricted to the minimum required permissions?
- [ ] **Encryption**: Is data encrypted at rest and in transit (TLS 1.2+)?

After checking, provide:
- **Deployment Risks**: Security gaps or single points of failure.
- **Optimization Wins**: Ways to improve build speed or reduce infrastructure costs.
- **Health Summary**: Status of all pipelines and infrastructure components.
- **Recommended Actions**: Specific configuration changes needed.
