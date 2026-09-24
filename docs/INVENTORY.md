# File inventory — `.hbs` relationship map

Snapshot: 2026-09-24 · 42 templates total (7 root + 35 partials) · maintained by assistant.
Status/checklist → [PLAN.md](PLAN.md) · history → [JOURNAL.md](JOURNAL.md).

**Tailwind gate (`default.hbs`): loads on `tag, post, home, page, author, index`. Missing: none.**

## Counts notation

**Includes** = outgoing call sites · **Used by** = unique parent files · **Nested total** = unique partials reachable through this file (transitive) · **Gate impact** = gate change needed when this file gains Tailwind utilities (see [README](README.md)).

## Root templates (7)

| File | Purpose | Lines | Includes | Nested total | Used by | `@custom` options | Hooks | Gate impact |
|------|---------|------:|---------:|-------------:|---------|-------------------|-------|-------------|
| `default.hbs` | Base shell: head, nav, footer, scripts | 78 | 4 | 14 | all templates | site_background_color, title_font, body_font, navigation_layout (pass) | body classes `home-template`/`post-template` (main.js) | owns gate |
| `home.hbs` | Homepage: header + featured + CTA + feed | 12 | 4 | 11 | — | header_style, show_featured_posts, post_feed_style (pass), show_publication_info_sidebar (pass) | — | none |
| `index.hbs` | All-posts paginated archive | 6 | 1 | 4 | — | post_feed_style (pass), show_publication_info_sidebar (pass) | — | none |
| `tag.hbs` | Tag archive: header + feed | 22 | 2 | 5 | — | show_publication_info_sidebar, post_feed_style (pass) | — | none |
| `author.hbs` | Author profile: bio, socials, feed | 64 | 10 | 13 | — | show_publication_info_sidebar, post_feed_style (pass) | — | none |
| `post.hbs` | Single post: meta, content, related | 85 | 3 | 4 | — | show_post_metadata, enable_drop_caps_on_posts, show_related_articles | `.gh-content` reframe/tables (main.js) | none |
| `page.hbs` | Static page: title + content | 26 | 1 | 1 | — | — | `.gh-content` (main.js) | none |

## Component partials (7)

| File | Purpose | Lines | Includes | Nested total | Used by | `@custom` options | Hooks | Gate impact |
|------|---------|------:|---------:|-------------:|---------|-------------------|-------|-------------|
| `partials/components/navigation.hbs` | Site nav: layout variants, member buttons | 53 | 6 | 4 | default | navigation_layout (param), header_and_footer_color | `.gh-burger`/`is-open` (main.js), `is-dropdown-*` (dropdown.js) | none |
| `partials/components/footer.hbs` | Footer: signup, social, menu | 49 | 1 | 3 | default | header_and_footer_color, signup_heading, signup_subheading | `.gh-footer` scroll target (pagination.js); `data-portal` | none |
| `partials/components/header.hbs` | Homepage header dispatcher (4 renders) | 19 | 4 | 8 | home | header_style (param) | — | none |
| `partials/components/header-content.hbs` | Header inner layout per style | 81 | 8 | 7 | header | background_image, show_featured_posts, header_text, header_style (param) | `data-members-*`, `data-portal` | none |
| `partials/components/post-list.hbs` | Feed container: list/grid, sidebar | 123 | 9 | 3 | index, home, tag, author | show_images_in_feed, header_style, show_featured_posts, post_feed_style (param), show_publication_info_sidebar (param) | `.gh-feed` (pagination.js) | none |
| `partials/components/featured.hbs` | Featured-posts strip | 14 | 1 | 2 | home, header-content | show_featured_posts (param) | — | none |
| `partials/components/cta.hbs` | Signup CTA banner | 25 | 1 | 3 | home | header_style, signup_heading, signup_subheading | `data-portal` | none |

## Shared partials (5)

