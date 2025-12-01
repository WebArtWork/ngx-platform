import { Injectable } from '@angular/core';
import { environment } from '@env';
import { CrudService } from 'wacom';
import { Formcomponent } from '../interfaces/component.interface';

@Injectable({ providedIn: 'root' })
export class FormcomponentService extends CrudService<Formcomponent> {
	constructor() {
		super({
			name: 'formcomponent',
		});

		this.get({
			query: 'appId=' + environment.appId,
		});
	}
}
