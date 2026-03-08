import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TranslatePipe } from 'wacom';
import { TablesContent } from './tables.interfaces';
import { TablesLayout } from './tables.types';

@Component({
	selector: 'page-component-tables',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './tables.component.html',
	styleUrl: './tables.component.scss',
	imports: [NgClass, TranslatePipe],
})
export class TablesComponent {
	readonly content = input.required<TablesContent>();

	readonly layout = input<TablesLayout>('default');

	readonly _sectionClass = computed(() => ({
		tables: true,
		[`tables--${this.layout()}`]: true,
	}));
}
