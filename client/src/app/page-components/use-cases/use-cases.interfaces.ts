export interface UseCaseItem {
	title?: string;
	icon?: string;
	bullets?: string[];
}

export interface UseCasesContent {
	/** Optional section id (e.g. "use-cases") to support anchor navigation. */
	sectionId?: string;

	title?: string;
	description?: string;

	items?: UseCaseItem[];
}
