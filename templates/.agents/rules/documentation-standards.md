# Documentation Standards Rule

This rule defines the quality bar for all technical documentation produced by the squad.

## Audience Awareness

- Always write for a new developer joining the project — they have general programming knowledge but zero project context.
- Avoid assumptions: define acronyms on first use, explain non-obvious patterns.
- Lead with the most important information — do not bury the purpose.

## File-Level Standards

### README.md

Every project must have a README with: overview, prerequisites, setup steps, environment variables table, how to run, how to test, and a project structure diagram. No placeholders — every section must be filled.

### CHANGELOG.md

Follow Keep a Changelog format. Every release has: version, date, and sections for Added / Changed / Deprecated / Removed / Fixed / Security.

### ADR (Architecture Decision Records)

Stored in `docs/adr/ADR-NNN-title.md`. Created for every significant architectural decision. Never deleted — superseded ADRs are marked as such.

## Writing Standards

- **Present tense** for descriptions: "The API returns..." not "The API will return..."
- **Imperative mood** for instructions: "Run `npm install`" not "You should run..."
- **Short sentences** — max 25 words. Split complex sentences.
- **Code examples** always in fenced code blocks with the language specified.
- **All code examples must be tested** — no untested or outdated snippets.

## Markdown Standards

- One `#` H1 per file (the document title).
- Hierarchical headings — never skip from H2 to H4.
- Tables used for structured data (environment variables, API params).
- Callouts (`> **Note:**`, `> **Warning:**`) for important notices.
- Internal links use relative paths.

## What NOT to Document

- Implementation details that are obvious from reading the code.
- Transient state or in-progress decisions — use comments in PRs instead.
- Anything that will become outdated without a clear owner to update it.

## Review Checklist

- [ ] All setup steps tested on a clean machine.
- [ ] All environment variables listed with description and example.
- [ ] No broken links.
- [ ] Consistent heading hierarchy.
- [ ] No lorem ipsum or placeholder text.
