export interface ArticleSection {
	heading?: string;
	body?: string;
}

export interface ArticleMeta {
	label?: string;
	value?: string;
}

export interface ArticleContent {
	sectionId?: string;
	title?: string;
	description?: string;
	cover?: string;
	meta?: ArticleMeta[];
	sections?: ArticleSection[];
}
