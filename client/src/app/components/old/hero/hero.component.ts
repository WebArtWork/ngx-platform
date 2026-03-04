import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { HeroContent, HeroCta } from './hero.interfaces';

@Component({
	selector: 'page-component-hero',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './hero.component.html',
	imports: [NgClass],
})
export class HeroSectionComponent {
	/**
	 * Keep the input required (component always gets an object),
	 * but allow all fields to be optional for reusability.
	 */
	readonly content = input.required<HeroContent>();

	scrollTo(id: string): void {
		const el = document.getElementById(id);

		if (!el) return;

		el.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	onCtaClick(cta: HeroCta): void {
		if (cta.targetId) this.scrollTo(cta.targetId);
	}
}
