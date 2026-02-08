# page-component-faq

Reusable FAQ (accordion) section.

## Principles

- **All content comes from the `content` input**.
- **All fields inside `content` are optional**, and the template guards rendering with `@if`.
- Local open/close state is modeled with signals.
- Token-driven theming via `var(--token)` (no hard-coded colors).
- Tailwind utilities are used in the template for layout/spacing only.
- Local SCSS is component-specific BEM (no `@apply`).

## API

### `content: FaqContent` (required input)

```ts
export interface FaqContent {
	sectionId?: string;

	title?: string;
	description?: string;

	items?: { q?: string; a?: string }[];
}
```

## Usage

```ts
import { FaqSectionComponent, FaqContent } from '@pageComponent/faq';

@Component({
	// ...
	imports: [FaqSectionComponent],
})
export class LandingComponent {
	readonly faqContent: FaqContent = {
		sectionId: 'faq',
		title: 'FAQ',
		description: 'Quick answers to reduce hesitation.',
		items: [
			{
				q: 'Is this only for Angular?',
				a: 'WAW is centered on a modern Angular ecosystem, but many architectural patterns and token-driven design ideas apply broadly.',
			},
			{
				q: 'Does it support dark theme?',
				a: 'Yes — the UI is token-driven and automatically adapts to your global `html.dark` token overrides.',
			},
		],
	};
}
```

```html
<page-component-faq [content]="faqContent"></page-component-faq>
```
