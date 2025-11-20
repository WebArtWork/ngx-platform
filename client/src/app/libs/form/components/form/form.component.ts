import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormComponentComponent } from '../form-component/form-component.component';

@Component({
	selector: 'wform',
	templateUrl: './form.component.html',
	styleUrl: './form.component.scss',
	imports: [FormComponentComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {}
