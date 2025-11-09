// src/app/libs/form/form.service.ts
import { Injectable, WritableSignal, signal } from '@angular/core';

/** ---------- Types ---------- */
export type FormFieldValue =
	| null
	| string
	| number
	| boolean
	| string[]
	| number[]
	| boolean[];

export type ValidatorFn = (
	value: FormFieldValue,
	all: Record<string, FormFieldValue>,
) => string | null;

interface FieldState {
	value: WritableSignal<FormFieldValue>;
	touched: WritableSignal<boolean>;
	error: WritableSignal<string | null>;
	validators: ValidatorFn[];
}

interface Deferred {
	promise: Promise<void>;
	resolve: () => void;
}

type SingleEventName =
	| 'onInit'
	| 'onBeforeValidate'
	| 'onAfterValidate'
	| 'onValidSubmit'
	| 'onInvalidSubmit'
	| 'onSubmitAlways'
	| 'onDestroy'
	| 'onReset'
	| 'onPatch';

type MultiEventName = 'onFieldRegister' | 'onFieldChange' | 'onFieldTouched';

type SingleHandler = (...args: any[]) => void | Promise<void>;
type MultiHandler = (...args: any[]) => void | Promise<void>;

interface Handlers {
	onInit?: SingleHandler;
	onBeforeValidate?: SingleHandler;
	onAfterValidate?: SingleHandler;
	onValidSubmit?: SingleHandler;
	onInvalidSubmit?: SingleHandler;
	onSubmitAlways?: SingleHandler;
	onDestroy?: SingleHandler;
	onReset?: SingleHandler;
	onPatch?: SingleHandler;

	_multi: Record<MultiEventName, MultiHandler[]>;
}

interface FormState {
	fields: Map<string, FieldState>;
	values: WritableSignal<Record<string, FormFieldValue>>;
	touched: WritableSignal<Record<string, boolean>>;
	errors: WritableSignal<Record<string, string | null>>;
	submitting: WritableSignal<boolean>;
	submitDeferred: Deferred;
	handlers: Handlers;
}

function createDeferred(): Deferred {
	let res!: () => void;
	const promise = new Promise<void>((r) => (res = r));
	return { promise, resolve: res };
}

/** ---------- Service ---------- */
@Injectable({ providedIn: 'root' })
export class FormService {
	private _forms = new Map<string, FormState>();

	/* ---------- FORM BASICS ---------- */

	getForm(formId: string): FormState {
		let form = this._forms.get(formId);
		if (form) return form;

		form = {
			fields: new Map(),
			values: signal({}),
			touched: signal({}),
			errors: signal({}),
			submitting: signal(false),
			submitDeferred: createDeferred(),
			handlers: {
				_multi: {
					onFieldRegister: [],
					onFieldChange: [],
					onFieldTouched: [],
				},
			},
		};

		this._forms.set(formId, form);
		this._callSingle(formId, 'onInit');
		return form;
	}

	/* ---------- FIELD REGISTRATION ---------- */

	registerField(
		formId: string,
		key: string,
		initial: FormFieldValue = null,
		validators: ValidatorFn[] = [],
	) {
		const form = this.getForm(formId);

		if (!form.fields.has(key)) {
			form.fields.set(key, {
				value: signal<FormFieldValue>(initial),
				touched: signal(false),
				error: signal<string | null>(null),
				validators,
			});

			this._recompute(formId);
			this._emit(formId, 'onFieldRegister', key);
		}

		return this.getFieldAPI(formId, key);
	}

	getFieldAPI(formId: string, key: string) {
		const form = this.getForm(formId);
		const field = form.fields.get(key);
		if (!field) throw new Error(`Field "${key}" not registered.`);

		const setValue = (v: FormFieldValue) => {
			field.value.set(v);
			this.validateField(formId, key);
			this._recompute(formId);
			this._emit(formId, 'onFieldChange', key, v, this.getValues(formId));
		};

		return {
			value: field.value,
			error: field.error,
			touched: field.touched,
			setValue,
			setTouched: (t: boolean) => {
				field.touched.set(t);
				this._recompute(formId);
				this._emit(formId, 'onFieldTouched', key, t);
			},
			getValue: () => field.value(),
			validate: () => this.validateField(formId, key),
		};
	}

	/* ---------- SET / GET ---------- */

	setValue(formId: string, key: string, value: FormFieldValue) {
		if (!this.getForm(formId).fields.has(key)) {
			this.registerField(formId, key, value);
		} else {
			this.getForm(formId).fields.get(key)!.value.set(value);
		}

		this.validateField(formId, key);
		this._recompute(formId);
		this._emit(formId, 'onFieldChange', key, value, this.getValues(formId));
	}

