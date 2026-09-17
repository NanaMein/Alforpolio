# Alforpolio

> [!IMPORTANT]
> Alforpolio is a fork/derivative of the official [TryGhost/Source](https://github.com/TryGhost/Source) theme for Ghost.
>
> This fork is maintained in this repository — please open issues and pull requests here.

Alforpolio is a free, modern Ghost theme built for portfolio creators, technical writers, and developers. It extends Source with additional theme settings, typography options, social icons, and a lightbox for images.

This is **Alforpolio version 2** — a clean, modern rewrite on top of Source. The legacy version (built on [TryGhost/Solo](https://github.com/TryGhost/Solo)) is no longer actively developed. See [MODIFICATIONS.md](MODIFICATIONS.md) for full details.

## Live Demo

https://alfycodes.me

## Features

- **Extended theme settings** — font selection, header styles, navigation layouts, colour options
- **Lightbox** — click-to-expand images powered by PhotoSwipe
- **Search toggle** — integrated search support
- **Typography options** — sans, serif, and mono font choices for titles and body
- **Social icons** — X, Mastodon, Bluesky, LinkedIn, Instagram, TikTok, Threads, YouTube, Facebook
- **Pagination** — built-in page navigation
- **Email subscription** — footer signup partial
- **Dark mode** — (roadmap, planned for upcoming release)

## Quick Start

1. Download the theme zip:
   - from the **Releases** section, or
   - build it locally (see below)
2. In Ghost Admin → **Design**, upload the zip file.

## Development

Styles are compiled using Gulp/PostCSS to polyfill future CSS spec.
You'll need [Bun](https://bun.sh/) (or [Node.js](https://nodejs.org/) v22+ with [pnpm](https://pnpm.io/)).

From the theme's root directory:

```bash
# Install dependencies
bun install

# Run build & watch for changes
bun run dev
```

> [!TIP]
> You can also use `pnpm install` / `pnpm dev` or `npm install` / `npm run dev` if you prefer — the standard Node.js toolchain works fine too.

Now you can edit `/assets/css/` files (and other source files like `/assets/js/` and `*.hbs`); the build will regenerate outputs under `/assets/built/`.

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
