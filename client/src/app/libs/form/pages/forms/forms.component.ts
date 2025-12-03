import {
	ChangeDetectionStrategy,
	Component,
	effect,
	inject,
	signal,
} from '@angular/core';
import { environment } from '@env';
import { formForm } from '@lib/form/forms/form.form';
import { Phrase } from '@module/translate';
import { TableComponent } from '../../../../libs/table/table.component';
import { Form } from '../../interfaces/form.interface';
import { FormService } from '../../services/form.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [TableComponent],
	templateUrl: './forms.component.html',
})
export class FormsComponent {
	private _formService = inject(FormService);

	columns: string[] = ['formId', 'title'];

	config = {
		buttons: [
			{
				icon: 'edit',
				click: (form: Form) => {
					this._formService.modal<Phrase>(
						formForm,
						{
							label: 'Update',
							click: async (
								updated: unknown,
								close: () => void,
							) => {
								close();

								if (form._id) {
									this._formService
										.update(updated as Form)
										.subscribe(() => {
											// TODO this should be removed and managed by effect only from form service
											this._formService.formIds.set(
												this._formService.formIds(),
											);
										});
								} else {
									this._formService
										.create({
											...(updated as Form),
											appId: environment.appId,
										})
										.subscribe((created) => {
											// TODO this should be removed and managed by effect only from form service
											form._id = created._id;

											this._formService.formIds.set(
												this._formService.formIds(),
											);
										});
								}
							},
						},
						form,
					);
				},
			},
			{
				icon: 'build',
				hrefFunc: (form: Form) => {
					return '/admin/form/' + form.formId;
				},
			},
		],
	};

	documents = signal<Form[]>([]);

	constructor() {
		effect(() => {
			const docs = this._formService.getFieldSignals('formId');

			console.log(docs());

			this.documents.set(
				this._formService.formIds().map((formId) => {
					return {
						formId,
						...(this._formService.getDoc((doc: Form) => {
							return doc.formId === formId;
						}) || {}),
					} as Form;
				}),
			);
		});
	}
}
