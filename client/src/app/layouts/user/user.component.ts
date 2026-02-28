import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SidebarService } from '../sidebar/sidebar.service';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './user.component.html',
	styleUrl: './user.component.scss',
	imports: [RouterOutlet, TopbarComponent, SidebarComponent],
})
export class UserComponent {
	readonly sidebar = inject(SidebarService);
}
