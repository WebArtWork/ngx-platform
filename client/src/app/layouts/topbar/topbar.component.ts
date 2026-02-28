import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	input,
	output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MaterialComponent } from '@icon/material';
import {
	BurgerComponent,
	BurgerState,
} from 'src/app/icons/burger/burger.component';
import { CoreService } from 'wacom';
import { SidebarService } from '../sidebar/sidebar.service';

@Component({
	selector: 'layout-topbar',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './topbar.component.html',
	imports: [RouterLink, MaterialComponent, BurgerComponent],
})
export class TopbarComponent {
	private readonly _coreService = inject(CoreService);
	private readonly _sidebarService = inject(SidebarService);

	// kept for compatibility (not used as source of truth anymore)
	readonly isOpen = input(false);

	// show burger / sidebar toggler
	readonly sidebarToggler = input(false);

	// kept for compatibility (not used anymore)
	readonly sidebarOpen = output<boolean>();

	readonly showProfile = input(false);

	readonly viewport = this._coreService.viewport;

	/**
	 * Burger visual state mapping:
	 * - web shown: three-lines
	 * - web minimized: two-lines
	 * - web hidden: one-line
	 * - mobile shown: three-lines
	 * - mobile hidden (drawer open): cross
	 */
	readonly burgerState = computed<BurgerState>(() => {
		if (this._sidebarService.isMobile()) {
			return this._sidebarService.mobileOpen() ? 'cross' : 'three-lines';
		}

		switch (this._sidebarService.webMode()) {
			case 'shown':
				return 'three-lines';
			case 'minimized':
				return 'two-lines';
			case 'hidden':
			default:
				return 'one-line';
		}
	});

	onBurgerClick(): void {
		this._sidebarService.burgerClick();
	}

	private _onBurgerHover: ReturnType<typeof setTimeout> | null = null;
	onBurgerHover(hovered: boolean): void {
		if (this._onBurgerHover) {
			clearTimeout(this._onBurgerHover);

			this._onBurgerHover = null;
		}

		if (hovered) {
			this._sidebarService.onBurgerHover(hovered);
		} else {
			this._onBurgerHover = setTimeout(() => {
				this._sidebarService.onBurgerHover(hovered);
				this._onBurgerHover = null;
			}, 2000);
		}
	}
}
