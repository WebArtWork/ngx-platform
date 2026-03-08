import { HeroCtaVariant } from './hero.types';

export interface HeroBadge {
	icon?: string;
	text?: string;
}

export interface HeroCta {
	label?: string;
	/** If set: calls scrollTo(targetId). */
	targetId?: string;
	/** Reserved for later use (routerLink / href). */
	href?: string;
	variant?: HeroCtaVariant;
}

export interface HeroMiniCard {
	icon?: string;
	title?: string;
	desc?: string;
}

export interface HeroNote {
	title?: string;
	desc?: string;
	icon?: string;
}

export interface HeroMeta {
	icon?: string;
	text?: string;
}

export interface HeroCard {
	title?: string;
	subtitle?: string;
	icon?: string;
	miniCards?: HeroMiniCard[];
	note?: HeroNote;
}

export interface HeroContent {
	badge?: HeroBadge;
	title?: string;
	description?: string;
	ctas?: HeroCta[];
	meta?: HeroMeta;
	card?: HeroCard;
}
