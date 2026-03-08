# page-component-utility

Component for system-level states such as 404, 500, maintenance, empty state, or cookie consent.

## API

### `content: UtilityContent`

```ts
export interface UtilityContent {
	sectionId?: string;
	status?: string;
	title?: string;
	description?: string;
	actions?: {
		label?: string;
		href?: string;
		icon?: string;
		variant?: 'primary' | 'secondary' | 'ghost';
	}[];
}
```

### `layout: UtilityLayout`

- `empty`
- `error`
- `maintenance`
- `consent`
