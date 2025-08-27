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

	translate(phraseName: string, reset?: (translate: string) => void) {
		if (!phraseName) return '';

		this._resets[phraseName] ||= [];

		if (reset) {
			this._resets[phraseName].push(reset);
		}

		if (!this._phrases[phraseName]) {
			console.log('create ', phraseName);

			this._phraseService.create({ text: phraseName });
		}

		this._phrases[phraseName] ||= [{} as Phrase];

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

		return phraseName;
	}

	private _resets: Record<string, ((translate: string) => void)[]> = {};

	private _phraseService = inject(PhraseService);

	private _phrases: Record<string, Phrase[]> = {};
}
