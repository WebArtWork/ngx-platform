import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	TemplateRef,
	ViewChild,
} from '@angular/core';
import { FormService } from '@lib/form';
import { SelectComponent, selectDefaults } from '@lib/select';

interface SelectTemplateContext {}

@Component({
	imports: [SelectComponent],
	templateUrl: './select.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectFormComponent implements OnInit {
	@ViewChild('templateRef', { static: true })
	templateRef: TemplateRef<SelectTemplateContext>;

	readonly selectDefaults = selectDefaults;

	constructor(private _formService: FormService) {}

	ngOnInit(): void {
		this._formService.addTemplateComponent<SelectTemplateContext>(
			'Select',
			this.templateRef,
		);
	}
}
