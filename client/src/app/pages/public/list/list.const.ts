import { Item } from './list.interface';

export const items: Item[] = Array.from({ length: 12 }).map((_, idx) => ({
	name: `Product ${idx + 1}`,
	price: 9 + idx * 3,
	image: '/assets/default.png',
}));
