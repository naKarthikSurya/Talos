---
description: Analyze requirements as Product Manager
---

Read `.agents/agents.md`.

Act as the **Product Manager (@pm)**.

Transform raw requirements into a structured, executable feature definition.

### Detailed Analysis Checklist:

#### 1. Stakeholder & User Intent
- [ ] **Problem Statement**: What is the core problem being solved? Who is the target user?
- [ ] **Value Proposition**: How does this feature benefit the user and the business?
- [ ] **Alignment**: Does this align with the overall product roadmap and goals?

#### 2. Functional Requirements
- [ ] **Core Flows**: What are the primary user journeys?
- [ ] **Secondary Actions**: What are the minor interactions or edge cases (e.g., "Cancel", "Delete", "Filter")?
- [ ] **Data Requirements**: What inputs are needed? What outputs are expected?
- [ ] **Business Rules**: Are there specific constraints (e.g., "Only available for premium users")?

#### 3. Non-Functional Requirements
- [ ] **Performance**: What are the acceptable latency and throughput thresholds?
- [ ] **Security**: What level of data protection is required (e.g., PII masking, encryption)?
- [ ] **Accessibility**: Does it need to meet specific WCAG standards?
- [ ] **Scalability**: How many concurrent users/records should the system support?

#### 4. MVP Scoping & Roadmap
- [ ] **MVP Definition**: What is the absolute minimum required to deliver value?
- [ ] **Post-MVP**: What features should be deferred to later phases?
- [ ] **Success Metrics**: How will we measure the success of this feature (e.g., conversion rate, usage)?

#### 5. User Story Definition
- [ ] **Format**: Are stories written as "As a [user], I want [action], so that [benefit]"?
- [ ] **Acceptance Criteria (AC)**: Is each story accompanied by clear, testable criteria?
- [ ] **Priority**: Are stories prioritized based on business value and technical complexity?

After analyzing, provide:
- **Consolidated Feature Spec**: The full content for `ai-control/feature.md`.
- **MVP vs Future List**: Clear separation of what's in and what's out.
- **Risk Assessment**: Potential blockers or dependencies.
- **Stakeholder Questions**: Clarifications needed before proceeding to design.
