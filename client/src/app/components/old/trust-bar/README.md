# page-component-trust-bar

Reusable “trust bar” section (title + chips) for landing-like pages.

## Principles

- **All content comes from the `content` input**.
- **All fields inside `content` are optional**, and the template guards rendering with `@if`.
- Token-driven theming via `var(--token)` (no hard-coded colors).
- Tailwind utilities are used in the template for layout/spacing only.
- Local SCSS is component-specific BEM (no `@apply`).

## API

### `content: TrustBarContent` (required input)

The input itself is required, but every field is optional:

```ts
export interface TrustBarContent {
	title?: string;
	items?: string[];
}
```

## Usage

```ts
import {
	TrustBarSectionComponent,
	TrustBarContent,
} from '@pageComponent/trust-bar';

@Component({
	// ...
	imports: [TrustBarSectionComponent],
})
export class LandingComponent {
	readonly trustBar: TrustBarContent = {
		title: 'Trusted building blocks for product teams and learners',
		items: [
			'WAW Studio',
			'WAW Education',
			'WAW Framework',
			'Open Source',
			'Community',
		],
	};
}
```

```html
<page-component-trust-bar [content]="trustBar"></page-component-trust-bar>
```
