import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TranslatePipe } from 'wacom';
import { UtilityContent } from './utility.interfaces';
import { UtilityLayout } from './utility.types';

@Component({
	selector: 'page-component-utility',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './utility.component.html',
	styleUrl: './utility.component.scss',
	imports: [NgClass, TranslatePipe],
})
export class UtilityComponent {
	readonly content = input.required<UtilityContent>();

	readonly layout = input<UtilityLayout>('empty');

	readonly _sectionClass = computed(() => ({
		utility: true,
		[`utility--${this.layout()}`]: true,
	}));
}
