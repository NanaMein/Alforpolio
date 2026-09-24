# Docs system — how this works

The assistant writes and maintains every file here. The user reads, directs, and gives verdicts. Nothing here is hand-edited by the user.

## Flow

```
conversation → final verdict / executed task → assistant records it here
```

After each settled discussion, the assistant updates the file(s) below in the same session — not later, not from memory.

## Files

| File | What it holds | Mutability |
|------|---------------|------------|
| [PLAN.md](PLAN.md) | Migration waves, per-file checklist, status, verify/deploy steps | Status changes in place |
| [INVENTORY.md](INVENTORY.md) | Every `.hbs` file: purpose, relationship counts, nested totals, `@custom` map, hook map, gate impact | Regenerated when structure changes |
| [JOURNAL.md](JOURNAL.md) | Append-only log: baselines, verdicts, executed tasks | Never rewritten, only appended |

Rule: **status lives only in PLAN.md**. INVENTORY is the map (no status), JOURNAL is history (no status). That prevents three files drifting out of sync.

## Status vocabulary (PLAN.md only)

`pending` · `in-progress` · `done` · `blocked` · `deferred`

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
