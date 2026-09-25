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

### JRN-0008 · 2026-09-25 · verdict
- **Topic:** lowest-risk `.hbs` targets for “add Tailwind, don’t break old CSS yet”
- **Decision:** Start with files that have **gate impact = none** and minimal JS/Ghost hook risk:
  - `partials/components/cta.hbs` (Wave 1 warmup)
  - `partials/feature-image.hbs` (Wave 1 warmup; keep `.gh-feature-image` hook)
  - `partials/typography/*` (fonts dispatcher + sans/serif/mono)
  - `partials/icons/*` (leaf markup)
- **Plan rule:** Use Tailwind utilities as an overlay (extend, don’t modify) and defer `screen.css` pruning until Wave 5 after verification.

### JRN-0009 · 2026-09-25 · task
- **Topic:** Tailwind overlay for CTA
- **Executed:** added non-breaking Tailwind utility classes to `partials/components/cta.hbs` (layout/spacing only; kept existing `gh-*` classes)
- **Verification:** `bun run tailwind:build` + `bun run test:ci` (gscan fatal compatibility clean)
  - **Files:** `partials/components/cta.hbs`, generated `assets/built/tailwind.css`(+map)

### JRN-0010 · 2026-09-25 · verdict
- **Topic:** 3-phase migration policy for “custom semantic CSS” work
- **Decision:** Adopt the user-defined phases:
  - **Phase 1:** Tailwind overlay while legacy behavior/hooks stay intact.
  - **Phase 2:** Permission-gated semantic custom CSS using Tailwind `@apply` + mirroring `screen.css`; legacy CSS stays present and is annotated (prefer annotate+override over comment-out/disable).
  - **Phase 3:** Cutover responsibility after Phase 2 verification; cleanup/pruning in Wave 5.
- **Files:** `docs/PLAN.md` updated to define phases + clarify checklist meaning.

### JRN-0011 · 2026-09-25 · verdict
- **Topic:** semantic selector namespace decided for Phase 2/3
- **Decision:** Use `ap-` prefix for all semantic custom CSS selectors (unique from `gh-*`). This enables safe phase-out by removing legacy dependency only after `ap-*` is verified.
- **Files:** `docs/PLAN.md` updated to reflect `ap-` prefix requirement.

### JRN-0012 · 2026-09-25 · task
- **Topic:** make JOURNAL context retrieval easy
- **Executed:**
  - Added `scripts/journal-query.js` + `bun run journal:query` to fetch the last matching JOURNAL entries by keyword.
  - Updated `AGENTS.md` with a “Journal retrieval” protocol (search by Topic/Decision/Executed, summarize only the last 1–3 matches).
- **Verification:** `bun run journal:query --match "Tailwind gate" --n 3` returns `JRN-0007` as the latest relevant verdict.
- **Files:** `scripts/journal-query.js`, `package.json`, `AGENTS.md`

### JRN-0013 · 2026-09-25 · task
- **Topic:** Exclude `scripts/**` from release zip
- **Executed:** updated `gulpfile.js` zip exclude list to add `!scripts` and `!scripts/**`
- **Verification:** `bun run test:ci` (zip + gscan fatal compatibility clean)
- **Files:** `gulpfile.js`

(End of file - total 79 lines)
