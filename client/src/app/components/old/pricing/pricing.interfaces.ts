export interface PricingPlan {
	id?: string;
	name?: string;
	blurb?: string;
	priceMonthly?: number;
	priceYearly?: number;
	features?: string[];
	highlight?: boolean;
}

export interface PricingContent {
	sectionId?: string;

	title?: string;
	description?: string;

	plans?: PricingPlan[];
}
