import { Component, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormService } from '../../modules/form/form.service';
import 'brace';
import 'brace/mode/json';
import 'brace/theme/monokai';
import { AceModule } from 'ngx-ace-wrapper';

interface Interface {}

@Component({
    templateUrl: './code.component.html',
    styleUrls: ['./code.component.scss'],
    imports: [AceModule]
})
export class CodeComponent implements OnInit {
	private _form = inject(FormService);

	@ViewChild('templateRef', { static: true })
	templateRef: TemplateRef<Interface>;

	/** Inserted by Angular inject() migration for backwards compatibility */
	constructor(...args: unknown[]);

	constructor() {}

	ngOnInit(): void {
		this._form.addTemplateComponent<Interface>('Code', this.templateRef);
	}
}
