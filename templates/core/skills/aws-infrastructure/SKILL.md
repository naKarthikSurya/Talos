---
name: aws-infrastructure
description: >
  Provisions and manages AWS resources including EC2, ECS, RDS, S3, Lambda, IAM, Route 53,
  CloudWatch, and API Gateway. Uses Infrastructure-as-Code (Terraform or AWS CDK) for
  reproducible and reviewable infrastructure.
---

# AWS Infrastructure Skill

## Goal

Provision, configure, and maintain cloud infrastructure on AWS in a reproducible,
auditable, and secure way using Infrastructure-as-Code.

## When to Use

- A new service must be deployed to AWS.
- Existing AWS infrastructure must be modified (resize, add service, update IAM).
- DNS, SSL, or load balancer configuration must be updated.
- Cost optimization is needed for existing infrastructure.

## Core AWS Services Reference

| Service | Use Case |
|---|---|
| EC2 | Long-running backend servers |
| ECS Fargate | Containerized services (serverless containers) |
| RDS PostgreSQL | Managed relational database |
| ElastiCache (Redis) | Managed Redis caching layer |
| S3 | File storage, static assets |
| CloudFront | CDN for frontend and S3 assets |
| Lambda | Lightweight event-driven functions |
| API Gateway | Managed HTTP API frontend for Lambda |
| Route 53 | DNS management |
| ACM | SSL/TLS certificate management (free) |
| IAM | Access control for all AWS services |
| CloudWatch | Logs and metrics |
| Secrets Manager | Secure secret storage |

## IAM Rules

- Apply principle of least privilege to all roles.
- Never use root account credentials.
- Use IAM roles for EC2/ECS — never embed AWS keys in code.
- Create separate IAM roles per service.

## Terraform Pattern

```hcl
# ECS Service
resource "aws_ecs_service" "api" {
  name            = "api-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.api.arn
  desired_count   = 2
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = var.private_subnet_ids
    security_groups  = [aws_security_group.api.id]
    assign_public_ip = false
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.api.arn
    container_name   = "api"
    container_port   = 3000
  }
}
```

## Operating Procedure

1. Identify the infrastructure requirement from the architecture document.
2. Write Terraform or CDK code for the required resource.
3. Run `terraform plan` to preview changes.
4. Apply to staging first. Validate service health.
5. Apply to production with a change window if required.
6. Update infrastructure documentation.

## Review Checklist

- [ ] All resources tagged: `Environment`, `Project`, `Owner`
- [ ] IAM roles follow least privilege
- [ ] RDS not publicly accessible
- [ ] S3 buckets block public access by default
- [ ] CloudWatch alarms configured for CPU, memory, error rate
- [ ] Terraform state stored in S3 with DynamoDB locking
