[![Angular v21+](https://img.shields.io/badge/angular-v21%2B-red)]()
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)]()

# WAW Input Component (`winput`)

A signal-friendly, form-agnostic input component for Angular **v21+**.

It supports **two usage modes**:

- **Template model mode** with `[(wModel)]`
- **Angular Signal Forms** with `[formField]` (`@angular/forms/signals`)

And provides built-in UX features like **clear button**, **password visibility toggle**, and **token-driven BEM styling**.

---

## Installation

```bash
waw add ngx-input
```

---

## Import

```ts
import { Component } from '@angular/core';
import { InputComponent } from '@libs/input';

@Component({
	imports: [InputComponent],
	template: `<winput label="Email" type="email" />`,
})
export class DemoComponent {}
```

---

## Usage

### 1) Template model (no forms)

```html
<winput
	label="Email"
	type="email"
	placeholder="Enter email"
	[(wModel)]="email"
></winput>
```

> In this mode, the component updates `wModel` internally and emits `wChange`.

---

### 2) Signal Forms (`[formField]`)

```html
<winput
	label="Password"
	type="password"
	placeholder="Enter password"
	[formField]="passwordField"
></winput>
```

Behavior in `formField` mode:

- Binds directly to the Signal Forms field
- Derives error text automatically from `touched/dirty/invalid/errors`
- Still emits `wChange` for convenience (even in formField mode)

#### Error resolution order

1. If `error` input is provided → it is shown (override)
2. Otherwise, when field is `invalid` and (`touched` or `dirty`) → first error message is shown:
    - string error → used directly
    - `{ message: string }` → `message` is used

---

### 3) Password input (visibility toggle + clear)

```html
<winput
	type="password"
	label="Password"
	clearable
	[(wModel)]="password"
></winput>
```

- Eye icon toggles `password` ↔ `text`
- If `clearable` is enabled, the clear button appears
- Clear triggers: `wChange(null)` and `wSubmit()`, then focuses the field again

---

### 4) Textarea

```html
<winput
	type="textarea"
	label="Description"
	placeholder="Write something…"
	[(wModel)]="description"
></winput>
```

---

### 5) Radio

```html
<winput
	type="radio"
	name="status"
	[items]="['Draft', 'Published']"
	[(wModel)]="status"
></winput>
```

- With `[formField]`, `items` are used as radio values (each radio input is bound to the field)
- Without `[formField]`, selection is controlled via `[(wModel)]`

---

### 6) Checkbox

#### Single boolean checkbox

```html
<winput type="checkbox" label="Accept terms" [(wModel)]="accepted"></winput>
```

#### Multiple values (array model)

```html
<winput
	type="checkbox"
	[items]="['A', 'B', 'C']"
	[(wModel)]="selectedItems"
></winput>
```

Notes:

- Multi-select arrays are handled **only in template model mode** (`[(wModel)]`) for items checkboxes.
- When `items` are present, the component adds/removes values in the array and emits `wChange`.

---

## Inputs

| Input          | Type                          | Default     | Notes                                                                                                                            |
| -------------- | ----------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `formField`    | `any \| null`                 | `null`      | Signal Forms binding (`FormField`). When set, the field drives value/validation.                                                 |
| `wModel`       | `InputValue \| null`          | `null`      | Used when `formField` is not set. Two-way with `[(wModel)]`.                                                                     |
| `type`         | `InputType`                   | `'text'`    | Supports text-like types, `textarea`, `radio`, `checkbox`, `password`, etc.                                                      |
| `name`         | `string`                      | `'name'`    | Used for native input `name` in non-formField mode (radio grouping, checkbox names).                                             |
| `label`        | `string`                      | `''`        | Label text. For checkbox without items, label is rendered next to checkbox.                                                      |
| `placeholder`  | `string`                      | `''`        | Placeholder for text-like inputs and textarea (falls back to `Enter text...`).                                                   |
| `items`        | `string[]`                    | `[]`        | Options for `radio` and `checkbox` (multi).                                                                                      |
| `icons`        | `InputIconAction[]`           | `[]`        | Extra trailing icons rendered via `<material-icon>`.                                                                             |
| `disabled`     | `boolean`                     | `false`     | Used in template model mode. In formField mode, disabling is handled by the field (but native inputs also get `manualDisabled`). |
| `focused`      | `boolean`                     | `false`     | Auto-focus after view init.                                                                                                      |
| `clearable`    | `boolean`                     | `false`     | Adds a clear button (works for text-like inputs; emits `wChange(null)` + `wSubmit()`).                                           |
| `wClass`       | `string`                      | `''`        | Additional classes applied to the native control.                                                                                |
| `autocomplete` | `string \| null \| undefined` | `undefined` | If unset, defaults to `current-password` for `password`, otherwise `null`.                                                       |
| `error`        | `string \| null`              | `null`      | External error override. Takes precedence over derived form errors.                                                              |

---

## Outputs

| Output     | Type                 | When                                                                                    |
| ---------- | -------------------- | --------------------------------------------------------------------------------------- |
| `wChange`  | `InputValue \| null` | On any user input change. Emits in **both** modes (template and formField).             |
| `wSubmit`  | `void`               | When Enter is pressed on text-like inputs (`keyup.enter`) and when cleared (`onClear`). |
| `wBlur`    | `FocusEvent`         | Native blur event.                                                                      |
| `wFocus`   | `FocusEvent`         | Native focus event.                                                                     |
| `wKeydown` | `KeyboardEvent`      | Native keydown event.                                                                   |

---

## Types

```ts
export type InputValue =
	| null
	| string
	| number
	| boolean
	| string[]
	| number[]
	| boolean[];

export type InputType =
	| 'text'
	| 'password'
	| 'email'
	| 'radio'
	| 'checkbox'
	| 'textarea'
	| 'search'
	| 'tel'
	| 'url'
	| 'number'
	| 'range'
	| 'color'
	| 'date'
	| 'month'
	| 'week'
	| 'time'
	| 'datetime'
	| 'datetime-local';

export interface InputIconAction {
	icon: string;
	name?: string;
	click?: () => void;
}
```

---

## Styling

- Block: `.winput`
- Elements:
    - `__label`, `__control`, `__field`, `__error`
    - (choices) `__choice`, `__choice-text`, `__choice-mark`, `__native`
    - (icons) `__icon-btn`, `__clear`, `__eye`

### Token usage

The component styling is driven by global CSS tokens:

- Surfaces / borders: `--c-bg-secondary`, `--c-border`, `--shadow-sm`
- Text: `--c-text-primary`, `--c-text-muted`, `--c-placeholder`
- Brand / focus: `--c-primary`, `--focus-ring`
- Shape / spacing: `--radius`, `--sp-*`
- Motion: `--motion-fast`, `--easing`

---

## License

MIT © 2026 Web Art Work
