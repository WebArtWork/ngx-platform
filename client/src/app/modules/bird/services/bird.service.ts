import { Injectable } from '@angular/core';
import { Bird } from '../interfaces/bird.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root',
})
export class BirdService extends CrudService<Bird> {
	constructor() {
		super({
			name: 'bird',
		});
	}
}
