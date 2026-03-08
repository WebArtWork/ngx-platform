import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TranslatePipe } from 'wacom';
import { ArticlesContent } from './articles.interfaces';
import { ArticlesLayout } from './articles.types';

@Component({
	selector: 'page-component-articles',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './articles.component.html',
	styleUrl: './articles.component.scss',
	imports: [NgClass, TranslatePipe],
})
export class ArticlesComponent {
	readonly content = input.required<ArticlesContent>();

	readonly layout = input<ArticlesLayout>('grid');

	readonly _sectionClass = computed(() => ({
		articles: true,
		[`articles--${this.layout()}`]: true,
	}));
}
