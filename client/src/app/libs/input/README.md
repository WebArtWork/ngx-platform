[![Angular v21+](https://img.shields.io/badge/angular-v21+-red)]()
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)]()

# WAW Input Component (`winput`)

A signal-friendly, form-agnostic input component for Angular **v20+**.

Supports:

- standalone two-way binding via `[(wModel)]`
- Signal Forms via `[formField]` (`@angular/forms/signals`)
- text, password, textarea, radio, checkbox
- clearable inputs, password visibility toggle
- consistent BEM styling with design tokens

---

## Installation

```bash
waw add ngx-input
```

---

## Import

```ts
import { InputComponent } from '@libs/input';

@Component({
	imports: [InputComponent],
})
export class DemoComponent {}
```

---

## Usage

### 1️⃣ Template model (no forms)

```html
<winput
	label="Email"
	type="email"
	placeholder="Enter email"
	[(wModel)]="email"
></winput>
```

---

### 2️⃣ Signal Forms (`[formField]`)

```html
<winput label="Password" type="password" [formField]="passwordField"></winput>
```

- Automatically reads `touched / dirty / invalid / errors`
- Error text is rendered when invalid + touched/dirty
- No extra wiring needed

---

### 3️⃣ Password input

```html
<winput type="password" label="Password" clearable></winput>
```

- Eye icon toggles visibility
- When `clearable + password` → layout auto-adjusts for two icons

---

### 4️⃣ Textarea

```html
<winput
	type="textarea"
	label="Description"
	placeholder="Write something…"
></winput>
```

---

### 5️⃣ Radio buttons

```html
<winput
	type="radio"
	label="Status"
	[items]="['Draft', 'Published']"
	[(wModel)]="status"
></winput>
```

---

### 6️⃣ Checkbox

Single boolean:

```html
<winput type="checkbox" label="Accept terms" [(wModel)]="accepted"></winput>
```

Multiple values:

```html
<winput
	type="checkbox"
	[items]="['A', 'B', 'C']"
	[(wModel)]="selectedItems"
></winput>
```

---

## Inputs

| Input          | Type                          | Default     | Notes                                                 |
| -------------- | ----------------------------- | ----------- | ----------------------------------------------------- |
| `formField`    | `any \| null`                 | `null`      | Signal Forms binding (`FormField`).                   |
| `wModel`       | `InputValue \| null`          | `null`      | Used when `formField` is not set.                     |
| `type`         | `InputType`                   | `'text'`    | Includes `password`, `radio`, `checkbox`, `textarea`. |
| `name`         | `string`                      | `'name'`    | Radio grouping in non-formField mode.                 |
| `label`        | `string`                      | `''`        | Optional label text.                                  |
| `placeholder`  | `string`                      | `''`        | Text / textarea placeholder.                          |
| `items`        | `string[]`                    | `[]`        | Radio / checkbox options.                             |
| `disabled`     | `boolean`                     | `false`     | Manual disable when not using `formField`.            |
| `focused`      | `boolean`                     | `false`     | Auto-focus after view init.                           |
| `clearable`    | `boolean`                     | `false`     | Shows clear button for text-like inputs.              |
| `wClass`       | `string`                      | `''`        | Extra classes for the native control.                 |
| `autocomplete` | `string \| null \| undefined` | `undefined` | Defaults to `current-password` for password inputs.   |
| `error`        | `string \| null`              | `null`      | Optional external error override.                     |

---

## Outputs

| Output    | Type                 | When                                              |
| --------- | -------------------- | ------------------------------------------------- |
| `wChange` | `InputValue \| null` | On value change (also fires in `formField` mode). |
| `wSubmit` | `void`               | On Enter key (text-like inputs) or clear action.  |
| `wBlur`   | `void`               | On blur.                                          |

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
```

---

## Styling

- Block: `.winput`
- Elements:
    - `__label`, `__control`, `__field`, `__error`
    - `__icon-btn`, `__clear`, `__eye`
    - `__choice`, `__choice-text`, `__choice-mark`, `__native`

### Notes

- Radio / checkbox:
    - unchecked → transparent
    - checked → filled with `--c-primary`

- Uses design tokens:
    - `--c-border`, `--c-primary`, `--c-text-*`
    - `--c-placeholder`, `--b-radius`, `--focus-ring`

---

MIT © 2026 Web Art Work
