import { NgClass } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	input,
	signal,
} from '@angular/core';
import { PricingContent, PricingPlan } from './pricing.interfaces';

@Component({
	selector: 'page-component-pricing',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './pricing.component.html',
	imports: [NgClass],
})
export class PricingSectionComponent {
	readonly content = input.required<PricingContent>();

	readonly billing = signal<'monthly' | 'yearly'>('monthly');

	priceFor(plan: PricingPlan): number | undefined {
		return this.billing() === 'monthly'
			? plan.priceMonthly
			: plan.priceYearly;
	}
}
