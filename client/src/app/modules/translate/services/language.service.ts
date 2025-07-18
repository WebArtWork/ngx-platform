import { Injectable } from '@angular/core';
import { CrudService } from 'wacom';
import { Language } from '../interfaces/language.interface';

@Injectable({
	providedIn: 'root'
})
export class LanguageService extends CrudService<Language> {
	constructor() {
		super({
			name: 'translatelanguage'
		});
	}
}
