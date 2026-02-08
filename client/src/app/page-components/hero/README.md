# page-component-hero

Reusable hero section for landing-like pages.

## Principles

- **All content comes from the `content` input**.
- **All fields inside `content` are optional**, and the template guards rendering with `@if`.
- Token-driven theming via `var(--token)` (no hard-coded colors).
- Tailwind utilities are used in the template for layout/spacing only.
- Local SCSS is component-specific BEM (no `@apply`).

## API

### `content: HeroContent` (required input)

The input itself is required, but every field is optional:

```ts
export interface HeroContent {
	badge?: { icon?: string; text?: string };
	title?: string;
	description?: string;
	ctas?: {
		label?: string;
		targetId?: string;
		href?: string;
		variant?: 'primary' | 'ghost';
	}[];
	meta?: { icon?: string; text?: string };
	card?: {
		title?: string;
		subtitle?: string;
		icon?: string;
		miniCards?: { icon?: string; title?: string; desc?: string }[];
		note?: { title?: string; desc?: string; icon?: string };
	};
}
```
