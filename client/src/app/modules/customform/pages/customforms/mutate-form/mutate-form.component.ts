import { Component, inject } from '@angular/core';
import { FormInterface } from 'src/app/libs/form/interfaces/form.interface';
import { FormService } from 'src/app/libs/form/services/form.service';

@Component({
	selector: 'app-mutate-form',
	templateUrl: './mutate-form.component.html',
	styleUrls: ['./mutate-form.component.scss'],
})
export class MutateFormComponent {
	fs = inject(FormService);

	close: () => void;

	form: FormInterface = this.fs.new();

	addComponent = '';

	addField() {
		const component = this.fs.components.filter(
			(c) => c.name === this.addComponent,
		)[0];

		this.form.components.push({
			name: component.name,
			fields: (component.fields || []).map((f) => {
				return {
					name: f,
					value: '',
				};
			}),
		});
	}
}
