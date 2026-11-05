# Arkeep Website

> The website and documentation for Arkeep.

[![CI](https://github.com/arkeep-io/arkeep-website/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/arkeep-io/arkeep-website/actions/workflows/ci.yml)
[![License](https://img.shields.io/github/license/arkeep-io/arkeep-website)](LICENSE)

Source code for **[arkeep.io](https://arkeep.io)**: the product website, interactive demos and documentation for Arkeep, the open-source, self-hosted backup manager built on Restic and Rclone.

Built with [Astro](https://astro.build/) and [Starlight](https://starlight.astro.build/), published as a static site through Cloudflare Workers.

**[Website](https://arkeep.io)** · **[Documentation](https://arkeep.io/docs/)** · **[Arkeep repository](https://github.com/arkeep-io/arkeep)** · **[Report an issue](https://github.com/arkeep-io/arkeep-website/issues)**

---

## What's here

- **Product website** — features, architecture, installation options and roadmap.
- **Documentation** — quickstart, deployment guides, backup and restore workflows, and configuration reference.
- **Interactive demos** — examples of backup progress, retention rules and notifications.
- **Automated checks** — unit tests, production build, internal link validation and browser tests for desktop and mobile.

## Quickstart

You need **Node.js 26** and the **pnpm version declared in `package.json`**.

```bash
git clone https://github.com/arkeep-io/arkeep-website.git
cd arkeep-website
pnpm install --frozen-lockfile
pnpm dev
```

Open **http://localhost:4321**.

The site can run without credentials. Release information and the GitHub star count are fetched from public APIs, with fallbacks when those requests fail.

An optional `GITHUB_TOKEN` environment variable raises the API rate limit for build-time requests. It is used by server-side build code and must never be placed in browser code or committed to the repository.

## Project structure

| Path | Purpose |
|---|---|
| `src/content/docs/docs/` | Documentation pages, written in Markdown and MDX |
| `src/pages/` | Homepage, privacy page and custom 404 |
| `src/components/home/` | Homepage sections and interactive demo markup |
| `src/components/site/` | Shared navigation, footer and site components |
| `src/components/starlight/` | Documentation theme overrides |
| `src/lib/` | Shared logic and build-time data |
| `src/scripts/` | Browser interactions |
| `src/styles/` | Design tokens, typography and styles |
| `public/` | Static files, headers, icons and robots configuration |
| `tests/` | Unit tests and Playwright browser tests |
| `scripts/` | Internal link checks and screenshot tooling |
| `astro.config.mjs` | Astro, Starlight, navigation and sitemap configuration |
| `wrangler.toml` | Cloudflare Workers static assets configuration |

Documentation pages live under the nested `src/content/docs/docs/` directory. For example, `src/content/docs/docs/quickstart.mdx` produces `/docs/quickstart/`.

## Checks

Run these commands from the repository root:

| Command | Purpose |
|---|---|
| `pnpm dev` | Start the local development server |
| `pnpm test` | Run unit tests |
| `pnpm build` | Build the static site into `dist/` |
| `pnpm check:links` | Check internal links in the built site |
| `pnpm preview` | Preview the production build |
| `pnpm test:e2e` | Run Playwright browser tests |

For a standard local check:

```bash
pnpm test
pnpm build
pnpm check:links
```

Install Chromium before running browser tests:

```bash
pnpm exec playwright install chromium
pnpm test:e2e
```

On Linux, Playwright may also require system dependencies:

```bash
pnpm exec playwright install --with-deps chromium
```

Browser tests build the site and use a dedicated preview server on port **4399**. They cover desktop and mobile layouts.

## Contributing

Corrections, clearer examples, accessibility improvements and bug fixes are welcome.

1. Fork the repository and create a branch from `develop`.
2. Make a focused change.
3. Preview affected pages locally and run the relevant checks.
4. Open a pull request targeting **`develop`**.

Use descriptive branch names such as:

- `docs/clarify-s3-setup`
- `fix/mobile-navigation`
- `feat/restore-guide`
- `ci/update-workflow`

For documentation changes:

- Verify commands and configuration against the applicable Arkeep version.
- Distinguish available functionality from planned work.
- Use fictional values in examples.
- Preserve existing page URLs where possible