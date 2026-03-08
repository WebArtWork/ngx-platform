import { CardActionVariant } from './card.types';

export interface CardMeta {
	label?: string;
	value?: string;
}

export interface CardAction {
	label?: string;
	href?: string;
	icon?: string;
	variant?: CardActionVariant;
}

export interface CardContent {
	sectionId?: string;
	badge?: string;
	title?: string;
	description?: string;
	media?: { src?: string; alt?: string };
	meta?: CardMeta[];
	actions?: CardAction[];
}
