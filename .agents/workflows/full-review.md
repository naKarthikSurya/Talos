---
description: Run a full role-based project review
---

Read `.agents/agents.md`.

Perform a comprehensive, multi-perspective project review. Follow this sequence strictly to ensure all layers are evaluated.

### Execution Sequence:

#### 1. Architectural Strategy (@architect)
- **Goal**: Validate the foundation.
- **Detailed Checklist**:
    - [ ] Distributed boundaries and communication patterns.
    - [ ] Scalability and performance SLAs.
    - [ ] High-level security model (ADRs).
- **Output**: Summary of architectural risks and design alignment.

#### 2. Backend & Data Integrity (@backend + @db)
- **Goal**: Audit the server-side implementation and data layer.
- **Detailed Checklist**:
    - [ ] API contract alignment and DTO validation.
    - [ ] N+1 queries and database indexing strategy.
    - [ ] Auth guards and sensitive data handling.
- **Output**: List of backend anti-patterns and database optimization wins.

#### 3. Frontend & UX Excellence (@frontend + @designer)
- **Goal**: Review the user-facing interface and experience.
- **Detailed Checklist**:
    - [ ] Design system consistency and responsive layout.
    - [ ] Component reusability and state management.
    - [ ] Accessibility (WCAG) and keyboard navigation.
- **Output**: Visual/UX friction points and component refactoring needs.

#### 4. Quality & Security Audit (@qa + @security)
- **Goal**: Final verification of correctness and hardening.
- **Detailed Checklist**:
    - [ ] Bug hunting, edge cases, and functional regressions.
    - [ ] Automated test coverage (Unit, Integration, E2E).
    - [ ] OWASP Top 10 vulnerabilities and observability setup.
- **Output**: Bug report, coverage analysis, and security hardening steps.

---

### Final Reporting Structure:

# Full Project Review Report

## 🏗️ Architectural Foundations
## ⚙️ Backend & Data Layer
## 🎨 Frontend & User Experience
## 🛡️ Security & Observability
## 🧪 Quality Assurance & Testing
## 🚀 Final Priority Fix List (Consolidated)
> Ranked by severity (P0: Critical, P1: High, P2: Normal)
