import { Injectable, WritableSignal, signal } from '@angular/core';

/* ===========================
 * Virtual Form: Public Types
 * =========================== */

export type VFScalar = string | number | boolean | null;
export type VirtualFormFieldValue = VFScalar | VFScalar[];

export type VirtualValidatorFn = (
	value: VirtualFormFieldValue,
	all: Record<string, VirtualFormFieldValue>,
) => string | null;

/** Built-in: required */
export function required(message = 'Required'): VirtualValidatorFn {
	return (value) => {
		if (value === null || value === undefined) return message;
		if (typeof value === 'string' && value.trim() === '') return message;
		if (Array.isArray(value) && value.length === 0) return message;
		return null;
	};
}

export type VirtualSingleEventName =
	| 'onInit'
	| 'onBeforeValidate'
	| 'onAfterValidate'
	| 'onValidSubmit'
	| 'onInvalidSubmit'
	| 'onSubmitAlways'
	| 'onDestroy'
	| 'onReset'
	| 'onPatch';

export type VirtualMultiEventName =
	| 'onFieldRegister'
	| 'onFieldChange'
	| 'onFieldTouched';

export type VirtualSingleHandler = (...args: any[]) => void | Promise<void>;
export type VirtualMultiHandler = (...args: any[]) => void | Promise<void>;

/* ===========================
 * Virtual Form: Internal Types
 * =========================== */

interface VirtualFieldState {
	value: WritableSignal<VirtualFormFieldValue>;
	touched: WritableSignal<boolean>;
	error: WritableSignal<string | null>;
	validators: VirtualValidatorFn[];
}

interface VirtualDeferred {
	promise: Promise<void>;
	resolve: () => void;
}

interface VirtualHandlers {
	onInit?: VirtualSingleHandler;
	onBeforeValidate?: VirtualSingleHandler;
	onAfterValidate?: VirtualSingleHandler;
	onValidSubmit?: VirtualSingleHandler;
	onInvalidSubmit?: VirtualSingleHandler;
	onSubmitAlways?: VirtualSingleHandler;
	onDestroy?: VirtualSingleHandler;
	onReset?: VirtualSingleHandler;
	onPatch?: VirtualSingleHandler;

	_multi: Record<VirtualMultiEventName, VirtualMultiHandler[]>;
}

export interface VirtualFormState {
	fields: Map<string, VirtualFieldState>;
	values: WritableSignal<Record<string, VirtualFormFieldValue>>;
	touched: WritableSignal<Record<string, boolean>>;
	errors: WritableSignal<Record<string, string | null>>;
	submitting: WritableSignal<boolean>;
	submitDeferred: VirtualDeferred;
	handlers: VirtualHandlers;
}

/* ===========================
 * Helpers
 * =========================== */

function createVirtualDeferred(): VirtualDeferred {
	let res!: () => void;
	const promise = new Promise<void>((r) => (res = r));
	return { promise, resolve: res };
}

/* ===========================
 * Service
 * =========================== */

@Injectable({ providedIn: 'root' })
export class VirtualFormService {
	private _forms = new Map<string, VirtualFormState>();

	/* ---------- FORM BASICS ---------- */

	getForm(formId: string): VirtualFormState {
		let form = this._forms.get(formId);
		if (form) return form;

		form = {
			fields: new Map(),
			values: signal({}),
			touched: signal({}),
			errors: signal({}),
			submitting: signal(false),
			submitDeferred: createVirtualDeferred(),
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
		initial: VirtualFormFieldValue = null,
		validators: VirtualValidatorFn[] = [],
	) {
		const form = this.getForm(formId);

		if (!form.fields.has(key)) {
			form.fields.set(key, {
				value: signal<VirtualFormFieldValue>(initial),
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

		const setValue = (v: VirtualFormFieldValue) => {
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

	setValue(formId: string, key: string, value: VirtualFormFieldValue) {
		if (!this.getForm(formId).fields.has(key)) {
			this.registerField(formId, key, value);
		} else {
			this.getForm(formId).fields.get(key)!.value.set(value);
		}

		this.validateField(formId, key);
		this._recompute(formId);
		this._emit(formId, 'onFieldChange', key, value, this.getValues(formId));
	}

	patch(formId: string, values: Record<string, VirtualFormFieldValue>) {
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
		form.submitDeferred = createVirtualDeferred();

		await this._callSingle(formId, 'onSubmitAlways', { values, valid });
		form.submitting.set(false);

		return { values, valid };
	}

	/* ---------- RESET / DESTROY ---------- */

	reset(formId: string, to?: Record<string, VirtualFormFieldValue>) {
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

	setHandler(
		formId: string,
		event: VirtualSingleEventName,
		fn?: VirtualSingleHandler,
	) {
		const form = this.getForm(formId);
		if (fn) (form.handlers as any)[event] = fn;
		else delete (form.handlers as any)[event];
	}

	addListener(
		formId: string,
		event: VirtualMultiEventName,
		fn: VirtualMultiHandler,
	) {
		this.getForm(formId).handlers._multi[event].push(fn);
	}

	removeListener(
		formId: string,
		event: VirtualMultiEventName,
		fn: VirtualMultiHandler,
	) {
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

		const values: Record<string, VirtualFormFieldValue> = {};
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
		event: VirtualSingleEventName,
		...args: any[]
	) {
		const form = this._forms.get(formId);
		if (!form) return;
		const fn = form.handlers[event];
		if (typeof fn === 'function') await fn(...args);
	}

	private async _emit(
		formId: string,
		event: VirtualMultiEventName,
		...args: any[]
	) {
		const list = this._forms.get(formId)?.handlers._multi[event] ?? [];
		for (const fn of list) await fn(...args);
	}
}
