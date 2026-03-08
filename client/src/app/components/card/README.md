# page-component-card

Reusable container component for showing compact grouped information like preview items, stats, or summaries.

## API

### `content: CardContent`

```ts
export interface CardContent {
	sectionId?: string;
	badge?: string;
	title?: string;
	description?: string;
	media?: { src?: string; alt?: string };
	meta?: { label?: string; value?: string }[];
	actions?: {
		label?: string;
		href?: string;
		icon?: string;
		variant?: 'primary' | 'secondary' | 'ghost';
	}[];
}
```

### `layout: CardLayout`

- `default`
- `stat`
- `preview`
