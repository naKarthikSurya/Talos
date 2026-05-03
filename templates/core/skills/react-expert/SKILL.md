---
name: react-expert
description: >
  Implements React features using functional components, hooks (useState, useEffect, useMemo,
  useCallback, useContext), React Router, API integration, form handling, error boundaries,
  and performance optimization. Uses TypeScript throughout.
---

# React Expert Skill

## Goal

Implement correct, performant, and accessible React components with clean separation between
UI, state, and data fetching concerns.

## When to Use

- The project uses React (with Vite or CRA) as the frontend framework.
- A new component, page, hook, or context needs to be implemented.
- An existing React feature has a bug, performance issue, or accessibility failure.

## Project Structure Convention

```
src/
  components/          # Reusable UI components
  pages/               # Route-level page components
  hooks/               # Custom React hooks
  contexts/            # React Context providers
  services/            # API call functions (fetch/axios wrappers)
  types/               # TypeScript interfaces and types
  utils/               # Pure utility functions
```

## Implementation Rules

### Components
- Prefer functional components with TypeScript props interface.
- Keep components small: < 150 lines. Extract sub-components if larger.
- Co-locate component-specific styles, tests, and types.

### State Management
- `useState` for local UI state.
- `useContext` + `useReducer` for shared state that doesn't need a library.
- Only introduce Redux/Zustand if state is complex, cross-cutting, and frequently updated.

### Data Fetching
- Use `useEffect` + `fetch`/`axios` for simple data loading.
- Use React Query or SWR for server-state management (caching, refetch, loading states).
- Always handle loading, error, and empty states.

### Performance
- Wrap expensive computations in `useMemo`.
- Wrap callback props in `useCallback` to prevent child re-renders.
- Use `React.lazy` + `Suspense` for code-split route components.
- Use `React.memo` only when profiling confirms unnecessary re-renders.

## Review Checklist

- [ ] Component props typed with TypeScript interface
- [ ] Loading, error, and empty states handled
- [ ] No inline function definitions in JSX that could cause re-renders
- [ ] Accessibility attributes (aria-label, role, tabIndex) where needed
- [ ] Unit test with React Testing Library covering the happy path
