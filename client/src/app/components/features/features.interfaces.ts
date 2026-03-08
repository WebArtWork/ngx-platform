export interface FeaturesItem {
	icon?: string;
	title?: string;
	desc?: string;
}

export interface FeaturesContent {
	sectionId?: string;
	title?: string;
	description?: string;
	items?: FeaturesItem[];
	footer?: string;
}
