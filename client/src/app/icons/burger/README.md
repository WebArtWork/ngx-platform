# Icon: Burger (`icon-burger`)

Angular burger (menu) icon component with animated transition between
**closed (≡)** and **open (×)** states.

Designed for navigation toggles, side menus, and mobile headers.

---

## Selector

```html
<icon-burger></icon-burger>
```

---

## Features

- Pure CSS burger → cross animation
- Accessible button (`aria-label="Toggle menu"`)
- Emits state changes (`open / closed`)
- Hover and focus-visible styles
- Respects `prefers-reduced-motion`
- Uses global design tokens (colors, radius, motion)

---

## Outputs

| Output    | Type      | Description                           |
| --------- | --------- | ------------------------------------- |
| `updated` | `boolean` | Emits the new open state when toggled |
| `hovered` | `void`    | Emits when the component is hovered   |

Example:

```html
<icon-burger (updated)="onMenuToggle($event)" (hovered)="onBurgerHover()" />
```

---

## Behavior

### Toggle logic

- Internally tracks open state using a signal:
    - `false` → burger (`≡`)
    - `true` → cross (`×`)

- Clicking the button toggles state and emits `updated`.

### Animation

- Middle bar fades out
- Top and bottom bars rotate into a cross
- Uses CSS transitions driven by global motion variables
- Automatically disables animations when user prefers reduced motion

---

## Styling & Tokens

The component relies on CSS variables defined globally in your design system:

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

This allows the icon to adapt automatically to:

- theme mode (light / dark)
- density
- radius
- motion preferences

---

## Accessibility

- Uses semantic `<button>`
- `aria-label="Toggle menu"`
- Keyboard focus visible
- Touch-friendly (`touch-action: manipulation`)
- No reliance on hover-only interactions

---

## Example Usage

### Basic

```html
<icon-burger />
```

### With menu toggle

```html
<icon-burger (updated)="menuOpen = $event" />
```

### In a header

```html
<header>
	<icon-burger (updated)="toggleSidebar($event)" />
</header>
```

---

## Notes

- This component **does not control any menu directly** — it only emits state.
- Styling is intentionally minimal and token-based.
- Intended to be used inside navigation layouts, toolbars, or headers.

---

## License

MIT © 2026 Web Art Work
