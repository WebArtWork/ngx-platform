import { inject, Injectable } from '@angular/core';
import { CrudService } from 'wacom';
import { Phrase } from '../interfaces/phrase.interface';
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

	translate(text: string, reset?: (translate: string) => void) {
		if (!text) return '';

		this._resets[text] ||= [];

		if (reset) {
			this._resets[text].push(reset);
		}

		if (!this._phrases[text]) {
			this._phraseService.create({ text });

			return text;
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

		return text;
	}

	private _resets: Record<string, ((translate: string) => void)[]> = {};

	private _phraseService = inject(PhraseService);

	private _phrases: Record<string, Phrase[]> = {};
}
