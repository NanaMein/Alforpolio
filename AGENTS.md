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

Node.js equivalents (`pnpm` / `npm`) also work — the scripts themselves are package-manager-agnostic. If a future contributor uses pnpm or npm, that is fine; the CI workflow should match whichever runner is configured.

Run the test command before opening a PR when theme files, generated assets, dependencies, or CI change.

## Boundaries

- Edit source CSS, JavaScript, Handlebars templates, partials, and package metadata intentionally.
- Keep generated assets/built/ files in sync when source assets change and the repo tracks those outputs.
- Do not commit node_modules/, local Ghost content, generated zip files outside tracked release expectations, or secrets.
- Repo settings, descriptions, and branch rules belong on the GitHub repository; internal clean-repos metadata stays in TryGhost/cleanrepos.
