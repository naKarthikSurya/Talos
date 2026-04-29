---
name: security-architecture
description: >
  Defines security boundaries, zero-trust patterns, encryption strategy, secret management,
  and authentication flow architecture for the system.
---

# Security Architecture Skill

## Goal

Design the security model for the system so that each component operates with the minimum
required privilege, all data is encrypted at rest and in transit, and authentication
boundaries are clear and enforced.

## When to Use

- A new service or feature is being designed that handles user data or auth flows.
- The threat model must be updated after a significant architectural change.
- Secrets, API keys, or credentials need a secure management strategy.

## Security Layers to Define

| Layer | What to Design |
|---|---|
| Network | VPC, security groups, firewall rules, private subnets |
| Transport | HTTPS everywhere, TLS 1.2+, HSTS headers |
| Authentication | JWT/OAuth2 boundaries, token rotation, session management |
| Authorization | RBAC policy, resource ownership checks, least privilege |
| Data | Encryption at rest (AES-256), field-level encryption for PII |
| Secrets | AWS Secrets Manager, Vault, or environment injection |
| Dependencies | npm audit, Snyk, Dependabot scanning |

## Threat Modeling (STRIDE)

For each component, evaluate:
- **S**poofing — Can an attacker impersonate a user or service?
- **T**ampering — Can data be modified in transit or at rest?
- **R**epudiation — Can a user deny performing an action?
- **I**nformation Disclosure — Can sensitive data be leaked?
- **D**enial of Service — Can the service be made unavailable?
- **E**levation of Privilege — Can a user gain unauthorized access?

## Operating Procedure

1. Draw the trust boundary diagram.
2. Apply STRIDE to each component.
3. Define mitigations for each identified threat.
4. Define the secrets management strategy.
5. Define the encryption strategy for data at rest and in transit.

## Review Checklist

- [ ] Trust boundaries clearly defined
- [ ] STRIDE analysis completed for each component
- [ ] Secrets management strategy defined (no hardcoded secrets)
- [ ] All data classified (public, internal, confidential, restricted)
- [ ] Encryption strategy defined for confidential and restricted data
