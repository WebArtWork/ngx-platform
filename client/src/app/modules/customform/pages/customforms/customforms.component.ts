import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormComponentInterface } from 'src/app/libs/form/interfaces/component.interface';
import { FormInterface } from 'src/app/libs/form/interfaces/form.interface';
import { FormService } from 'src/app/libs/form/services/form.service';
import { TranslateService } from 'src/app/libs/translate/translate.service';
import { AlertService } from 'wacom';
import { TableComponent } from '../../../../libs/table/table.component';
import { CellDirective } from '../../../../libs/table/table.directive';
import {
	Customform,
	CustomformService
} from '../../services/customform.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [TableComponent, CellDirective, FormsModule],
	templateUrl: './customforms.component.html'
})
export class CustomformsComponent {
	private _translate = inject(TranslateService);
	private _customformService = inject(CustomformService);
	private _alert = inject(AlertService);
	private _form = inject(FormService);

	columns = ['formId', 'components', 'active'];

	form: FormInterface = this._form.prepareForm({
		formId: 'customForm',
		title: 'Custom form',
		components: [
			{
				name: 'Text',
				key: 'title',
				focused: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'Enter title ...'
					},
					{
						name: 'Label',
						value: 'Title'
					}
				]
			},
			{
				name: 'Select',
				key: 'formId',
				fields: [
					{
						name: 'Placeholder',
						value: 'Select form id ...'
					},
					{
						name: 'Label',
						value: 'Form ID'
					},
					{
						name: 'Items',
						value: this._form.formIds
					}
				]
			}
		]
	});

	components: FormComponentInterface[] = [];

	formComponents: FormInterface = this._form.getForm('formComponents', {
		formId: 'formComponents',
		title: 'Custom components',
		components: [
			{
				components: this.components
			},
			{
				name: 'Select',
				key: 'addComponent',
				fields: [
					{
						name: 'Placeholder',
						value: 'Select form componnet ...'
					},
					{
						name: 'Label',
						value: 'Form Component'
					},
					{
						name: 'Value',
						value: 'name',
						skipTranslation: true
					},
					{
						name: 'Items',
						value: this._form.getTemplateComponentsNames()
					}
				]
			}
		]
	});

	config = {
		create: (): void => {
			this._form.modal<Customform>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					if (this._customformService.appId) {
						(created as Customform).appId =
							this._customformService.appId;
					}

					this._customformService.create(created as Customform, {
						callback: close.bind(this)
					});
				}
			});
		},
		update: (form: Customform): void => {
			this._form
				.modal<Customform>(
					this.form,
					{
						label: 'Update',
						click: (updated: unknown, close: () => void) => {
							this._customformService.update(
								updated as Customform,
								{
									callback: close.bind(this)
								}
							);
						}
					},
					form
				)
				.then(this._customformService.update.bind(this));
		},
		delete: (form: Customform): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this user?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: (): void => {
							this._customformService.delete(form);
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'text_fields',
				click: (doc: Customform): void => {
					console.log(this.formComponents);

					this.components.splice(0, this.components.length);

					const submition: Record<string, unknown> = {
						addComponent: 'Text'
					};

					doc.components = doc.components || [];

					for (let i = doc.components.length - 1; i >= 0; i--) {
						const fields = this._form.getTemplateFields(
							doc.components[i].name
						);

						doc.components[i].fields = doc.components[
							i
						].fields.filter((f) => fields.includes(f.name));

						for (const name of fields) {
							if (
								!doc.components[i].fields.find(
									(f) => f.name === name
								)
							) {
								doc.components[i].fields.push({
									value: '',
									name
								});
							}
						}

						submition['key' + i] = doc.components[i].key as string;

						for (const field of doc.components[i].fields) {
							submition[field.name + i] = field.value;
						}
					}

					const remove = (i: number): void => {
						this.components.splice(i, 1);

						doc.components.splice(i, 1);

						this._customformService.updateAfterWhile(doc);
					};

					(doc.components || []).forEach((component) => {
						this.components.push(
							this._addCustomComponent(
								component.name,
								this.components.length,
								remove
							)
						);
					});

					this._form
						.modal<Customform>(
							this.formComponents,
							{
								label: 'Add component',
								click: (): void => {
									const component: string = submition[
										'addComponent'
									] as string;

									this.components.push(
										this._addCustomComponent(
											component,
											this.components.length,
											remove
										)
									);

									doc.components.push({
										name: submition[
											'addComponent'
										] as string,
										fields: this._form
											.getTemplateFields(component)
											.map((name) => {
												return {
													value: '',
													name
												};
											})
									});
								}
							},
							submition,
							() => {},
							{ size: 'big' }
						)
						.then(() => {
							for (let i = 0; i < doc.components.length; i++) {
								doc.components[i].key = submition[
									'key' + i
								] as string;

								for (const field of doc.components[i].fields) {
									field.value = submition[
										field.name + i
									] as string;
								}
							}

							this._customformService.updateAfterWhile(doc);
						});
				}
			}
		]
	};

	get rows(): FormInterface[] {
		return this._customformService.customforms;
	}

	private _addCustomComponent(
		component: string,
		index: number,
		remove: (i: number) => void
	): FormComponentInterface {
		const templateFields = this._form
			.getTemplateFields(component)
			.map((f) => {
				return {
					name:
						this._form.getCustomTemplateFields(component)[f] ||
						'Text',
					key: f + index,
					fields: [
						{
							name: 'Placeholder',
							value: 'fill ' + f
						},
						{
							name: 'Label',
							value:
								f.charAt(0).toUpperCase() + f.slice(1, f.length)
						}
					]
				};
			});

		const components = [
			{
				name: 'Text',
				key: 'key' + index,
				fields: [
					{
						name: 'Placeholder',
						value: 'Enter key ...'
					},
					{
						name: 'Label',
						value: 'Key'
					}
				]
			},
			...templateFields,
			{
				name: 'Button',
				fields: [
					{
						name: 'Label',
						value: 'Remove'
					},
					{
						name: 'Click',
						value: (): void => {
							remove(index);
						}
					}
				]
			}
		];

		return {
			class: 'd-f mt10',
			components
		};
	}

	changeStatus(form: Customform): void {
		setTimeout(() => {
			if (form.active) {
				for (const customForm of this._customformService.customforms) {
					if (
						customForm._id === form._id ||
						customForm.formId !== form.formId
					)
						continue;

					if (customForm.active) {
						customForm.active = false;

						this._customformService.updateAfterWhile(customForm);
					}
				}
			}

			this._customformService.updateAfterWhile(form);
		});
	}
}
