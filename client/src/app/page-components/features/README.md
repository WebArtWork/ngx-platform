# page-component-features

Reusable “features grid” section.

## Principles

- **All content comes from the `content` input**.
- **All fields inside `content` are optional**, and the template guards rendering with `@if`.
- Token-driven theming via `var(--token)` (no hard-coded colors).
- Tailwind utilities are used in the template for layout/spacing only.
- Local SCSS is component-specific BEM (no `@apply`).

## API

### `content: FeaturesContent` (required input)

```ts
export interface FeaturesContent {
	sectionId?: string;

	title?: string;
	description?: string;

	items?: { icon?: string; title?: string; desc?: string }[];
}
```

## Usage

```ts
import {
	FeaturesSectionComponent,
	FeaturesContent,
} from '@pageComponent/features';

@Component({
	// ...
	imports: [FeaturesSectionComponent],
})
export class LandingComponent {
	readonly featuresContent: FeaturesContent = {
		sectionId: 'features',
		title: 'Key features',
		description:
			'A set of focused building blocks that help you ship faster, teach better, and reuse more.',
		items: [
			{
				icon: 'rocket_launch',
				title: 'Fast delivery',
				desc: 'Reusable patterns + token-driven design speed up building and iteration.',
			},
			{
				icon: 'extension',
				title: 'Modular architecture',
				desc: 'Small, scalable building blocks you can recombine across projects.',
			},
		],
	};
}
```

```html
<page-component-features [content]="featuresContent"></page-component-features>
```
