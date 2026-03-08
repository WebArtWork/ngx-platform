export interface ArticlePreview {
	title?: string;
	excerpt?: string;
	image?: string;
	category?: string;
	date?: string;
	href?: string;
}

export interface ArticlesContent {
	sectionId?: string;
	title?: string;
	description?: string;
	items?: ArticlePreview[];
}
