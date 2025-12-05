import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { form } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { environment } from '@env';
import { formForm } from '@lib/form/forms/form.form';
import { TableComponent } from '@lib/table';
import { Phrase } from '@module/translate';
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
	private _router = inject(Router);

	readonly formId = this._router.url.split('form/')[1];

	protected override configType: 'server' | 'local' = 'local';

	protected override preCreate(doc: Formcomponent) {
		doc.formId = this.formId;

		doc.appId = environment.appId;
	}

	protected override localDocumentsFilter = (doc: Formcomponent) => {
		return doc.formId === this.formId;
	};

	protected override allowUrl() {
		return false;
	}

	/** Basic columns for clients table */
	columns = ['name', 'key'];

	/** wtable config built by CrudComponent, aware of server mode */
	config = this.getConfig();

	constructor(
		_formcomponentService: FormcomponentService,
		_formService: FormService,
	) {
		super(formcomponentForm, _formService, _formcomponentService, 'user');

		_formcomponentService.loaded.subscribe(() => {
			this.setDocuments();
		});

		this.config.buttons.unshift({
			icon: 'settings',
			click: () => {
				_formService.modal<Phrase>(
					formForm,
					{
						label: 'Update',
						click: async (updated: unknown, close: () => void) => {
							close();

							// if (form._id) {
							// 	_formService.update(updated as Form);
							// } else {
							// 	_formService.create({
							// 		...(updated as Form),
							// 		appId: environment.appId,
							// 	});
							// }
						},
					},
					form,
				);
			},
		});
	}
}
