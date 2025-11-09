import { Component, inject, signal } from '@angular/core';
import { CoreService } from 'wacom';
import { ButtonComponent } from '../../../button/button.component';
import { FormComponent } from '../../components/form/form.component';
import { FormInterface } from '../../interfaces/form.interface';
import { FormModalButton } from '../../services/form.service';

@Component({
	templateUrl: './modal-form.component.html',
	styleUrl: './modal-form.component.scss',
	imports: [FormComponent, ButtonComponent],
})
export class ModalFormComponent {
	private _core = inject(CoreService);

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

	/** Keep legacy shape and deep copy incoming changes into `submition`. */
	private _sync(sub: Record<string, unknown>): void {
		this._core.copy(sub, this.submition);
		this._core.copy((sub as any)['data'], (this.submition as any)['data']);
	}

	handleSubmit(): void {
		this.submitting.set(true);
		try {
			this._sync(this.submition);
			this.submit(this.submition);
			this.close();
		} finally {
			this.submitting.set(false);
		}
	}

	handleChange(): void {
		this._sync(this.submition);
		this.change(this.submition);
	}

	onButtonClick(button: FormModalButton): void {
		if (this.submitting()) return;
		button.click(this.submition, this.close);
	}
}
