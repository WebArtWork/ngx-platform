[![Angular v21+](https://img.shields.io/badge/angular-v21+-red)]()
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)]()

# `wtable` — Table component

Standalone, signal-friendly data table for Angular v20 with BEM classes, search, sort, pagination, and action slots.

## ✨ Features

- Angular v20 `input()` signals; `OnPush`
- BEM styles: `.wtable`, elements like `__header`, `__search`, `__pagination`
- Client-side search, sortable headers, pagination
- Custom cell templates
- Header action buttons
- Per-row action buttons (config-based)
- Supports plain rows **and** `Signal<T>[]`
- Works with `<wbutton>` (or `button[wbutton]`)

---

## 📦 Install

```bash
waw add ngx-table
```

---

## 🧩 Import

```ts
import { TableComponent } from 'src/app/libs/table/table.component';

@Component({
	imports: [TableComponent],
})
export class Page {}
```

---

## 🧪 Basic Usage

```html
<wtable
	[title]="'Users'"
	[columns]="[
		{ title: 'Name', field: 'name' },
		{ title: 'Email', field: 'email' }
	]"
	[rows]="users"
	[config]="{
		searchable: true,
		pageSizeOptions: [10, 20, 50],
		perPage: 10,
		allDocs: true
	}"
>
</wtable>
```

### Columns shortcut

You may also pass columns as strings:

```html
<wtable [columns]="['name', 'email']" [rows]="users"></wtable>
```

Strings are normalized internally to `{ title, field }`.

---

## 🧩 Custom Cells

```html
<ng-template cell="email" let-row>
	<a [href]="'mailto:' + row.email">{{ row.email }}</a>
</ng-template>
```

---

## 🔘 Row Actions (recommended)

Row-level actions are configured via `config`:

```ts
config = {
	update: (row) => edit(row),
	delete: (row) => remove(row),
	buttons: [
		{
			icon: 'visibility',
			click: (row) => view(row),
		},
	],
};
```

These render automatically in the **Actions** column.

---

## 🧰 Header Actions

```ts
config = {
	headerButtons: [
		{
			icon: 'add',
			text: 'Create',
			click: () => createUser(),
		},
	],
};
```

---

## 🔍 Search

- Client-side search by default
- Uses `config.searchBy` (default: `"title"`)
- Emits `(onSearch)` for server-side search

```html
<wtable (onSearch)="search($event)"></wtable>
```

---

## 📄 Pagination

Supported modes:

### Client-side (default)

```ts
config = {
	allDocs: true,
	perPage: 10,
	page: 1,
};
```

### Server-side

```ts
config = {
	allDocs: false,
	perPage: 20,
	page: 1,
	paginate: (page) => fetchPage(page),
	setPerPage: (n) => setPageSize(n),
};
```

---

## ⚙️ Config (partial)

```ts
{
	searchable?: boolean;
	searchBy?: string;
	pageSizeOptions?: number[];
	perPage?: number | -1;
	page?: number;
	allDocs?: boolean;

	create?: () => void;
	update?: (row) => void;
	delete?: (row) => void;

	buttons?: {
		icon?: string;
		click: (row) => void;
		href?: string;
		hrefFunc?: (row) => string;
		ahref?: string;
		ahrefFunc?: (row) => string;
		target?: string;
	}[];

	headerButtons?: {
		icon?: string;
		text?: string;
		class?: string;
		click: () => void;
	}[];
}
```

---

## 🧠 Notes

- `rows` can be plain objects **or** `Signal<T>[]`
- Sorting is enabled per-column using `<ng-template sort="field">`
- Pagination state (`perPage`) is persisted via `StoreService`
- Fully responsive: switches to stacked rows on mobile

---

## License

MIT © Web Art Work
