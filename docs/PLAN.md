# Migration plan — Tailwind mirror with legacy behavior retained

This is an advisory roadmap and checklist, not evidence of current code state or a standing instruction to perform work. Current human direction wins. Verify each item's implementation in source and tests. Template relationships → [INVENTORY.md](INVENTORY.md) · concise project context → [OPERATIONAL.md](OPERATIONAL.md).

## Internal migration decision model

Use the stages internally to choose safe work; routine user updates should explain relevant impact and decisions without narrating stage numbers.

### Phase 1 — Local Tailwind overlay

For a contained styling request, first check the real rendering scope and the Tailwind gate. Add raw Tailwind utilities to the relevant `.hbs` markup, matching existing visual values and states. Keep existing `gh-*` markup classes, Ghost helpers, and JavaScript hooks; AP styling classes are additive rather than replacements for those hooks. Do not redesign or modify existing script behavior as an incidental styling change.

### Phase 2 — Impact analysis and proposal

If an existing selector, component, JavaScript behavior, or Ghost setting may affect more than the requested markup, inspect its actual consumers before changing it. Present the affected files/behaviors, explain the local-versus-shared choices, describe rollback and verification, and ask the human what scope they want. This stage is planning and approval, not permission to implement the broad change.

For an approved reusable Tailwind component, use `ap-*` for CSS/component classes and author Tailwind rules in `assets/css/tailwind-input.css`. `ap-*` is not the JavaScript version namespace. Keep existing `gh-*` markup classes and old CSS declarations during the overlay; these are separate compatibility measures.

### Phase 3 — Approved execution

Implement only the plan the human approved. Existing JavaScript must be extended, not rewritten: new functions use a `V1` suffix and new behavior hooks use `data-js-<feature>-v1`. Ensure old and new handlers do not both run on the same element. Preserve the old implementation for rollback and verify actual rendering/behavior.

## Legacy CSS cleanup threshold

Only consider pruning legacy CSS declarations from `screen.css` when the owner judges that roughly **80–95% of the intended styling surface** has a Tailwind counterpart. This threshold applies to CSS rules only; it does not authorize removing `gh-*` markup classes, deleting `screen.css` or its build dependencies wholesale, or automatic cleanup. It is a human review trigger, not a mathematical completion claim. The owner must explicitly approve cleanup. Then remove legacy CSS gradually in small, isolated slices, verifying each slice before moving on. Keep existing `gh-*` markup classes and rollback options available throughout.

## Separate future work: configurable theme options

Expanding Ghost settings such as `site_background_color` and `navigation_layout` is outside the current Tailwind migration. Before changing `package.json` defaults or adding options, trace each setting through Handlebars, CSS, and JavaScript, then present the complete impact for approval.

## Verification

For Tailwind changes, run `bun run tailwind:build`; for theme markup or styling changes, run `bun run test:ci` (which also builds/zips and runs fatal gscan checks). Repository checks do not establish that production Ghost membership rendering works. When relevant, test logged-out, free-member, and paid-member states plus signup in Ghost before deployment.

---

## Wave 0 — Enablers

| # | Task | Status | Notes |
|---|------|--------|-------|
| 0.1 | Docs system (`docs/`) | **done** | Current files are the evidence; this table is a planning aid. |
| 0.2 | Update README (gate facts, docs links) | **done** | Verify current README if this state matters. |
| 0.3 | `git tag pre-tailwind` | pending | user runs it |
| 0.4 | Gate includes `index` + `author` in `default.hbs` | **done** | gate expanded — see docs/INVENTORY.md |

## Wave 1 — Warmup (small, single-page)

| File | Gate impact | Status |
|------|-------------|--------|
| `partials/components/cta.hbs` | none | **in-progress** |
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
| After the coverage threshold and explicit approval, prune verified legacy CSS in small, tested slices | pending |

---

## File checklist (42 templates and partials; verify before changing status)

> Checklist states are planning hints, not proof. Inspect the current markup/styles and obtain current approval before a consequential cutover; do not infer approval from this plan.

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
  - [ ] components/cta.hbs *(owner says work is still in progress; current markup uses `ap-cta*`, but do not treat that as a completed migration—verify the intended markup, styles, and behavior with the owner)*
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
