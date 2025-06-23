import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormService } from '../../modules/form/form.service';
import { FileComponent } from '../../modules/file/file.component';
interface Interface {}
@Component({
    templateUrl: './photo.component.html',
    styleUrls: ['./photo.component.scss'],
    imports: [FileComponent]
})
export class PhotoComponent implements OnInit {
	@ViewChild('templateRef', { static: true })
	templateRef: TemplateRef<Interface>;
	constructor(private _form: FormService) {}
	ngOnInit(): void {
		this._form.addTemplateComponent<Interface>('Photo', this.templateRef);
	}
}
