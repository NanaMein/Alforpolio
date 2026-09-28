# AGENTS.md

## Scope

This repository is the default Ghost theme. Keep changes focused on theme source, generated assets, CI, and repo-level metadata for this repository.

## Commands

Use **bun** for this repo (see `packageManager` in `package.json`).

```bash
bun install
bun run dev
bun run test:ci
bun run zip
```

Notes:
- This theme’s build/zip workflow runs Tailwind via `bun` (gulp executes `bun run tailwind:build`), so run dev/build/zip with **bun**.

Run the test command before opening a PR when theme files, generated assets, dependencies, or CI change.

## Boundaries

- Edit source CSS, JavaScript, Handlebars templates, partials, and package metadata intentionally.
- Keep generated assets/built/ files in sync when source assets change and the repo tracks those outputs.
- **Authority and evidence:** the human's current instruction takes precedence over repository documents and prior agent context. Documents are references, not proof of current implementation. On conflict, follow the human and flag the possibly stale document. Establish current state from actual files and fresh checks; never claim work is done because a document says `done` or `Executed`.
- Tailwind integration is “selective mode”:
  - Tailwind is compiled to `assets/built/tailwind.css` during `gulp build` / `bun run zip`.
  - Tailwind is only loaded in templates via `default.hbs` (currently for `tag, post, home, page, author, index`).
  - `docs/INVENTORY.md` and `docs/PLAN.md` may be used as navigation aids only; confirm relationships and status in current source before relying on them. No documentation update is implied by doing code work.
- Tailwind migration purpose and safety:
  - Mirror existing styling in Tailwind before redesigning. For contained local styling, use raw utilities in the relevant `.hbs`; for approved reusable component styling, use `ap-*` classes with Tailwind rules in `assets/css/tailwind-input.css`.
  - Keep existing `gh-*` classes and current JavaScript hooks. Never remove or rename `gh-*` classes as part of migration. Preserve existing JavaScript behavior; add new behavior only by extending with distinct `V1` functions and `data-js-<feature>-v1` hooks after approval.
  - When a selector, component, script, or Ghost setting may affect more than the requested markup, inspect references and consumers, explain the impact, and get the human's choice before making the broader change. Use this review internally; do not burden routine updates with phase labels.
  - Keep legacy CSS declarations available during Tailwind overlay/extension. Do not begin pruning until the human judges roughly 80–95% of the intended styling surface has a Tailwind counterpart and explicitly approves. This is a review threshold, not automatic authorization. Prune gradually in scoped, verified slices; retain `gh-*` markup classes.
  - Ghost custom settings in `package.json` are a separate future customization effort. Trace each setting through HBS, CSS, and JavaScript before proposing changes; do not change settings as part of routine Tailwind migration.
  - Check the selective gate in `default.hbs` for relevant pages. Run `bun run tailwind:build` and `bun run test:ci` for Tailwind or theme markup/style changes; Ghost/VPS rendering still needs direct testing when relevant.
- Prefer overlay changes first and understand the theme’s sizing rules before changing typography.
- Do not commit node_modules/, local Ghost content, generated zip files outside tracked release expectations, or secrets.
- Repo settings, descriptions, and branch rules belong on the GitHub repository; internal clean-repos metadata stays in TryGhost/cleanrepos.

## Operational reference
- `docs/OPERATIONAL.md` is optional descriptive context, not an instruction source or completion record. Do not add per-task/per-chat entries or update it automatically.
- `docs/JOURNAL.md` is retired. Do not query it or use its former entries as status, instructions, or evidence.
- Update operational memory only when the human asks or approves a durable fact/milestone; prefer code history for changes already visible in `git log`.
- `.opencode/agents/` contains project-only agent configuration and must not be included in release theme zips.
