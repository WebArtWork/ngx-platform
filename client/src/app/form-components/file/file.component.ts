import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	TemplateRef,
	inject,
	viewChild,
} from '@angular/core';
import { FileComponent, fileDefaults } from '@lib/file';
import { FormService } from '@lib/form';

interface FileTemplateContext {}

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [FileComponent],
	templateUrl: './file.component.html',
})
export class FileFormComponent implements OnInit {
	private readonly _formService = inject(FormService);

	readonly templateRef =
		viewChild.required<TemplateRef<FileTemplateContext>>('templateRef');

	readonly fileDefaults = fileDefaults;

	ngOnInit(): void {
		this._formService.addTemplateComponent<FileTemplateContext>(
			'File',
			this.templateRef(),
		);
	}

	/* ------------ value bridge (Signal Forms + model + legacy) ------------ */

	getValue(data: any): any {
		const key = (data?.key as string | null) ?? null;

		// 1) Signal Forms field (preferred)
		if (data?.field) {
			try {
				const state = data.field();
				if (state?.value && typeof state.value === 'function') {
					return state.value();
				}
			} catch {
				// fall through
			}
		}

		// 2) Model signal
		if (data?.model && typeof data.model === 'function' && key) {
			const current = data.model() as Record<string, unknown>;
			return current?.[key];
		}

		// 3) Legacy submission object
		if (!key || !data?.submition) return null;
		return data.submition[key] ?? null;
	}

	onValueChange(data: any, value: any): void {
		const key = (data?.key as string | null) ?? null;

		// 1) Signal Forms field
		if (data?.field) {
			try {
				const state = data.field();
				if (state?.value?.set) state.value.set(value);
			} catch {
				// ignore and fall through
			}
		}
		// 2) Model signal
		else if (
			data?.model &&
			typeof data.model.update === 'function' &&
			key
		) {
			data.model.update((current: Record<string, unknown>) => ({
				...current,
				[key]: value,
			}));
		}
		// 3) Legacy submission object
		else if (data?.submition && key) {
			data.submition[key] = value;
		}

		if (typeof data?.wChange === 'function') data.wChange();
	}
}
