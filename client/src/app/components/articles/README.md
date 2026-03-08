# page-component-articles

Component for listing blog posts, news, guides, or other article-based content.

## API

### `content: ArticlesContent`

```ts
export interface ArticlesContent {
	sectionId?: string;
	title?: string;
	description?: string;
	items?: {
		title?: string;
		excerpt?: string;
		image?: string;
		category?: string;
		date?: string;
		href?: string;
	}[];
}
```

### `layout: ArticlesLayout`

- `grid`
- `list`
- `featured`
