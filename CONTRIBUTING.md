# Contributing to Arkeep Website

Thanks for helping improve the Arkeep website and documentation.

We welcome documentation fixes, clearer examples, accessibility improvements, design refinements and bug fixes. Small contributions are welcome — correcting a command or clarifying a paragraph can make a difference.

## Where to contribute

This repository contains [arkeep.io](https://arkeep.io) and its documentation.

- Report website and documentation issues in [this repository](https://github.com/arkeep-io/arkeep-website/issues).
- Report backup application bugs and request product features in [Arkeep](https://github.com/arkeep-io/arkeep/issues).
- Ask usage questions in [Arkeep Discussions](https://github.com/arkeep-io/arkeep/discussions).

For substantial changes, open an issue first so we can agree on the scope before you spend time implementing them.

## Development setup

You need Node.js 26 and the pnpm version specified by `packageManager` in `package.json`.

Fork the repository, clone your fork and install dependencies:

```bash
git clone https://github.com/YOUR-USERNAME/arkeep-website.git
cd arkeep-website
git remote add upstream https://github.com/arkeep-io/arkeep-website.git
git fetch upstream
git switch -c docs/describe-your-change upstream/develop
pnpm install --frozen-lockfile
pnpm dev
```

Open **http://localhost:4321**.

Use a branch prefix that describes the change:

| Prefix | Examples |
|---|---|
| `docs/` | Guides, examples and wording |
| `fix/` | Broken links, layout or interaction fixes |
| `feat/` | New website functionality |
| `ci/` | Workflow changes |
| `chore/` | Maintenance and tooling |

Local development does not require Cloudflare credentials or a GitHub token. Public GitHub API requests have fallbacks when unavailable.

## Editing documentation

Documentation lives in `src/content/docs/docs/`, using Markdown and MDX.

When making changes:

- Check commands, paths and configuration against the relevant Arkeep version.
- Clearly distinguish available functionality from planned features.
- Use fictional hostnames, addresses and credentials.
- Explain prerequisites and the expected result of a procedure.
- Describe backup integrity checks and restore tests accurately: they verify different things.
- Preserve existing page URLs where possible. Discuss URL changes and redirects with the maintainer.
- Update the sidebar in `astro.config.mjs` when adding a page that belongs in navigation.

Write in clear English. Prefer concrete instructions and short explanations. Improvements from non-native English speakers are welcome.

## Editing the website

Follow the existing components and styles. Reuse design tokens from `src/styles/tokens.css` where appropriate.

For visual and interactive changes:

- Check desktop and mobile layouts.
- Preserve keyboard navigation and visible focus indicators.
- Keep content usable with reduced motion.
- Verify light and dark themes where applicable.
- Add or adjust tests when behavior changes.

Product screenshot tooling is documented in [scripts/screenshots/README.md](scripts/screenshots/README.md). Regenerating screenshots is not required for ordinary documentation changes.

## Checking your changes

Choose checks appropriate to the change:

| Change | Recommended checks |
|---|---|
| Documentation, links or static content | Build, internal link check and visual preview |
| Shared logic or scripts | Relevant unit tests, build and link check |
| Navigation, layout or interactions | Relevant unit and browser tests, plus visual review |

The standard checks are:

```bash
pnpm test
pnpm build
pnpm check:links
```

The link checker reads `dist/`, so run the build first.

For browser tests:

```bash
pnpm exec playwright install chromium
pnpm test:e2e
```

On Linux, use `pnpm exec playwright install --with-deps chromium` if browser system dependencies are missing.

Playwright uses a dedicated preview server on port **4399**.

If a check cannot run in your environment, explain this in the pull request. Do not disable checks to make a contribution pass.

## Opening a pull request

Open pull requests against **`develop`**.

Include:

- What changed and why.
- A related issue, if one exists.
- The checks you ran and their results.
- Screenshots for visible changes, including mobile where relevant.

Keep each pull request focused. Avoid mixing unrelated formatting, dependency updates and content changes.

Use a Conventional Commit-style PR title, for example:

```text
docs: clarify S3 destination setup
fix: correct mobile navigation focus
feat: add a documentation example
ci: update browser test workflow
chore: refresh development tooling
```

The maintainer reviews contributions and integrates accepted changes. Production updates are promoted separately from `develop` to `main`; Cloudflare deploys `main` automatically.

You do not need deployment access to contribute.

## Dependencies

Use pnpm and keep `pnpm-lock.yaml` consistent with intentional dependency changes.

Do not update dependencies or regenerate the lockfile as part of an unrelated documentation fix. Explain why a new dependency is needed and include its license when proposing one.

## Security reports

Do not post credentials or details of an exploitable vulnerability in a public issue or pull request.

Use GitHub's private vulnerability reporting through the repository's **Security** tab when available. If it is unavailable, contact the maintainer privately before sharing sensitive details.

## License and attribution

By submitting a contribution for inclusion, you agree to license it under [Apache-2.0](LICENSE), unless explicitly agreed otherwise. You retain ownership of your contribution.

Only submit material you have the right to contribute. Preserve third-party license notices and identify the source and license of any external code, text or assets you introduce.