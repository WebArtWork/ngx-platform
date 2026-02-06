import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { HowItWorksContent } from './how-it-works.interfaces';

@Component({
	selector: 'page-component-how-it-works',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './how-it-works.component.html',
})
export class HowItWorksSectionComponent {
	readonly content = input.required<HowItWorksContent>();
}
