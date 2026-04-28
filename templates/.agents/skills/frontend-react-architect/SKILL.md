---
name: frontend-react-architect
description: >
  Use when designing the component architecture, state management strategy, data fetching
  approach, and API integration plan for a React feature. Produces solution.md and
  frontend_contract.md. Activate after product-manager-core approves feature.md.
---

# React Architect Skill

## Goal

Produce a React architecture design that defines component hierarchy, state ownership,
data flow, API integration boundaries, and form strategy — with enough specificity that
a developer can implement without re-making structural decisions.

## When to Use

- After `feature.md` approved, stage `ARCHITECT_DESIGN_PENDING`, stack `react`.

## Artifacts Written

- `ai-control/solution.md`
- `ai-control/frontend_contract.md` (if API is consumed)

## Operating Procedure

1. **Confirm stage and stack**: `ARCHITECT_DESIGN_PENDING`, stack `react`.
2. **Identify component hierarchy**: What is the top-level container? What are the presentational leaves? Where do data and event callbacks flow?
3. **Define state ownership**: What state lives where? Local `useState`? Lifted? TanStack Query? Zustand?
4. **Define data fetching**: Which component fetches? Which queries/mutations are needed? What are their keys and invalidation strategies?
5. **Define form strategy**: React Hook Form with Zod schema? What fields, what validation?
6. **Define routing changes**: New routes? Nested routes? Route params needed?
7. **Define API boundaries**: Which service functions are needed? What do they call?
8. **Design loading/error/empty states**: For every async operation, define explicit UI behavior for each state.
9. **Document trade-offs**.
10. **Write `solution.md` and `frontend_contract.md`**.
11. **Update state**: `USER_REVIEW_DESIGN_PENDING`. Stop for approval.

## Output: solution.md Structure

```markdown
# Architecture Design: <Feature Title>
**Stack**: React | **Date**: YYYY-MM-DD

## Component Tree
\`\`\`
<FeaturePage>                        ← smart: fetches data, manages query state
  <FeatureHeader />                  ← presentational: title + action buttons
  <FeatureList items={items} />      ← presentational: renders list
    <FeatureListItem item={item} />  ← presentational: single item
  <FeatureForm onSubmit={fn} />      ← handles form state, calls mutation
  <EmptyState />                     ← shown when list is empty
  <LoadingSkeleton />                ← shown while fetching
  <ErrorMessage error={error} />     ← shown on fetch error
\`\`\`

## State Ownership
| State | Location | Type | Reason |
| --- | --- | --- | --- |
| Feature list | useQuery('features') | Server | TanStack Query — cached, refetched |
| Modal open/closed | Local useState in FeaturePage | Client UI | Only one component cares |
| Selected filter | Zustand featureStore | Client | Persisted across navigation |

## Data Fetching Plan
| Query/Mutation | Key | Endpoint | Invalidates | Notes |
| --- | --- | --- | --- | --- |
| useFeatures | ['features'] | GET /api/features | — | staleTime: 5min |
| useCreateFeature | — | POST /api/features | ['features'] | optimistic update option |

## Form Design
- Library: React Hook Form + Zod
- Schema: \`createFeatureSchema\` — colocated with form component
- Fields: name (required, min 1), description (optional, max 500)
- Submit: disabled during mutation, re-enabled on error

## Service Layer
**File**: \`src/services/features.service.ts\`
- \`getFeatures(): Promise<Feature[]>\`
- \`createFeature(data: CreateFeatureInput): Promise<Feature>\`

## Routing Changes
- New route: \`/features\` → \`<FeaturePage />\`
- Add to \`src/router.tsx\`

## UI States Per Component
| Component | Loading | Error | Empty | Success |
| --- | --- | --- | --- | --- |
| FeatureList | Skeleton rows | Error banner | EmptyState illus. | Renders items |

## Design Decisions
| Decision | Chosen | Alternative | Rationale |
| --- | --- | --- | --- |
| ... | ... | ... | ... |
```

## Constraints

- Apply rule `20-frontend-react.md`.
- Every async operation must have loading/error/empty states defined.
- Do not default to Context for state — explicitly justify if Context is chosen over TanStack Query or Zustand.
- Do not proceed without user design approval.

## Review Checklist

- [ ] Component tree named, responsibilities defined.
- [ ] State ownership table complete.
- [ ] Every async operation has all three UI states defined.
- [ ] Service functions listed with signatures.
- [ ] Form schema and fields designed.
- [ ] `frontend_contract.md` written if API consumed.
- [ ] `state.json` updated to `USER_REVIEW_DESIGN_PENDING`.
