# Rule 20: Frontend — React

Applies to all React development tasks.

## Component Responsibility

- Components are either presentational (receive props, render UI, emit events) or smart (fetch data, manage state, compose presentational components). Never mix both concerns in a single component.
- A component that exceeds ~100 lines almost always has more than one responsibility. Extract.
- No class components. All components are functions. No exceptions.
- All props are typed with a `Props` interface or `type Props`. No untyped props, no `any`.

## State Placement

- Local component state (`useState`, `useReducer`) for state that only one component cares about.
- Lifted state for state shared between two sibling components — lift to the nearest common ancestor, no higher.
- TanStack Query (`useQuery`, `useMutation`) for all server state: fetching, caching, background refresh, optimistic updates.
- Zustand (or equivalent) for global client-only UI state (theme, modal open/close, user session). Do not use Context for frequently-updating values.
- Derived state is computed inline or via `useMemo`. It is never stored in state.

## Hooks Discipline

- Custom hooks encapsulate reusable stateful logic. A component file with more than 2 `useEffect` calls likely needs a custom hook extraction.
- `useEffect` must have a correct dependency array. Empty arrays (`[]`) are acceptable only for on-mount initialization with explicit documentation.
- Do not use `useEffect` to sync one piece of state from another — derive or restructure.
- `useMemo` and `useCallback` are performance tools, not correctness tools. Apply only after measuring a real performance problem.

## Data Fetching

- All API calls in service functions under `src/services/` or `src/api/`. Never inline `fetch` or `axios` in a component body.
- Every data-fetching component must handle three UI states explicitly: loading skeleton, error message, and empty state. Never leave any of these implicit.
- Cache invalidation after mutations must be explicit via `queryClient.invalidateQueries()`.

## Forms

- React Hook Form for all non-trivial forms. No per-field `useState` for form values.
- Zod schema co-located with the form for validation. `zodResolver` connects the schema to React Hook Form.
- Disable the submit button and show a loading indicator on submission. Prevent double-submission.
- Display server validation errors mapped to their respective fields where the API provides field-level error information.

## Accessibility

- Use semantic HTML elements (`<button>`, `<nav>`, `<main>`, `<section>`, `<header>`) instead of `<div>` with click handlers.
- All interactive elements must be reachable and operable via keyboard.
- All images: meaningful `alt` text, or `alt=""` for decorative images.
- Do not remove focus outlines without replacing them with a visible alternative.
