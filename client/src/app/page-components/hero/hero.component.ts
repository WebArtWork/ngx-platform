import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'page-component-hero',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './hero.component.html',
	styleUrl: './hero.component.scss',
})
export class HeroSectionComponent {
	scrollTo(id: string): void {
		const el = document.getElementById(id);

		if (!el) return;

		el.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
}
