import { ContentMediaType } from './content.types';

export interface ContentMedia {
	type?: ContentMediaType;
	src?: string;
	alt?: string;
	caption?: string;
}

export interface ContentBlock {
	eyebrow?: string;
	title?: string;
	body?: string;
	media?: ContentMedia;
}

export interface ContentSectionContent {
	sectionId?: string;
	title?: string;
	description?: string;
	blocks?: ContentBlock[];
}
