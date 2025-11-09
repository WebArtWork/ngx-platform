[![Angular v20](https://img.shields.io/badge/angular-v20+-red)]()
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)]()

# WAW Select Component (`wselect`)

A lightweight, signal-driven select with:

- single/multiple select
- search
- custom templates
- `[(wModel)]` two-way binding
- Virtual Form integration via `formId` + `formKey`
- Full Angular Forms (CVA) support

## Install

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

### 1️⃣ Template-Driven Form

```html
<wselect [items]="users" bindLabel="name" bindValue="_id" [(wModel)]="assignee">
</wselect>
```

### 2️⃣ Reactive Form

```html
<wselect
	[items]="users"
	bindLabel="name"
	bindValue="_id"
	formControlName="assignee"
>
</wselect>
```

### 3️⃣ Virtual Form

```html
<wselect
	[items]="users"
	bindLabel="fullName"
	bindValue="_id"
	placeholder="Choose user"
	[formId]="formId"
	[formKey]="'assigneeId'"
>
</wselect>
```

> When `formId` + `formKey` are provided, the component syncs with `VirtualFormService` (registers the field, updates value on change/patch, etc.).

## Search

```html
<wselect [items]="items" [searchable]="true" [searchableBy]="'name email'">
</wselect>
```

## Multiple

```html
<wselect [items]="tags" [multiple]="true" [(wModel)]="selectedTagIds">
</wselect>
```

## Templates

```html
<wselect
	[items]="users"
	[t_view]="viewTpl"
	[t_item]="itemTpl"
	[t_search]="searchTpl"
>
</wselect>

<ng-template #viewTpl>
	<div>Custom header…</div>
</ng-template>

<ng-template #itemTpl let-item="item">
	<div>{{ item().name }} — custom row</div>
</ng-template>

<ng-template #searchTpl>
	<winput placeholder="Type to search…" (wChange)="onSearch($event)" />
</ng-template>
```

## API

### Inputs

- `items: unknown[]`
- `placeholder: string`
- `label: string`
- `bindLabel: string` (default: `"name"`)
- `bindValue: string` (default: `"_id"`)
- `multiple: boolean`
- `clearable: boolean`
- `disabled: boolean`
- `searchable: boolean`
- `searchableBy: string` (space-separated paths)
- `t_view: TemplateRef`
- `t_item: TemplateRef`
- `t_search: TemplateRef`
- `formId?: string` — Virtual Form id
- `formKey?: string` — Virtual Form field key

### Two-way

- `[(wModel)]="value"` — selected id or array of ids (when `multiple`)

### Outputs

- `(wChange)="onChange($event)"` — emitted on selection changes (`id | id[]`)

## Notes

- Priority of value sources: **VirtualForm** (`formId` + `formKey`) → `[(wModel)]` → Angular Forms (CVA).
- Works seamlessly inside WAW `wform` flows alongside `winput`.
