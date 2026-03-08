export interface ProductsItem {
	name?: string;
	description?: string;
	image?: string;
	price?: string;
	tag?: string;
	href?: string;
}

export interface ProductsContent {
	sectionId?: string;
	title?: string;
	description?: string;
	items?: ProductsItem[];
}
