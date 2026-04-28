# Rule 00: Engineering Baseline

Applies to all agents, all stacks, all task types.

## Modularity

- Every unit of code (function, class, module, component, service) must have a single, well-defined responsibility.
- Boundaries between modules must be explicit and intentional. Side-effects that cross module boundaries must be documented.
- Shared logic belongs in a shared/common layer only when it has two or more distinct consumers. Do not create premature abstractions.

## Naming

- Names must communicate intent without requiring a comment to decode them.
- Abbreviations are prohibited unless they are domain-standard (e.g., `dto`, `id`, `url`).
- File names, function names, and variable names must be consistent with the project's existing conventions. Do not introduce new conventions mid-task.

## Readability

- Functions and methods must fit within a single screen (~40 lines) wherever possible. Extract if they grow beyond this.
- Avoid deeply nested logic (>3 levels of nesting). Use early returns, guard clauses, and extraction.
- Complex logic must have a comment explaining *why*, not *what*. Trivial logic must not have comments.

## Maintainability

- Do not leave dead code, commented-out blocks, or unreachable paths in the codebase.
- Do not introduce speculative abstractions ("we might need this later"). Implement what is needed now.
- Do not silently swallow errors. Every error must be handled, logged, or propagated deliberately.

## Focused Units

- A single PR or implementation task must address one concern. Do not mix feature work with refactoring or testing infrastructure changes unless the task explicitly calls for it.
- A task that grows beyond its defined scope must stop and seek re-triage.

## Explicit Over Implicit

- Behavior must not depend on undocumented side effects or ordering.
- Configuration must be explicit and visible — not hidden in framework defaults or environment assumptions.
- All public APIs (endpoints, exported functions, component props) must be typed.
