import { NgClass } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	computed,
	input,
	signal,
} from '@angular/core';
import { ShowcaseContent, ShowcaseTab } from './showcase.interfaces';
import { ShowcaseTabId } from './showcase.types';

@Component({
	selector: 'page-component-showcase',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './showcase.component.html',
	imports: [NgClass],
})
export class ShowcaseSectionComponent {
	readonly content = input.required<ShowcaseContent>();

	private readonly _selected = signal<ShowcaseTabId | null>(null);

	readonly selectedTabId = computed(() => {
		const c = this.content();
		return this._selected() ?? c.defaultTabId ?? c.tabs?.[0]?.id ?? null;
	});

	readonly selectedTab = computed<ShowcaseTab | null>(() => {
		const c = this.content();
		const id = this.selectedTabId();
		if (!id || !c.tabs?.length) return null;
		return c.tabs.find((t) => t.id === id) ?? null;
	});

	selectTab(id?: ShowcaseTabId | null): void {
		if (!id) return;
		this._selected.set(id);
	}

	scrollTo(id: string): void {
		const el = document.getElementById(id);
		if (!el) return;
		el.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	onPrimaryCta(): void {
		const c = this.content();
		if (c.primaryCtaTargetId) this.scrollTo(c.primaryCtaTargetId);
	}

	onSecondaryCta(): void {
		const c = this.content();
		if (c.secondaryCtaTargetId) this.scrollTo(c.secondaryCtaTargetId);
	}
}
