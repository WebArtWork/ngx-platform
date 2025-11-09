// client/src/app/libs/form/components/form/form.component.ts
import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	effect,
	inject,
	input,
	OnDestroy,
	output,
	signal,
} from '@angular/core';
import { required, VirtualFormService } from 'src/app/virtual-form.service';
import { CoreService } from 'wacom';
import { FormComponentInterface } from '../../interfaces/component.interface';
import { FormInterface } from '../../interfaces/form.interface';
import { FormComponentComponent } from '../form-component/form-component.component';

@Component({
	selector: 'wform',
	templateUrl: './form.component.html',
	styleUrl: './form.component.scss',
	imports: [FormComponentComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements AfterViewInit, OnDestroy {
	private _core = inject(CoreService);
	private _virtualFormService = inject(VirtualFormService);

	readonly config = input.required<FormInterface>();
	readonly submition = input<Record<string, any>>({}); // legacy compat

	readonly wChange = output<Record<string, any>>();
	readonly wSubmit = output<Record<string, any>>();

	private _formId = signal<string>('');
	private _unsubFns: Array<() => void> = [];

	ngAfterViewInit(): void {
		if (this.submition()) {
			(this.submition() as any).data =
				(this.submition() as any).data || {};
		}

		effect(() => {
			const cfg = this.config();
			const id = (cfg?.formId as string) || crypto.randomUUID();
			this._formId.set(id);

			this._virtualFormService.getForm(id);

			(cfg?.components || []).forEach((c) =>
				this._registerFromSchema(id, c),
			);

			const initial = this.submition();
			if (initial && Object.keys(initial).length) {
				this._virtualFormService.patch(id, initial as any);
			}

			this._clearHandlers();
			this._virtualFormService.setHandler(
				id,
				'onValidSubmit',
				(values: any) => this.wSubmit.emit(values),
			);
			this._virtualFormService.setHandler(
				id,
				'onInvalidSubmit',
				(_errors: any, values: any) => this._emitLegacyChange(values),
			);
			this._virtualFormService.setHandler(id, 'onPatch', () => {
				this._emitLegacyChange(this._virtualFormService.getValues(id));
			});

			const onFieldChange = () => {
				this._core.afterWhile(this, () => {
					this._emitLegacyChange(
						this._virtualFormService.getValues(id),
					);
				});
			};
			this._virtualFormService.addListener(
				id,
				'onFieldChange',
				onFieldChange,
			);
			this._unsubFns.push(() =>
				this._virtualFormService.removeListener(
					id,
					'onFieldChange',
					onFieldChange,
				),
			);
		});
	}

	ngOnDestroy(): void {
		this._clearHandlers();
		const id = this._formId();
		if (id) this._virtualFormService.destroyForm(id);
	}

	onSubmit(): void {
		const id = this._formId();
		this._virtualFormService.submit(id);
	}

	onLegacyChange(): void {
		const id = this._formId();
		this._core.afterWhile(this, () => {
			this._emitLegacyChange(this._virtualFormService.getValues(id));
		});
	}

	onClick(): void {}

	private _emitLegacyChange(values: Record<string, any>) {
		this.wChange.emit(values || {});
	}

	private _registerFromSchema(
		formId: string,
		c: FormComponentInterface,
	): void {
		if (Array.isArray(c.components) && c.components.length) {
			c.components.forEach((child) =>
				this._registerFromSchema(formId, child),
			);
			return;
		}
		if (!c.key) return;

		const init = (this.submition() || {})[c.key as string];

		const composed = [
			c.props && (c.props as any).Required ? required() : null,
			...(c.validators || []),
		].filter(Boolean) as typeof c.validators;

		this._virtualFormService.registerField(
			formId,
			c.key as string,
			init,
			composed || [],
		);
	}

	private _clearHandlers() {
		this._unsubFns.forEach((u) => u());
		this._unsubFns = [];
		const id = this._formId();
		if (id) this._virtualFormService.clearHandlers(id);
	}
}
