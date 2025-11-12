import {
	Directive,
	ElementRef,
	EventEmitter,
	HostBinding,
	HostListener,
	Input,
	Output,
} from '@angular/core';
import { ButtonType } from './button.type';

@Directive({
	selector: 'button[wbutton], a[wbutton]',
	standalone: true,
})
export class WbuttonDirective {
	constructor(private el: ElementRef<HTMLElement>) {}

	@Input() type: ButtonType = 'primary';
	@Input() disabled = false;
	@Input() disableSubmit = false;
	/** If false (default), blocks subsequent clicks for 2s */
	@Input() isMultipleClicksAllowed = false;

	/** Extra classes without colliding with native `class` */
	@Input() extraClass = '';

	/** Emits alongside the host’s native click */
	@Output() wClick = new EventEmitter<void>();

	private cooling = false;

	private get tag(): string {
		return this.el.nativeElement.tagName; // 'BUTTON' | 'A' | ...
	}
	private get isButton(): boolean {
		return this.tag === 'BUTTON';
	}
	private get isBlocked(): boolean {
		return this.disabled || (!this.isMultipleClicksAllowed && this.cooling);
	}

	// type only on <button>
	@HostBinding('attr.type')
	get hostType(): 'button' | 'submit' | null {
		return this.isButton
			? this.disableSubmit
				? 'button'
				: 'submit'
			: null;
	}

	// disabled only on <button>
	@HostBinding('attr.disabled')
	get nativeDisabled(): '' | null {
		return this.isButton && this.isBlocked ? '' : null;
	}

	@HostBinding('attr.aria-disabled')
	get ariaDisabled(): 'true' | null {
		return !this.isButton && this.isBlocked ? 'true' : null;
	}

	@HostBinding('class')
	get hostClass(): string {
		return [
			'wbutton',
			`wbutton--${this.type}`,
			this.isBlocked ? 'is-disabled' : '',
			this.extraClass || '',
		]
			.filter(Boolean)
			.join(' ');
	}

	@HostListener('click', ['$event'])
	onClick(ev: MouseEvent) {
		if (this.isBlocked) {
			ev.preventDefault();
			ev.stopImmediatePropagation();
			return;
		}
		this.wClick.emit();

		if (!this.isMultipleClicksAllowed) {
			this.cooling = true;
			setTimeout(() => (this.cooling = false), 2000);
		}
	}
}
