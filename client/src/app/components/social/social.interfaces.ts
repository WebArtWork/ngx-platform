export interface SocialQuote {
	quote?: string;
	name?: string;
	role?: string;
	avatar?: string;
}

export interface SocialSignal {
	label?: string;
	value?: string;
	icon?: string;
}

export interface SocialContent {
	sectionId?: string;
	title?: string;
	description?: string;
	quotes?: SocialQuote[];
	signals?: SocialSignal[];
}
