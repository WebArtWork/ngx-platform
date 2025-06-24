import { Component, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormService } from '../../modules/form/form.service';
import { InputComponent } from '../../modules/input/input.component';
import { NgClass } from '@angular/common';
interface Interface {}
@Component({
    templateUrl: './time.component.html',
    styleUrls: ['./time.component.scss'],
    imports: [InputComponent, NgClass]
})
export class TimeComponent implements OnInit {
	private _form = inject(FormService);

	@ViewChild('templateRef', { static: true })
	templateRef: TemplateRef<Interface>;

	/** Inserted by Angular inject() migration for backwards compatibility */
	constructor(...args: unknown[]);
	constructor() {}
	ngOnInit(): void {
		this._form.addTemplateComponent<Interface>('Time', this.templateRef);
	}
}
