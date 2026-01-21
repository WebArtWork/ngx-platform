export type ShowcaseTabId = 'studio' | 'education' | 'framework';

export type Feature = {
	icon: string;
	title: string;
	desc: string;
};

export type Step = {
	title: string;
	desc: string;
};

export type UseCase = {
	title: string;
	bullets: string[];
};

export type Testimonial = {
	quote: string;
	name: string;
	role: string;
};

export type Plan = {
	id: 'starter' | 'pro' | 'team';
	name: string;
	blurb: string;
	priceMonthly: number;
	priceYearly: number;
	features: string[];
	highlight?: boolean;
};

export type Faq = {
	q: string;
	a: string;
};
