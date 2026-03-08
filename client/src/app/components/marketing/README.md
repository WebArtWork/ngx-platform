# page-component-marketing

Component for promotional messages, banners, announcements, and campaign-driven content.

## API

### `content: MarketingContent`

```ts
export interface MarketingContent {
	sectionId?: string;
	eyebrow?: string;
	title?: string;
	description?: string;
	actions?: {
		label?: string;
		href?: string;
		icon?: string;
		variant?: 'primary' | 'secondary' | 'ghost';
	}[];
	highlight?: string;
}
```

### `layout: MarketingLayout`

- `banner`
- `announcement`
- `campaign`
