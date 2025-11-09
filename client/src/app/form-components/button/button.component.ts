import { Component, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormService } from '../../libs/form/services/form.service';
import { ButtonComponent as LibButtonComponent } from '../../libs/button/button.component';

interface Interface {}

@Component({
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    imports: [LibButtonComponent],
})
export class ButtonComponent implements OnInit {
    private _form = inject(FormService);

    @ViewChild('templateRef', { static: true })
    templateRef: TemplateRef<Interface>;

    ngOnInit(): void {
        this._form.addTemplateComponent<Interface>('Button', this.templateRef);
    }
    
}
