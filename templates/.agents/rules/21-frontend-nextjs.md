# Rule 21: Frontend — Next.js

Applies to all Next.js (App Router) development tasks.

## Server vs Client Component Boundary

- Default to Server Components. The `"use client"` directive is opt-in, not default.
- Add `"use client"` only when the component requires: `useState`, `useEffect`, `useRef`, browser APIs, event handlers, or third-party client-only libraries.
- Push `"use client"` to the leaf level. A layout or page that needs one interactive child should mark only that child as client, not the whole subtree.
- Server Components cannot use browser APIs, hooks, or event handlers. If the compiler rejects it, do not add `"use client"` to silence the error — fix the component structure.

## Data Fetching

- Fetch data in Server Components using `async/await` directly. Do not use `useEffect` for initial data loads that can be done server-side.
- Assign correct cache behavior per route: `cache: 'force-cache'` for static, `cache: 'no-store'` for dynamic, `next: { revalidate: N }` for ISR.
- Use `Promise.all([...])` for independent parallel fetches in a Server Component. Never `await` sequential fetches when data is independent.
- For client-side mutations, post-load interactions, or real-time data: TanStack Query or SWR in a Client Component.

## Route Segment Completeness

- Every route segment must have `loading.tsx` (Suspense boundary fallback) and `error.tsx` (error boundary — must include `"use client"`).
- Dynamic routes (`[slug]`, `[id]`) must call `notFound()` for unknown parameters — never render empty shells.
- Use `generateStaticParams` for dynamic routes that can be pre-rendered at build time.

## Server Actions

- Use Server Actions for form mutations and data writes initiated from the UI.
- All Server Action inputs must be validated with Zod before any processing.
- After a successful mutation, call `revalidatePath()` or `revalidateTag()` to invalidate stale cache.
- Never put secrets, database queries, or business logic in code that shares a file with `"use client"` components — use a separate server module.

## SEO and Performance

- Every page exports `generateMetadata()` with at minimum: `title`, `description`, and Open Graph `og:title` / `og:description`.
- All images use `<Image>` from `next/image` with explicit `width`, `height`, and `alt`. No raw `<img>` tags.
- All internal navigation uses `<Link>` from `next/link`. No `<a href>` for SPA navigation.
- Fonts loaded via `next/font`. No manual `<link>` font imports.

## Security

- Environment variables without the `NEXT_PUBLIC_` prefix are server-only. Never reference them in Client Components.
- Authentication enforced in `middleware.ts` for protected route groups. Do not rely solely on client-side redirect logic.
