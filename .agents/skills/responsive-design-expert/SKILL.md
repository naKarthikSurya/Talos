---
name: responsive-design-expert
description: >
  Ensures all UI layouts work correctly across mobile, tablet, and desktop breakpoints.
  Defines breakpoint strategies, fluid layouts, and touch-friendly interaction patterns.
---

# Responsive Design Expert Skill

## Goal

Ensure every screen and component in the application renders correctly and usably at all
viewport sizes from 320px (mobile) to 1440px+ (desktop).

## When to Use

- A new page or component has been designed and must be validated for responsiveness.
- A mobile breakpoint is broken in an existing UI.
- A layout must be adapted for a new device class (e.g., tablet).

## Standard Breakpoints

| Name | Min Width | Target Device |
|---|---|---|
| `xs` | 320px | Small mobile |
| `sm` | 480px | Mobile |
| `md` | 768px | Tablet |
| `lg` | 1024px | Small desktop |
| `xl` | 1280px | Desktop |
| `2xl` | 1536px | Large desktop |

## Mobile-First Rules

1. Design for mobile first — add complexity at wider breakpoints.
2. Touch targets must be at least 44x44px.
3. Font size minimum: 16px for body text (to prevent iOS auto-zoom).
4. No hover-only interactions — mobile has no hover state.
5. Navigation must collapse into a hamburger or bottom tab bar below `md`.

## Layout Patterns by Breakpoint

```
Mobile (< 768px): Single column, full-width cards, stacked sections
Tablet (768-1024px): 2-column grid, side-by-side cards
Desktop (> 1024px): 3-4 column grid, sidebars enabled, data tables visible
```

## Operating Procedure

1. Review the UI spec for each screen.
2. Define the layout behavior at each breakpoint.
3. Identify components that must change behavior (collapse, reorder, hide/show).
4. Define touch-friendly alternatives for hover interactions.
5. Verify font sizes, tap target sizes, and scroll behavior.

## Review Checklist

- [ ] Mobile layout defined for all screens
- [ ] Tablet layout defined for all screens
- [ ] Desktop layout defined for all screens
- [ ] All tap targets >= 44x44px
- [ ] No horizontal scroll on mobile
- [ ] Navigation is accessible on mobile
