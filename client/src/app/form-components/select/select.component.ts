import { Component, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormService } from '../../libs/form/services/form.service';
import { SelectComponent as WawSelectComponent } from '../../libs/select/select.component';
import { NgClass } from '@angular/common';

interface Interface {}

@Component({
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    imports: [WawSelectComponent, NgClass],
})
export class SelectComponent implements OnInit {
    private _form = inject(FormService);

    @ViewChild('templateRef', { static: true })
    templateRef: TemplateRef<Interface>;

    ngOnInit(): void {
        this._form.addTemplateComponent<Interface>('Select', this.templateRef);
    }
    
}
