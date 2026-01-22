[![Angular v21+](https://img.shields.io/badge/angular-v21+-red)]()
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)]()

# WAW Form Library (`wform`)

Schema-driven forms for Angular **v21+** built on **Signal Forms** (`@angular/forms/signals`) with:

- JSON schema → reactive form model (`WritableSignal<Record<string, unknown>>`)
- Template registry (`name -> <ng-template>`) for rendering components
- Nested components (groups / containers)
- Simple validation (`required`) wired from schema
- Modal helpers (`modal`, `modalDocs`, `modalUnique`)
- BEM styles (`.wform`, `.wformc`) with design tokens

---

## Installation

```bash
waw add ngx-form
```

---

## Import

```ts
import { FormComponent, FormService } from '@lib/form';

@Component({
	imports: [FormComponent],
})
export class DemoComponent {
	private formService = inject(FormService);
}
```

---

## Quick start

### 1) Define a schema

```ts
import { FormInterface } from '@lib/form';

export const userForm: FormInterface = {
	formId: 'user',
	title: 'User',
	class: 'wform--two-col', // optional layout helper
	components: [
		{
			name: 'Input',
			key: 'name',
			required: true,
			props: { label: 'Name', placeholder: 'Enter name...' },
		},
		{
			name: 'Input',
			key: 'email',
			props: { label: 'Email', placeholder: 'Enter email...' },
		},
		{
			name: 'Select',
			key: 'role',
			props: {
				label: 'Role',
				placeholder: 'Select role...',
				items: ['Admin', 'User'],
			},
		},
	],
};
```

### 2) Render the form

```html
<wform
	[config]="userForm"
	[submition]="initialData"
	(wChange)="onChange($event)"
	(wSubmit)="onSubmit($event)"
></wform>
```

- `wChange` emits the **full model** whenever it updates
- `wSubmit` emits the **full model** on submit

> Note: the input name is intentionally `submition` (legacy spelling) and kept for compatibility.

---

## How rendering works (templates registry)

Each schema component uses:

- `name` → resolves a registered `<ng-template>`
- `key` → binds into the Signal Form model + field tree
- `props` → passed into the template as `props`

### Template context

When your template is rendered, it receives:

- `props` — `component.props` (label, placeholder, items…)
- `component` — the schema node
- `config` — full schema
- `wFormId` — runtime form id
- `wFormKey` — resolved key (supports `[]` indexing)
- `model` — `WritableSignal<Record<string, unknown>>`
- `fieldTree` — Signal Forms field tree (`any`)
- `field` — field instance for the key (when available)
- `submition` — object passed to `<wform>`
- `wSubmit()`, `wChange()`, `wClick()` — hooks back to the form host

### Example template (Input)

```html
<ng-template #Input let-ctx>
	<winput
		[formField]="ctx.field"
		[label]="ctx.props.label"
		[placeholder]="ctx.props.placeholder"
	></winput>
</ng-template>
```

Register templates via `FormService.addTemplateComponent(name, tpl)` (usually done in an app initializer / registry file).

---

## Nested components

A component can be a container by providing `components`:

```ts
{
	class: 'my-group',
	components: [
		{ name: 'Input', key: 'address.city', props: { label: 'City' } },
		{ name: 'Input', key: 'address.zip', props: { label: 'ZIP' } },
	]
}
```

Rendering is recursive using `<form-component>`.

---

## Validation

Currently supported out of the box:

- `required: true` → wired to Signal Forms via `required(field, { message })`

Message uses:

- `component.props.label` if present
- otherwise falls back to `component.key`

---

## Keys and repeaters (`[]`)

Keys support repeater-style syntax like:

- `items[].name`

At render time, `[]` is replaced with the index based on component nesting:

- `items[0].name`, `items[1].name`, etc.

This is handled by `effectiveKey()` in `form-component`.

---

## FormService API (high level)

### `form(schema, initial?)`

Creates or returns a cached Signal Form instance:

```ts
const inst = formService.form(userForm, { name: 'John' });

inst.id; // string
inst.model; // WritableSignal<Record<string, unknown>>
inst.form; // field tree (Signal Forms)
```

### `getDefaultForm(formId, keys?)`

Utility to generate a quick schema from keys.

### Modal helpers

#### `modal(form, buttons, submition?, change?, options?)`

Shows form modal and resolves on close/submit.

#### `modalDocs(docs, title?)`

Edits JSON docs (Ace editor template expected).

#### `modalUnique(module, field, doc, component?, onClose?)`

Calls `/api/:module/unique:field` and updates doc.

---

## Styling

### Blocks

- `.wform` — form wrapper
- `.wformc` — component wrapper (recursive)

### Layout helper

- `.wform--two-col` → 2-column grid (auto collapses to 1 column on small screens)

Uses design tokens:

- `--c-border`, `--c-primary`, `--c-bg-*`, `--c-text-*`
- `--b-radius`, `--focus-ring`, `--motion-fast`, `--easing`

---

MIT © 2026 Web Art Work
