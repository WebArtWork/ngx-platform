# page-component-how-it-works

Reusable “how it works” steps section (numbered cards).

## Principles

- **All content comes from the `content` input**.
- **All fields inside `content` are optional**, and the template guards rendering with `@if`.
- Token-driven theming via `var(--token)` (no hard-coded colors).
- Tailwind utilities are used in the template for layout/spacing only.
- Local SCSS is component-specific BEM (no `@apply`).

## API

### `content: HowItWorksContent` (required input)

```ts
export interface HowItWorksContent {
	sectionId?: string;

	title?: string;
	description?: string;

	steps?: { title?: string; desc?: string; icon?: string }[];
}
```

## Usage

```ts
import {
	HowItWorksSectionComponent,
	HowItWorksContent,
} from '@pageComponent/how-it-works';

@Component({
	// ...
	imports: [HowItWorksSectionComponent],
})
export class LandingComponent {
	readonly howItWorksContent: HowItWorksContent = {
		sectionId: 'how',
		title: 'How it works',
		description: 'Keep it simple: start, build, promote reuse.',
		steps: [
			{
				title: 'Choose a path',
				desc: 'Start with a project goal: product, feature, or learning track.',
				icon: 'trending_up',
			},
			{
				title: 'Build with the system',
				desc: 'Compose sections and components using tokens + clean patterns.',
				icon: 'trending_up',
			},
			{
				title: 'Reuse and scale',
				desc: 'Promote repeatables into shared libs and ship the next project faster.',
				icon: 'trending_up',
			},
		],
	};
}
```

```html
<page-component-how-it-works
	[content]="howItWorksContent"
></page-component-how-it-works>
```
