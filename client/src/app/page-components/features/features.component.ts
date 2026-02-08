import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FeaturesContent } from './features.interfaces';

@Component({
	selector: 'page-component-features',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './features.component.html',
})
export class FeaturesSectionComponent {
	readonly content = input.required<FeaturesContent>();
}
