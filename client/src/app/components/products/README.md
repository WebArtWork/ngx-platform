# page-component-products

Component for listing products, categories, or product collections.

## API

### `content: ProductsContent`

```ts
export interface ProductsContent {
	sectionId?: string;
	title?: string;
	description?: string;
	items?: {
		name?: string;
		description?: string;
		image?: string;
		price?: string;
		tag?: string;
		href?: string;
	}[];
}
```

### `layout: ProductsLayout`

- `grid`
- `catalog`
- `comparison`
