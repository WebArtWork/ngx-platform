import {
	ApplicationRef,
	createComponent,
	effect,
	EnvironmentInjector,
	inject,
	Injectable,
	runInInjectionContext,
	signal,
	TemplateRef,
	Type,
} from '@angular/core';
import { FORM_COMPONENTS } from 'src/app/app.formcomponents';
import { TranslateService } from 'src/app/modules/translate/services/translate.service';
import { environment } from 'src/environments/environment';
import { EmitterService, Modal, ModalService, StoreService } from 'wacom';

import { FormComponentInterface } from '../interfaces/component.interface';
import { FormInterface } from '../interfaces/form.interface';
import { ModalFormComponent } from '../modals/modal-form/modal-form.component';
import { ModalUniqueComponent } from '../modals/modal-unique/modal-unique.component';

// Virtual manager (new)
import {
	required,
	VirtualFormFieldValue,
	VirtualFormService,
} from 'src/app/virtual-form.service';

export interface FormModalButton {
	click: (submition: unknown, close: () => void) => void;
	label: string;
	class?: string;
}

@Injectable({ providedIn: 'root' })
export class FormService {
	private _translate = inject(TranslateService);
	private appRef = inject(ApplicationRef);
	private _modal = inject(ModalService);
	private _store = inject(StoreService);
	private _emitterService = inject(EmitterService);

	// Virtual manager
	private _vform = inject(VirtualFormService);

	// Injection context for reactive translate effects
	private _ei = inject(EnvironmentInjector);

	/** Application ID from the environment configuration */
	readonly appId = (environment as unknown as { appId: string }).appId;

	constructor() {
		// restore known form IDs
		this._store.getJson('formIds', (formIds: unknown) => {
			if (Array.isArray(formIds)) this.formIds.push(...formIds);
		});
	}

	/* --------------------------------------------------------------------------------------
	   Template registry (name -> <ng-template>) + reactive bump.
	   -------------------------------------------------------------------------------------- */
	private _templateComponent = new Map<string, TemplateRef<unknown>>();
	/** Bumps whenever a template is registered/unregistered to notify listeners */
	readonly templatesVersion = signal(0);

	addTemplateComponent<T>(name: string, template: TemplateRef<T>): void {
		if (!this._templateComponent.has(name)) {
			this._templateComponent.set(
				name,
				template as unknown as TemplateRef<unknown>,
			);
			this.templatesVersion.update((v) => v + 1);
		}
	}

	removeTemplateComponent(name: string): void {
		if (this._templateComponent.delete(name)) {
			this.templatesVersion.update((v) => v + 1);
		}
	}

	getTemplateComponent(name: string): TemplateRef<unknown> | null {
		return this._templateComponent.get(name) ?? null;
	}

	getTemplateComponentsNames(): string[] {
		return Array.from(this._templateComponent.keys());
	}

	/* --------------------------------------------------------------------------------------
	   (Legacy helper API) “template fields” – kept for compatibility with older code paths.
	   With the new schema, prefer component.props over fields[].
	   -------------------------------------------------------------------------------------- */
	templateFields: Record<string, string[]> = {};
	customTemplateFields: Record<string, Record<string, string>> = {};

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

	getCustomTemplateFields(name: string): Record<string, string> {
		return this.customTemplateFields[name] || {};
	}

	/* --------------------------------------------------------------------------------------
	   Translation helpers (updated to props-first, recursive, string-only).
	   -------------------------------------------------------------------------------------- */
	translateForm(form: FormInterface): void {
		if (form.title) {
			const titleSig = this._translate.translate(`${form.title}`);
			runInInjectionContext(this._ei, () =>
				effect(() => (form.title = titleSig())),
			);
		}
		this._translateComponents(form.components);
	}

	private _translateComponents(list: FormComponentInterface[] = []) {
		for (const c of list) {
			if (c.props) {
				for (const [k, v] of Object.entries(c.props)) {
					if (typeof v === 'string') {
						const ts = this._translate.translate(`${v}`);
						runInInjectionContext(this._ei, () =>
							effect(() => (c.props![k] = ts())),
						);
					} else if (Array.isArray(v)) {
						const arr = v as unknown[];
						arr.forEach((item, i) => {
							if (typeof item === 'string') {
								const ts = this._translate.translate(`${item}`);
								runInInjectionContext(this._ei, () =>
									effect(() => ((arr[i] as any) = ts())),
								);
							}
						});
					}
				}
			}
			if (Array.isArray(c.components) && c.components.length) {
				this._translateComponents(c.components);
			}
		}
	}

	/* --------------------------------------------------------------------------------------
	   Public state
	   -------------------------------------------------------------------------------------- */
	forms: FormInterface[] = [];
	formIds: string[] = [];

	/* --------------------------------------------------------------------------------------
	   Defaults / builders (now using props instead of fields)
	   -------------------------------------------------------------------------------------- */
	getDefaultForm(
		formId: string,
		keys = ['name', 'description'],
	): FormInterface {
		this._rememberFormId(formId);

		const components: FormComponentInterface[] = keys.map((fullKey, i) => {
			const base = fullKey.includes('.') ? fullKey.split('.')[1] : 'Text';
			const label = (fullKey.split('.')[0] || fullKey).replace(
				/\[\]|\[\d+\]/g,
				'',
			);

			return {
				name: base,
				key: fullKey,
				focused: i === 0,
				props: {
					Placeholder: `Enter your ${label}`,
					Label: label.charAt(0).toUpperCase() + label.slice(1),
				},
			};
		});

		return { formId, components };
	}

