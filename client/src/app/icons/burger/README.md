# Icon: Burger (`icon-burger`)

Angular burger icon component with CSS animation and **controlled visual states**.

This component renders one of four visuals:

- **three lines** (≡)
- **two lines** (＝)
- **one line** (—)
- **cross** (×)

Designed for toolbars, sidebars, and responsive navigation.

---

## Selector

```html
<icon-burger></icon-burger>
```

---

## Inputs

### `state`

Controls the visual style of the icon.

Type:

```ts
type BurgerState = 'three-lines' | 'two-lines' | 'one-line' | 'cross';
```

Default: `'three-lines'`

Example:

```html
<icon-burger [state]="'two-lines'" />
<icon-burger [state]="'one-line'" />
<icon-burger [state]="'cross'" />
```

### `isOpen` (legacy)

A legacy input kept for backward compatibility.

- When `isOpen` is `true`, the icon will render **cross** regardless of `state`.

Example:

```html
<icon-burger [isOpen]="menuOpen" />
```

> Prefer using `state` for all new code.

---

## Outputs

| Output    | Type      | Description                                                                       |
| --------- | --------- | --------------------------------------------------------------------------------- |
| `updated` | `boolean` | Emits on button click. In multi-state mode this is treated as a **click signal**. |
| `hovered` | `boolean` | Emits `true` on mouse enter and `false` on mouse leave.                           |

Examples:

```html
<icon-burger (updated)="onBurgerClick()" />
<icon-burger (hovered)="onBurgerHover($event)" />
```

---

## Behavior

### Click

The component is **controlled**: it does not change `state` internally.

- Clicking emits `updated`.

This allows the parent (e.g. a layout service) to own sidebar/menu state.

### Hover

Hover emits `hovered(true/false)`.

Useful for hover-preview behavior (e.g. show sidebar preview when hidden).

---

## Styling & Tokens

The component is token-driven and uses your global design system variables:

### Size & layout

```css
--burger-size: 44px;
--bar-w: 24px;
--bar-h: 2px;
--bar-gap: 8px;
```

### Colors & effects

```css
--c-text-primary
--c-bg-tertiary
--radius-btn
--focus-ring
--motion
--motion-fast
--easing
```

It respects `prefers-reduced-motion` and disables transitions when enabled.

---

## Accessibility

- Uses semantic `<button>`
- `aria-label="Toggle menu"`
- Supports keyboard `:focus-visible`
- Touch-friendly (`touch-action: manipulation`)
- Hover is optional; click works everywhere

---

## Recommended Usage (WAW layout)

Map responsive layout states to burger states in the parent:

- Web shown → `three-lines`
- Web minimized → `two-lines`
- Web hidden → `one-line`
- Mobile open (drawer shown) → `cross`
- Mobile closed → `three-lines`

---

## License

MIT © 2026 Web Art Work
