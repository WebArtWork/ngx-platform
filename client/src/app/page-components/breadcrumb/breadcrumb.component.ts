import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'page-breadcrumb',
	imports: [],
	templateUrl: './breadcrumb.component.html',
	styleUrl: './breadcrumb.component.scss',
})
export class BreadcrumbComponent {}
