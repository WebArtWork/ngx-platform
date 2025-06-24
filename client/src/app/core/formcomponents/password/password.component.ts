import { Component, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormService } from '../../modules/form/form.service';
import { UiService } from 'wacom';
import { InputComponent } from '../../modules/input/input.component';
import { NgClass } from '@angular/common';
interface Interface {}
@Component({
    templateUrl: './password.component.html',
    styleUrls: ['./password.component.scss'],
    imports: [InputComponent, NgClass]
})
export class PasswordComponent implements OnInit {
	private _form = inject(FormService);
	ui = inject(UiService);

	@ViewChild('templateRef', { static: true })
	templateRef: TemplateRef<Interface>;

	/** Inserted by Angular inject() migration for backwards compatibility */
	constructor(...args: unknown[]);
	constructor() {}
	ngOnInit(): void {
		this._form.addTemplateComponent<Interface>(
			'Password',
			this.templateRef
		);
	}
}
