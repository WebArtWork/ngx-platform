import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	TemplateRef,
	ViewChild,
	inject,
} from '@angular/core';
import { ButtonComponent as LibButtonComponent } from '../../libs/button/button.component';
import { FormService } from '../../libs/form/services/form.service';

interface Interface {}

@Component({
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [LibButtonComponent],
})
export class ButtonComponent implements OnInit {
	private _form = inject(FormService);

	@ViewChild('templateRef', { static: true })
	templateRef: TemplateRef<Interface>;

	ngOnInit(): void {
		this._form.addTemplateComponent<Interface>('Button', this.templateRef);
	}

	/** Safely invoke optional callback coming from form props */
	invoke(fn?: unknown): void {
		if (typeof fn === 'function') (fn as () => void)();
	}
}
