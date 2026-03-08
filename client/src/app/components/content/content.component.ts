import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TranslatePipe } from 'wacom';
import { ContentSectionContent } from './content.interfaces';
import { ContentLayout } from './content.types';

@Component({
	selector: 'page-component-content',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './content.component.html',
	styleUrl: './content.component.scss',
	imports: [NgClass, TranslatePipe],
})
export class ContentComponent {
	readonly content = input.required<ContentSectionContent>();

	readonly layout = input<ContentLayout>('stack');

	readonly _sectionClass = computed(() => ({
		content: true,
		[`content--${this.layout()}`]: true,
	}));
}