| File | Purpose | Lines | Includes | Nested total | Used by | `@custom` options | Hooks | Gate impact |
|------|---------|------:|---------:|-------------:|---------|-------------------|-------|-------------|
| `partials/post-card.hbs` | Post card for all feeds/related/header | 47 | 1 | 1 | post-list, header-content, featured, post | show_images_in_feed, show_author, show_publish_date | — | none |
| `partials/email-subscription.hbs` | Email form (members) | 9 | 2 | 2 | footer, cta, header-content | — | `data-members-form`/`data-members-email` | none |
| `partials/feature-image.hbs` | Hero/feature image figure | 18 | 0 | 0 | page, tag, post | — | `.gh-feature-image` (main.js) | none |
| `partials/search-toggle.hbs` | Search button | 3 | 1 | 1 | navigation | — | `data-ghost-search` | none |
| `partials/lightbox.hbs` | PhotoSwipe lightbox markup | 41 | 0 | 0 | default (post, page only) | — | `.pswp`, `kg-*` (lightbox.js) | none |

## Typography partials (4)

| File | Purpose | Lines | Includes | Nested total | Used by | `@custom` options | Gate impact |
|------|---------|------:|---------:|-------------:|---------|-------------------|-------------|
| `partials/typography/fonts.hbs` | Font dispatcher (sans/serif/mono) | 15 | 5 | 3 | default | title_font, body_font | none |
| `partials/typography/sans.hbs` | Sans font block | 11 | 0 | 0 | fonts | — | none |
| `partials/typography/serif.hbs` | Serif font block | 21 | 0 | 0 | fonts | — | none |
| `partials/typography/mono.hbs` | Mono font block | 21 | 0 | 0 | fonts | — | none |

## Icons (19)

All leaves: 0 includes, 0 nested. Included by: author (9 social: x, facebook, linkedin, bluesky, threads, mastodon, tiktok, youtube, instagram), navigation (burger, close), search-toggle + header-content (search), post-list + email-subscription (arrow), email-subscription (loader), post-card (lock), post (avatar). Unused: checkmark, fire, rss.

## Reverse index — who includes whom

| File | Included by (unique) | Call sites |
|------|----------------------|-----------:|
| `post-card` | post-list (7), header-content (5), featured (1), post (1) | 14 |
| `post-list` | index, home, tag, author | 4 |
| `email-subscription` | footer, cta, header-content | 3 |
| `feature-image` | page, tag, post | 3 |
| `header-content` | header | 4 |
| `header` | home | 1 |
| `featured` | home, header-content | 2 |
| `cta` | home | 1 |
| `navigation` | default | 1 |
| `footer` | default | 1 |
| `fonts` | default | 1 |
| `lightbox` | default | 1 |
| `search-toggle` | navigation | 4 |

## `@custom` option → files affected

From `package.json` → `config.custom`. This is the blast radius per admin setting.

| Option | Files |
|--------|-------|
| navigation_layout | default (pass), navigation |
| site_background_color | default |
| header_and_footer_color | navigation, footer |
| title_font | default, fonts |
| body_font | default, fonts |
| signup_heading | footer, cta |
| signup_subheading | footer, cta |
| header_style | home, header (param), header-content (param), cta, post-list |
| header_text | header-content |
| background_image | header-content |
| show_featured_posts | home, header-content, post-list, featured (param) |
| post_feed_style | index, home, tag, author (pass), post-list (param) |
| show_images_in_feed | post-list, post-card |
| show_author | post-card |
| show_publish_date | post-card |
| show_publication_info_sidebar | index, home, tag, author (pass), post-list (param), tag, author |
| show_post_metadata | post |
| enable_drop_caps_on_posts | post |
| show_related_articles | post |

## Hook map — files that must not break JS/Ghost behavior

| Hook owner | Selector / attr | Used in file(s) |
|------------|-----------------|-----------------|
| main.js | `.gh-navigation`, `.gh-burger`, `is-open` | navigation |
| main.js | `.gh-feature-image` | feature-image |
| main.js | `.gh-content` (reframe, tables) | post, page |
| main.js | body `home-template`/`post-template` | default (body_class) |
| dropdown.js | `.gh-navigation`, `.gh-navigation-menu`, `.gh-navigation-logo`, `is-dropdown-*` | navigation |
| pagination.js | `.gh-feed` | post-list |
| pagination.js | `.gh-footer` (infinite-scroll target) | footer |
| lightbox.js | `.pswp`, `kg-*` | lightbox |
| Ghost portal | `data-portal`, `data-members-form`, `data-members-email` | navigation, footer, cta, header-content, email-subscription |
| Ghost search | `data-ghost-search` | search-toggle |
