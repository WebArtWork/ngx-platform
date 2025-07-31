import { Injectable } from '@angular/core';
import { CrudService } from 'wacom';
import { Translate } from '../interfaces/translate.interface';

@Injectable({
	providedIn: 'root'
})
export class TranslateService extends CrudService<Translate> {
	constructor() {
		super({
			name: 'translate'
		});
	}

	/**
	 * Translates a slug into its corresponding string for the current language.
	 * @param slug - The translation key.
	 * @param reset - Optional reset callback to handle dynamic updates.
	 * @returns The translated string.
	 */
	translate(slug: string, reset?: (translate: string) => void) {
		// if (!slug) return '';

		// if (slug.split('.').length < 2) return slug;

		// if (!this.resets[slug]) this.resets[slug] = [];

		// if (reset) {
		// 	this.resets[slug].push(reset);
		// }

		// if (!this.translates[this.language.code]) {
		// 	this.translates[this.language.code] = {};
		// }

		// if (this.translates[this.language.code][slug]) {
		// 	return this.translates[this.language.code][slug];
		// }

		// if (
		// 	this.words
		// 		.map((w) => w?.slug || '')
		// 		.filter((w) => !!w)
		// 		.indexOf(slug) < 0
		// ) {
		// 	this.createWord(slug);
		// }

		return '';
	}
}
