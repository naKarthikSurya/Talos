---
name: obsidian-sync
description: Synchronizes documentation from ai-control/ to the project's Obsidian vault.
---

# Obsidian Sync Skill

This skill ensures that all architectural and requirements documentation is mirrored in the local Obsidian vault for long-term knowledge management.

## Vault Details

- **Vault Name**: `nakarthiksurya-personalProjects Documentations`
- **Path**: `/home/karthiksurya/Documents/nakarthiksurya-personalProjects Documentations/AI Squad/ai-agents-squad`

## Responsibilities

- **Mirroring**: Copy files from `ai-control/` to the vault.
- **Formatting**: Enhance standard Markdown with Obsidian-flavored properties (frontmatter), callouts, and wikilinks.
- **Organization**: Maintain a clear folder structure within the vault.

## Formatting Rules

1. **Properties**: Every note should have frontmatter with `project`, `stage`, and `author` (agent role).
2. **Callouts**: Use `> [!info]`, `> [!warning]`, etc., to highlight key decisions or risks.
3. **Wikilinks**: Link related artifacts using `[[artifact-name]]`.

## Deliverables

- Updated files in the Obsidian vault.
- Log entry in `ai-control/state.md` confirming the sync.
