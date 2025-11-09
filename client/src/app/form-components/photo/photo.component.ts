import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	TemplateRef,
	ViewChild,
	inject,
} from '@angular/core';
import { FileComponent } from 'src/app/libs/file/components/file/file.component';
import { FormService } from '../../libs/form/services/form.service';

interface Interface {}

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './photo.component.html',
	imports: [FileComponent],
})
export class PhotoComponent implements OnInit {
	private _form = inject(FormService);

	@ViewChild('templateRef', { static: true })
	templateRef!: TemplateRef<Interface>;

	ngOnInit(): void {
		// Primary registration
		this._form.addTemplateComponent<Interface>('Photo', this.templateRef);
		// Back-compat for existing forms that used "Photos"
		this._form.addTemplateComponent<Interface>('Photos', this.templateRef);
	}
}
