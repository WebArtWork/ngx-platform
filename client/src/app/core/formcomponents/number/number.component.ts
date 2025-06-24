import { Component, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormService } from '../../modules/form/form.service';
import { Value, InputComponent } from '../../modules/input/input.component';
import { NgClass } from '@angular/common';

interface Interface {}

@Component({
    templateUrl: './number.component.html',
    styleUrls: ['./number.component.scss'],
    imports: [InputComponent, NgClass]
})
export class NumberComponent implements OnInit {
	private _form = inject(FormService);

	@ViewChild('templateRef', { static: true })
	templateRef: TemplateRef<Interface>;

	/** Inserted by Angular inject() migration for backwards compatibility */
	constructor(...args: unknown[]);

	constructor() {}

	number(value: Value) {
		return Number(value);
	}

	ngOnInit(): void {
		this._form.addTemplateComponent<Interface>('Number', this.templateRef);
	}
}
