---
version: alpha
name: Arkeep-design
description: A self-hosted backup platform whose marketing site reads like a quietly-confident infrastructure brand. The base canvas is a warm off-white (`#fefbf9`) with a soft warm-peach gradient atmospheric wash behind the hero; deep warm charcoal ink (`#17100c`) carries body and display alike. The single brand voltage is **Arkeep orange** — `#f66921` for the logo, focus ring and accent marks, and its deeper AA-safe shade `#c94700` for primary CTAs and inline links, so white labels stay legible. Type pairs Be Vietnam Pro at modest weights (display 600, body 400) with JetBrains Mono on every code surface. Every neutral is tinted warm; there is no pure gray and no pure black. The brand's strongest visual signature is the **device-mockup hero** — a centered MacBook + iPhone composite showing real Arkeep surfaces — over the warm gradient wash.

colors:
  primary: "#c94700"
  primary-active: "#a43800"
  brand: "#f66921"
  text-link: "#c94700"
  text-link-secondary: "#7a2c00"
  ink: "#17100c"
  body: "#69615d"
  body-strong: "#17100c"
  muted: "#958d89"
  muted-soft: "#dbd2cc"
  hairline: "#ebe3dd"
  hairline-soft: "#f0eae6"
  hairline-strong: "#dbd2cc"
  canvas: "#fefbf9"
  canvas-soft: "#faf6f3"
  surface-card: "#ffffff"
  surface-strong: "#ebe3dd"
  surface-dark: "#17110e"
  surface-dark-elevated: "#201915"
  on-primary: "#ffffff"
  on-dark: "#ece7e3"
  on-dark-soft: "#aba39e"
  accent-soft: "#fae2d7"
  on-accent-soft: "#c94700"
  gradient-warm-light: "#fae2d7"
  gradient-warm-mid: "#ffceb2"
  accent-warning: "#9a6000"
  accent-info: "#007b70"
  semantic-error: "#df202e"
  semantic-success: "#1d7d3e"

colors-dark:
  primary: "#f66921"
  primary-active: "#e25600"
  brand: "#f66921"
  text-link: "#f66921"
  text-link-secondary: "#ffceb2"
  ink: "#ece7e3"
  body: "#958d89"
  body-strong: "#ece7e3"
  muted: "#807874"
  muted-soft: "#2f2723"
  hairline: "#2a221e"
  hairline-soft: "#1f1916"
  hairline-strong: "#2f2723"
  canvas: "#0d0806"
  canvas-soft: "#120d0a"
  surface-card: "#17110e"
  surface-strong: "#2a221e"
  surface-dark: "#0d0806"
  surface-dark-elevated: "#17110e"
  on-primary: "#17100c"
  on-dark: "#ece7e3"
  on-dark-soft: "#aba39e"
  accent-soft: "#291811"
  on-accent-soft: "#f66921"
  gradient-warm-light: "#291811"
  gradient-warm-mid: "#3a2216"
  accent-warning: "#edb345"
  accent-info: "#00ad9d"
  semantic-error: "#ee343b"
  semantic-success: "#53be70"

typography:
  display-mega:
    fontFamily: "'Be Vietnam Pro', ui-sans-serif, system-ui, sans-serif"
    fontSize: 64px
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: -1.92px
  display-xl:
    fontFamily: "'Be Vietnam Pro', sans-serif"
    fontSize: 48px
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: -1.44px
  display-lg:
    fontFamily: "'Be Vietnam Pro', sans-serif"
    fontSize: 36px
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: -1.08px
  display-md:
    fontFamily: "'Be Vietnam Pro', sans-serif"
    fontSize: 28px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: -0.84px
  display-sm:
    fontFamily: "'Be Vietnam Pro', sans-serif"
    fontSize: 22px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: -0.5px
  title-md:
    fontFamily: "'Be Vietnam Pro', sans-serif"
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0
  title-sm:
    fontFamily: "'Be Vietnam Pro', sans-serif"
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0
  body-md:
    fontFamily: "'Be Vietnam Pro', sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  body-sm:
    fontFamily: "'Be Vietnam Pro', sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  caption:
    fontFamily: "'Be Vietnam Pro', sans-serif"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0
  caption-uppercase:
    fontFamily: "'Be Vietnam Pro', sans-serif"
    fontSize: 11px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0.88px
    textTransform: uppercase
  code:
    fontFamily: "'JetBrains Mono', ui-monospace, monospace"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  button:
    fontFamily: "'Be Vietnam Pro', sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.0
    letterSpacing: 0
  nav-link:
    fontFamily: "'Be Vietnam Pro', sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0

