# Project documentation

These files help people navigate the theme; they do not outrank the human's current direction or prove what the code currently does. Check source files and fresh tests for current implementation and completion status.

Documentation is not updated after every conversation or task. Update a document only when the change is requested or is needed to keep that document's stated purpose accurate.

## Files

| File | What it holds | Mutability |
|------|---------------|------------|
| [PLAN.md](PLAN.md) | Tailwind migration approach and checklist | Checklist is advisory; verify code before relying on status |
| [INVENTORY.md](INVENTORY.md) | Snapshot of `.hbs` files, relationships, hooks, and gate impact | Navigation aid; verify relationships in source |
| [OPERATIONAL.md](OPERATIONAL.md) | Small set of durable, verifiable context notes and optional weekly milestones | Human-approved, concise, and descriptive; no per-task logs |
| [JOURNAL.md](JOURNAL.md) | Retired compatibility pointer for old links | Historical entries removed; not a source of truth |

Precedence: current human instruction → current code and test results for implementation facts → documents as references → agent memory. On conflict, follow the human and flag the stale reference.

## Checklist vocabulary (PLAN.md only)

`pending` · `in-progress` · `done` · `blocked` · `deferred`. These labels help organize work; they are not proof that a change exists or has passed verification.

## Count notation (INVENTORY.md)

- **Includes** — outgoing `{{> "..."}}` call sites in that file
- **Used by** — unique files that include this file
- **Nested total** — unique partials reachable transitively through this file (excludes itself; answers "how big is this subtree?")
- **Gate impact** — what must change in `default.hbs`'s Tailwind gate when this file gets utilities:
  - `none` — all rendering pages already load Tailwind
  - `+index,author` — add those contexts to the gate
  - `→ global` — reachable from `default.hbs` on every page; gate must become unconditional
  - `owns gate` — the file containing the gate itself

## What does NOT go here

- Line-level detail inside files (counts only — inner structure is read from the file when needed)
- CSS/JS source explanation (belongs to the code)
- Anything secret or environment-specific
