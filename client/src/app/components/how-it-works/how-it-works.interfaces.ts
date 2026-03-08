export interface HowItWorksStep {
	title?: string;
	desc?: string;
	icon?: string;
}

export interface HowItWorksContent {
	/** Optional section id (e.g. "how") to support anchor navigation. */
	sectionId?: string;

	title?: string;
	description?: string;

	steps?: HowItWorksStep[];
}
