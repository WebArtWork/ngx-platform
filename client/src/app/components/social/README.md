# page-component-social

Component for testimonials, reviews, trust signals, and other social proof elements.

## API

### `content: SocialContent`

```ts
export interface SocialContent {
	sectionId?: string;
	title?: string;
	description?: string;
	quotes?: {
		quote?: string;
		name?: string;
		role?: string;
		avatar?: string;
	}[];
	signals?: { label?: string; value?: string; icon?: string }[];
}
```

### `layout: SocialLayout`

- `testimonials`
- `trust`
- `ratings`
