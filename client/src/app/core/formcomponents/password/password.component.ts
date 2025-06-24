import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
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
	@ViewChild('templateRef', { static: true })
	templateRef: TemplateRef<Interface>;
	constructor(private _form: FormService, public ui: UiService) {}
	ngOnInit(): void {
		this._form.addTemplateComponent<Interface>(
			'Password',
			this.templateRef
		);
	}
}
