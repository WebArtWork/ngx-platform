import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TranslatePipe } from 'wacom';
import { ProductsContent } from './products.interfaces';
import { ProductsLayout } from './products.types';

@Component({
	selector: 'page-component-products',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './products.component.html',
	styleUrl: './products.component.scss',
	imports: [NgClass, TranslatePipe],
})
export class ProductsComponent {
	readonly content = input.required<ProductsContent>();

	readonly layout = input<ProductsLayout>('grid');

	readonly _sectionClass = computed(() => ({
		products: true,
		[`products--${this.layout()}`]: true,
	}));
}
