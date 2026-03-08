import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TranslatePipe } from 'wacom';
import { TeamContent } from './team.interfaces';
import { TeamLayout } from './team.types';

@Component({
	selector: 'page-component-team',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './team.component.html',
	styleUrl: './team.component.scss',
	imports: [NgClass, TranslatePipe],
})
export class TeamComponent {
	readonly content = input.required<TeamContent>();

	readonly layout = input<TeamLayout>('grid');

	readonly _sectionClass = computed(() => ({
		team: true,
		[`team--${this.layout()}`]: true,
	}));
}
