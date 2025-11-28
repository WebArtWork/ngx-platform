import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormService } from '@lib/form';
import { InputComponent, inputDefaults } from '@lib/input';

interface Interface {}

@Component({
	imports: [InputComponent],
	templateUrl: './input.component.html',
})
export class InputFormComponent implements OnInit {
	@ViewChild('templateRef', { static: true })
	templateRef: TemplateRef<Interface>;

	readonly inputDefaults = inputDefaults;

	constructor(private _formService: FormService) {}

	ngOnInit(): void {
		this._formService.addTemplateComponent<Interface>(
			'Input',
			this.templateRef,
		);
	}
}
