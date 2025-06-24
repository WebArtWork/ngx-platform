import { Component, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormService } from '../../modules/form/form.service';
import { InputComponent } from '../../modules/input/input.component';
import { NgClass } from '@angular/common';

interface Interface {}

@Component({
    templateUrl: './email.component.html',
    styleUrls: ['./email.component.scss'],
    imports: [InputComponent, NgClass]
})
export class EmailComponent implements OnInit {
	private _form = inject(FormService);

	@ViewChild('templateRef', { static: true })
	templateRef: TemplateRef<Interface>;

	/** Inserted by Angular inject() migration for backwards compatibility */
	constructor(...args: unknown[]);

	constructor() {}

	ngOnInit(): void {
		this._form.addTemplateComponent<Interface>('Email', this.templateRef);
	}
}
