import { NgClass, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TranslatePipe } from 'wacom';
import { HeroContent, HeroCta } from './hero.interfaces';
import { HeroLayout } from './hero.types';

@Component({
	selector: 'page-component-hero',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './hero.component.html',
	styleUrl: './hero.component.scss',
	imports: [NgClass, NgTemplateOutlet, TranslatePipe],
})
export class HeroSectionComponent {
	readonly content = input.required<HeroContent>();

	readonly layout = input<HeroLayout>('split');

	readonly _sectionClass = computed(() => ({
		hero: true,
		[`hero--${this.layout()}`]: true,
		'hero--with-background': !!this.content().backgroundImage,
	}));

	readonly _mediaClass = computed(() => {
		switch (this.content().media?.aspect ?? 'landscape') {
			case 'portrait':
				return 'hero__media hero__media--portrait';
			case 'square':
				return 'hero__media hero__media--square';
			case 'video':
				return 'hero__media hero__media--video';
			default:
				return 'hero__media hero__media--landscape';
		}
	});

	readonly _hasContent = computed(() => {
		const _content = this.content();

		return !!(
			_content.title ||
			_content.description ||
			_content.badge ||
			_content.ctas?.length ||
			_content.meta ||
			_content.media ||
			_content.logos?.length ||
			_content.highlights?.length ||
			_content.metrics?.length ||
			_content.note ||
			_content.backgroundImage
		);
	});

	scrollTo(id: string): void {
		const el = document.getElementById(id);

		if (!el) return;

		el.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	onCtaClick(cta: HeroCta): void {
		if (cta.targetId) {
			this.scrollTo(cta.targetId);
			return;
		}

		if (cta.href) {
			window.location.href = cta.href;
		}
	}
}
