# Icon: Spider (`icon-spider`)

Angular SVG icon component that renders a **decorative spider illustration**.
Designed as a branded / visual element rather than a functional UI control.

The SVG preserves its original aspect ratio and scales cleanly using CSS variables.

---

## Selector

```html
<icon-spider></icon-spider>
```

---

## Features

- High-detail SVG illustration
- Preserves original aspect ratio (`72 × 84`)
- Scales responsively
- No JavaScript logic or state
- Lightweight, purely presentational
- Token-driven sizing via CSS variables

---

## Inputs

| Input    | Type     | Default | Description                                          |
| -------- | -------- | ------- | ---------------------------------------------------- |
| `width`  | `string` | `''`    | Sets the spider width (e.g. `100px`, `6rem`, `100%`) |
| `height` | `string` | `''`    | Sets the spider height (optional)                    |
| `start`  | `string` | `''`    | Reserved for future styling / animation hooks        |
| `end`    | `string` | `''`    | Reserved for future styling / animation hooks        |

> When only `width` is provided, the height is calculated automatically using the original SVG aspect ratio.

---

## Sizing behavior

The component exposes CSS variables on the host element:

```css
--spider-w   /* width  */
--spider-h   /* height */
```

Defaults:

- `width: 100%`
- `height: auto`
- `aspect-ratio: 72 / 84`

This allows the icon to scale naturally in responsive layouts.

---

## Examples

### Default (responsive width)

```html
<icon-spider />
```

### Fixed size

```html
<icon-spider width="120px" />
```

### Custom dimensions

```html
<icon-spider width="80px" height="100px" />
```

### Inside a container

```html
<div style="width: 200px">
	<icon-spider />
</div>
```

---

## Styling

The SVG is wrapped with a `.spider` host class and `.spider__svg` element.

You can safely style or override it:

```css
.spider {
	opacity: 0.9;
}

.spider__svg {
	filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
}
```

---

## Accessibility

- This icon is **decorative**
- If used in meaningful contexts, wrap it with appropriate ARIA labels or explanatory text
- SVG has no interactive or focusable elements

---

## Notes

- This component is intentionally **stateless**
- No theme, density, or interaction logic
- Ideal for branding, empty states, landing sections, or visual accents

---

## License

MIT © 2026 Web Art Work
