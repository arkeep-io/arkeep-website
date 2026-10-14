## Overview

Arkeep's marketing site reads like a calm, trustworthy infrastructure tool for people who run their own servers. The base canvas is a **warm off-white** (`{colors.canvas}` — #fefbf9) with a soft **peach-to-ember gradient wash** behind the hero band. A deep warm charcoal ink (`{colors.ink}` — #17100c) carries body and display alike. The single brand voltage is **Arkeep orange** (`{colors.brand}` — #f66921), the same hue the dashboard uses for its primary actions, focus rings and active navigation. On the light theme, CTAs and inline links use a deeper, AA-safe shade of that orange (`{colors.primary}` — #c94700) so white button labels stay legible.

Type runs **Be Vietnam Pro** as the single sans family (display 600, body 400) and **JetBrains Mono** on every code surface: the same pairing as the Arkeep dashboard. Both are self-hosted, never loaded from Google Fonts; the site keeps the product's "no third-party calls" stance.

The site ships **light and dark** themes from one token set, mirroring the dashboard. Light is the default; dark follows `prefers-color-scheme` and the Starlight theme toggle. Every neutral is tinted warm (hue 50–60 in OKLCH). There is no pure gray and no pure black anywhere.

The brand's strongest visual signature is the **dashboard hero**: a real Arkeep dashboard screenshot inside a browser frame, with a small terminal card overlapping one corner (the `docker compose up` / agent enrollment moment), set over the warm gradient wash. The product surface is the page's chrome instead of an illustration.

**Key Characteristics:**
- Warm off-white canvas (light) / warm charcoal canvas (dark); peach-ember gradient wash in the hero only.
- Single primary CTA: solid orange at `{rounded.md}` (6px), matching the dashboard's 0.4rem radius family.
- Orange is the only saturated color in the chrome. Chart and status hues appear only inside product screenshots and status badges.
- Be Vietnam Pro as the single sans family, slightly positive tracking on body, slightly negative on display.
- JetBrains Mono on every code surface: install snippets, config, CLI output.
- Dashboard + terminal composite as the hero chrome.
- Hairline + warm-tinted soft shadow depth; no decoration outside the hero.
- 96px section rhythm.

## Colors

Source of truth: `arkeep/gui/src/style.css` (OKLCH). Hex values below are the sRGB conversions; when the dashboard palette changes, regenerate them from there. OKLCH values are given for the brand tokens so the site can use them directly.

### Brand & Accent

| Token | Light | Dark | Use |
|---|---|---|---|
| `{colors.brand}` | #f66921 · `oklch(0.687 0.190 43)` | #f66921 | The Arkeep orange. Logo mark, focus ring, active nav indicator, hero wash highlight, icon accents. Never as text on the light canvas (3.0:1). |
| `{colors.primary}` | #c94700 · `oklch(0.57 0.18 43)` | #f66921 | Primary CTA fill. Light: white label (4.8:1). Dark: ink label (6.2:1). |
| `{colors.primary-hover}` | #b73e00 | #ff8244 | CTA hover. |
| `{colors.primary-active}` | #a43800 | #e25600 | CTA press. |
| `{colors.on-primary}` | #ffffff | #17100c | Label on primary CTA. Note the inversion: dark theme uses ink on orange. |
| `{colors.text-link}` | #c94700 | #f66921 | Inline links in body copy and docs. Underlined on hover. 4.7:1 light, 6.6:1 dark. |
| `{colors.accent-soft}` | #fae2d7 | #291811 | Tinted plate: active nav item, selected tab, icon plates, `badge-brand` background. Same as dashboard `--accent`. |
| `{colors.on-accent-soft}` | #c94700 | #f66921 | Text/icon on `{colors.accent-soft}`. |

### Surface

