# Workflow: UX/UI Designer Role

## Objective

Produce a complete UX flow spec and UI component design as Antigravity Artifacts
for an approved feature before frontend implementation begins.

## Active Rules

- `role-ux-ui-designer.md`

## Prerequisites

- `feature.md` Antigravity Artifact is approved.
- The feature involves new or modified user-facing screens.

---

## Phase 1: User Flow Mapping

1. Activate skill: `ux-research-flows`
2. Map the complete user journey: entry → happy path → success.
3. Map all failure paths: API errors, empty states, permission denied.
4. Define loading state for every async operation.
5. Define empty state with a clear CTA for every data-dependent view.
6. Document accessibility requirements (keyboard navigation, ARIA labels, color contrast).

> [!IMPORTANT]
> Write UX flow spec as an **Antigravity Artifact**:
> - **Type**: `other`
> - **Name**: `ux_flow_spec.md`
> - **RequestFeedback**: `true`
> - **Summary**: "UX flow spec for [feature name] — user journeys, states (loading/empty/error/success), accessibility notes."

---

## Phase 2: Component Design

1. Activate skill: `ui-component-design`
2. Define component hierarchy for each screen.
3. Write component spec for each new component: props, states, visual rules using design tokens.
4. Identify reusable components shareable across screens.

> [!IMPORTANT]
> Write component design spec as an **Antigravity Artifact**:
> - **Type**: `other`
> - **Name**: `component_design_spec.md`
> - **RequestFeedback**: `false`
> - **Summary**: "UI component specs for [feature name] — hierarchy, props, visual rules, design tokens."

---

## Phase 3: Responsive Breakpoints

1. Activate skill: `responsive-design-expert`
2. Define layout behavior at mobile (< 768px), tablet (768–1024px), desktop (> 1024px).
3. Identify components that change behavior across breakpoints.
4. Verify touch target sizes (≥ 44x44px) and no horizontal scroll on mobile.
5. Update `ux_flow_spec.md` artifact with responsive notes.

---

## Phase 4: Handoff

**STOP** — Present `ux_flow_spec.md` artifact to user and frontend developer before implementation begins.
