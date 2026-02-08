# Icon: Theme (`icon-theme`)

Angular icon component that visualizes the current **theme mode**, **radius**, and **density**:

- **Mode**: uses Material Icons glyphs `light_mode` / `dark_mode`
- **Radius**: draws a square / rounded square outline
- **Density**: changes the outline size (comfortable = larger, compact = smaller)

The component can also act as a theme switcher by clicking it (calls `ThemeService.nextTheme()`).

---

## Install / Requirements

This icon expects **Material Icons** to be available in the project (you already use):

```html
<span class="material-icons">dark_mode</span>
```

So ensure Material Icons font is loaded (via your global styles or HTML).

---

## Selector

```html
<icon-theme></icon-theme>
```

---

## Inputs

### Theme inputs (optional)

If not provided, values are read from `ThemeService`.

| Input     | Type           | Default             | Description                    |
| --------- | -------------- | ------------------- | ------------------------------ |
| `mode`    | `ThemeMode`    | from `ThemeService` | `'light'` or `'dark'`          |
| `radius`  | `ThemeRadius`  | from `ThemeService` | `'rounded'` or `'square'`      |
| `density` | `ThemeDensity` | from `ThemeService` | `'comfortable'` or `'compact'` |
| `color`   | `string`       | `'currentColor'`    | Stroke + icon color            |

### Size inputs

| Input    | Type               | Default | Description                       |
| -------- | ------------------ | ------- | --------------------------------- |
| `size`   | `number \| string` | —       | Sets both width & height (square) |
| `width`  | `number \| string` | `50px`  | Component width                   |
| `height` | `number \| string` | `50px`  | Component height                  |

Rules:

- If `size` is provided → it overrides `width` and `height`
- Number values are treated as pixels (e.g. `50` → `50px`)
- String values can be any CSS size (e.g. `'2rem'`, `'100%'`)

---

## Behavior

### What changes with theme

- **Mode**: toggles displayed Material icon text:
    - `dark` → `dark_mode`
    - `light` → `light_mode`

- **Radius**: outline becomes square / rounded
- **Density**: outline inset changes:
    - `comfortable` → larger outline (less inset)
    - `compact` → smaller outline (more inset)

### Click action

Clicking the icon calls:

```ts
ThemeService.nextTheme();
```

This cycles through all combinations of `mode × density × radius`.

---

## Examples

### Default (50×50)

```html
<icon-theme />
```

### Custom square size

```html
<icon-theme [size]="32" /> <icon-theme size="3rem" />
```

### Custom width/height

```html
<icon-theme [width]="80" [height]="48" />
```

### Force a specific theme state

```html
<icon-theme mode="dark" radius="rounded" density="compact" />
```

### Change color

```html
<icon-theme color="#fff" /> <icon-theme color="var(--c-text-primary)" />
```

---

## Notes

- This icon is implemented as:
    - an SVG outline (radius + density)
    - plus a centered Material Icons glyph (mode)

- It is safe to use inside buttons, headers, cards, etc.
- Works best when the parent sets `color`, since default is `currentColor`.
