import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
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
	@ViewChild('templateRef', { static: true })
	templateRef: TemplateRef<Interface>;
	constructor(private _form: FormService) {}
	ngOnInit(): void {
		this._form.addTemplateComponent<Interface>('Time', this.templateRef);
	}
}
