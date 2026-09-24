# Migration plan — Tailwind-first Alforpolio

Updated: 2026-09-24 · status lives only in this file · relationships → [INVENTORY.md](INVENTORY.md) · verdicts/tasks → [JOURNAL.md](JOURNAL.md).

## Ground rules (from verdicts — JRN-0002…0005)

1. **Extend, don't modify.** Tailwind utilities go *alongside* existing `gh-*`/`is-*` classes. Hooks and Ghost-held attrs (`data-portal`, `data-members-*`, `kg-*`, `ghost_head/foot`) stay untouched.
2. **Never delete in the same step.** `screen.css` rules and old classes are pruned only in a later, separate pass after verification.
3. **One file → one commit.** Rollback = `git revert`.
4. **Gate rule** (check before touching a multi-page file):
   - home/post/tag/page-only markup → gate unchanged
   - `post-list` / `post-card` → gate impact should be checked in `docs/INVENTORY.md` (your current gate includes `index` + `author`, so this is often `none`)
   - anything reachable from `default.hbs` (nav, footer, fonts, lightbox, email-sub, search-toggle) → gate impact should be checked in `docs/INVENTORY.md`
5. **Order is flexible.** Pick any file; the only check is "which pages render this?" → gate impact (INVENTORY column).

## Verify + deploy loop (per file)

```bash
bun run tailwind:build   # or bun run dev (watch mode)
bun run test:ci          # gscan --fatal + zip (pretest:ci)
git commit -m "tailwind(migrate): <file>"
# deploy dist/alforpolio.zip → Ghost Admin → Design
```

**VPS membership check before moving on:** logged out / free member / paid member (incognito + test account): nav+footer `data-portal` buttons render, signup form submits, no layout break.

Restore point: `git tag pre-tailwind` (create before Wave 1 starts).

---

## Wave 0 — Enablers

| # | Task | Status | Notes |
|---|------|--------|-------|
| 0.1 | Docs system (`docs/`) | **done** | JRN-0006 |
| 0.2 | Update README (gate facts, docs links) | **done** | JRN-0006 |
| 0.3 | `git tag pre-tailwind` | pending | user runs it |
| 0.4 | Gate includes `index` + `author` in `default.hbs` | **done** | gate expanded — see docs/INVENTORY.md |

## Wave 1 — Warmup (small, single-page)

| File | Gate impact | Status |
|------|-------------|--------|
| `partials/components/cta.hbs` | none | pending |
| `partials/feature-image.hbs` | none | pending |

## Wave 2 — Feature slices (optional order, per rule 5)

| Slice | Files | Gate impact | Status |
|-------|-------|-------------|--------|
| navigation_layout | navigation | none | pending |
| post_feed_style + feed toggles | post-card → post-list | none | pending |
| header_style + homepage group | header, header-content, featured | none | pending |
| header_and_footer_color + signup | footer, email-subscription | none | pending |
| fonts | typography/* | none | pending |

## Wave 3 — Root templates

| File | Gate impact | Status |
|------|-------------|--------|
| `index.hbs` | none | pending |
| `home.hbs` | none | pending |
| `tag.hbs` | none | pending |
| `page.hbs` | none | pending |
| `author.hbs` | none | pending |

## Wave 4 — Post + content boundary

| Item | Status | Notes |
|------|--------|-------|
| `post.hbs` chrome (meta, related, share) | pending | options: show_post_metadata, enable_drop_caps_on_posts, show_related_articles |
| `gh-content` / `kg-*` editor prose | deferred | stays CSS (`content.css` extract); Ghost emits these classes — not utility-fiable per-hbs |

## Wave 5 — Prune `screen.css`

| Item | Status |
|------|--------|
| Remove rules for verified Tailwind files (separate commits) | pending |
| Shrink gate docs / README to final state | pending |

---

## File checklist (all 42 — flip to `done` as migrated)

- [ ] default.hbs *(only when gate flips — rule 4)*
- [ ] home.hbs
- [ ] index.hbs
- [ ] tag.hbs
- [ ] author.hbs
- [ ] post.hbs *(chrome only)*
- [ ] page.hbs
- [ ] components/navigation.hbs
- [ ] components/footer.hbs
- [ ] components/header.hbs
- [ ] components/header-content.hbs
- [ ] components/post-list.hbs
- [ ] components/featured.hbs
- [ ] components/cta.hbs
- [ ] post-card.hbs
- [ ] email-subscription.hbs
- [ ] feature-image.hbs
- [ ] search-toggle.hbs
- [ ] lightbox.hbs
- [ ] typography/fonts.hbs
- [ ] typography/sans.hbs
- [ ] typography/serif.hbs
- [ ] typography/mono.hbs
- [ ] icons/* (19 — trivial, batch when touched)
- [ ] screen.css prune (Wave 5)
