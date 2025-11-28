import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	TemplateRef,
	ViewChild,
} from '@angular/core';
import { ButtonComponent, buttonDefaults } from '@lib/button';
import { FormService } from '@lib/form';

interface ButtonTemplateContext {}

@Component({
	imports: [ButtonComponent],
	templateUrl: './button.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonFormComponent implements OnInit {
	@ViewChild('templateRef', { static: true })
	templateRef: TemplateRef<ButtonTemplateContext>;

	readonly buttonDefaults = buttonDefaults;

	constructor(private _formService: FormService) {}

	ngOnInit(): void {
		this._formService.addTemplateComponent<ButtonTemplateContext>(
			'Button',
			this.templateRef,
		);
	}
}
