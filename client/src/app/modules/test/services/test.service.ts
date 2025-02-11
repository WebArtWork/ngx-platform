import { Injectable } from '@angular/core';
import { Test } from '../interfaces/test.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root',
})
export class TestService extends CrudService<Test> {
	tests: Test[] = this.getDocs();

	testsByAuthor: Record<string, Test[]> = {};

	constructor() {
		super({
			name: 'test',
		});

		this.get();

		this.filteredDocuments(this.testsByAuthor);
	}
}
