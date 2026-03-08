export interface MemberStat {
	label?: string;
	value?: string;
}

export interface MemberLink {
	label?: string;
	href?: string;
	icon?: string;
}

export interface MemberContent {
	sectionId?: string;
	name?: string;
	role?: string;
	avatar?: string;
	bio?: string;
	stats?: MemberStat[];
	links?: MemberLink[];
}
