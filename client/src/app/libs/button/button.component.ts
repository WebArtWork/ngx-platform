import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	inject,
	input,
	output,
} from '@angular/core';
import { ButtonType } from './button.type';

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
	readonly extraClass = input<string>(''); // extra CSS classes
	readonly disabled = input<boolean>(false);
	readonly disableSubmit = input<boolean>(false);
	/** If false (default), blocks subsequent clicks for 2s */
	readonly isMultipleClicksAllowed = input<boolean>(false);

	// Outputs — prefer (wClick). (click) on <wbutton> will still work.
	readonly wClick = output<MouseEvent>();

	private _cooling = false;

	get isBlocked(): boolean {
		return (
			this.disabled() ||
			(!this.isMultipleClicksAllowed() && this._cooling)
		);
	}

	clicked(event: MouseEvent): void {
		// Hard block when disabled / cooling: also stop host (click) handlers.
		if (this.isBlocked) {
			event.preventDefault();
			event.stopImmediatePropagation();
			return;
		}

		// Emit custom output
		this.wClick.emit(event);

		// Let native bubbling continue so (click) on <wbutton> also fires.

		// Apply 2s cooldown if needed
		if (!this.isMultipleClicksAllowed()) {
			this._cooling = true;
			this._cdr.markForCheck();

			setTimeout(() => {
				this._cooling = false;
				this._cdr.markForCheck();
			}, 2000);
		}
	}

	resolveType(): 'button' | 'submit' {
		return this.disableSubmit() ? 'button' : 'submit';
	}
}
