[![Angular v21+](https://img.shields.io/badge/angular-v21+-red)]()
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)]()

# WAW Select Component (`wselect`)

A lightweight, signal-driven select component with:

- single / multiple select
- built-in search
- keyboard navigation
- custom templates
- `[(wModel)]` two-way binding
- Signal Forms support via `[field]`
- Full Angular Forms (CVA) support

Designed to work seamlessly with the WAW design system and Angular signals.

---

## 📦 Install

```bash
waw add ngx-select
```

---

## 🧩 Import

```ts
import { SelectComponent } from '@libs/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
	imports: [SelectComponent, FormsModule, ReactiveFormsModule],
})
export class DemoComponent {}
```

---

## Usage

### 1️⃣ Signal Forms (`[field]`)

```html
<form>
	<wselect
		[field]="form.assignee"
		[items]="users"
		bindLabel="name"
		bindValue="_id"
	></wselect>
</form>
```

---

### 2️⃣ Template-driven binding

```html
<wselect [items]="users" bindLabel="name" bindValue="_id" [(wModel)]="assignee">
</wselect>
```

---

### 3️⃣ Reactive Forms (CVA)

```html
<form [formGroup]="form">
	<wselect
		formControlName="assignee"
		[items]="users"
		bindLabel="name"
		bindValue="_id"
	>
	</wselect>
</form>
```

---

## 🔍 Search

```html
<wselect [items]="items" [searchable]="true" searchableBy="name email">
</wselect>
```

- Search is built-in
- `searchableBy` accepts space-separated object paths
- No external pipes required

---

## 🔢 Multiple select

```html
<wselect [items]="tags" [multiple]="true" [(wModel)]="selectedTagIds">
</wselect>
```

---

## 🎨 Templates

```html
<wselect
	[items]="users"
	[t_view]="viewTpl"
	[t_item]="itemTpl"
	[t_search]="searchTpl"
>
</wselect>

<ng-template #viewTpl>
	<div>Custom header content</div>
</ng-template>

<ng-template #itemTpl let-item="item">
	<div>{{ item().name }} — custom row</div>
</ng-template>

<ng-template #searchTpl>
	<winput placeholder="Type to search…" (wChange)="onSearch($event)" />
</ng-template>
```

---

## ⌨️ Keyboard navigation

`wselect` is fully keyboard-accessible out of the box:

- `Enter` / `Space` — open select, confirm selection
- `ArrowUp` / `ArrowDown` — navigate options
- `Home` / `End` — jump to first / last option
- `Escape` — close dropdown
- `Tab` — close dropdown and move focus

The active option is automatically scrolled into view.

---

## ⚙️ API

### Inputs

| Input          | Type             | Default  | Description               |
| -------------- | ---------------- | -------- | ------------------------- |
| `items`        | `unknown[]`      | `[]`     | Items list                |
| `label`        | `string`         | `''`     | Optional label            |
| `placeholder`  | `string`         | `''`     | Placeholder text          |
| `bindLabel`    | `string`         | `'name'` | Field used as label       |
| `bindValue`    | `string`         | `'_id'`  | Field used as value       |
| `multiple`     | `boolean`        | `false`  | Enables multi-select      |
| `clearable`    | `boolean`        | `false`  | Allows clearing selection |
| `disabled`     | `boolean`        | `false`  | Disables select           |
| `searchable`   | `boolean`        | `false`  | Enables search            |
| `searchableBy` | `string`         | `'name'` | Search fields             |
| `buttons`      | `SelectButton[]` | `[]`     | Extra action buttons      |
| `t_view`       | `TemplateRef`    | `null`   | Custom header             |
| `t_item`       | `TemplateRef`    | `null`   | Custom item               |
| `t_search`     | `TemplateRef`    | `null`   | Custom search             |

---

### Two-way binding

```html
<wselect [(wModel)]="value"></wselect>
```

- Single mode → `string | number | boolean | null`
- Multiple mode → `(string | number | boolean)[]`

---

### Outputs

| Output    | Type          | Description                 |
| --------- | ------------- | --------------------------- |
| `wChange` | `SelectValue` | Emitted on selection change |

---

## 📝 Notes

- Works with:
    - Signal Forms (`[field]`)
    - Template-driven forms
    - Reactive forms (CVA)

- No global styles required
- Styling is token-based (`--c-*`, `--sp-*`)
- Designed to match WAW input + button libraries

---

MIT © 2026 Web Art Work
