# page-component-tables

Component for showing structured data in rows and columns, with optional actions and states.

## API

### `content: TablesContent`

```ts
export interface TablesContent {
	sectionId?: string;
	title?: string;
	description?: string;
	columns?: { key: string; label?: string }[];
	rows?: {
		cells: Record<string, string | number | undefined>;
		actions?: { label?: string; href?: string; variant?: 'primary' | 'secondary' | 'ghost' }[];
	}[];
	emptyState?: string;
}
```

### `layout: TablesLayout`

- `default`
- `compact`
- `striped`
