[![Angular v21+](https://img.shields.io/badge/angular-v21+-red)]()
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)]()

# WAW Button (`wbutton`)

Standalone button for Angular **v21+** with a matching directive so you can use either:

- `<wbutton>` (component)
- `<button wbutton>` / `<a wbutton>` (directive)

Includes a built-in **2s click cooldown** (opt-out) to prevent double submits.

---

## Installation

```bash
waw add ngx-button
```

---

## Import

### Component

```ts
import { ButtonComponent } from '@lib/button';

@Component({
	imports: [ButtonComponent],
})
export class DemoComponent {}
```

### Directive

```ts
import { ButtonDirective } from '@lib/button';

@Component({
	imports: [ButtonDirective],
})
export class DemoComponent {}
```

### Global styles for directive (recommended)

`<button wbutton>` needs global styles. Add `ButtonStylesComponent` once at app root.

```ts
import { Component } from '@angular/core';
import { ButtonStylesComponent } from '@lib/button';

@Component({
	standalone: true,
	selector: 'app-root',
	imports: [ButtonStylesComponent],
	template: `<router-outlet />`,
})
export class AppComponent {}
```

> `<wbutton>` styles are scoped by default. `ButtonStylesComponent` re-exports the same SCSS with `ViewEncapsulation.None` so the directive looks identical.

---

## Usage

### 1) `<wbutton>` component

```html
<wbutton type="primary" (wClick)="save()">Save</wbutton>
```

Disable submit inside a form:

```html
<form (ngSubmit)="submit()">
	<wbutton [disableSubmit]="true" (wClick)="openDialog()">Open</wbutton>
	<wbutton type="primary">Submit</wbutton>
</form>
```

Allow multiple clicks (disables 2s cooldown):

```html
<wbutton [isMultipleClicksAllowed]="true" (wClick)="run()">Run</wbutton>
```

### 2) `wbutton` directive

```html
<button wbutton type="secondary" (wClick)="cancel()">Cancel</button>
```

On links:

```html
<a wbutton type="link" (wClick)="openDocs()">Docs</a>
```

---

## API

### Inputs (component + directive)

| Input                     | Type         | Default     | Notes                                                    |
| ------------------------- | ------------ | ----------- | -------------------------------------------------------- |
| `type`                    | `ButtonType` | `'primary'` | Adds `.wbutton--{type}`                                  |
| `extraClass`              | `string`     | `''`        | Appended to class list                                   |
| `disabled`                | `boolean`    | `false`     | Blocks click + sets disabled/aria-disabled               |
| `disableSubmit`           | `boolean`    | `false`     | Forces `type="button"` (prevents form submit)            |
| `isMultipleClicksAllowed` | `boolean`    | `false`     | When `false`, blocks subsequent clicks for **2 seconds** |

### Outputs

| Output   | Type                                              | Notes                       |
| -------- | ------------------------------------------------- | --------------------------- |
| `wClick` | `MouseEvent` on `<wbutton>` / `void` on directive | Emitted only if not blocked |

> Note: directive’s `wClick` is `void` (no event payload). Component’s `wClick` emits the `MouseEvent`.

---

## Behavior notes

- Cooldown: after an accepted click, button becomes “blocked” for 2 seconds unless `isMultipleClicksAllowed="true"`.
- Disabled handling:
    - `<button wbutton>` uses native `disabled`.
    - `<a wbutton>` uses `aria-disabled="true"` and prevents default.

---

## Styling

### BEM

- Block: `.wbutton`
- State: `.is-disabled`
- Modifiers:
    - `.wbutton--primary`
    - `.wbutton--secondary`
    - `.wbutton--success`
    - `.wbutton--danger`
    - `.wbutton--warning`
    - `.wbutton--info`
    - `.wbutton--light`
    - `.wbutton--dark`
    - `.wbutton--link`

### Tokens

Uses your design tokens + base Tailwind-ish utility string from `WBUTTON_BASE_CLASSES`, including:

- `--b-radius-btn`, `--sp-*`, `--c-primary`, `--c-secondary`, `--c-border`, `--c-text-primary`, `--c-white`

---

## Types

```ts
export type ButtonType =
	| 'primary'
	| 'secondary'
	| 'success'
	| 'danger'
	| 'warning'
	| 'info'
	| 'light'
	| 'dark'
	| 'link';
```

---

MIT © 2026 Web Art Work
