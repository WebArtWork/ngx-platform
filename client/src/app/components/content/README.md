# page-component-content

Flexible content component for text, media, mixed sections, and general page structure.

## API

### `content: ContentSectionContent`

```ts
export interface ContentSectionContent {
	sectionId?: string;
	title?: string;
	description?: string;
	blocks?: {
		eyebrow?: string;
		title?: string;
		body?: string;
		media?: {
			type?: 'image' | 'video';
			src?: string;
			alt?: string;
			caption?: string;
		};
	}[];
}
```

### `layout: ContentLayout`

- `stack`
- `split`
- `media`
