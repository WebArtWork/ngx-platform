import { ProductActionVariant } from './product.types';

export interface ProductGalleryItem {
	src?: string;
	alt?: string;
}

export interface ProductAction {
	label?: string;
	href?: string;
	icon?: string;
	variant?: ProductActionVariant;
}

export interface ProductSpec {
	label?: string;
	value?: string;
}

export interface ProductContent {
	sectionId?: string;
	name?: string;
	description?: string;
	price?: string;
	gallery?: ProductGalleryItem[];
	specs?: ProductSpec[];
	actions?: ProductAction[];
}
