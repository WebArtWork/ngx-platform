import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env';
import { TableComponent } from '@lib/table';
import { CrudComponent } from 'wacom';
import { formcomponentForm } from '../../forms/formcomponent.form';
import { Formcomponent } from '../../interfaces/component.interface';
import { FormInterface } from '../../interfaces/form.interface';
import { FormService } from '../../services/form.service';
import { FormcomponentService } from '../../services/formcomponent.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [TableComponent],
	templateUrl: './form.component.html',
})
export class FormComponent extends CrudComponent<
	FormcomponentService,
	Formcomponent,
	FormInterface
> {
	protected override configType: 'server' | 'local' = 'local';

	protected override preCreate(doc: Formcomponent): void {
		doc.formId = this._router.url.split('form/')[1];

		doc.appId = environment.appId;
	}

	private _router = inject(Router);

	/** Basic columns for clients table */
	columns = ['name', 'key'];

	/** wtable config built by CrudComponent, aware of server mode */
	config = this.getConfig();

	constructor(
		_formcomponentService: FormcomponentService,
		_formService: FormService,
	) {
		// 'user' docType reuses existing user form components
		super(formcomponentForm, _formService, _formcomponentService, 'user');

		// fetch first page from server using CrudComponent logic
		this.setDocuments();
	}
}
