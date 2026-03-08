import { MarketingActionVariant } from './marketing.types';

export interface MarketingAction {
	label?: string;
	href?: string;
	icon?: string;
	variant?: MarketingActionVariant;
}

export interface MarketingContent {
	sectionId?: string;
	eyebrow?: string;
	title?: string;
	description?: string;
	actions?: MarketingAction[];
	highlight?: string;
}
