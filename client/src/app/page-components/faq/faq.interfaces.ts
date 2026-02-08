export interface FaqItem {
	q?: string;
	a?: string;
}

export interface FaqContent {
	sectionId?: string;

	title?: string;
	description?: string;

	items?: FaqItem[];
}
