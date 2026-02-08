import { Platform } from '@angular/cdk/platform';
import {
	ChangeDetectionStrategy,
	Component,
	inject,
	signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './user.component.html',
	styleUrl: './user.component.scss',
	imports: [RouterOutlet, TopbarComponent, SidebarComponent],
})
export class UserComponent {
	private readonly platform = inject(Platform);

	isOpen = signal(false);

	onSidebarOpen(open: boolean): void {
		this.isOpen.set(open);
	}

	requestClose(): void {
		this.isOpen.set(false);
	}

	closeIfDesktop(): void {
		if (!this.platform.ANDROID && !this.platform.IOS) this.requestClose();
	}
}
