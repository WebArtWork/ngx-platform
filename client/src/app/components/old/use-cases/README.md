# page-component-use-cases

Reusable “benefits for every role” section (cards with bullet lists).

## Principles

- **All content comes from the `content` input**.
- **All fields inside `content` are optional**, and the template guards rendering with `@if`.
- Token-driven theming via `var(--token)` (no hard-coded colors).
- Tailwind utilities are used in the template for layout/spacing only.
- Local SCSS is component-specific BEM (no `@apply`).

## API

### `content: UseCasesContent` (required input)

```ts
export interface UseCasesContent {
	sectionId?: string;

	title?: string;
	description?: string;

	items?: { title?: string; icon?: string; bullets?: string[] }[];
}
```

## Usage

```ts
import {
	UseCasesSectionComponent,
	UseCasesContent,
} from '@pageComponent/use-cases';

@Component({
	// ...
	imports: [UseCasesSectionComponent],
})
export class LandingComponent {
	readonly useCasesContent: UseCasesContent = {
		sectionId: 'use-cases',
		title: 'Benefits for every role',
		description: 'Tailor outcomes without changing the foundation.',
		items: [
			{
				title: 'For founders',
				bullets: [
					'Validate faster',
					'Ship MVPs with fewer rewrites',
					'Build a reusable base',
				],
			},
			{
				title: 'For teams',
				bullets: [
					'Consistent UI + architecture',
					'Shared components',
					'Faster onboarding',
				],
			},
			{
				title: 'For developers',
				bullets: [
					'Modern Angular skills',
					'Real project experience',
					'Reusable patterns',
				],
			},
		],
	};
}
```

```html
<page-component-use-cases
	[content]="useCasesContent"
></page-component-use-cases>
```
