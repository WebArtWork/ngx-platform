import { Component, inject } from '@angular/core';
import { HttpService } from 'wacom';
import { FormComponent } from '../../form.component';
import { FormInterface } from '../../interfaces/form.interface';

@Component({
	selector: 'app-modal-unique',
	templateUrl: './modal-unique.component.html',
	styleUrls: ['./modal-unique.component.scss'],
	imports: [FormComponent]
})
export class ModalUniqueComponent {
	private _http = inject(HttpService);
	form: FormInterface;
	module: string;
	field: string;
	name: string;
	// eslint-disable-next-line
	doc: any;
	get getDoc(): Record<string, unknown> {
		return this.doc as Record<string, unknown>;
	}
	change(): void {
		this._http
			.post(
				'/api/' + this.module + '/unique' + (this.field || ''),
				this.doc
			)
			.subscribe((resp: string) => {
				if (this.doc[this.field] !== resp) {
					this.doc[this.field] = resp;
				}
			});
	}
}
