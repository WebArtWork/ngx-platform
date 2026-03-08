import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { UseCasesContent } from './use-cases.interfaces';

@Component({
	selector: 'page-component-use-cases',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './use-cases.component.html',
})
export class UseCasesSectionComponent {
	readonly content = input.required<UseCasesContent>();
}
