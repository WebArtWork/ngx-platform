# page-component-final-cta

Reusable final call-to-action section.

## Principles

- **All content comes from the `content` input**.
- **All fields inside `content` are optional**, and the template guards rendering with `@if`.
- Token-driven theming via `var(--token)` (no hard-coded colors).
- Tailwind utilities are used for layout + component styling, using CSS variables for theme values.
- No component SCSS required.

## API

### `content: FinalCtaContent` (required input)

```ts
export interface FinalCtaContent {
	sectionId?: string;

	title?: string;
	description?: string;

	buttons?: {
		label?: string;
		variant?: 'primary' | 'ghost';
		targetId?: string;
		href?: string;
	}[];
}
```

## Usage

```ts
import {
	FinalCtaSectionComponent,
	FinalCtaContent,
} from '@pageComponent/final-cta';

@Component({
	// ...
	imports: [FinalCtaSectionComponent],
})
export class LandingComponent {
	readonly finalCtaContent: FinalCtaContent = {
		sectionId: 'final-cta',
		title: 'Ready to ship faster and reuse more?',
		description:
			'Start with the landing template, then grow into a full product system — with modern Angular patterns and token-driven UI.',
		buttons: [
			{ label: 'Start now', targetId: 'pricing', variant: 'primary' },
			{ label: 'See features', targetId: 'features', variant: 'ghost' },
		],
	};
}
```

```html
<page-component-final-cta
	[content]="finalCtaContent"
></page-component-final-cta>
```
