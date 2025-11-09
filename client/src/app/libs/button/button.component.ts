import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	inject,
	input,
	output,
} from '@angular/core';

export type ButtonType =
	| 'primary'
	| 'secondary'
	| 'success'
	| 'danger'
	| 'warning'
	| 'info'
	| 'light'
	| 'dark'
	| 'link';

@Component({
	selector: 'wbutton',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './button.component.html',
	styleUrl: './button.component.scss',
})
export class ButtonComponent {
	private _cdr = inject(ChangeDetectorRef);

	// Inputs
	readonly type = input<ButtonType>('primary');
	readonly extraClass = input<string>(''); // ⬅ rename from `class`
	readonly disabled = input<boolean>(false);
	readonly disableSubmit = input<boolean>(false);
	/** If false (default), blocks subsequent clicks for 2s */
	readonly isMultipleClicksAllowed = input<boolean>(false);

	// Outputs — prefer (wClick). (click) on <wbutton> still works via bubbling.
	readonly wClick = output<void>();

	private _cooling = false;

	get isBlocked(): boolean {
		return (
			this.disabled() ||
			(!this.isMultipleClicksAllowed() && this._cooling)
		);
	}

	clicked(): void {
		if (this.isBlocked) return;

		this.wClick.emit();

		if (!this.isMultipleClicksAllowed()) {
			this._cooling = true;
			this._cdr.markForCheck(); // ⬅ reflect disabled state now
			setTimeout(() => {
				this._cooling = false;
				this._cdr.markForCheck(); // ⬅ re-enable after 2s
			}, 2000);
		}
	}

	resolveType(): 'button' | 'submit' {
		return this.disableSubmit() ? 'button' : 'submit';
	}
}
