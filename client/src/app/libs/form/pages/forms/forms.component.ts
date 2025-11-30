import { ChangeDetectionStrategy, Component } from '@angular/core';
import { formFormComponents } from '@lib/form/formcomponents/form.formcomponents';
import {
	Form,
	FormInterface,
} from 'src/app/libs/form/interfaces/form.interface';
import { CrudComponent } from 'wacom';
import { TableComponent } from '../../../../libs/table/table.component';
import { FormService } from '../../services/form.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [TableComponent],
	templateUrl: './forms.component.html',
})
export class FormsComponent extends CrudComponent<
	FormService,
	Form,
	FormInterface
> {
	// local pagination (we assume forms count is manageable)
	protected override configType: 'server' | 'local' = 'local';

	columns: string[] = ['name'];

	config = this.getConfig();

	protected override allowUrl(): boolean {
		return false;
	}

	constructor(_formService: FormService, _form: FormService) {
		super(formFormComponents, _form, _formService, 'form');

		this.setDocuments();

		console.log(_formService);
	}
}
