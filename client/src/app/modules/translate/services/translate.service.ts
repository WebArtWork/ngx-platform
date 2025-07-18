import { Injectable } from '@angular/core';
import { CrudService } from 'wacom';
import { Translate } from '../interfaces/translate.interface';

@Injectable({
	providedIn: 'root',
})
export class TranslateService extends CrudService<Translate> {
	constructor() {
		super({
			name: 'translate',
		});
	}
}
