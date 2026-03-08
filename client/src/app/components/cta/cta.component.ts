import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TranslatePipe } from 'wacom';
import { CtaContent } from './cta.interfaces';
import { CtaLayout } from './cta.types';

@Component({
	selector: 'page-component-cta',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './cta.component.html',
	styleUrl: './cta.component.scss',
	imports: [NgClass, TranslatePipe],
})
export class CtaComponent {
	readonly content = input.required<CtaContent>();

	readonly layout = input<CtaLayout>('banner');

	readonly _sectionClass = computed(() => ({
		cta: true,
		[`cta--${this.layout()}`]: true,
	}));
}
