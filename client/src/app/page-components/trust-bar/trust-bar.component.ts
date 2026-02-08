import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TrustBarContent } from './trust-bar.interfaces';

@Component({
	selector: 'page-component-trust-bar',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './trust-bar.component.html',
})
export class TrustBarSectionComponent {
	/**
	 * Keep the input required (component always gets an object),
	 * but allow all fields inside to be optional for reusability.
	 */
	readonly content = input.required<TrustBarContent>();
}
