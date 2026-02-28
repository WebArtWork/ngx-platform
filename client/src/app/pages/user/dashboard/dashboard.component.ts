import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ButtonComponent } from '@lib/button';
import { ClientComponent } from './client/client.component';
import type { DashboardView } from './dashboard.types';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './dashboard.component.html',
	styleUrl: './dashboard.component.scss',
	imports: [ButtonComponent, TitleCasePipe, ClientComponent],
})
export class DashboardComponent {
	readonly view = signal<DashboardView>('client');

	views: DashboardView[] = ['client'];

	onSelectView(view: DashboardView) {
		this.view.set(view);
	}
}
