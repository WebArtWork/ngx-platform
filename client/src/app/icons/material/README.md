# Icon: Material (`material-icon`)

Angular navigation/link component that renders a **Material Icon** with an optional text label.
Built for menus, toolbars, sidebars, and navigation bars.

Uses **Angular signals**, **RouterLink**, and **RouterLinkActive**.

---

## Selector

```html
<material-icon></material-icon>
```

---

## Features

- Uses official **Material Icons** font
- Optional translated label
- Active route underline (icon-focused)
- Hover + active color transitions
- Signal-based inputs
- Router-aware (`RouterLink`, `RouterLinkActive`)

---

## Requirements

Material Icons font must be available in your app, for example:

```html
<link
	href="https://fonts.googleapis.com/icon?family=Material+Icons"
	rel="stylesheet"
/>
```

---

## Inputs (signals)

| Input                     | Type     | Default            | Description                                   |
| ------------------------- | -------- | ------------------ | --------------------------------------------- |
| `routerLink`              | `string` | `''`               | Target route passed to `[routerLink]`.        |
| `routerLinkActiveOptions` | `object` | `{ exact: false }` | Options for `RouterLinkActive`.               |
| `icon`                    | `string` | `'home'`           | Material icon name (e.g. `home`, `settings`). |
| `name`                    | `string` | `''`               | Optional label text (translated).             |

---

## Behavior

### Icon vs icon + label

- If `name` is empty → **icon only**
- If `name` is provided → icon + text label

Layout automatically adapts (spacing collapses when label is missing).

### Active state

When the current route matches:

- Angular adds `_activeLink` class
- Component draws an underline **under the icon only**
- Color switches to `var(--c-primary)`

### Hover

- Icon and label color transition to primary color
- Background remains transparent (navigation-friendly)

---

## Styling & Tokens

The component relies on global design tokens:

```css
--c-text-secondary
--c-text-primary
--c-primary
--radius-btn
--sp-2
--sp-3
--motion
--easing
```

This allows the icon to automatically adapt to:

- theme mode (light / dark)
- density
- radius
- motion preferences

---

## Accessibility

- Uses semantic `<a>` element
- Works with keyboard navigation
- When using **icon-only**, consider:
    - providing surrounding context
    - or adding an accessible label on the container

---

## Examples

### Icon only

```html
<material-icon routerLink="/home" icon="home" />
```

### Icon with label

```html
<material-icon routerLink="/components" icon="apps" name="Components" />
```

### Navigation bar

```html
<nav class="d-f ai-c g-2">
	<material-icon routerLink="/home" icon="home" name="Home" />
	<material-icon routerLink="/users" icon="group" name="Users" />
	<material-icon routerLink="/settings" icon="settings" />
</nav>
```

---

## Notes

- This component is **presentation + navigation only**
- It does not manage permissions, routing logic, or state
- Best used inside menus, headers, sidebars, and toolbars

---

## License

MIT © 2026 Web Art Work
