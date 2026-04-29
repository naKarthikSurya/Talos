---
name: frontend-nextjs-architect
description: >
  Use when designing the App Router structure, Server/Client Component boundaries,
  data fetching strategy, caching model, and Server Action or API route design for
  a Next.js feature. Produces solution.md and frontend_contract.md. Activate after
  product-manager-core approves feature.md.
---

# Next.js Architect Skill

## Goal

Produce a Next.js App Router architecture that makes explicit Server/Client boundaries,
caching decisions, data fetching placement, and mutation strategy — preventing the most
common Next.js architectural mistakes before they are coded.

## When to Use

- Stage `ARCHITECT_DESIGN_PENDING`, stack `nextjs`.

## Artifacts Written

- `ai-control/solution.md`
- `ai-control/frontend_contract.md` (if API consumed)

## Operating Procedure

1. **Confirm stage and stack**.
2. **Design the route structure**: App Router segments, route groups, dynamic routes.
3. **Define Server vs Client boundaries for each component**: Default Server. Justify each `"use client"` explicitly.
4. **Define data fetching strategy per route**: static / dynamic / ISR? `cache` options? `revalidatePath` / `revalidateTag` targets?
5. **Design mutations**: Server Actions (preferred) vs Route Handlers? Zod validation in Action?
6. **Design loading/error/not-found**: Which segments need `loading.tsx`, `error.tsx`, `not-found.tsx`?
7. **Design metadata**: `generateMetadata()` for each page.
8. **Design auth flow**: Middleware protection? Session access in Server Component?
9. **Identify API Routes if needed**: External consumers, webhooks, non-browser clients.
10. **Write solution.md and frontend_contract.md**.
11. **Update state**: `USER_REVIEW_DESIGN_PENDING`. Stop.

## Output: solution.md Structure

```markdown
# Architecture Design: <Feature Title>
**Stack**: Next.js App Router | **Date**: YYYY-MM-DD

## Route Structure
\`\`\`
app/
  (dashboard)/
    features/
      page.tsx            ← Server Component — fetches initial list
      loading.tsx         ← Skeleton for Suspense
      error.tsx           ← Error boundary ("use client")
      [id]/
        page.tsx          ← Server Component — fetches single feature
        not-found.tsx     ← Called when feature ID not found
      _components/
        FeatureList.tsx   ← Server Component — renders list
        FeatureForm.tsx   ← Client Component ("use client") — form with state
        DeleteButton.tsx  ← Client Component — triggers Server Action
\`\`\`

## Server vs Client Component Decisions
| Component | Type | Reason |
| --- | --- | --- |
| page.tsx | Server | Fetches data on server, no browser APIs needed |
| FeatureList | Server | Pure rendering, no interactivity |
| FeatureForm | Client | useState + form event handlers |
| DeleteButton | Client | onClick handler + loading state |

## Data Fetching Strategy
| Route | Method | Cache Setting | Revalidation |
| --- | --- | --- | --- |
| /features | Server Component fetch | no-store | — (real-time) |
| /features/[id] | Server Component fetch | revalidate: 60 | revalidateTag('feature-{id}') on mutation |

## Server Actions
\`\`\`typescript
// app/features/actions.ts
"use server"
import { z } from "zod"
const schema = z.object({ name: z.string().min(1) })

export async function createFeature(formData: FormData) {
  const parsed = schema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) return { error: parsed.error.flatten() }
  // ... db operation
  revalidatePath('/features')
}
\`\`\`

## Loading / Error / Not-Found Plan
| Route Segment | loading.tsx | error.tsx | not-found.tsx |
| --- | --- | --- | --- |
| features/ | Yes — skeleton list | Yes | No |
| features/[id] | Yes — detail skeleton | Yes | Yes — invalid ID |

## Metadata
| Page | title | description |
| --- | --- | --- |
| /features | "Features — AppName" | "Manage your features" |

## Middleware / Auth
- Protected by middleware matcher: `'/features/:path*'`
- Session read in Server Components via `auth()` from NextAuth

## API Routes (if needed)
- None / Yes: `app/api/features/route.ts` for <reason>

## Design Decisions
| Decision | Chosen | Alternative | Rationale |
| --- | --- | --- | --- |
| Mutations | Server Actions | Route Handlers | Less client code, built-in CSRF |

## Trade-offs and Risks
- <item>
```

## Constraints

- Apply rule `21-frontend-nextjs.md`.
- Every `"use client"` addition must be justified in the design.
- Every data fetch must have an explicit cache strategy — "default" is not a strategy.
- Do not proceed without user design approval.

## Review Checklist

- [ ] Every route segment named in the design.
- [ ] Every component classified as Server or Client with justification.
- [ ] Data fetching cache strategy defined per route.
- [ ] Server Actions or Route Handlers designed with Zod validation noted.
- [ ] `loading.tsx` / `error.tsx` / `not-found.tsx` planned per segment.
- [ ] Metadata strategy defined.
- [ ] `state.json` updated to `USER_REVIEW_DESIGN_PENDING`.