	prepareForm(form: FormInterface): FormInterface {
		const formId = `${form.formId ?? ''}`;
		this._rememberFormId(formId);

		form = form || this.getDefaultForm(formId);
		form.formId = formId;

		this._emitterService.onComplete('form_loaded').subscribe(() => {
			this.translateForm(form);
			this._addFormComponents(form.components);
			this.ensureVirtualForm(form);
		});

		this.translateForm(form);
		this._addFormComponents(form.components);
		this.ensureVirtualForm(form);

		return form;
	}

	private _registeredFields = new Map<string, Set<string>>(); // formId -> keys

	ensureVirtualForm(
		form: FormInterface,
		initial?: Record<string, any>,
	): void {
		const id = (form.formId as string) || crypto.randomUUID();
		this._vform.getForm(id);

		if (!this._registeredFields.has(id))
			this._registeredFields.set(id, new Set());
		const registered = this._registeredFields.get(id)!;

		const walk = (nodes: FormComponentInterface[] = []) => {
			for (const n of nodes) {
				if (n.components?.length) {
					walk(n.components);
					continue;
				}
				if (!n.key) continue;

				if (registered.has(n.key)) continue; // idempotent guard

				const init: VirtualFormFieldValue =
					(initial || {})[n.key] ?? null;

				const composed = [
					n.props && (n.props as any).Required ? required() : null,
					...(n.validators || []),
				].filter(Boolean);

				this._vform.registerField(id, n.key, init, composed as any);
				registered.add(n.key);
			}
		};
		walk(form.components);

		if (initial && Object.keys(initial).length) {
			this._vform.patch(id, initial);
		}
	}

	/* --------------------------------------------------------------------------------------
	   Modal helpers (wire virtual manager automatically)
	   -------------------------------------------------------------------------------------- */

	modal<T>(
		form: FormInterface | FormInterface[],
		buttons: FormModalButton | FormModalButton[] = [],
		submition: unknown = { data: {} },
		change: (update: T) => void | Promise<(update: T) => void> = (
			_u: T,
		): void => {},
		modalOptions: unknown = {},
	): Promise<T> {
		const forms = Array.isArray(form) ? form : [form];
		forms.forEach((f) => this.ensureVirtualForm(f, submition as any));

		return new Promise((resolve) => {
			this._modal.show({
				...(modalOptions as Modal),
				component: ModalFormComponent,
				class: 'forms_modal',
				size: 'big',
				form,
				modalButtons: Array.isArray(buttons) ? buttons : [buttons],
				submition,
				onClose: () => resolve(submition as T),
				submit: (update: T) => resolve(update),
				change: (update: T) => {
					if (typeof change === 'function') change(update);
				},
			});
		});
	}

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
							props: { Placeholder: 'fill content of documents' },
						},
					],
				},
				onClose: () => {
					const out: T[] = submition.docs
						? JSON.parse(submition.docs)
						: [];
					resolve(out);
				},
				submit: () => {
					const out: T[] = submition.docs
						? JSON.parse(submition.docs)
						: [];
					resolve(out);
				},
			});
		});
	}

	modalUnique<T>(
		module: string,
		field: string,
		doc: T,
		component: string = '',
		onClose: () => void | Promise<() => void> = (): void => {},
	): void {
		const form = this.getDefaultForm('unique', [
			field + (component ? '.' + component : ''),
		]);
		this.ensureVirtualForm(form, doc as any);

		this._modal.show({
			component: ModalUniqueComponent,
			form,
			module,
			field,
			doc,
			class: 'forms_modal',
			onClose,
		});
	}

	/* --------------------------------------------------------------------------------------
	   Schema utilities (updated to props)
	   -------------------------------------------------------------------------------------- */

	getComponent(form: FormInterface, key: string): FormComponentInterface {
		return this._getComponent(form.components, key) || ({} as any);
	}

	getProp<T = unknown>(
		form: FormInterface,
		key: string,
		prop: string,
	): T | null {
		const comp = this.getComponent(form, key);
		return (comp?.props?.[prop] as T) ?? null;
	}

	setProp(
		form: FormInterface,
		key: string,
		prop: string,
		value: unknown,
	): void {
		const comp = this.getComponent(form, key);
		if (!comp) return;

		comp.props = comp.props || {};
		comp.props[prop] = value;
	}

	private _getComponent(
		components: FormComponentInterface[] = [],
		key: string,
	): FormComponentInterface | null {
		for (const component of components || []) {
			if (component.key === key) return component;
			if (component.components?.length) {
				const found = this._getComponent(component.components, key);
				if (found) return found;
			}
		}
		return null;
	}

	/* --------------------------------------------------------------------------------------
	   Internal helpers
	   -------------------------------------------------------------------------------------- */

	private _addedFormComponent: Record<string, boolean> = {};

	private async _addFormComponents(components: FormComponentInterface[]) {
		for (const c of components || []) {
			if (c.name) await this._addFormComponent(c.name);
			if (c.components?.length)
				await this._addFormComponents(c.components);
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

	private _rememberFormId(formId: string) {
		if (!formId) return;
		if (!this.formIds.includes(formId)) {
			this.formIds.push(formId);
			this._store.setJson('formIds', this.formIds);
		}
	}
}
