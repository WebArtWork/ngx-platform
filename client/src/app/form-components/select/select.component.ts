import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	TemplateRef,
	inject,
	viewChild,
} from '@angular/core';
import { FormService } from '@lib/form';
import { SelectComponent, selectDefaults } from '@lib/select';

interface SelectTemplateContext {}

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [SelectComponent],
	templateUrl: './select.component.html',
})
export class SelectFormComponent implements OnInit {
	private readonly _formService = inject(FormService);

	readonly templateRef =
		viewChild.required<TemplateRef<SelectTemplateContext>>('templateRef');

	readonly selectDefaults = selectDefaults;

	ngOnInit(): void {
		this._formService.addTemplateComponent<SelectTemplateContext>(
			'Select',
			this.templateRef(),
		);
	}
}
