# Alforpolio

> [!IMPORTANT]
> Alforpolio is a fork/derivative of the official [TryGhost/Source](https://github.com/TryGhost/Source) theme for Ghost.
> The original Alforpolio codebase is preserved in the [Alforpolio Legacy](https://github.com/NanaMein/Alforpolio-Legacy) repository as Legacy as of now.
>
> This fork is maintained in this repository — please open issues and pull requests here.

Alforpolio is a free, modern Ghost theme built for portfolio creators, technical writers, and developers. The goal is to provide a feature-rich theme that works out of the box — no coding required, no paid upgrades.

This is **Alforpolio:latest** — built on top of [TryGhost/Source](https://github.com/TryGhost/Source). The legacy version which is [Nanamein/Alforpolio-Legacy](https://github.com/NanaMein/Alforpolio-Legacy) (built on [TryGhost/Solo](https://github.com/TryGhost/Solo)) is no longer actively developed. See [MODIFICATIONS.md](MODIFICATIONS.md) for full details.

## Live Demo

https://alfycodes.me

## What's Included

Alforpolio inherits the solid foundation of Source and adds on top of it. Here's what's in place now:

- **Extended theme settings** — font selection, header styles, navigation layouts, colour options
- **Lightbox** — click-to-expand images powered by PhotoSwipe
- **Search toggle** — integrated search support
- **Typography options** — sans, serif, and mono font choices for titles and body
- **Social icons** — X, Mastodon, Bluesky, LinkedIn, Instagram, TikTok, Threads, YouTube, Facebook
- **Pagination** — built-in page navigation
- **Email subscription** — footer signup partial

## Roadmap

These are planned features — some in progress, some under research:

- **Light / Dark mode toggle** — user-switchable theme with system preference detection
- **Post & page layout options** — more flexibility for how content is presented
- **Tailwind CSS — active migration** — the end goal is a Tailwind-first theme, migrated one `.hbs` file at a time. Tailwind utilities compile to `assets/built/tailwind.css` and currently load selectively; the legacy `screen.css` stays intact until each slice is verified. See [docs/PLAN.md](docs/PLAN.md) for the plan and [docs/INVENTORY.md](docs/INVENTORY.md) for the file map.

> [!NOTE]
> Alforpolio will always remain **free and open source**. If you find it useful, consider supporting via donations to help fund continued development.

## Vision

Alforpolio aims to be a theme that works for **everyone** — developers who want to customise, and non-developers who just want things to work. The goal is to ship features that people would otherwise have to pay for or build themselves, while keeping the theme flexible enough for power users to extend.

## Quick Start

1. Download the theme zip:
   - from the **Releases** section, or
   - build it locally (see below)
2. In Ghost Admin → **Design**, upload the zip file.

## Development

Styles are compiled using Gulp/PostCSS. The repo is **Bun-first**.

From the theme's root directory:

```bash
# Install dependencies
bun install

# (the repo uses Bun's lockfile (e.g. bun.lockb) — it's committed so others don't need to manage lockfiles)

# Run build & watch for changes
bun run dev

# Build assets once (Tailwind + screen.css + JS)
bun run build

# Create the theme zip for Ghost deployment
bun run zip
```

Now you can edit `/assets/css/` files (and other source files like `/assets/js/` and `*.hbs`); the build regenerates outputs under `/assets/built/` (including the optional Tailwind output when enabled).

## Tailwind (extension) notes — selective mode

> [!NOTE]
> Migration status, file relationships, and the decision log live in **[docs/](docs/README.md)** —
> [PLAN.md](docs/PLAN.md) (what's next), [INVENTORY.md](docs/INVENTORY.md) (file map), [JOURNAL.md](docs/JOURNAL.md) (verdicts & history).

### What “selective” means here
- Tailwind is **always compiled** during the normal build/zip workflow.
- Tailwind is **only loaded/applied** in the browser on certain pages via `default.hbs`.
- Currently, `default.hbs` loads Tailwind on:
  - `tag`
  - `post`
  - `home`
  - `page`
  - `index`
  - `author`

To change which templates load Tailwind, edit **`default.hbs`** and update this block:

```hbs
{{#is "tag, post, home, page, author, index"}}
    <link rel="stylesheet" type="text/css" href="{{asset "built/tailwind.css"}}">
{{/is}}
```

### How to extend safely (SRP/OCP)
Use Tailwind as an *overlay* on top of the existing Source/Theme CSS:
- Prefer changing **non-typography** properties first (backgrounds, spacing, borders, hover effects).
- Avoid overriding heading/body sizing until you understand the theme’s existing typography rules.
- Edit the smallest surface area possible:
  - page templates like `tag.hbs`, `post.hbs`
  - or partials/components like `partials/components/*`

**Important:** partials/components do not “load Tailwind” by themselves.

- Ghost renders templates (like `tag.hbs` / `post.hbs`) and those templates include partials/components via `{{> "..."}}`.
- Tailwind will only be applied if **the page’s HTML includes** `{{asset "built/tailwind.css"}}` (controlled in `default.hbs`).
- After that, any partial/component that contains Tailwind classes will automatically pick up the Tailwind styles.
- If a partial/component doesn’t include Tailwind classes, the normal theme CSS is used as the fallback.

### “Pure Tailwind mode” (danger)
If you want Tailwind applied across *all* pages/templates (i.e. full migration), you can remove the `{{#is ...}}` guard in `default.hbs` and always load `tailwind.css`.

This is **dangerous / higher risk** because Tailwind utilities can override existing theme class styles on pages you didn’t intend.
It should only be done when you’re ready to gradually migrate UI consistently.

### Records

History and decisions are kept in **[docs/JOURNAL.md](docs/JOURNAL.md)** (append-only). Past records:

- Tailwind build integrated into `gulp build` (compiled output: `assets/built/tailwind.css`)
- Selective loading enabled for `tag`, `post`, `home`, `page`, `author`, `index`
- Experimented with non-typography utilities (hover/background styling)

### Create a release zip

```bash
bun run zip
```

The `zip` Gulp task packages the theme files into `dist/alforpolio.zip`.

### Publish a release

Releases are shipped from an up-to-date, clean `main` branch. Before starting, configure `GST_TOKEN` with a GitHub token that can create releases.

First bump the version:

```bash
# pick one of: patch | minor | major (or an explicit version, e.g. 1.0.0)
bun run --bun version minor
```

Then run `ship`:

```bash
bun run --bun ship
```

This builds the zip, runs GScan, pushes the version commit and tag, and creates a draft GitHub release. Review and publish the draft after the command completes.

### Theme Translations

Please see [@TryGhost/Themes/theme-translations/README.md](https://github.com/TryGhost/Themes/blob/main/packages/theme-translations/README.md) for how to build, edit, or contribute translations.

## SVG Icons

Alforpolio uses inline SVG icons, included via Handlebars partials. You can find all icons inside `/partials/icons`. To use an icon just include the name of the relevant file, eg. To include the SVG icon in `/partials/icons/rss.hbs` — use `{{> "icons/rss"}}`.

You can add your own SVG icons in the same manner.

## PostCSS Features Used

- **Autoprefixer** — Don't worry about writing browser prefixes of any kind, it's all done automatically with support for the latest 2 major versions of every browser.

## Credits

- Based on [TryGhost/Source](https://github.com/TryGhost/Source) by Ghost Foundation.
- Legacy v1 based on [TryGhost/Solo](https://github.com/TryGhost/Solo) by Ghost Foundation.
- Built for [Ghost](https://github.com/TryGhost/Ghost).

## Copyright & License

Copyright (c) 2013-2026 Ghost Foundation — Released under the [MIT license](LICENSE).

Modifications by Nanamein (https://alfycodes.me) — see [MODIFICATIONS.md](MODIFICATIONS.md) — Released under the MIT license (see LICENSE).
