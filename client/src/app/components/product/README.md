# page-component-product

Detailed component for a single product with images, description, price, and actions.

## API

### `content: ProductContent`

```ts
export interface ProductContent {
	sectionId?: string;
	name?: string;
	description?: string;
	price?: string;
	gallery?: { src?: string; alt?: string }[];
	specs?: { label?: string; value?: string }[];
	actions?: {
		label?: string;
		href?: string;
		icon?: string;
		variant?: 'primary' | 'secondary' | 'ghost';
	}[];
}
```

### `layout: ProductLayout`

- `detail`
- `gallery`
- `checkout`
