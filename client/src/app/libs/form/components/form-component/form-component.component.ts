import { NgTemplateOutlet } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	effect,
	inject,
	input,
	output,
	signal,
	TemplateRef,
} from '@angular/core';
import { FormComponentInterface } from '../../interfaces/component.interface';
import { FormInterface } from '../../interfaces/form.interface';
import { FormService } from '../../services/form.service';

@Component({
	selector: 'form-component',
	templateUrl: './form-component.component.html',
	styleUrls: ['./form-component.component.scss'],
	imports: [NgTemplateOutlet],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponentComponent {
	private _form = inject(FormService);

	readonly index = input<string>('');
	readonly formId = input<string>(''); // runtime id from parent
	readonly config = input.required<FormInterface>();
	readonly component = input.required<FormComponentInterface>();
	readonly submition = input<Record<string, unknown>>({}); // legacy pass-through

	readonly wSubmit = output<Record<string, unknown>>();
	readonly wChange = output<void>();
	readonly wClick = output<void>();

	readonly template = signal<TemplateRef<unknown> | null>(null);

	constructor() {
		// Re-run when registry (templatesVersion) or component name changes.
		effect(() => {
			this._form.templatesVersion(); // dependency on registry readiness
			const name = this.component().name as string | undefined;
			this.template.set(
				name ? this._form.getTemplateComponent(name) : null,
			);
		});
	}

	hasChildren(): boolean {
		return Array.isArray(this.component().components);
	}

	effectiveKey(): string | null {
		const key = this.component().key;
		if (!key) return null;
		if (!key.includes('[]')) return key;

		const idxStr = (this.index() || '').split('_').pop() || '0';
		const idx = Number.isFinite(+idxStr) ? +idxStr : 0;
		return key.replace(/\[\]/g, `[${idx}]`);
	}

	submit(): void {
		this.wSubmit.emit(this.submition());
	}
	change(): void {
		this.wChange.emit();
	}
	click(): void {
		this.wClick.emit();
	}
}
