export interface TeamMemberPreview {
	name?: string;
	role?: string;
	bio?: string;
	avatar?: string;
	links?: { label?: string; href?: string }[];
}

export interface TeamContent {
	sectionId?: string;
	title?: string;
	description?: string;
	members?: TeamMemberPreview[];
}
