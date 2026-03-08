import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TranslatePipe } from 'wacom';
import { MarketingContent } from './marketing.interfaces';
import { MarketingLayout } from './marketing.types';

@Component({
	selector: 'page-component-marketing',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './marketing.component.html',
	styleUrl: './marketing.component.scss',
	imports: [NgClass, TranslatePipe],
})
export class MarketingComponent {
	readonly content = input.required<MarketingContent>();

	readonly layout = input<MarketingLayout>('banner');

	readonly _sectionClass = computed(() => ({
		marketing: true,
		[`marketing--${this.layout()}`]: true,
	}));
}
