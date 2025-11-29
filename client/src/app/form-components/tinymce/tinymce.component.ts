import { NgClass } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	TemplateRef,
	ViewChild,
	inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TinymceComponent } from 'ngx-tinymce';
import { FormService } from 'src/app/libs/form/services/form.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './tinymce.component.html',
	styleUrl: './tinymce.component.scss',
	imports: [NgClass, FormsModule, TinymceComponent],
})
export class TinymceFormComponent implements OnInit {
	private _form = inject(FormService);

	@ViewChild('templateRef', { static: true })
	templateRef!: TemplateRef<unknown>;

	ngOnInit(): void {
		// Register template under "Tinymce" name for JSON schema:
		// { name: 'Tinymce', key: 'fieldName', props: { ... } }
		this._form.addTemplateComponent('Tinymce', this.templateRef);
	}

	/** Read current value: prefer Signal Form field, fallback to raw submition. */
	getValue(data: any): string {
		const key = data.key as string | null;
		if (data.field) {
			try {
				const state = data.field();
				if (state?.value && typeof state.value === 'function') {
					return state.value() ?? '';
				}
			} catch {
				// fall through to submition
			}
		}
		if (!key || !data.submition) return '';
		return (data.submition[key] as string) ?? '';
	}

	/** Bridge TinyMCE -> Signal Forms (field/model) + legacy submition. */
	onValueChange(data: any, value: string): void {
		const key = data.key as string | null;

		// 1) Signal Forms field (preferred)
		if (data.field) {
			try {
				const state = data.field();
				if (state?.value?.set) {
					state.value.set(value);
				}
			} catch {
				// ignore and fall through
			}
		}
		// 2) Fallback to model signal if present
		else if (data.model && typeof data.model.update === 'function' && key) {
			data.model.update((current: Record<string, unknown>) => ({
				...current,
				[key]: value,
			}));
		}
		// 3) Legacy: mutate submition object
		else if (data.submition && key) {
			data.submition[key] = value;
		}

		// Notify wform so it can emit debounced change + keep Modal submition in sync
		if (typeof data.wChange === 'function') {
			data.wChange();
		}
	}

	// ---- Props helpers (all via component.props) -----------------------------

	getConfig(data: any): any {
		return (data.props?.config as any) ?? {};
	}

	isDisabled(data: any): boolean {
		return (data.props?.disabled as boolean) ?? false;
	}

	isInline(data: any): boolean {
		return (data.props?.inline as boolean) ?? false;
	}

	getPlaceholder(data: any): string {
		return (data.props?.placeholder as string) ?? '';
	}
}
