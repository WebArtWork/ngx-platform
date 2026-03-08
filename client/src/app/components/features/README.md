# page-component-features

Component for presenting key features, benefits, or capabilities in a clear structured way.

## API

### `content: FeaturesContent`

```ts
export interface FeaturesContent {
	sectionId?: string;
	title?: string;
	description?: string;
	items?: { icon?: string; title?: string; desc?: string }[];
	footer?: string;
}
```

### `layout: FeaturesLayout`

- `grid`
- `list`
- `spotlight`
