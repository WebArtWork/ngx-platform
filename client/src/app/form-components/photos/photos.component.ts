import { Component, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormService } from '../../libs/form/services/form.service';
import { FileComponent } from 'src/app/libs/file/components/file/file.component';

interface Interface {}

@Component({
    templateUrl: './photos.component.html',
    
    imports: [FileComponent],
})
export class PhotosComponent implements OnInit {
    private _form = inject(FormService);

    @ViewChild('templateRef', { static: true })
    templateRef: TemplateRef<Interface>;

    ngOnInit(): void {
        this._form.addTemplateComponent<Interface>('Photos', this.templateRef);
    }
    
}
