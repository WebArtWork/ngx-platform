import {
	Component,
	OnInit,
	TemplateRef,
	ViewChild,
	inject
} from '@angular/core';
import { FileComponent } from '../../libs/file/file.component';
import { FormService } from '../../libs/form/form.service';
interface Interface {}
@Component({
	templateUrl: './photos.component.html',
	styleUrls: ['./photos.component.scss'],
	imports: [FileComponent]
})
export class PhotosComponent implements OnInit {
	private _form = inject(FormService);

	@ViewChild('templateRef', { static: true })
	templateRef: TemplateRef<Interface>;
	ngOnInit(): void {
		this._form.addTemplateComponent<Interface>('Photos', this.templateRef);
	}
}
