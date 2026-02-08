# SCSS foundation (Tailwind-integrated)

This folder contains the global SCSS foundation that complements Tailwind. Tailwind is included via `@use 'tailwindcss';`, while SCSS provides **runtime theme tokens**, **base element defaults**, **accessibility helpers**, **scrollbar styling**, and **font assets**.

## Entry point

**File:** `index.scss`

Loads, in order:

1. **Tokens & assets**
    - `utils/vars` → CSS variables (design tokens)
    - `utils/fonts` → Poppins font faces
    - `utils/icons` → Material Icons font + helper class

2. **Tailwind**
    - `@use 'tailwindcss';`

3. **Global layout**
    - `layout/base` → html/body defaults + reduced motion
    - `layout/scroll` → scrollbar styling using tokens

4. **Atoms**
    - `atom/a11y` → screen-reader utilities

## Design tokens (runtime theming)

**File:** `utils/_vars.scss`

All styling is driven by CSS variables (e.g. `var(--c-bg-primary)`), so themes can change at runtime without rebuilding CSS.

### Modes

- Light (default): `:root { ... }`
- Dark: `html[data-mode='dark'] { ... }`

### Density

- Default spacing: `:root --sp-*`
- Compact: `html[data-density='compact'] { ... }`

### Radius

- Default rounded: `:root --radius*`
- Square: `html[data-radius='square'] { ... }`

## Base styles

**File:** `layout/_base.scss`

- Sets base `font-size` from `--fs`
- Uses `color-scheme` for native form controls
- Applies `body` font family + background/text tokens
- Disables animation/transition/scroll-behavior when `prefers-reduced-motion: reduce`

## Scrollbar styling

**File:** `layout/_scroll.scss`

Applies consistent scrollbars using tokens:

- Thumb color uses `--c-border`
- Works for WebKit and Firefox (`scrollbar-width`, `scrollbar-color`)

## Fonts

**File:** `utils/_fonts.scss`

Loads **Poppins** weights: 300 / 400 / 500 / 700 from `/assets/fonts/*.woff2` with `font-display: swap`.

## Material Icons

**File:** `utils/_icons.scss`

- Loads the `Material Icons` font from `/assets/fonts/icons.woff2`
- Provides `.material-icons` helper class (font family, sizing, inline behavior)

## Accessibility utilities

**File:** `atom/_a11y.scss`

### `.visually-hidden`

Visually hides content while keeping it available to screen readers.

Use for:

- descriptive labels
- extra instructions for assistive tech
- “Skip to content” text (with focusable variant below)

### `.visually-hidden-focusable`

Hidden by default, becomes visible when focused (keyboard users).

Typical use:

```html
<a class="visually-hidden-focusable" href="#main">Skip to content</a>
```

## Tailwind + SCSS usage guidelines

- Prefer **Tailwind utilities** for component styling/layout.
- Use **SCSS here only for global concerns** (tokens, base defaults, a11y, fonts, scrollbars).
- When writing custom CSS, **use tokens** (`var(--c-*)`, `var(--sp-*)`, `var(--radius-*)`) so it stays theme/density/radius aware.

## Runtime attributes (expected on `<html>`)

- `data-mode="dark"` → dark theme
- `data-density="compact"` → compact spacing
- `data-radius="square"` → square corners