| Token | Light | Dark | Use |
|---|---|---|---|
| `{colors.canvas}` | #fefbf9 | #0d0806 | Page floor. Warm off-white / warm charcoal, never #fff or #000. |
| `{colors.canvas-soft}` | #faf6f3 | #120d0a | Subtle alternating band. |
| `{colors.surface-card}` | #ffffff | #17110e | Cards, inputs, mockup frames. In light, pure white is reserved for this so cards lift off the warm canvas. |
| `{colors.surface-strong}` | #ebe3dd | #2a221e | Secondary buttons, neutral badges, integration tiles. |
| `{colors.surface-muted}` | #f0eae6 | #1f1916 | Inline code background, table header row. |
| `{colors.surface-dark}` | #17110e | #17110e | Code blocks, terminal cards, featured "self-hosted" card. Identical in both themes. In dark it is distinguished by a hairline, not by tone. |
| `{colors.surface-dark-elevated}` | #201915 | #201915 | Title bar / tab strip inside terminal and code cards. |

### Atmospheric Backdrop

| Token | Light | Dark | Use |
|---|---|---|---|
| `{colors.wash-light}` | #ffe9d9 | #2d1205 | Outer stop of the hero wash. |
| `{colors.wash-mid}` | #ffceb2 | #511a00 | Core of the hero wash, sitting behind the dashboard mockup. |

The wash is a soft radial gradient (`wash-mid` at center → `wash-light` → transparent into `{colors.canvas}`), centered behind the mockup. It is atmosphere, not a brand action color. Hero only.

### Hairlines

| Token | Light | Dark | Use |
|---|---|---|---|
| `{colors.hairline}` | #ebe3dd | #2a221e | Default 1px divider. |
| `{colors.hairline-soft}` | #f0eae6 | #1f1916 | Lighter divider inside cards. |
| `{colors.hairline-strong}` | #dbd2cc | #2f2723 | Card and input outlines. Same as dashboard `--border`. |

### Text

| Token | Light | Dark | Use |
|---|---|---|---|
| `{colors.ink}` | #17100c | #ece7e3 | Display, body emphasis. |
| `{colors.body}` | #69615d | #958d89 | Default running text: warm gray, 5.9:1 / 6.1:1. |
| `{colors.muted}` | #69615d | #807874 | Sub-titles, captions, meta. Light reuses body. Dark uses the dashboard's muted-foreground and only at ≥ 13px. |
| `{colors.muted-soft}` | #dbd2cc | #2f2723 | Disabled text and disabled borders. |
| `{colors.on-dark}` | #ece7e3 | #ece7e3 | Text on `{colors.surface-dark}`. |
| `{colors.on-dark-soft}` | #aba39e | #aba39e | Muted text on dark (comments in code, terminal prompt). |

### Semantic

Used in status badges, docs callouts and inside product screenshots. Never as CTA fills.

| Token | Light | Dark | Use |
|---|---|---|---|
| `{colors.semantic-success}` | #1d7d3e | #53be70 | "Backup completed", success callouts. |
| `{colors.semantic-warning}` | #9a6000 | #edb345 | Warning callouts, "waiting" state. |
| `{colors.semantic-error}` | #df202e | #ee343b | Errors, failed jobs. Same as dashboard `--destructive`. |
| `{colors.semantic-info}` | #007b70 | #00ad9d | Note/tip callouts. Teal is the dashboard's `--chart-2`. |

### Data Palette (screenshots & diagrams only)

Inherited from the dashboard charts, identical in both themes: orange #f66921 · teal #00ad9d · warm yellow #e6ad00 · violet #a36fd9 · red #e12251. Use only inside product imagery and architecture diagrams, in this order.

## Typography

### Font Family
**Be Vietnam Pro** is the single sans family across every text role. **JetBrains Mono** carries every code surface. Both are self-hosted via `@fontsource` (woff2, latin + latin-ext only), as in the dashboard.

- Sans stack: `"Be Vietnam Pro", ui-sans-serif, system-ui, sans-serif`
- Mono stack: `"JetBrains Mono", ui-monospace, monospace`
- Weights shipped: 400, 500, 600 (+ 400 italic). Add 700 only if a component truly needs it.

### Hierarchy

