# page-component-testimonials

Reusable testimonials section (quote cards).

## Principles

- **All content comes from the `content` input**.
- **All fields inside `content` are optional**, and the template guards rendering with `@if`.
- Token-driven theming via `var(--token)` (no hard-coded colors).
- Tailwind utilities are used in the template for layout/spacing only.
- Local SCSS is component-specific BEM (no `@apply`).

## API

### `content: TestimonialsContent` (required input)

```ts
export interface TestimonialsContent {
	sectionId?: string;

	title?: string;
	description?: string;

	items?: { quote?: string; name?: string; role?: string }[];
}
```

## Usage

```ts
import {
	TestimonialsSectionComponent,
	TestimonialsContent,
} from '@pageComponent/testimonials';

@Component({
	// ...
	imports: [TestimonialsSectionComponent],
})
export class LandingComponent {
	readonly testimonialsContent: TestimonialsContent = {
		sectionId: 'testimonials',
		title: 'What people say',
		description: 'Short, real outcomes — keep it credible.',
		items: [
			{
				quote: 'We stopped rebuilding the same UI and started shipping features weekly.',
				name: 'A. Product Lead',
				role: 'SaaS Team',
			},
			{
				quote: 'Learning directly from production patterns made my day-to-day work cleaner and faster.',
				name: 'D. Frontend Dev',
				role: 'Angular Engineer',
			},
		],
	};
}
```

```html
<page-component-testimonials
	[content]="testimonialsContent"
></page-component-testimonials>
```
