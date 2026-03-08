# page-component-navigation

Reusable navigation component for top bars, side menus, mobile drawers, and footer link groups.

## API

### `content: NavigationContent`

```ts
export interface NavigationContent {
	sectionId?: string;
	title?: string;
	description?: string;
	brand?: { label?: string; logo?: string; href?: string };
	links?: {
		label?: string;
		description?: string;
		href?: string;
		icon?: string;
		active?: boolean;
	}[];
	actions?: {
		label?: string;
		href?: string;
		icon?: string;
		variant?: 'primary' | 'secondary' | 'ghost';
	}[];
	note?: string;
}
```

### `layout: NavigationLayout`

Supported layouts:

- `topbar`
- `sidebar`
- `mobile`
- `footer`
