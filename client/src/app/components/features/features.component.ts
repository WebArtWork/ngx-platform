import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TranslatePipe } from 'wacom';
import { FeaturesContent } from './features.interfaces';
import { FeaturesLayout } from './features.types';

@Component({
	selector: 'page-component-features',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './features.component.html',
	styleUrl: './features.component.scss',
	imports: [NgClass, TranslatePipe],
})
export class FeaturesComponent {
	readonly content = input.required<FeaturesContent>();

	readonly layout = input<FeaturesLayout>('grid');

	readonly _sectionClass = computed(() => ({
		features: true,
		[`features--${this.layout()}`]: true,
	}));
}
