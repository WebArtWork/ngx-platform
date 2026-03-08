import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TranslatePipe } from 'wacom';
import { ProductContent } from './product.interfaces';
import { ProductLayout } from './product.types';

@Component({
	selector: 'page-component-product',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './product.component.html',
	styleUrl: './product.component.scss',
	imports: [NgClass, TranslatePipe],
})
export class ProductComponent {
	readonly content = input.required<ProductContent>();

	readonly layout = input<ProductLayout>('detail');

	readonly _sectionClass = computed(() => ({
		product: true,
		[`product--${this.layout()}`]: true,
	}));
}
