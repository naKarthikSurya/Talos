---
name: ui-component-design
description: >
  Defines UI component hierarchy, layout structure, typography, color usage, spacing,
  and design tokens for a feature. Produces component specs that frontend developers implement.
---

# UI Component Design Skill

## Goal

Define the component hierarchy, visual rules, and design tokens for a feature so that
frontend implementation is consistent, reusable, and aligned with the design system.

## When to Use

- A new feature requires new UI components.
- An existing component must be extended with new variants.
- The design system needs a new token, pattern, or component definition.

## Component Spec Format

```markdown
## Component: [ComponentName]

### Purpose
[What this component does and where it is used]

### Props / Inputs
| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| label | string | Yes | - | Button label text |
| variant | 'primary' \| 'secondary' | No | 'primary' | Visual style variant |

### Visual Rules
- Background: var(--color-primary-500)
- Text: var(--color-white)
- Border Radius: 8px
- Padding: 12px 24px
- Font: 16px / 600 weight

### States
- Default: [description]
- Hover: [description]
- Disabled: opacity 0.4, cursor not-allowed
- Loading: spinner replaces label

### Usage Example
[Show where this component is placed in the screen]
```

## Design Token Conventions

- Colors: `--color-{role}-{scale}` (e.g., `--color-primary-500`)
- Spacing: `--spacing-{size}` (e.g., `--spacing-md = 16px`)
- Typography: `--font-{weight}-{size}` (e.g., `--font-semibold-16`)
- Border radius: `--radius-{size}` (e.g., `--radius-lg = 12px`)

## Review Checklist

- [ ] Every new component has a written spec
- [ ] All states (hover, disabled, loading, error) are defined
- [ ] Design tokens used — no hardcoded color or spacing values
- [ ] Component is reusable across similar contexts
