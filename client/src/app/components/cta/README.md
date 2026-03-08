# page-component-cta

Component focused on driving action such as signup, contact, purchase, or navigation to another section.

## API

### `content: CtaContent`

```ts
export interface CtaContent {
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
	note?: string;
}
```

### `layout: CtaLayout`

- `inline`
- `banner`
- `panel`
