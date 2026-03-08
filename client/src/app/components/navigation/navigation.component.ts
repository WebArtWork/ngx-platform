import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TranslatePipe } from 'wacom';
import { NavigationContent } from './navigation.interfaces';
import { NavigationLayout } from './navigation.types';

@Component({
	selector: 'page-component-navigation',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './navigation.component.html',
	styleUrl: './navigation.component.scss',
	imports: [NgClass, TranslatePipe],
})
export class NavigationComponent {
	readonly content = input.required<NavigationContent>();

	readonly layout = input<NavigationLayout>('topbar');

	readonly _sectionClass = computed(() => ({
		navigation: true,
		[`navigation--${this.layout()}`]: true,
	}));
}
