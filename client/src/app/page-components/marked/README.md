# page-component-about

Reusable “problem → solution” section (two columns: pain points + solutions card).

## Principles

- **All content comes from the `content` input**.
- **All fields inside `content` are optional**, and the template guards rendering with `@if`.
- Token-driven theming via `var(--token)` (no hard-coded colors).
- Tailwind utilities are used in the template for layout/spacing only.
- Local SCSS is component-specific BEM (no `@apply`).

## API

### `content: AboutContent` (required input)

```ts
export interface AboutContent {
	sectionId?: string;

	title?: string;
	description?: string;

	painPoints?: { title?: string; desc?: string; icon?: string }[];

	solutionsTitle?: string;
	solutions?: { title?: string; desc?: string; icon?: string }[];

	ctas?: {
		label?: string;
		targetId?: string;
		href?: string;
		variant?: 'primary' | 'ghost';
	}[];
}
```

## Usage

```ts
import { AboutSectionComponent, AboutContent } from '@pageComponent/about';

@Component({
	// ...
	imports: [AboutSectionComponent],
})
export class LandingComponent {
	readonly about: AboutContent = {
		sectionId: 'about',
		title: 'Common problems, solved with one system',
		description:
			'Most teams waste time rebuilding UI, struggling with inconsistent patterns, and learning in isolation.',
		painPoints: [
			{
				title: 'Building products takes too long',
				desc: 'Teams get stuck in rewrites, inconsistent UI, and slow delivery cycles.',
			},
			{
				title: 'Learning rarely matches real work',
				desc: 'Tutorials don’t translate into production-ready architecture and habits.',
			},
		],
		solutionsTitle: 'What you get',
		solutions: [
			{
				title: 'Ship modular features faster',
				desc: 'A consistent UI system + modern Angular patterns reduce friction and rework.',
			},
			{
				title: 'Learn by building real products',
				desc: 'Education content is derived from production code and real project workflows.',
			},
		],
		ctas: [
			{
				label: 'See how it works',
				targetId: 'features',
				variant: 'primary',
			},
			{ label: 'Read FAQ', targetId: 'faq', variant: 'ghost' },
		],
	};
}
```

```html
<page-component-about [content]="about"></page-component-about>
```
