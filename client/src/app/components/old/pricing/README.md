# page-component-pricing

Reusable pricing section with monthly/yearly toggle.

## Principles

- **All content comes from the `content` input**.
- **All fields inside `content` are optional**, and the template guards rendering with `@if`.
- Local billing state is modeled with signals.
- Token-driven theming via `var(--token)` (no hard-coded colors).
- Tailwind utilities are used in the template for layout/spacing only.
- Local SCSS is component-specific BEM (no `@apply`).

## API

### `content: PricingContent` (required input)

```ts
export interface PricingContent {
	sectionId?: string;

	title?: string;
	description?: string;

	plans?: {
		id?: string;
		name?: string;
		blurb?: string;
		priceMonthly?: number;
		priceYearly?: number;
		features?: string[];
		highlight?: boolean;
	}[];
}
```

## Usage

```ts
import {
	PricingSectionComponent,
	PricingContent,
} from '@pageComponent/pricing';

@Component({
	// ...
	imports: [PricingSectionComponent],
})
export class LandingComponent {
	readonly pricingContent: PricingContent = {
		sectionId: 'pricing',
		title: 'Pricing',
		description:
			'Start free, then upgrade when you’re shipping or scaling reuse.',
		plans: [
			{
				id: 'starter',
				name: 'Starter',
				blurb: 'For individuals exploring the system.',
				priceMonthly: 0,
				priceYearly: 0,
				features: ['Landing templates', 'Basic components'],
			},
			{
				id: 'pro',
				name: 'Pro',
				blurb: 'For building and learning seriously.',
				priceMonthly: 19,
				priceYearly: 190,
				highlight: true,
				features: ['Full component set', 'Example app patterns'],
			},
		],
	};
}
```

```html
<page-component-pricing [content]="pricingContent"></page-component-pricing>
```
