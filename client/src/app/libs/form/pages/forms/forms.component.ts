import {
	ChangeDetectionStrategy,
	Component,
	inject,
	signal,
} from '@angular/core';
import { TableComponent } from '../../../../libs/table/table.component';
import { FormService } from '../../services/form.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [TableComponent],
	templateUrl: './forms.component.html',
})
export class FormsComponent {
	private _formService = inject(FormService);

	columns: string[] = ['name'];

	config = {};

	documents = signal([]);

	constructor() {
		console.log(this._formService);
	}
}