rounded:
  none: 0px
  xs: 4px
  sm: 6px
  md: 8px
  lg: 12px
  xl: 16px
  xxl: 24px
  pill: 9999px
  full: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  base: 16px
  md: 20px
  lg: 24px
  xl: 32px
  xxl: 48px
  section: 96px

components:
  top-nav:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.nav-link}"
    height: 64px
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 10px 18px
    height: 40px
  button-primary-active:
    backgroundColor: "{colors.primary-active}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
  button-secondary:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 9px 17px
    height: 40px
  button-tertiary-text:
    backgroundColor: transparent
    textColor: "{colors.text-link}"
    typography: "{typography.button}"
  hero-band:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.display-mega}"
    padding: 96px
  device-mockup-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: 0
  feature-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.title-md}"
    rounded: "{rounded.lg}"
    padding: 24px
  feature-card-dark:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.on-dark}"
    typography: "{typography.title-md}"
    rounded: "{rounded.lg}"
    padding: 24px
  workflow-step-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.body}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 20px
  workflow-step-icon:
    backgroundColor: "{colors.surface-strong}"
    rounded: "{rounded.md}"
    size: 32px
  code-block:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.on-dark}"
    typography: "{typography.code}"
    rounded: "{rounded.lg}"
    padding: 20px
  ide-mockup-card:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.lg}"
    padding: 0
  pricing-tier-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 32px
  pricing-tier-featured:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.on-dark}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 32px
  text-input:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 12px 16px
    height: 44px
  badge-pill:
    backgroundColor: "{colors.surface-strong}"
    textColor: "{colors.ink}"
    typography: "{typography.caption-uppercase}"
    rounded: "{rounded.pill}"
    padding: 4px 10px
  ecosystem-tile:
    backgroundColor: "{colors.surface-card}"
    rounded: "{rounded.md}"
    size: 64px
  cta-band:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.display-lg}"
    padding: 96px
  testimonial-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.body}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 24px
  footer-light:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.body}"
    typography: "{typography.body-sm}"
    padding: 64px 48px
  footer-link:
    backgroundColor: transparent
    textColor: "{colors.body}"
    typography: "{typography.body-sm}"
---

## Overview

Arkeep's marketing site reads like a quietly-confident self-hosted backup platform. The base canvas is a **warm off-white** (`{colors.canvas}` — #fefbf9) with a soft **warm-peach gradient atmospheric wash** behind the hero band. Deep warm charcoal ink `{colors.ink}` (#17100c) carries body and display alike. The single brand voltage is **Arkeep orange**: `{colors.brand}` (#f66921) for the logo, focus ring and accent marks, and its deeper AA-safe shade `{colors.primary}` (#c94700) for primary CTAs and inline links, so white labels stay legible. Every neutral is tinted warm (hue 50–60 in OKLCH) — no pure gray, no pure black.

Type runs **Be Vietnam Pro** as the single sans family at modest weights (display 600, body 400). JetBrains Mono carries every code surface. Both are self-hosted — the site makes no third-party font calls.

**Scope.** This system governs the marketing pages (everything outside `/docs/`). The Starlight documentation keeps its own layout and components and only inherits colors and fonts, through the mapping in **Starlight Mapping** below.

The site ships **light and dark** themes, mirroring the dashboard: `colors` is the light theme, `colors-dark` the dark one, with identical keys. The theme follows `prefers-color-scheme` until the visitor chooses one; the choice is stored under Starlight's key (`starlight-theme`), so it holds across `/` and `/docs/`.

The brand's strongest visual signature is the **device-mockup hero** — a centered MacBook + iPhone composite showing real Arkeep surfaces (dashboard, agents, job progress) — over a warm-peach gradient atmospheric wash. The composite is the page's chrome instead of an illustration.

**Key Characteristics:**
- Warm off-white canvas with warm-peach gradient atmospheric backdrop in hero only.
- Single primary CTA: Arkeep orange (`{colors.primary}`) at `{rounded.md}` (8px) — compact developer-tool dialect.
- Bright orange (`{colors.brand}`) for logo, focus ring and accent marks only — never as text or under white text on the light canvas.
- Be Vietnam Pro as the single sans family — no custom display typeface.
- JetBrains Mono on every code surface.
- Device-mockup hero with real Arkeep product surfaces is the brand chrome.
- Hairline + soft drop depth; no atmospheric brand decoration outside the hero.
- 96px section rhythm.

