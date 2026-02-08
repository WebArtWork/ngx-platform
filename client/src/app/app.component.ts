import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from '@module/user';
import { ThemeService } from 'wacom';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [RouterOutlet],
	selector: 'app-root',
	templateUrl: './app.component.html',
})
export class AppComponent {
	private readonly _httpService = inject(UserService);

	constructor() {
		inject(ThemeService).init();
	}
}
