# page-component-modal

Overlay component for dialogs, confirmations, forms, or focused temporary interactions.

## API

### `content: ModalContent`

```ts
export interface ModalContent {
	sectionId?: string;
	title?: string;
	description?: string;
	actions?: {
		label?: string;
		href?: string;
		icon?: string;
		variant?: 'primary' | 'secondary' | 'ghost';
	}[];
	dismissLabel?: string;
}
```

### `layout: ModalLayout`

- `dialog`
- `sheet`
- `fullscreen`
