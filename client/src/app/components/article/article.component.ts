import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TranslatePipe } from 'wacom';
import { ArticleContent } from './article.interfaces';
import { ArticleLayout } from './article.types';

@Component({
	selector: 'page-component-article',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './article.component.html',
	styleUrl: './article.component.scss',
	imports: [NgClass, TranslatePipe],
})
export class ArticleComponent {
	readonly content = input.required<ArticleContent>();

	readonly layout = input<ArticleLayout>('default');

	readonly _sectionClass = computed(() => ({
		article: true,
		[`article--${this.layout()}`]: true,
	}));
}
