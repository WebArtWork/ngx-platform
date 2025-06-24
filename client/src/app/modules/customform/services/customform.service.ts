import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CoreService, CrudService, CrudDocument } from 'wacom';

export interface CustomformcomponnetfieldInterface {
	name: string;
	value: string;
}

export interface CustomformcomponnetInterface {
	name: string;
	fields: CustomformcomponnetfieldInterface[];
	key?: string;
	components?: CustomformcomponnetInterface[];
	root?: boolean;
}

export interface Customform extends CrudDocument {
	name: string;
	class: string;
	fields: CustomformcomponnetfieldInterface[];
	components: CustomformcomponnetInterface[];
	key?: string;
	active?: boolean;
	formId?: string;
}

@Injectable({
	providedIn: 'root'
})
export class CustomformService extends CrudService<Customform> {
	private _core = inject(CoreService);

	readonly appId = (environment as unknown as { appId: string }).appId;

	customforms: Customform[] = [];

	/** Inserted by Angular inject() migration for backwards compatibility */
	constructor(...args: unknown[]);

	constructor() {
		super({
			name: 'form'
		});

		this.get({
			query: this.appId ? 'appId=' + this.appId : ''
		}).subscribe((customforms: Customform[]) =>
			this.customforms.push(...customforms)
		);

		this._core
			.on('customform_create')
			.subscribe((customform: Customform) => {
				this.customforms.push(customform);
			});

		this._core
			.on('customform_delete')
			.subscribe((customform: Customform) => {
				this.customforms.splice(
					this.customforms.findIndex((o) => o._id === customform._id),
					1
				);
			});
	}
}
