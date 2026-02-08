export interface FeaturesItem {
	icon?: string;
	title?: string;
	desc?: string;
}

export interface FeaturesContent {
	/** Optional section id (e.g. "features") to support anchor navigation. */
	sectionId?: string;

	title?: string;
	description?: string;

	items?: FeaturesItem[];
}
