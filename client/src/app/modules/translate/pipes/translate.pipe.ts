import { Pipe, PipeTransform, inject } from '@angular/core';
import { TranslateService } from '../services/translate.service';

@Pipe({ name: 'translate' })
export class TranslatePipe implements PipeTransform {
	/**
	 * Transforms the given slug into its corresponding translated string.
	 * @param slug - The translation key to be translated.
	 * @returns The translated Signal<string>.
	 */
	transform(slug: string) {
		return this._translateService.translate(slug);
	}

	private _translateService = inject(TranslateService);
}
