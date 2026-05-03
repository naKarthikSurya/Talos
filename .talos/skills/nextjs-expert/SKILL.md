---
name: nextjs-expert
description: >
  Implements Next.js features using App Router, Server Components, Client Components,
  Server Actions, data fetching strategies (fetch with cache), middleware, metadata API,
  and deployment to Vercel. Uses TypeScript throughout.
---

# Next.js Expert Skill

## Goal

Implement production-grade Next.js applications using the App Router with correct
Server/Client Component boundaries, optimal data fetching, and SEO-friendly metadata.

## When to Use

- The project uses Next.js 13+ with the App Router.
- A new page, layout, server action, or API route must be implemented.
- SSR, SSG, or ISR strategy must be chosen for a page.
- Middleware for auth, redirects, or edge logic must be implemented.

## App Router Directory Structure

```
app/
  layout.tsx            # Root layout (Server Component)
  page.tsx              # Home page (Server Component)
  (auth)/               # Route group for auth pages
    login/page.tsx
  dashboard/
    layout.tsx          # Dashboard layout
    page.tsx            # Dashboard page
    loading.tsx         # Streaming loading UI
    error.tsx           # Error boundary
  api/                  # Route handlers (API routes)
    [route]/route.ts
components/
  ui/                   # Client Components (interactive)
  server/               # Server Components (data display)
```

## Component Boundary Rules

| Use Server Component | Use Client Component |
|---|---|
| Fetching data from DB/API | Using useState or useEffect |
| Rendering non-interactive UI | Handling user events (onClick, onChange) |
| Accessing server-only env vars | Using browser APIs |
| Reducing JS bundle size | Using React Context |

## Data Fetching Rules

- `fetch(url, { cache: 'force-cache' })` → Static (SSG)
- `fetch(url, { next: { revalidate: 60 } })` → ISR
- `fetch(url, { cache: 'no-store' })` → Dynamic (SSR)
- Database calls in Server Components → direct, no API layer needed

## Server Actions

- Use for form submissions and mutations from Server Components.
- Mark with `'use server'` directive.
- Always validate input on the server side.
- Return typed result objects, never throw raw errors to the client.

## Review Checklist

- [ ] Correct Server/Client Component boundary chosen
- [ ] Data fetching strategy matches the page's freshness requirements
- [ ] Metadata (title, description, og:image) defined for every page
- [ ] loading.tsx and error.tsx defined for data-fetching routes
- [ ] No secrets or server-only code in Client Components
