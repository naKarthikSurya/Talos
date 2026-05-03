---
name: mvp-planning
description: >
  Scopes the minimum viable product version of a feature, defines phased rollout,
  and prioritizes requirements to ship the smallest valuable increment first.
---

# MVP Planning Skill

## Goal

Identify the smallest, shippable version of a feature that validates the core user need,
and define a phased roadmap for subsequent improvements.

## When to Use

- A feature has too many requirements to ship all at once.
- Stakeholders need to see value quickly before committing to full scope.
- Trade-offs must be made between must-have and nice-to-have capabilities.

## Operating Procedure

1. **List all requirements** from `requirement-analysis` output.
2. **Categorize each requirement**:
   - Must Have (P0): Feature cannot launch without this.
   - Should Have (P1): Important, but can ship without.
   - Nice to Have (P2): Future iteration.
3. **Define MVP scope**: Only P0 requirements.
4. **Define Phase 2 scope**: P1 requirements after MVP validates.
5. **Define Phase 3+**: P2 and beyond.
6. **Estimate MVP effort** in rough story points or T-shirt sizes.

## Output Format

```markdown
## MVP Scope (P0 - Must Have)
- [ ] User can register and log in
- [ ] User can upload a single file (max 10MB)
- [ ] Admin can view a list of uploaded files

## Phase 2 (P1 - Should Have)
- [ ] Bulk file upload
- [ ] File preview before upload
- [ ] Admin can delete files

## Phase 3 (P2 - Nice to Have)
- [ ] File versioning
- [ ] Drag-and-drop upload UI

## MVP Effort Estimate
- Development: ~5 story points
- Testing: ~2 story points
- Deployment: ~1 story point
```

## Review Checklist

- [ ] MVP scope contains only what is essential to validate the core user value
- [ ] Every P0 item is truly non-negotiable
- [ ] Effort estimate is provided
- [ ] Future phases are documented but not planned in detail
