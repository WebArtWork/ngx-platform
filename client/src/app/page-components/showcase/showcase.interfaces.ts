import { ShowcaseTabId } from './showcase.types';

export interface ShowcaseTab {
	id?: ShowcaseTabId;
	label?: string;
	title?: string;
	desc?: string;
	bullets?: string[];
}

export interface ShowcaseContent {
	/** Optional section id (e.g. "showcase") */
	sectionId?: string;

	title?: string;
	description?: string;

	defaultTabId?: ShowcaseTabId;
	tabs?: ShowcaseTab[];

	primaryCtaLabel?: string;
	primaryCtaTargetId?: string;

	secondaryCtaLabel?: string;
	secondaryCtaTargetId?: string;
}
