---
name: tailwind-styling
description: >
  Applies Tailwind CSS utility classes for consistent, responsive, and maintainable UI styling.
  Defines custom theme tokens, component classes with @apply, and dark mode support.
---

# Tailwind Styling Skill

## Goal

Implement consistent, maintainable, and responsive styling using Tailwind CSS without
cluttering templates with excessive utility classes.

## When to Use

- The project uses Tailwind CSS as its styling framework.
- A new component needs Tailwind utility classes applied.
- The Tailwind config needs to be extended with custom tokens.
- Dark mode or responsive variants need to be implemented.

## Rules

### Utility Class Usage
- Prefer semantic component classes via `@apply` in a CSS file for repeated patterns.
- Avoid more than 10 utility classes inline on a single element — extract to a component class.
- Use Tailwind's `@layer components` to register reusable classes.

### Custom Theme Tokens (`tailwind.config.ts`)
```ts
theme: {
  extend: {
    colors: {
      primary: { 500: '#6366f1', 600: '#4f46e5' },
      surface: { DEFAULT: '#0f172a', elevated: '#1e293b' },
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    borderRadius: {
      xl: '16px',
    },
  }
}
```

### Responsive Classes
- Always mobile-first: `class="text-sm md:text-base lg:text-lg"`
- Use `container mx-auto` for page-level centering.

### Dark Mode
- Use `dark:` variant with `class` strategy in tailwind config.
- `darkMode: 'class'` — toggle with a class on `<html>`.

### Component Class Pattern
```css
@layer components {
  .btn-primary {
    @apply px-6 py-3 bg-primary-500 text-white rounded-xl font-semibold
           hover:bg-primary-600 transition-colors disabled:opacity-40;
  }
}
```

## Review Checklist

- [ ] No more than 10 inline utility classes per element
- [ ] Repeated patterns extracted to `@layer components`
- [ ] Custom tokens in `tailwind.config.ts`, not hardcoded values
- [ ] Responsive variants applied mobile-first
- [ ] Dark mode variants included where applicable
