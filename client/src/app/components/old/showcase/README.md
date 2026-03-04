# page-component-showcase

Reusable “product showcase” section with tabs and preview.

## Principles

- **All content comes from the `content` input**.
- **All fields inside `content` are optional**, and the template guards rendering with `@if`.
- Local UI state (active tab) is modeled with signals.
- Token-driven theming via `var(--token)` (no hard-coded colors).
- Tailwind utilities are used in the template for layout/spacing only.
- Local SCSS is component-specific BEM (no `@apply`).

## API

### `content: ShowcaseContent` (required input)

```ts
export interface ShowcaseContent {
	sectionId?: string;

	title?: string;
	description?: string;

	defaultTabId?: string;
	tabs?: {
		id?: string;
		label?: string;
		title?: string;
		desc?: string;
		bullets?: string[];
	}[];

	primaryCtaLabel?: string;
	primaryCtaTargetId?: string;

	secondaryCtaLabel?: string;
	secondaryCtaTargetId?: string;
}
```

## Usage

```ts
import {
	ShowcaseSectionComponent,
	ShowcaseContent,
} from '@pageComponent/showcase';

@Component({
	// ...
	imports: [ShowcaseSectionComponent],
})
export class LandingComponent {
	readonly showcaseContent: ShowcaseContent = {
		sectionId: 'showcase',
		title: 'Product showcase',
		description: 'Three parts of one ecosystem — pick a view.',
		defaultTabId: 'studio',
		tabs: [
			{
				id: 'studio',
				label: 'Studio',
				title: 'Build real products with a modular system',
				desc: 'Deliver production features with a consistent UI foundation and scalable architecture.',
				bullets: [
					'Feature delivery',
					'Design tokens',
					'Clean component boundaries',
					'Performance defaults',
				],
			},
			{
				id: 'education',
				label: 'Education',
				title: 'Learn by working on live projects',
				desc: 'Turn production code into learning material — practical skills you actually use.',
				bullets: [
					'Hands-on tasks',
					'Code reviews',
					'Real constraints',
					'Progressive complexity',
				],
			},
		],
		primaryCtaLabel: 'View pricing',
		primaryCtaTargetId: 'pricing',
		secondaryCtaLabel: 'Questions?',
		secondaryCtaTargetId: 'faq',
	};
}
```

```html
<page-component-showcase [content]="showcaseContent"></page-component-showcase>
```
