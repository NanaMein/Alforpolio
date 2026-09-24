# Journal — append-only log

Newest at bottom. Never rewritten. Format: `JRN-NNNN · date · type` where type = `baseline` | `verdict` | `task`.
Status is NOT tracked here → [PLAN.md](PLAN.md).

---

### JRN-0001 · 2026-09-24 · baseline
- **Topic:** pre-migration state of Tailwind in the theme
- **Facts:** Tailwind v3 wired: utilities-only input (`@tailwind utilities`, preflight off), content scans `./*.hbs` + `partials/**/*.hbs`, gulp task runs `bun run tailwind:build`, output `assets/built/tailwind.css` (797 B). Gate in `default.hbs` = `tag, post, home, page`. Legacy `screen.css` = 2789 source lines → `assets/built/screen.css`, loaded on all pages before tailwind.css (so utilities win ties). 42 `.hbs` files. Repo is bun-first (`packageManager: bun@1.3.0`). Deploy target: VPS with memberships (Ghost handles JWT).
- **Files:** all

### JRN-0002 · 2026-09-24 · verdict
- **Topic:** extend-don't-modify safety protocol
- **Decision:** Tailwind is a design layer added alongside existing classes. `gh-*`/`is-*` JS hooks, `data-portal`, `data-members-*`, `kg-*`, `{{ghost_head}}`/`{{ghost_foot}}` stay untouched unless that specific behavior is deliberately targeted. No deletions in the same step as an addition — prune later, separately, after verification. One file per commit.
- **Rationale:** VPS = production; membership UI must keep rendering; rollback must stay trivial.
- **Files:** all · **Plan ref:** Ground rules 1–3

### JRN-0003 · 2026-09-24 · verdict
- **Topic:** Tailwind load gate (selective vs global)
- **Decision:** Stay selective for now; do not flip preemptively. Per-file trigger: home/post/tag/page-only markup → no change; `post-list`/`post-card` → add `index, author`; anything reachable from `default.hbs` (nav, footer, fonts, lightbox, email-subscription, search-toggle + their icon children) → flip gate to global. Global is the eventual end state for a Tailwind-first theme; the gate is migration scaffolding, not architecture. Cost is negligible (utilities-only, ~797 B).
- **Files:** default.hbs · **Plan ref:** Ground rule 4, Wave 0.4

### JRN-0004 · 2026-09-24 · verdict
- **Topic:** migration order
- **Decision:** Feature-slice order (nav → feed → header → footer → fonts) is available but **optional**. Only fixed rule: before picking a file, ask "which pages render this?" and apply the gate rule. Wave 1 warmup (`cta`, `feature-image`) suggested, not mandatory. User keeps freedom to pick any file any time.
- **Files:** all · **Plan ref:** Ground rule 5

### JRN-0005 · 2026-09-24 · verdict
- **Topic:** VPS production + membership risk
- **Decision:** Theme zips cannot touch DB/members/JWT — risk is limited to broken *rendering* of member UI. Per-deploy check: logged-out / free / paid states show `data-portal` buttons and working signup form. Membership access control itself is Ghost core; not a theme concern.
- **Files:** navigation, footer, cta, header-content, email-subscription · **Plan ref:** deploy loop

### JRN-0006 · 2026-09-24 · task
- **Topic:** docs system created
- **Done:** `docs/README.md` (protocol), `docs/INVENTORY.md` (42-file relationship map with counts, nested totals, `@custom` blast-radius map, hook map, gate impact), `docs/PLAN.md` (waves + checklist + status), `docs/JOURNAL.md` (this file). README.md updated: fixed stale gate list, roadmap → active migration, added docs links, records moved here.
- **Convention:** assistant writes all docs; user gives verdicts in conversation; recording happens same session.
- **Files:** docs/*, README.md

### JRN-0007 · 2026-09-24 · verdict
- **Topic:** Tailwind gate expanded to include `index` + `author`
- **Decision:** `default.hbs` now loads `tailwind.css` on `tag, post, home, page, author, index`, so gate impact for shared feed/nav/footer files is reduced accordingly (see updated `docs/INVENTORY.md` + `docs/PLAN.md`).
- **Applies to:** `default.hbs` gate; subsequent migration files
