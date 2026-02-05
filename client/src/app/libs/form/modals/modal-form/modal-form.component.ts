import {
	ChangeDetectionStrategy,
	Component,
	inject,
	signal,
} from '@angular/core';
import { CoreService } from 'wacom';

import { ButtonComponent } from '../../../button/button.component';
import { FormComponent } from '../../components/form/form.component';
import { FormInterface } from '../../interfaces/form.interface';
import { FormModalButton, FormService } from '../../services/form.service';

@Component({
	templateUrl: './modal-form.component.html',
	styleUrl: './modal-form.component.scss',
	imports: [FormComponent, ButtonComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalFormComponent {
	private _coreService = inject(CoreService);
	private _formService = inject(FormService);

	// from ModalService
	form: FormInterface;
	submition: Record<string, unknown>;
	modalButtons: FormModalButton[];

	close: () => void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	submit: (form: any) => void = (_: any) => {};
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	change: (form: any) => void = (_: any) => {};

	// ui state
	submitting = signal(false);

	resetOnSubmit = false;

	/** Merge latest values into `submition`. */
	private _sync(update: Record<string, unknown> | undefined | null) {
		if (!update) return;

		// flat fields
		this._coreService.copy(update, this.submition);

		// optional nested "data" payload (for legacy docs modals)
		const updateData = (update as any).data;
		if (updateData && typeof updateData === 'object') {
			(this.submition as any).data = (this.submition as any).data || {};
			this._coreService.copy(updateData, (this.submition as any).data);
		}
	}

	handleSubmit(values?: Record<string, unknown>) {
		this.submitting.set(true);
		try {
			this._sync(values);
			this.submit(this.submition);
			this.close();
		} finally {
			this.submitting.set(false);

			if (this.resetOnSubmit && this.form.formId) {
				this._formService.reset(this.form.formId as string);
			}
		}
	}

	handleChange(values: Record<string, unknown>) {
		this._sync(values);
		this.change(this.submition);
	}

	onButtonClick(button: FormModalButton) {
		if (this.submitting()) return;

		// `submition` is always kept in sync via wChange
		button.click(this.submition, this.close);

		if (this.resetOnSubmit && this.form.formId) {
			this._formService.reset(this.form.formId as string);
		}
	}
}
