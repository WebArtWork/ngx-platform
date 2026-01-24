import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MaterialComponent } from '@icon/material';
import { BurgerComponent } from 'src/app/icons/burger/burger.component';

@Component({
	selector: 'layout-topbar',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './topbar.component.html',
	imports: [RouterLink, MaterialComponent, BurgerComponent],
})
export class TopbarComponent {
	// show burger / sidebar toggler
	readonly sidebarToggler = input(false);

	// emits burger open/close state
	readonly sidebarOpen = output<boolean>();

	readonly showProfile = input(false);
}
