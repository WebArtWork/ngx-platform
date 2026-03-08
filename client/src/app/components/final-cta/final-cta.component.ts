import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FinalCtaButton, FinalCtaContent } from './final-cta.interfaces';

@Component({
	selector: 'page-component-final-cta',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './final-cta.component.html',
	imports: [NgClass],
})
export class FinalCtaSectionComponent {
	readonly content = input.required<FinalCtaContent>();

	onClick(btn: FinalCtaButton): void {
		if (btn.targetId) {
			const el = document.getElementById(btn.targetId);
			if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}
}
