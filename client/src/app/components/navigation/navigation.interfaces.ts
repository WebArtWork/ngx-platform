import { NavigationActionVariant } from './navigation.types';

export interface NavigationBrand {
	label?: string;
	logo?: string;
	href?: string;
}

export interface NavigationLink {
	label?: string;
	description?: string;
	href?: string;
	icon?: string;
	active?: boolean;
}

export interface NavigationAction {
	label?: string;
	href?: string;
	icon?: string;
	variant?: NavigationActionVariant;
}

export interface NavigationContent {
	sectionId?: string;
	title?: string;
	description?: string;
	brand?: NavigationBrand;
	links?: NavigationLink[];
	actions?: NavigationAction[];
	note?: string;
}