	patch(formId: string, values: Record<string, FormFieldValue>) {
		Object.entries(values).forEach(([k, v]) => this.setValue(formId, k, v));
		this._callSingle(formId, 'onPatch', values);
	}

	getValues(formId: string) {
		return { ...this.getForm(formId).values() };
	}

	getErrors(formId: string) {
		return { ...this.getForm(formId).errors() };
	}

	/* ---------- VALIDATION ---------- */

	validateField(formId: string, key: string): string | null {
		const form = this.getForm(formId);
		const field = form.fields.get(key);
		if (!field) return null;

		const all = this.getValues(formId);
		const val = field.value();
		const error =
			field.validators.map((fn) => fn(val, all)).find(Boolean) ?? null;

		field.error.set(error);
		return error;
	}

	validateForm(formId: string): boolean {
		let valid = true;
		this.getForm(formId).fields.forEach((_f, key) => {
			if (this.validateField(formId, key)) valid = false;
		});
		this._recompute(formId);
		return valid;
	}

	touchAll(formId: string) {
		this.getForm(formId).fields.forEach((f) => f.touched.set(true));
		this._recompute(formId);
	}

	/* ---------- SUBMIT ---------- */

	getSubmitPromise(formId: string) {
		return this.getForm(formId).submitDeferred.promise;
	}

	async submit(formId: string) {
		const form = this.getForm(formId);
		form.submitting.set(true);

		const beforeValues = this.getValues(formId);
		await this._callSingle(formId, 'onBeforeValidate', beforeValues);

		this.touchAll(formId);
		const valid = this.validateForm(formId);

		const values = this.getValues(formId);
		const errors = this.getErrors(formId);

		if (valid) {
			await this._callSingle(formId, 'onValidSubmit', values);
		} else {
			await this._callSingle(formId, 'onInvalidSubmit', errors, values);
		}

		await this._callSingle(formId, 'onAfterValidate', {
			values,
			valid,
			errors,
		});

		form.submitDeferred.resolve();
		form.submitDeferred = createDeferred();

		await this._callSingle(formId, 'onSubmitAlways', { values, valid });
		form.submitting.set(false);

		return { values, valid };
	}

	/* ---------- RESET / DESTROY ---------- */

	reset(formId: string, to?: Record<string, FormFieldValue>) {
		const form = this.getForm(formId);

		form.fields.forEach((f, key) => {
			f.value.set(to?.[key] ?? null);
			f.touched.set(false);
			f.error.set(null);
		});

		this._recompute(formId);
		this._callSingle(formId, 'onReset', this.getValues(formId));
	}

	destroyForm(formId: string) {
		this._callSingle(formId, 'onDestroy');
		this._forms.delete(formId);
	}

	/* ---------- HANDLERS ---------- */

	setHandler(formId: string, event: SingleEventName, fn?: SingleHandler) {
		const form = this.getForm(formId);
		if (fn) (form.handlers as any)[event] = fn;
		else delete (form.handlers as any)[event];
	}

	addListener(formId: string, event: MultiEventName, fn: MultiHandler) {
		this.getForm(formId).handlers._multi[event].push(fn);
	}

	removeListener(formId: string, event: MultiEventName, fn: MultiHandler) {
		const arr = this.getForm(formId).handlers._multi[event];
		this.getForm(formId).handlers._multi[event] = arr.filter(
			(h) => h !== fn,
		);
	}

	clearHandlers(formId: string) {
		this.getForm(formId).handlers = {
			_multi: {
				onFieldRegister: [],
				onFieldChange: [],
				onFieldTouched: [],
			},
		};
	}

	/* ---------- INTERNAL ---------- */

	private _recompute(formId: string) {
		const form = this.getForm(formId);

		const values: Record<string, FormFieldValue> = {};
		const touched: Record<string, boolean> = {};
		const errors: Record<string, string | null> = {};

		form.fields.forEach((f, key) => {
			values[key] = f.value();
			touched[key] = f.touched();
			errors[key] = f.error();
		});

		form.values.set(values);
		form.touched.set(touched);
		form.errors.set(errors);
	}

	private async _callSingle(
		formId: string,
		event: SingleEventName,
		...args: any[]
	) {
		const form = this._forms.get(formId);
		if (!form) return;
		const fn = form.handlers[event];
		if (typeof fn === 'function') await fn(...args);
	}

	private async _emit(formId: string, event: MultiEventName, ...args: any[]) {
		const list = this._forms.get(formId)?.handlers._multi[event] ?? [];
		for (const fn of list) await fn(...args);
	}
}
