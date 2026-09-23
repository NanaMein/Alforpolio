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
- Tailwind integration is “selective mode”:
  - Tailwind is compiled to `assets/built/tailwind.css` during `gulp build` / `bun run zip`.
  - Tailwind is only loaded in templates via `default.hbs` (currently for `tag, post`). Update `default.hbs` if you want other templates to load it.
- Prefer Tailwind “overlay” changes first (backgrounds/hover/spacing) and avoid typography utilities until you understand the theme’s sizing rules.
- Do not commit node_modules/, local Ghost content, generated zip files outside tracked release expectations, or secrets.
- Repo settings, descriptions, and branch rules belong on the GitHub repository; internal clean-repos metadata stays in TryGhost/cleanrepos.
