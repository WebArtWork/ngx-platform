export interface FaqItem {
	q?: string;
	a?: string;
}

export interface FaqContent {
	/** Optional section id (e.g. "faq") */
	sectionId?: string;

	title?: string;
	description?: string;

	items?: FaqItem[];
}
