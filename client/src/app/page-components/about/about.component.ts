import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ButtonComponent } from '@lib/button';
import { AboutContent, AboutCta } from './about.interfaces';

@Component({
	selector: 'page-component-about',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './about.component.html',
	imports: [ButtonComponent],
})
export class AboutSectionComponent {
	readonly content = input.required<AboutContent>();

	scrollTo(id: string): void {
		const el = document.getElementById(id);

		if (!el) return;

		el.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	onCtaClick(cta: AboutCta): void {
		if (cta.targetId) {
			this.scrollTo(cta.targetId);
			return;
		}

		if (cta.href) {
			window.open(cta.href, '_blank', 'noopener,noreferrer');
		}
	}
}
