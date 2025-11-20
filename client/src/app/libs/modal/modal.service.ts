import { inject, Injectable, Type } from '@angular/core';
import { DomComponent, DomService } from 'wacom';
import { ModalComponent } from './modal.component';
import { Modal, ModalConfig } from './modal.interface';
@Injectable({
	providedIn: 'root',
})
export class ModalService {
	private _dom = inject(DomService);

	show(opts: Modal | Type<unknown>): Modal {
		opts = this._opts(opts);

		if (opts.unique && this._modals.find((m) => m.unique === opts.unique)) {
			return this._modals.find((m) => m.unique === opts.unique) as Modal;
		}

		this._modals.push(opts);

		opts.class ||= '';

		opts.id ||= Math.floor(Math.random() * Date.now()) + Date.now();

		document.body.classList.add('modalOpened');

		let component!: DomComponent<ModalComponent> | undefined;

		let content!: DomComponent<any> | undefined;

		opts.close = () => {
			content?.remove();

			content = undefined;

			component?.remove();

			component = undefined;

			if (typeof opts.onClose === 'function') opts.onClose();

			this._modals.splice(
				this._modals.findIndex((m) => m.id === opts.id),
				1,
			);

			if (!this._modals.length) {
				document.body.classList.remove('modalOpened');
			}
		};

		if (typeof opts.timeout === 'number' && opts.timeout > 0) {
			setTimeout(opts.close, opts.timeout);
		}

		component = this._dom.appendComponent(ModalComponent, opts)!;

		content = this._dom.appendComponent(
			opts.component,
			opts as Partial<{ providedIn?: string | undefined }>,
			component.nativeElement.children[0].children[0]
				.children[0] as HTMLElement,
		)!;

		return opts;
	}

	open(opts: Modal | Type<unknown>) {
		this.show(opts);
	}

	small(opts: Modal) {
		opts = this._opts(opts);

		opts.size = 'small';

		this.show(opts);
	}

	mid(opts: Modal) {
		opts = this._opts(opts);

		opts.size = 'mid';

		this.show(opts);
	}

	big(opts: Modal) {
		opts = this._opts(opts);

		opts.size = 'big';

		this.show(opts);
	}

	full(opts: Modal) {
		opts = this._opts(opts);

		opts.size = 'full';

		this.show(opts);
	}

	destroy() {
		for (let i = this._modals.length - 1; i >= 0; i--) {
			this._modals[i].close?.();
		}
	}

	private _modals: Modal[] = [];

	/** Merged configuration applied to new alerts. */
	private _config: ModalConfig;

	setConfig(config: ModalConfig) {
		this._config = config;
	}

	private _opts(opts: Modal | Type<unknown>): Modal {
		return typeof opts === 'function'
			? { ...this._config, component: opts }
			: {
					...this._config,
					...opts,
					component: opts.component,
				};
	}
}
