import { NgClass } from '@angular/common';
import {
	Component,
	OnInit,
	TemplateRef,
	ViewChild,
	inject
} from '@angular/core';
import { FormService } from '../../modules/form/form.service';
import { SelectComponent as SelectComponent_1 } from '../../modules/select/select.component';

interface Interface {}

@Component({
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.scss'],
	imports: [SelectComponent_1, NgClass]
})
export class SelectComponent implements OnInit {
	private _form = inject(FormService);

	@ViewChild('templateRef', { static: true })
	templateRef: TemplateRef<Interface>;

	ngOnInit(): void {
		this._form.addTemplateComponent<Interface>('Select', this.templateRef);
	}

	select(data: any): string {
		return data.value?.name || (data.value as unknown as string) || '';
	}
}