Be Vietnam Pro is wider than Inter, so display sizes run a step smaller than a typical Inter scale, and body keeps the dashboard's slight positive tracking (`0.025em` ≈ 0.4px at 16px).

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.display-mega}` | 60px | 600 | 1.05 | -1.8px | Homepage hero h1 |
| `{typography.display-xl}` | 44px | 600 | 1.1 | -1.1px | Subsidiary heroes |
| `{typography.display-lg}` | 34px | 600 | 1.15 | -0.7px | Section heads |
| `{typography.display-md}` | 26px | 600 | 1.2 | -0.4px | Sub-section heads |
| `{typography.display-sm}` | 21px | 600 | 1.3 | -0.2px | Card group titles |
| `{typography.title-md}` | 18px | 600 | 1.4 | 0 | Component titles |
| `{typography.title-sm}` | 16px | 600 | 1.4 | 0 | List labels |
| `{typography.body-lg}` | 18px | 400 | 1.6 | 0.2px | Hero subhead, lead paragraphs |
| `{typography.body-md}` | 16px | 400 | 1.6 | 0.4px | Default body |
| `{typography.body-sm}` | 14px | 400 | 1.55 | 0.35px | Footer, card body |
| `{typography.caption}` | 13px | 400 | 1.4 | 0.3px | Captions, meta |
| `{typography.caption-uppercase}` | 11px | 600 | 1.4 | 1px | Section eyebrows, badges |
| `{typography.code}` | 13px | 400 | 1.6 | 0 | Code blocks (JetBrains Mono) |
| `{typography.code-inline}` | 0.9em | 400 | inherit | 0 | Inline code (JetBrains Mono) |
| `{typography.button}` | 14px | 600 | 1.0 | 0.2px | CTA labels |
| `{typography.nav-link}` | 14px | 500 | 1.4 | 0.2px | Top-nav menu |

### Principles
- **Display weight stays at 600.** Be Vietnam Pro at 700 gets heavy and round fast.
- **Negative tracking on display only** (-0.2px to -1.8px); body and UI keep the dashboard's positive tracking.
- **Buttons at 600, not 500.** The deeper orange fill needs the extra stroke weight for the white label to read crisply.
- **JetBrains Mono on every code surface**, including file paths and env var names inside prose.
- **No serif.** The dashboard declares Domine as `--font-serif` but never renders it; the site doesn't use it either.

## Layout

### Spacing System
- **Base unit:** 4px.
- **Tokens:** `{spacing.xxs}` 4px · `{spacing.xs}` 8px · `{spacing.sm}` 12px · `{spacing.base}` 16px · `{spacing.md}` 20px · `{spacing.lg}` 24px · `{spacing.xl}` 32px · `{spacing.xxl}` 48px · `{spacing.xxxl}` 64px · `{spacing.section}` 96px.
- **Section padding:** 96px vertical (64px on mobile).

### Grid & Container
- Max content width: 1200px; long-form prose caps at 720px.
- Editorial body: 12-column grid, 24px gutter.
- Feature grids: 2-up for hero splits ("Server" / "Agent"), 3-up for benefit grids.
- Integration tile grid (storage destinations, sources): 6-up at desktop.
- Footer: 4-column at desktop (Product / Docs / Community / Project).

### Whitespace Philosophy
Generous editorial pacing, like a well-kept server rack: everything has room and nothing is ornamental. The warm canvas never competes with the hero wash; dense workflow sections (how it works, architecture) tighten to 16–24px card gaps.

## Elevation & Depth

All shadows are tinted with the warm ink (`oklch(0.18 0.015 50 / α)`), never neutral black, matching the dashboard shadow scale.

| Level | Treatment | Use |
|---|---|---|
| Flat (canvas) | `{colors.canvas}` | Body bands, footer |
| Card | `{colors.surface-card}` + 1px `{colors.hairline-strong}` | Content cards |
| Soft drop | `0 1px 3px oklch(0.18 0.015 50 / 0.10), 0 1px 2px -1px oklch(0.18 0.015 50 / 0.06)` | Resting cards that need lift (light theme) |
| Hover drop | `0 4px 6px -1px oklch(0.18 0.015 50 / 0.10), 0 2px 4px -2px oklch(0.18 0.015 50 / 0.06)` | Hovered cards (single hover tier) |
| Mockup drop | `0 25px 50px -12px oklch(0.18 0.015 50 / 0.22)` | Hero dashboard mockup only |
| Atmospheric gradient | Peach-ember radial wash | Hero backdrop only |
| Dark inversion | `{colors.surface-dark}` | Code blocks, terminal cards, featured card |

In the dark theme, shadows are nearly invisible; depth comes from surface steps (`canvas` → `surface-card` → `surface-dark-elevated`) plus hairlines.

### Decorative Depth
- **Peach-ember gradient wash** in the hero only.
- **Dashboard + terminal composite** as page chrome. Real Arkeep surfaces, no illustrated UI.

## Shapes

### Border Radius Scale

Derived from the dashboard's `--radius: 0.4rem` (≈ 6px), so site and product feel cut from the same material.

| Token | Value | Use |
|---|---|---|
| `{rounded.none}` | 0px | Reserved |
| `{rounded.xs}` | 3px | Inline code, kbd |
| `{rounded.sm}` | 4px | Inline tags, compact rows |
| `{rounded.md}` | 6px | CTA buttons, form inputs, integration tiles |
| `{rounded.lg}` | 10px | Feature cards, code blocks, terminal cards |
| `{rounded.xl}` | 14px | Hero mockup frame |
| `{rounded.xxl}` | 20px | Large atmospheric cards (rare) |
| `{rounded.pill}` | 9999px | Badges only |
| `{rounded.full}` | 9999px | Avatars, status dots |

Compact, tool-like radii: 6px CTAs, 10px cards. Pill geometry is reserved for badges, never CTAs.

## Components

### Top Navigation

**`top-nav`**: Background `{colors.canvas}` at 85% opacity with backdrop blur, 1px `{colors.hairline}` bottom border once scrolled. Text `{colors.ink}`, height 64px. Layout: Arkeep logo mark (orange `{colors.brand}`) + wordmark left; menu (Features / How it works / Docs / Releases) center; GitHub star button (`button-secondary`) + "Get started" (`button-primary`) right. Active item marked with a 2px `{colors.brand}` underline.

### Buttons

**`button-primary`**: Solid orange. Background `{colors.primary}`, text `{colors.on-primary}`, type `{typography.button}` (14px / 600), padding 10px × 18px, height 40px, rounded `{rounded.md}` (6px). Hover `{colors.primary-hover}`, press `{colors.primary-active}`.

**`button-primary-lg`**: Hero variant. Height 48px, padding 14px × 24px, type 15px / 600.

**`button-secondary`**: Background `{colors.surface-card}`, text `{colors.ink}`, 1px `{colors.hairline-strong}` border, same geometry as primary. Hover background `{colors.canvas-soft}`.

**`button-ghost`**: Transparent, text `{colors.ink}`, no border. Hover background `{colors.surface-muted}`. Used in nav and toolbars.

**`button-tertiary-text`**: Inline link-style action. Transparent, text `{colors.text-link}`, trailing `→` arrow, underline on hover.

**Focus (all buttons, links, inputs):** 2px `{colors.brand}` outline at 2px offset, same as dashboard `--ring`.

### Hero & Dashboard Mockup

**`hero-band`**: Background `{colors.canvas}` with the peach-ember wash behind the mockup. Optional `badge-brand` eyebrow (e.g. "v0.7, now with snapshot sync"). Display headline in `{typography.display-mega}`, subhead in `{typography.body-lg}` `{colors.body}` capped at 600px, then `button-primary-lg` + `button-secondary` ("View on GitHub"), then a one-line install snippet (`code-inline-command`), then the mockup composite.

**`dashboard-mockup`**: Browser-frame card. Background `{colors.surface-card}`, rounded `{rounded.xl}`, 1px `{colors.hairline-strong}` border, mockup drop shadow. 36px title bar in `{colors.surface-muted}` with three neutral traffic-light dots (`{colors.hairline-strong}`, not red/yellow/green) and a URL pill reading `arkeep.local`. Holds a real dashboard screenshot. Use the light screenshot in light theme and the dark screenshot in dark theme (swap via `<picture>` + `prefers-color-scheme` or the theme attribute).

**`terminal-overlay-card`**: Overlaps the mockup's bottom-left corner by ~48px on desktop. Background `{colors.surface-dark}`, rounded `{rounded.lg}`, 1px `{colors.surface-dark-elevated}` border, width ~380px. Shows 3–5 lines of `{typography.code}`: `$ docker compose up -d`, agent enrolled, first backup job completed (status word in `{colors.semantic-success}` dark value).

### Cards

**`feature-card`**: Background `{colors.surface-card}`, rounded `{rounded.lg}`, padding 24px, 1px `{colors.hairline-strong}` border. 40px `icon-plate` top, title in `{typography.title-md}` `{colors.ink}`, body in `{typography.body-sm}` `{colors.body}`.

**`feature-card-dark`**: Dark variant for the one feature that deserves emphasis (e.g. "Your data never leaves your infrastructure"). Background `{colors.surface-dark}`, text `{colors.on-dark}` / `{colors.on-dark-soft}`. Same shape.

**`icon-plate`**: 40px square, background `{colors.accent-soft}`, icon (Lucide, 20px, 1.75 stroke) in `{colors.on-accent-soft}`, rounded `{rounded.md}`.

**`workflow-step-card`**: Step in the "How it works" row (Install server → Enroll agents → Define policies → Sleep well). Background `{colors.surface-card}`, rounded `{rounded.lg}`, padding 20px. Layout: 32px `workflow-step-number` + label in `{typography.title-sm}` + body in `{typography.body-sm}`. Steps joined by a 1px dashed `{colors.hairline-strong}` connector.

**`workflow-step-number`**: 32px square, background `{colors.surface-strong}`, number in JetBrains Mono 13px / 600 `{colors.ink}`, rounded `{rounded.md}`. The current/highlighted step swaps to `{colors.accent-soft}` / `{colors.on-accent-soft}`.

**`architecture-diagram-card`**: Server ↔ agents (gRPC, mTLS) ↔ destinations diagram. Background `{colors.canvas-soft}`, rounded `{rounded.lg}`, 1px `{colors.hairline}` border, padding 32px. Nodes are `surface-card` boxes with hairline borders; the server node gets a `{colors.brand}` 1.5px border; connectors in `{colors.muted}` with labels in `{typography.caption}` mono.

**`testimonial-card`**: Background `{colors.surface-card}`, text `{colors.body}`, rounded `{rounded.lg}`, padding 24px. Quote in `{typography.body-md}` `{colors.ink}`, attribution in `{typography.caption}`.

### Code & Terminal

**`code-block`**: Background `{colors.surface-dark}`, text `{colors.on-dark}` in `{typography.code}`, rounded `{rounded.lg}`, padding 20px. Optional 36px header strip in `{colors.surface-dark-elevated}` with filename (`{colors.on-dark-soft}`) and a copy button. Syntax: keywords `{colors.brand}`, strings #e6ad00, comments `{colors.on-dark-soft}`, numbers/literals #00ad9d.

**`code-inline`**: Background `{colors.surface-muted}`, text `{colors.ink}`, `{typography.code-inline}`, padding 1px 5px, rounded `{rounded.xs}`.

**`code-inline-command`**: One-line install command under the hero CTA. Background `{colors.surface-card}`, 1px `{colors.hairline-strong}` border, rounded `{rounded.md}`, height 40px, `$` prompt in `{colors.muted}`, command in `{colors.ink}`, copy icon right.

**`install-card`**: Replaces Expo's pricing tiers. Arkeep is open source and self-hosted, so the "plans" are install paths: Docker Compose / Binary / Unraid / Kubernetes. Background `{colors.surface-card}`, rounded `{rounded.lg}`, padding 32px, 1px `{colors.hairline-strong}` border, title + 2-line description + `code-block` + `button-tertiary-text` to the docs.

**`install-card-featured`**: Recommended path (Docker Compose). Background `{colors.surface-dark}`, text `{colors.on-dark}`, `badge-brand` "Recommended". Same shape.

### Integrations

**`integration-tile`**: Logo plate for storage destinations and sources (S3, Backblaze B2, SFTP, Rclone remotes, local disk, Docker volumes, PostgreSQL…). Background `{colors.surface-card}`, rounded `{rounded.md}`, 64px square, 1px `{colors.hairline}` border, logo monochrome in `{colors.body}`, full color on hover. Caption below in `{typography.caption}`.

### Forms & Tags

**`text-input`**: Background `{colors.surface-card}`, text `{colors.ink}`, placeholder `{colors.muted}`, rounded `{rounded.md}`, padding 12px × 14px, height 44px, 1px `{colors.hairline-strong}` border. Focus: border `{colors.brand}` + 3px ring `{colors.brand}` at 25% opacity.

**`badge-pill`**: Neutral. Background `{colors.surface-strong}`, text `{colors.ink}`, `{typography.caption-uppercase}`, rounded `{rounded.pill}`, padding 4px × 10px.

**`badge-brand`**: Background `{colors.accent-soft}`, text `{colors.on-accent-soft}`. For "New", "Recommended", release eyebrows.

**`badge-status`**: Neutral pill with a 6px leading dot in the semantic color (`success` / `warning` / `error` / `info`). Text stays `{colors.ink}`. Color lives only in the dot.

### Docs Callouts

**`callout`**: Background `{colors.canvas-soft}`, 3px left border in the semantic color (`info` = note/tip, `warning` = caution, `error` = danger), rounded `{rounded.md}`, padding 16px × 20px. Title in `{typography.title-sm}` tinted with the semantic color, body in `{colors.body}`.

### CTA / Footer

**`cta-band`**: Pre-footer band. Background `{colors.canvas-soft}`, centered headline in `{typography.display-lg}`, subhead in `{colors.body}`, `button-primary-lg` + `button-secondary`. A faint version of the hero wash (30% opacity) is allowed here; this is the single exception to "hero only". 96px padding.

**`footer`**: Background `{colors.canvas}`, 1px `{colors.hairline}` top border, text `{colors.body}`. Logo + one-line tagline + license note ("Apache-2.0") left, 4-column link list right. 64px × 48px padding.

**`footer-link`**: Transparent, text `{colors.body}`, `{typography.body-sm}`. Hover `{colors.ink}`.

## Starlight Mapping

The site is built on Astro Starlight. Docs pages must use the same tokens; map them via a custom CSS file registered in `starlight({ customCss: [...] })`. Starlight's accent scale is low / base / high (high = strongest contrast against the background).

| Starlight variable | Light | Dark |
|---|---|---|
| `--sl-color-accent-low` | `{colors.accent-soft}` #fae2d7 | `{colors.accent-soft}` #291811 |
| `--sl-color-accent` | `{colors.primary}` #c94700 | `{colors.brand}` #f66921 |
| `--sl-color-accent-high` | #7a2c00 | #ffceb2 |
| `--sl-color-white` | `{colors.ink}` #17100c | #ffffff |
| `--sl-color-gray-1` | #2a221e | `{colors.ink}` #ece7e3 |
| `--sl-color-gray-2` | #3d3430 | #c9c1bc |
| `--sl-color-gray-3` | `{colors.body}` #69615d | `{colors.on-dark-soft}` #aba39e |
| `--sl-color-gray-4` | #958d89 | `{colors.muted}` #807874 |
| `--sl-color-gray-5` | `{colors.hairline-strong}` #dbd2cc | `{colors.hairline-strong}` #2f2723 |
| `--sl-color-gray-6` | `{colors.surface-muted}` #f0eae6 | `{colors.surface-card}` #17110e |
| `--sl-color-gray-7` | `{colors.canvas-soft}` #faf6f3 | `{colors.canvas-soft}` #120d0a |
| `--sl-color-black` | `{colors.canvas}` #fefbf9 | `{colors.canvas}` #0d0806 |
| `--sl-font` | Be Vietnam Pro stack | same |
| `--sl-font-mono` | JetBrains Mono stack | same |

Starlight's light theme lives under `:root[data-theme='light']`; dark under `:root` / `[data-theme='dark']`. Set `--sl-color-text-accent` to `{colors.text-link}` in each theme, and override Starlight asides (`.starlight-aside--note|tip|caution|danger`) to the `callout` spec above.

## Do's and Don'ts

### Do
- Use orange as the only saturated chrome color: `{colors.primary}` for CTAs and links, `{colors.brand}` for marks, rings and accents.
- Use `{colors.primary}` (#c94700), not `{colors.brand}` (#f66921), for anything white text sits on, or for orange text on the light canvas.
- Keep every neutral warm. Pull from the token list; never drop in a Tailwind `gray-*` or `zinc-*`.
- Set every CTA at `{rounded.md}` (6px) and every card at `{rounded.lg}` (10px).
- Use Be Vietnam Pro 600 for display, 400 for body; JetBrains Mono for all code, paths and env vars.
- Ship both themes, and swap product screenshots to match the active theme.
- Pair the hero with the real dashboard + terminal composite.

### Don't
- Don't put white text on #f66921. It's 3.0:1 and fails AA at button sizes.
- Don't introduce a second action color. Teal, yellow and violet live only in charts, diagrams and status dots.
- Don't use pure white (#ffffff) as a page background or pure black (#000000) anywhere. White is for cards only.
- Don't use semantic colors on CTAs or as large fills.
- Don't drop display below 600 or above 700.
- Don't use pill-shaped CTAs. Pills are for badges only.
- Don't replicate the hero wash outside the hero (sole exception: the faint `cta-band` echo).
- Don't load fonts or assets from third-party CDNs; self-host, as the product does.
- Don't use illustrated or fake UI in the hero. Real Arkeep screenshots only.

## Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| Mobile | < 640px | Hero h1 60→34px; mockup shows the dashboard alone, terminal card moves below it full-width; feature grid 1-up; nav hamburger. |
| Tablet | 640–1024px | Hero h1 44px; terminal overlay shrinks to 300px; feature grid 2-up. |
| Desktop | 1024–1280px | Full hero h1 60px; full dashboard + terminal composite; feature grid 3-up. |
| Wide | > 1280px | Content caps at 1200px. |

### Touch Targets
- Primary CTA 40px (48px in hero), padded to 44px tap area on mobile.
- Inputs 44px.

### Collapsing Strategy
- Top nav switches to hamburger below 768px; GitHub button collapses to an icon.
- Dashboard + terminal composite stacks vertically on mobile.
- Feature grid: 3-up → 2-up → 1-up.
- Workflow steps: horizontal row → vertical timeline (connector becomes vertical) below 768px.
- Integration tile grid: 6-up → 4-up → 3-up.
- Install cards: 4-up → 2-up → 1-up; featured card always first.

## Iteration Guide

1. Focus on a single component at a time.
2. CTAs default to `{rounded.md}` (6px). Cards use `{rounded.lg}` (10px).
3. Variants live as separate entries.
4. Use `{token.refs}` everywhere. Never inline hex in components.
5. Every component must be specified for both themes; if a token has the same value in both, say so.
6. Be Vietnam Pro 600 for display, 400 for body; JetBrains Mono on code.
7. Orange is the only action color; `primary` for fills and text, `brand` for marks and rings.
8. When the dashboard palette in `arkeep/gui/src/style.css` changes, update this file to match.

## Known Gaps

- Be Vietnam Pro and JetBrains Mono are OFL-licensed; no licensing concerns.
- Arkeep has no dedicated wordmark specification yet; until it does, set the wordmark in Be Vietnam Pro 600, `{colors.ink}`, -0.4px tracking, next to the orange mark.
- Dark-theme hex values for `--sl-color-accent-high` and the Starlight gray ramp intermediates (gray-2, light gray-2/4) are interpolated, not taken from the dashboard; verify against the rendered docs.
- Animation timings (hero entrance, mockup parallax, terminal typing effect) are out of scope.
- Hover states are specified for buttons and cards only.
- Product screenshots must be regenerated whenever the dashboard UI changes; there is no automated pipeline yet.
