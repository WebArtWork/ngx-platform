import { Component, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormService } from '../../libs/form/services/form.service';
import { InputComponent } from '../../libs/input/input.component';
import { NgClass } from '@angular/common';

interface Interface {}

@Component({
    templateUrl: './code.component.html',
    
    imports: [InputComponent, NgClass],
})
export class CodeComponent implements OnInit {
    private _form = inject(FormService);

    @ViewChild('templateRef', { static: true })
    templateRef: TemplateRef<Interface>;

    ngOnInit(): void {
        this._form.addTemplateComponent<Interface>('Code', this.templateRef);
    }
    
}
