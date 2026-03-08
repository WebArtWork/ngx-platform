# page-component-article

Component for displaying a single full article with title, metadata, body, and related content.

## API

### `content: ArticleContent`

```ts
export interface ArticleContent {
	sectionId?: string;
	title?: string;
	description?: string;
	cover?: string;
	meta?: { label?: string; value?: string }[];
	sections?: { heading?: string; body?: string }[];
}
```

### `layout: ArticleLayout`

- `default`
- `cover`
- `editorial`
