import { UtilityActionVariant } from './utility.types';

export interface UtilityAction {
	label?: string;
	href?: string;
	icon?: string;
	variant?: UtilityActionVariant;
}

export interface UtilityContent {
	sectionId?: string;
	status?: string;
	title?: string;
	description?: string;
	actions?: UtilityAction[];
}
