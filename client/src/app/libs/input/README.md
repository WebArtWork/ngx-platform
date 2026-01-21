[![Angular v21](https://img.shields.io/badge/angular-v21+-red)]()
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)]()

# WAW Input Component (`winput`)

Signal-based input component for Angular v21+ that supports:

- standalone model binding via `[(wModel)]`
- signal-forms via `[field]` (`@angular/forms/signals`)

UI is Tailwind-first, with minimal SCSS for radio/checkbox marks.

## Installation

```bash
waw add ngx-input
```

## Import

```ts
import { InputComponent } from '@libs/input';

@Component({
	imports: [InputComponent],
})
export class DemoComponent {}
```

## Usage

### Template model (no signal-forms)

```html
<winput label="Email" type="email" [(wModel)]="email"></winput>
```

### Signal forms

```html
<winput label="Email" type="email" [field]="emailField"></winput>
```

### Radio / checkbox with items

```html
<winput type="radio" [items]="['A', 'B']" [(wModel)]="picked"></winput>
<winput type="checkbox" [items]="['A', 'B']" [(wModel)]="selected"></winput>
```

## Inputs

| Input          | Type                          | Default     | Notes                                                                |
| -------------- | ----------------------------- | ----------- | -------------------------------------------------------------------- |
| `field`        | `any \| null`                 | `null`      | Signal-forms binding (passed through to `[formField]`).              |
| `wModel`       | `InputValue \| null`          | `null`      | Template binding: `[(wModel)]="..."` (used when `field` is not set). |
| `type`         | `InputType`                   | `'text'`    | Input type including `radio`, `checkbox`, `textarea`.                |
| `name`         | `string`                      | `'name'`    | Used for radio grouping in non-field mode.                           |
| `label`        | `string`                      | `''`        | Label text.                                                          |
| `placeholder`  | `string`                      | `''`        | Placeholder for text/textarea inputs.                                |
| `items`        | `string[]`                    | `[]`        | Options for `radio` and multi-`checkbox`.                            |
| `disabled`     | `boolean`                     | `false`     | Disables the control (manual in non-field mode).                     |
| `focused`      | `boolean`                     | `false`     | Auto-focus after view init.                                          |
| `clearable`    | `boolean`                     | `false`     | Shows clear button for text-like inputs.                             |
| `wClass`       | `string`                      | `''`        | Extra classes applied to the native control.                         |
| `autocomplete` | `string \| null \| undefined` | `undefined` | If unset and `type='password'` → `'current-password'`.               |
| `error`        | `string \| null`              | `null`      | Optional external error override.                                    |

## Outputs

| Output    | Type                 | When                                |
| --------- | -------------------- | ----------------------------------- |
| `wChange` | `InputValue \| null` | On user input (also in field mode). |
| `wSubmit` | `void`               | On Enter key or clear action.       |
| `wBlur`   | `void`               | On blur.                            |

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

## Styling

- Block: `.winput`
- Elements: `__label`, `__control`, `__field`, `__error`, `__choice`, `__choice-text`, `__choice-mark`, `__native`
- Uses tokens: `--c-border`, `--c-primary`, `--c-text-*`, `--c-placeholder`, `--b-radius`

MIT © 2025 Web Art Work
