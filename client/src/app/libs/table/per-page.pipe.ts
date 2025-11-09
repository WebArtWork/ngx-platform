import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'perPage', standalone: true })
export class PerPagePipe implements PipeTransform {
	transform(arr: any[], config: any, sort: any, _reload?: string): any[] {
		if (!Array.isArray(arr)) return [];
		if (config.perPage === -1) return arr;

		const copy = arr.slice().map((it, i) => ({ ...it, num: i + 1 }));

		if (sort?.direction) {
			copy.sort((a: any, b: any) => {
				if (a[sort.title] < b[sort.title])
					return sort.direction === 'desc' ? 1 : -1;
				if (a[sort.title] > b[sort.title])
					return sort.direction === 'desc' ? -1 : 1;
				return 0;
			});
		}

		return copy.slice(
			(config.page - 1) * config.perPage,
			config.page * config.perPage,
		);
	}
}
