import { CtaActionVariant } from './cta.types';

export interface CtaAction {
	label?: string;
	href?: string;
	icon?: string;
	variant?: CtaActionVariant;
}

export interface CtaContent {
	sectionId?: string;
	eyebrow?: string;
	title?: string;
	description?: string;
	actions?: CtaAction[];
	note?: string;
}
