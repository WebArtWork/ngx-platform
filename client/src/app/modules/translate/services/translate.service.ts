import { inject, Injectable } from '@angular/core';
import { CrudService } from 'wacom';
import { Translate } from '../interfaces/translate.interface';
import { PhraseService } from './phrase.service';

@Injectable({
	providedIn: 'root',
})
export class TranslateService extends CrudService<Translate> {
	constructor() {
		super({
			name: 'translate',
		});

		this._phraseService.filteredDocuments(this._phrases, {
			field: 'name',
			filtered: () => {
				console.log('translate', this._phrases);
			},
		});
	}

	translate(wordName: string, reset?: (translate: string) => void) {
		if (!wordName) return '';

		this._resets[wordName] ||= [];

		if (reset) {
			this._resets[wordName].push(reset);
		}

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

		return wordName;
	}

	private _resets: Record<string, ((translate: string) => void)[]> = {};

	private _phraseService = inject(PhraseService);

	private _phrases = {};
}
