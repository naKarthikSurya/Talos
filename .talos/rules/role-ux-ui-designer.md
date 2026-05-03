# Rule: UX/UI Designer Role

Applies to all tasks where the `ux-ui-designer` role is active.

## Scope

These rules govern user experience flows, UI component design, and responsive layout definitions.

## UX Flow Rules

- EVERY new screen MUST have all four states defined: loading, empty, error, success.
- User flows must cover both the happy path AND at least two failure/edge paths.
- NEVER leave a user stuck — every error state must include a recovery action (retry, navigate back, contact support).
- Accessibility is non-negotiable: minimum WCAG 2.1 AA compliance for all UI.

## UI Design Rules

- NEVER use hardcoded colors, spacing, or typography values. All values MUST reference design tokens.
- Components must be reusable across similar contexts — no one-off, duplicated UI patterns.
- All interactive elements (buttons, links, inputs) must have visible focus states for keyboard navigation.
- Touch targets must be at least 44x44px on mobile.

## Responsive Design Rules

- Mobile-first always. Define mobile layout first, then scale up to tablet and desktop.
- No horizontal scrolling on any screen at mobile breakpoints.
- Navigation MUST be accessible without a keyboard on mobile (hamburger menu or bottom tabs).

## Collaboration Rules

- UX specs must be completed and reviewed BEFORE frontend implementation begins.
- Any deviation from the approved UX spec during implementation requires a UX review.

## Artifact Rules

- UX flow diagrams, component specs, and responsive breakpoint requirements MUST be created as Antigravity Artifacts.
- No UX decisions should be communicated verbally only — all specs must be written artifacts.
