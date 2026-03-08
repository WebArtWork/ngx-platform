import { HeroCtaVariant, HeroMediaAspect, HeroMediaType } from './hero.types';

export interface HeroBadge {
	icon?: string;
	text?: string;
}

export interface HeroCta {
	label?: string;
	icon?: string;
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

export interface HeroMedia {
	type?: HeroMediaType;
	src?: string;
	alt?: string;
	title?: string;
	aspect?: HeroMediaAspect;
}

export interface HeroLogo {
	label?: string;
	icon?: string;
	src?: string;
	alt?: string;
}

export interface HeroMetric {
	icon?: string;
	value?: string;
	label?: string;
	description?: string;
}

export interface HeroContent {
	badge?: HeroBadge;
	title?: string;
	description?: string;
	ctas?: HeroCta[];
	meta?: HeroMeta;
	media?: HeroMedia;
	logos?: HeroLogo[];
	highlights?: HeroMiniCard[];
	metrics?: HeroMetric[];
	note?: HeroNote;
	backgroundImage?: string;
}
