import { AboutCtaVariant } from './about.types';

export interface AboutItem {
	title?: string;
	desc?: string;
	icon?: string;
}

export interface AboutCta {
	label?: string;
	targetId?: string;
	href?: string;
	variant?: AboutCtaVariant;
}

export interface AboutContent {
	/**
	 * Optional section id (e.g. "about") to support anchor navigation.
	 */
	sectionId?: string;

	/**
	 * Left column heading/description (problem framing).
	 */
	title?: string;
	description?: string;

	/**
	 * Left list (pain points).
	 */
	painPoints?: AboutItem[];

	/**
	 * Right card heading + items (solutions).
	 */
	solutionsTitle?: string;
	solutions?: AboutItem[];

	/**
	 * Optional CTA buttons shown inside the right card.
	 */
	ctas?: AboutCta[];
}
