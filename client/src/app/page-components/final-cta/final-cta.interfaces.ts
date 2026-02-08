import { FinalCtaVariant } from './final-cta.types';

export interface FinalCtaButton {
	label?: string;
	variant?: FinalCtaVariant;
	targetId?: string;
	href?: string;
}

export interface FinalCtaContent {
	/** Optional section id (e.g. "final-cta") */
	sectionId?: string;

	title?: string;
	description?: string;

	buttons?: FinalCtaButton[];
}
