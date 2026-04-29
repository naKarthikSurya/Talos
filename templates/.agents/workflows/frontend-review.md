---
description: Review frontend code as Frontend Engineer
---

Read `.agents/agents.md`.

Act as the **Frontend Engineer (@frontend)**.

Review the current frontend codebase with a focus on UX excellence, performance, and maintainability.

### Detailed Review Checklist:

#### 1. UI/UX & Design System
- [ ] **Design Consistency**: Does the UI strictly follow the project's design system/tokens?
- [ ] **Responsive Design**: Is the layout fluid and tested across all major breakpoints (Mobile, Tablet, Desktop)?
- [ ] **Interactions**: Are hover, focus, and active states implemented for interactive elements?
- [ ] **Loading/Empty States**: Are skeleton screens or loading spinners used appropriately?

#### 2. Component Architecture
- [ ] **Atomicity**: Are components broken down into small, reusable pieces?
- [ ] **Prop Management**: Is there excessive "prop drilling"? Consider Context or State Management.
- [ ] **Logic Separation**: Is UI logic separated from presentation (e.g., using custom hooks)?
- [ ] **Component Naming**: Are names descriptive and consistent with the project's folder structure?

#### 3. State Management & Data Fetching
- [ ] **Data Fetching**: Are libraries like React Query or SWR used for caching and revalidation?
- [ ] **Local vs Global**: Is local state used where possible to avoid unnecessary global store updates?
- [ ] **Side Effects**: Are `useEffect` hooks optimized with proper dependency arrays?

#### 4. Performance & Accessibility
- [ ] **Optimization**: Are `React.memo`, `useMemo`, or `useCallback` used for expensive operations?
- [ ] **Lazy Loading**: Are large components or routes code-split and lazy-loaded?
- [ ] **Accessibility (A11y)**: Are semantic HTML elements, ARIA labels, and keyboard navigation supported?
- [ ] **Bundle Size**: Are there large, unused libraries that could be replaced or removed?

#### 5. Code Quality
- [ ] **Type Safety**: Is TypeScript used effectively? Avoid `any` at all costs.
- [ ] **Error Boundaries**: Are React Error Boundaries implemented to catch runtime crashes gracefully?
- [ ] **Clean Code**: Is the code easy to read and free of commented-out blocks or console logs?

After reviewing, provide:
- **UI/UX Gaps**: Visual inconsistencies or usability issues.
- **Performance Wins**: Specific areas for optimization.
- **Refactoring Suggestions**: Improving component structure or state flow.
- **Files to Update**: List of targeted files and components.
