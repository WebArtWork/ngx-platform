import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FeaturesContent } from './features.interfaces';

@Component({
	selector: 'page-component-features',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './features.component.html',
	styleUrl: './features.component.scss',
})
export class FeaturesSectionComponent {
	readonly content = input.required<FeaturesContent>();
}
