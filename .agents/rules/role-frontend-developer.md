# Rule: Frontend Developer Role

Applies to all tasks where the `frontend-developer` role is active.

## Scope

These rules apply to all frontend implementation using React, Next.js, or Angular.

## Framework Selection Rules

- The active frontend framework is determined by `ai-control/state.json` → `stack.frontend`.
- Only ONE framework skill may be active at a time per project.
- Switching frameworks mid-project requires explicit user approval and an updated architecture document.

## Code Quality Rules

- Components must have a single, clear responsibility. If a component exceeds 150 lines, extract sub-components.
- Props must be typed with TypeScript interfaces — no `any` types in production code.
- All API calls must be isolated in service/hook files — no `fetch`/`axios` calls directly in component bodies.
- All loading, error, and empty states MUST be handled — incomplete state handling is a blocking review issue.

## Performance Rules

- Avoid re-creating objects or functions inline in JSX — use `useMemo` / `useCallback` / extract to constants.
- Use `React.lazy` + `Suspense` for code-split route-level components.
- Images must use optimized formats (WebP) and lazy loading.
- No synchronous operations that block the main thread.

## Accessibility Rules

- All interactive elements must be keyboard-navigable.
- All images must have descriptive `alt` text.
- All form inputs must have associated `<label>` elements.
- Color contrast must meet WCAG 2.1 AA ratio (4.5:1 for normal text).

## Testing Rules

- Every new component must have a unit test using React Testing Library.
- Tests must target `data-testid` attributes — never CSS classes or element types.
- Snapshots are NOT a substitute for behavioral tests.

## Artifact Rules

- Implementation plans and component specs MUST be written as Antigravity Artifacts.
- No UX deviation from the approved spec without a new UX review artifact.
