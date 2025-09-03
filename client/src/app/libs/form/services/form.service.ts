import {
	ApplicationRef,
	Injectable,
	TemplateRef,
	Type,
	createComponent,
	inject,
} from '@angular/core';
import { FORM_COMPONENTS } from 'src/app/app.formcomponents';
import { TranslateService } from 'src/app/modules/translate/services/translate.service';
import { environment } from 'src/environments/environment';
import { EmitterService, Modal, ModalService, StoreService } from 'wacom';
import {
	FormComponentInterface,
	TemplateFieldInterface,
} from '../interfaces/component.interface';
import { FormInterface } from '../interfaces/form.interface';
import { ModalFormComponent } from '../modals/modal-form/modal-form.component';
import { ModalUniqueComponent } from '../modals/modal-unique/modal-unique.component';

export interface FormModalButton {
	click: (submition: unknown, close: () => void) => void;
	/** Label for the button */
	label: string;
	/** CSS class for the button (optional) */
	class?: string;
}

@Injectable({
	providedIn: 'root',
})
export class FormService {
	private _translate = inject(TranslateService);
	private appRef = inject(ApplicationRef);
	private _modal = inject(ModalService);
	private _store = inject(StoreService);

	/** Application ID from the environment configuration */
	readonly appId = (environment as unknown as { appId: string }).appId;

	constructor() {
		/** Load form IDs from the store */
		this._store.getJson('formIds', (formIds: unknown) => {
			if (Array.isArray(formIds)) {
				this.formIds.push(...formIds);
			}
		});
	}

	templateFields: Record<string, string[]> = {};

	getTemplateFields(name: string): string[] {
		return this.templateFields[name] || ['Placeholder', 'Label'];
	}

	setTemplateFields(
		name: string,
		fields: string[],
		customFields: Record<string, string> = {},
	): void {
		this.templateFields[name] = fields;

		this.customTemplateFields[name] = {
			...(this.customTemplateFields[name] || {}),
			...customFields,
		};
	}

	customTemplateFields: Record<string, Record<string, string>> = {};

	getCustomTemplateFields(name: string): Record<string, string> {
		return this.customTemplateFields[name] || {};
	}

	private _templateComponent: Record<string, TemplateRef<unknown>> = {};

	addTemplateComponent<T>(name: string, template: TemplateRef<T>): void {
		if (!this._templateComponent[name]) {
			this._templateComponent[name] = template;
		}
	}

	getTemplateComponent(name: string): TemplateRef<unknown> | undefined {
		return this._templateComponent[name];
	}

	getTemplateComponentsNames(): string[] {
		const names = [];

		for (const name in this._templateComponent) {
			names.push(name);
		}

		return names;
	}

	/** Translates the form title and its components' fields */
	translateForm(form: FormInterface): void {
		if (form.title) {
			form.title = this._translate.translate(
				`${form.title}`,
				(title: string) => {
					form.title = title;
				},
			);

			for (const component of form.components) {
				for (const field of component.fields || []) {
					this.translateFormComponent(field);
				}
			}
		}
	}

	/** Translates individual form components' fields */
	translateFormComponent(field: TemplateFieldInterface): void {
		const fieldValue = field.value;

		if (typeof fieldValue === 'string' && !field.skipTranslation) {
			field.value = this._translate.translate(
				`${fieldValue}`,
				(value: string) => {
					field.value = value;
				},
			);
		}
	}

	/** List of forms managed by the service */
	forms: FormInterface[] = [];

	/** List of form IDs managed by the service */
	formIds: string[] = [];

	/** Creates a default form with specified components */
	getDefaultForm(
		formIds: string,
		components = ['name', 'description'],
	): FormInterface {
		if (this.formIds.indexOf(formIds) === -1) {
			this.formIds.push(formIds);

			this._store.setJson('formIds', this.formIds);
		}

		const form = {
			formIds,
			components: components.map((key, index) => {
				const name = key.includes('.') ? key.split('.')[1] : 'Text';

				return {
					name,
					key,
					focused: !index,
					fields: [
						{
							name: 'Placeholder',
							value: 'Enter your ' + key.split('.')[0],
						},
						{
							name: 'Label',
							value: key.split('.')[0].capitalize(),
						},
					],
				};
			}),
		};

		return form;
	}

	/** Prepare form component */
	prepareForm(form: FormInterface): FormInterface {
		const formId = form.formId + '';

		if (this.formIds.indexOf(formId) === -1) {
			this.formIds.push(formId);

			this._store.setJson('formIds', this.formIds);
		}

		form = form || this.getDefaultForm(formId);

		form.formId = formId;

		this._emitterService.onComplete('form_loaded').subscribe(() => {
			// const customForms = this._cfs.customforms.filter(
			// 	(f) => f.active && f.formId === form.formId,
			// );

			// for (const customForm of customForms) {
			// 	form.title = form.title || customForm.name;

			// 	form.class = form.class || customForm.class;

			// 	for (const component of customForm.components) {
			// 		component.key = component.key?.startsWith('data.')
			// 			? component.key
			// 			: 'data.' + component.key;

			// 		form.components.push(component);
			// 	}
			// }

			this.translateForm(form);

			this._addFormComponents(form.components);
		});

		this._addFormComponents(form.components);

		return form;
	}