## Colors

Source of truth: `arkeep/gui/src/style.css` (OKLCH). Hex values are the sRGB conversions, implemented in `src/styles/tokens.css`. Values are given as **light / dark**.

### Brand & Accent
- **Primary** (`{colors.primary}` — #c94700 / #f66921): Primary CTA fill and inline links. Light: white label (4.8:1). Dark: ink label (6.2:1).
- **Primary Active** (`{colors.primary-active}` — #a43800 / #e25600): Press state.
- **Brand Orange** (`{colors.brand}` — #f66921 / #f66921): Logo, focus ring, progress, accent marks. Never as text or as a fill under white text on the light canvas (3.0:1).
- **Text Link** (`{colors.text-link}` — #c94700 / #f66921): Inline body links inside long-form copy (4.7:1 light, 6.6:1 dark).
- **Legal Link** (`{colors.text-link-secondary}` — #7a2c00 / #ffceb2): Inline links inside legal copy footer.
- **Accent Soft** (`{colors.accent-soft}` — #fae2d7 / #291811) + **On Accent Soft** (`{colors.on-accent-soft}` — #c94700 / #f66921): Tinted plate and its text.

### Surface
- **Canvas** (`{colors.canvas}` — #fefbf9 / #0d0806): Warm off-white page floor.
- **Canvas Soft** (`{colors.canvas-soft}` — #faf6f3 / #120d0a): Subtle alternating band.
- **Surface Card** (`{colors.surface-card}` — #ffffff / #17110e): Pure white card. Pure white only here.
- **Surface Strong** (`{colors.surface-strong}` — #ebe3dd / #2a221e): Badges, ecosystem tiles, secondary buttons.
- **Surface Dark** (`{colors.surface-dark}` — #17110e / #0d0806): Dark feature cards, code blocks, IDE mockups, featured pricing. In the dark theme it steps down to the canvas value, so dark cards stay distinct from `{colors.surface-card}`.
- **Surface Dark Elevated** (`{colors.surface-dark-elevated}` — #201915 / #17110e): One step lighter inside dark cards.

### Atmospheric Backdrop
- **Warm Light** (`{colors.gradient-warm-light}` — #fae2d7 / #291811) + **Warm Mid** (`{colors.gradient-warm-mid}` — #ffceb2 / #3a2216): The soft warm-peach gradient wash behind the homepage hero only. Not a brand action color.

### Hairlines
- **Hairline** (`{colors.hairline}` — #ebe3dd / #2a221e): Default 1px divider.
- **Hairline Soft** (`{colors.hairline-soft}` — #f0eae6 / #1f1916): Lighter divider.
- **Hairline Strong** (`{colors.hairline-strong}` — #dbd2cc / #2f2723): Stronger panel outline.

### Text
- **Ink** (`{colors.ink}` — #17100c / #ece7e3): Display, body emphasis.
- **Body** (`{colors.body}` — #69615d / #958d89): Default running-text — warm gray.
- **Body Strong** (`{colors.body-strong}` — #17100c / #ece7e3): Same as ink.
- **Muted** (`{colors.muted}` — #958d89 / #807874): Sub-titles.
- **Muted Soft** (`{colors.muted-soft}` — #dbd2cc / #2f2723): Disabled text.
- **On Primary** (`{colors.on-primary}` — #ffffff / #17100c): Label on the orange CTA. The label inverts in dark.
- **On Dark** (`{colors.on-dark}` — #ece7e3): Off-white text on dark cards.
- **On Dark Soft** (`{colors.on-dark-soft}` — #aba39e): Muted off-white on dark.

### Semantic
- **Warning** (`{colors.accent-warning}` — #9a6000 / #edb345): Warning text inside docs callouts.
- **Info** (`{colors.accent-info}` — #007b70 / #00ad9d): Info callouts and status dots.
- **Success** (`{colors.semantic-success}` — #1d7d3e / #53be70): Confirmation.
- **Error** (`{colors.semantic-error}` — #df202e / #ee343b): Validation errors.

## Typography

### Font Family
**Be Vietnam Pro** is the single sans family across every text role. **JetBrains Mono** carries every code surface. Fallbacks: `ui-sans-serif, system-ui, sans-serif` and `ui-monospace, monospace`. Both are self-hosted via `@fontsource` (latin and latin-ext; weights 400, 500, 600, plus 400 italic). Be Vietnam Pro 400 and 600 latin are preloaded; everything else loads on demand.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.display-mega}` | 64px | 600 | 1.05 | -1.92px | Homepage hero h1 |
| `{typography.display-xl}` | 48px | 600 | 1.1 | -1.44px | Subsidiary heroes |
| `{typography.display-lg}` | 36px | 600 | 1.15 | -1.08px | Section heads |
| `{typography.display-md}` | 28px | 600 | 1.2 | -0.84px | Sub-section heads |
| `{typography.display-sm}` | 22px | 600 | 1.25 | -0.5px | Card group titles |
| `{typography.title-md}` | 18px | 600 | 1.4 | 0 | Component titles |
| `{typography.title-sm}` | 16px | 600 | 1.4 | 0 | List labels |
| `{typography.body-md}` | 16px | 400 | 1.5 | 0 | Default body |
| `{typography.body-sm}` | 14px | 400 | 1.5 | 0 | Footer body |
| `{typography.caption}` | 13px | 400 | 1.4 | 0 | Photo captions |
| `{typography.caption-uppercase}` | 11px | 600 | 1.4 | 0.88px | Section labels, badges |
| `{typography.code}` | 13px | 400 | 1.5 | 0 | Code blocks — JetBrains Mono |
| `{typography.button}` | 14px | 500 | 1.0 | 0 | CTA labels |
| `{typography.nav-link}` | 14px | 500 | 1.4 | 0 | Top-nav menu |

### Principles
- **Display weight stays at 600** — confident but not bombastic. Be Vietnam Pro gets heavy fast above 600.
- **Negative letter-spacing on display** — -0.5px to -1.92px tracking.
- **JetBrains Mono on every code surface.**

### Note on Font Substitutes
Be Vietnam Pro and JetBrains Mono are both freely available (OFL) — the system self-hosts them directly, with no third-party CDN.

## Starlight Mapping

The docs (`/docs/`) inherit colors and fonts through Starlight's variables, implemented in `src/styles/starlight.css`. Starlight's dark theme is the bare `:root`; light is `[data-theme='light']`.

| Starlight variable | Light | Dark |
|---|---|---|
| `--sl-color-accent-low` | #fae2d7 | #291811 |
| `--sl-color-accent` | #c94700 | #f66921 |
| `--sl-color-accent-high` | #7a2c00 | #ffceb2 |
| `--sl-color-white` | #17100c | #ffffff |
| `--sl-color-gray-1` → `-7` | #2a221e · #3d3430 · #69615d · #958d89 · #dbd2cc · #f0eae6 · #faf6f3 | #ece7e3 · #c9c1bc · #aba39e · #807874 · #2f2723 · #17110e · #120d0a |
| `--sl-color-black` | #fefbf9 | #0d0806 |
| `--sl-color-text-accent` | #c94700 | #f66921 |
| `--sl-font` / `--sl-font-mono` | Be Vietnam Pro / JetBrains Mono | same |

Docs asides use a soft ground (`{colors.canvas-soft}`) and a 3px semantic left border.

## Layout

### Spacing System
- **Base unit:** 4px.
- **Tokens:** `{spacing.xxs}` 4px · `{spacing.xs}` 8px · `{spacing.sm}` 12px · `{spacing.base}` 16px · `{spacing.md}` 20px · `{spacing.lg}` 24px · `{spacing.xl}` 32px · `{spacing.xxl}` 48px · `{spacing.section}` 96px.
- **Section padding:** 96px.

### Grid & Container
- Max content width: ~1200px.
- Editorial body: 12-column grid.
- Feature card grids: 2-up at desktop for hero splits, 3-up for benefit grids.
- Ecosystem tile grid: 8-up at desktop.
- Footer: 5-column at desktop.

### Whitespace Philosophy
Generous editorial pacing. The warm canvas does not compete with the hero's warm gradient wash; cards inside dense workflow sections sit close (16-24px gap).

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| Flat (canvas) | `{colors.canvas}` (#fefbf9) | Body bands, footer |
| Card | `{colors.surface-card}` (#ffffff) | Content cards |
| Hairline border | 1px `{colors.hairline}` | Card outlines |
| Soft drop | `0 4px 12px rgba(23, 16, 12, 0.04)` | Hovered cards (single shadow tier) |
| Atmospheric gradient | Warm-peach radial wash | Hero backdrop only |
| Dark inversion | `{colors.surface-dark}` (#17110e) | Dark feature cards, code blocks, featured pricing |

### Decorative Depth
- **Warm-peach gradient backdrop** in the hero only — atmospheric depth without claiming to be a brand color. It fades out well before the hero ends, so the next section never cuts it.
- **Snapshot-cell field** behind the hero copy: a grid of 10px cells (`{colors.hairline}`) like the retention timeline. Now and then a cell is "kept" in `{colors.brand}` and fades; a backup run sweeps a wave across, a restore ripples out from the headline in `{colors.semantic-success}`. Masked to a soft ellipse; still under reduced motion.
- **Device mockup composite** as page chrome — MacBook + iPhone showing real Arkeep surfaces.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.none}` | 0px | Reserved |
| `{rounded.xs}` | 4px | Inline tags |
| `{rounded.sm}` | 6px | Compact rows |
| `{rounded.md}` | 8px | CTA buttons, form inputs, ecosystem tiles |
| `{rounded.lg}` | 12px | Feature cards, code blocks, pricing tiers |
| `{rounded.xl}` | 16px | Device mockup cards |
| `{rounded.xxl}` | 24px | Larger atmospheric cards (rare) |
| `{rounded.pill}` | 9999px | Badges only |
| `{rounded.full}` | 9999px | Avatar plates (rare) |

Compact developer-ergonomic radii — 8px CTAs, 12px cards. Pill geometry is reserved for badges, never CTAs.

## Components

### Top Navigation

**`top-nav`** — Background `{colors.canvas}`, text `{colors.ink}`, height 64px. Layout: Arkeep wordmark left, primary horizontal menu (Docs / Roadmap / GitHub), Install Arkeep CTA right.

### Buttons

**`button-primary`** — Orange button. Background `{colors.primary}`, text `{colors.on-primary}`, type `{typography.button}` (14px / 500), padding 10px × 18px, height 40px, rounded `{rounded.md}` (8px).

**`button-primary-active`** — Press state. Background `{colors.primary-active}`.

**`button-secondary`** — White card with 1px hairline-strong border. Background `{colors.surface-card}`, text `{colors.ink}`, 1px `{colors.hairline-strong}` border.

**`button-tertiary-text`** — Inline orange text link. Background transparent, text `{colors.text-link}`.

### Hero & Device Mockup

**`hero-band`** — Background `{colors.canvas}` with a soft warm-peach gradient wash behind the centered headline. Display headline in `{typography.display-mega}` (64px / 600 / -1.92px), subhead in `{typography.body-md}`, single primary CTA, then below — the device mockup composite.

**`device-mockup-card`** — A layered MacBook + iPhone composite showing real Arkeep surfaces. Background `{colors.surface-card}`, rounded `{rounded.xl}`. The MacBook screen is the GUI's job page rebuilt in HTML at true size (`BackupFragment`), and it runs a live backup of this page: **Run backup** → **Break the headline** → **Restore it**, driven from a control strip under the devices. The iPhone shows a real mobile screenshot of the dashboard (`scripts/screenshots/`). This is the page chrome.

### Cards

**`feature-card`** — Background `{colors.surface-card}`, text `{colors.ink}`, type `{typography.title-md}`, rounded `{rounded.lg}`, padding 24px, 1px `{colors.hairline-strong}` border.

**`feature-card-dark`** — Dark variant. Background `{colors.surface-dark}`, text `{colors.on-dark}`. Same shape, dark inversion.

**`workflow-step-card`** — Step in the "server → agent → policy" workflow row. Background `{colors.surface-card}`, text `{colors.body}`, rounded `{rounded.lg}`, padding 20px. Layout: 32px square `{component.workflow-step-icon}` + step number + label + body.

**`workflow-step-icon`** — Square plate. Background `{colors.surface-strong}`, rounded `{rounded.md}`, 32px size.

**`testimonial-card`** — Quote card. Background `{colors.surface-card}`, text `{colors.body}`, rounded `{rounded.lg}`, padding 24px.

### Code & IDE

**`code-block`** — Inline code block. Background `{colors.surface-dark}`, text `{colors.on-dark}` in `{typography.code}` (JetBrains Mono 13px), rounded `{rounded.lg}`, padding 20px. Off-white text on dark.

**`ide-mockup-card`** — Stylized IDE mockup. Background `{colors.surface-dark}`, rounded `{rounded.lg}`. Multi-pane editor + terminal preview.

### Pricing

**`pricing-tier-card`** — Standard pricing tier. Background `{colors.surface-card}`, rounded `{rounded.lg}`, padding 32px, 1px `{colors.hairline-strong}` border.

**`pricing-tier-featured`** — Featured tier. Background `{colors.surface-dark}`, text `{colors.on-dark}`. Same shape, dark inversion.

### Ecosystem

**`ecosystem-tile`** — 64px-high plate naming a destination in type (Local disk, S3, Backblaze B2, SFTP…). No third-party logos. Background `{colors.surface-card}`, rounded `{rounded.md}`, 1px `{colors.hairline}` border.

### Forms & Tags

**`text-input`** — Background `{colors.surface-card}`, text `{colors.ink}`, rounded `{rounded.md}` (8px), padding 12px × 16px, height 44px, 1px `{colors.hairline-strong}` border. Focus thickens border to 2px `{colors.brand}`.

**`badge-pill`** — Small uppercase pill. Background `{colors.surface-strong}`, text `{colors.ink}`, type `{typography.caption-uppercase}`, rounded `{rounded.pill}`, padding 4px × 10px.

### CTA / Footer

**`cta-band`** — Pre-footer band. Background `{colors.canvas}`, centered display headline in `{typography.display-lg}`, single orange CTA. 96px padding.

**`footer-light`** — Closing warm footer. Background `{colors.canvas}`, text `{colors.body}`. 5-column link list. 64×48px padding.

**`footer-link`** — Background transparent, text `{colors.body}`, type `{typography.body-sm}`.

### Section band

Large interactive blocks (the retention demo) sit on a soft band: background `{colors.hairline-soft}` (dark: `{colors.canvas-soft}`), rounded `{rounded.xxl}`, 80px inner padding. One band per page section at most, never nested.

## Do's and Don'ts

### Do
- Reserve `{colors.primary}` (orange) for primary CTAs and inline links.
- Use `{colors.brand}` (#f66921) for logo, focus ring and accent marks only.
- Set every CTA at `{rounded.md}` (8px) — developer dialect.
- Use Be Vietnam Pro at weight 600 for display, 400 for body.
- Render every code surface in JetBrains Mono.
- Keep neutrals warm and pull every value from tokens; keep both themes working.
- Pair the hero with the device-mockup composite — it's the page chrome.

### Don't
- Don't introduce a second action color. Orange is the only CTA fill.
- Don't put white text on `{colors.brand}` (#f66921, 3.0:1) — use `{colors.primary}`.
- Don't use pure gray or pure black — every neutral is tinted warm.
- Don't drop display below weight 600 or above 700.
- Don't use full pills on CTAs — pills are for badges only.
- Don't replicate the warm-peach gradient backdrop outside the hero.
- Don't load fonts from third-party CDNs.

## Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| Mobile | < 640px | Hero h1 64→36px; device mockup → a single phone frame holding the live job page; feature grid 1-up. |
| Tablet | 640–1024px | Hero h1 48px; laptop only (no phone), GUI sidebar collapses; feature grid 2-up; nav hamburger. |
| Desktop | 1024–1280px | Full hero h1 64px; full MacBook + iPhone composite; feature grid 3-up. |
| Wide | > 1280px | Content caps at 1200px. |

### Touch Targets
- Primary CTA at 40px height — at WCAG AA, padded for AAA.
- Search input 44px — at AAA.

### Collapsing Strategy
- Top nav switches to hamburger below 1024px.
- Device mockup: MacBook + iPhone → MacBook only below 1024px → one phone frame with the live job page below 640px.
- Feature grid: 3-up → 2-up → 1-up.
- Ecosystem tile grid: 8-up → 4-up → 3-up → 2-up.

## Iteration Guide

1. Focus on a single component at a time.
2. CTAs default to `{rounded.md}` (8px). Cards use `{rounded.lg}` (12px).
3. Variants live as separate entries.
4. Use `{token.refs}` everywhere — never inline hex.
5. Hover state never documented.
6. Be Vietnam Pro 600 for display, Be Vietnam Pro 400 for body. JetBrains Mono on code.
7. Orange (`{colors.primary}`) stays the only CTA color; `{colors.brand}` stays accent-only.

## Known Gaps

- Be Vietnam Pro and JetBrains Mono are OFL-licensed and self-hosted — no licensing concerns.
- Dark-theme values for the gradient wash (`#291811` / `#3a2216`) are derived, not taken from the dashboard palette.
- Animation timings (device mockup parallax, hero entrance) out of scope.
- In-app surfaces (dashboard interactive, agent detail) only partially captured via marketing mockups.
- Form validation states beyond focus not visible on captured surfaces.
