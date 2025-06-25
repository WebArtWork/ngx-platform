import {
	Component,
	EventEmitter,
	Input,
	Output,
	TemplateRef
} from '@angular/core';
import { FormModalButton } from '../../../form.service';
import { NgTemplateOutlet } from '@angular/common';

@Component({
    selector: 'app-modal-form-button',
    templateUrl: './modal-form-button.component.html',
    styleUrls: ['./modal-form-button.component.scss'],
    imports: [NgTemplateOutlet]
})
export class ModalFormButtonComponent {
	@Input() button: FormModalButton;

	@Input() buttonRef: TemplateRef<any>;

	@Output() clicked = new EventEmitter();

	clickedd() {
		console.log('clicked');
	}
}