	getForm(formId: string, form?: FormInterface): FormInterface {
		console.warn('This function is deprecated');

		this.prepareForm(
			form ||
				this.forms.find((f) => f.formId === formId) ||
				this.getDefaultForm(formId),
		);

		return form as FormInterface;
	}

	/** Shows a modal form with specified options */
	modal<T>(
		form: FormInterface | FormInterface[],
		buttons: FormModalButton | FormModalButton[] = [],
		submition: unknown = { data: {} },
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		change: (update: T) => void | Promise<(update: T) => void> = (
			update: T,
		): void => {},
		modalOptions: unknown = {},
	): Promise<T> {
		return new Promise((resolve) => {
			this._modal.show({
				...(modalOptions as Modal),
				component: ModalFormComponent,
				class: 'forms_modal',
				size: 'big',
				form,
				modalButtons: Array.isArray(buttons) ? buttons : [buttons],
				submition,
				onClose: function () {
					resolve(submition as T);
				},
				submit: (update: T) => {
					resolve(update);
				},
				change: (update: T) => {
					if (typeof change === 'function') {
						change(update);
					}
				},
			});
		});
	}

	/** Shows a modal form with docs in ace editor */
	modalDocs<T>(docs: T[]): Promise<T[]> {
		return new Promise((resolve) => {
			const submition = {
				docs: JSON.stringify(docs.length ? docs : [], null, 4),
			};

			this._modal.show({
				component: ModalFormComponent,
				class: 'forms_modal',
				size: 'big',
				submition,
				form: {
					title: 'Modify content of documents',
					components: [
						{
							name: 'Code',
							key: 'docs',
							fields: [
								{
									name: 'Placeholder',
									value: 'fill content of documents',
								},
							],
						},
					],
				},
				onClose: function () {
					const docs: T[] = submition.docs
						? JSON.parse(submition.docs)
						: [];

					resolve(docs);
				},
				submit: () => {
					const docs: T[] = submition.docs
						? JSON.parse(submition.docs)
						: [];

					resolve(docs);
				},
			});
		});
	}

	/** Shows a modal with a unique component */
	modalUnique<T>(
		module: string,
		field: string,
		doc: T,
		component: string = '',
		onClose: () => void | Promise<() => void> = (): void => {},
	): void {
		this._modal.show({
			component: ModalUniqueComponent,
			form: this.getDefaultForm('unique', [
				field + (component ? '.' + component : ''),
			]),
			module,
			field,
			doc,
			class: 'forms_modal',
			onClose,
		});
	}

	getComponent(form: FormInterface, key: string): FormComponentInterface {
		return (
			this._getComponent(form.components, key) ||
			({} as FormComponentInterface)
		);
	}

	getField(
		form: FormInterface,
		key: string,
		name: string,
	): TemplateFieldInterface | null {
		const component = this.getComponent(form, key);

		if (!component) {
			return null;
		}

		for (const field of component?.fields || []) {
			if (field.name === name) {
				return field;
			}
		}

		return null;
	}

	setValue(
		form: FormInterface,
		key: string,
		name: string,
		value: unknown,
	): void {
		const field = this.getField(form, key, name);

		if (field) {
			field.value = value;

			const component = this.getComponent(form, key);

			component?.resetFields?.();
		}
	}

	private _emitterService = inject(EmitterService);

	private _getComponent(
		components: FormComponentInterface[],
		key: string,
	): FormComponentInterface | null {
		for (const component of components) {
			if (component.key === key) {
				return component;
			} else if (component.components) {
				const comp = this._getComponent(component.components, key);

				if (comp) {
					return comp;
				}
			}
		}

		return null;
	}

	private _addedFormComponent: Record<string, boolean> = {};

	private async _addFormComponents(components: FormComponentInterface[]) {
		for (const component of components) {
			if (component.name) this._addFormComponent(component.name);
		}
	}

	private async _addFormComponent(name: string) {
		const component = (FORM_COMPONENTS as Record<string, Type<any>>)[name];

		if (component && !this._addedFormComponent[name]) {
			this._addedFormComponent[name] = true;

			const compRef = createComponent(component, {
				environmentInjector: this.appRef.injector,
			});

			this.appRef.attachView(compRef.hostView);

			(compRef.hostView as any).detectChanges?.();
		}
	}
}
