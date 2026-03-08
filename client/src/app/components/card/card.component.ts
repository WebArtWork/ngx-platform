import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TranslatePipe } from 'wacom';
import { CardContent } from './card.interfaces';
import { CardLayout } from './card.types';

@Component({
	selector: 'page-component-card',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './card.component.html',
	styleUrl: './card.component.scss',
	imports: [NgClass, TranslatePipe],
})
export class CardComponent {
	readonly content = input.required<CardContent>();

	readonly layout = input<CardLayout>('default');

	readonly _sectionClass = computed(() => ({
		card: true,
		[`card--${this.layout()}`]: true,
	}));
}
