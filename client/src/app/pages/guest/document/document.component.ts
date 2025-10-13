import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from 'src/app/libs/button/button.component';
import { FormComponent } from 'src/app/libs/form/components/form/form.component';
import { FormInterface } from 'src/app/libs/form/interfaces/form.interface';
import { FormService } from 'src/app/libs/form/services/form.service';
import { SelectComponent } from 'src/app/libs/select/select.component';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
	templateUrl: './document.component.html',
	styleUrls: ['./document.component.scss'],
	imports: [ButtonComponent, FormComponent, RouterLink, SelectComponent],
})
export class DocumentComponent {
	spaceDocument: FormInterface = this._form.getForm('spaceDocumentForm', {
		formId: 'docForm',
		title: 'Doc form',
		components: [
			{
				name: 'Text',
				key: 'name',
				focused: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'Enter your name',
					},
					{
						name: 'Label',
						value: 'Name',
					},
				],
			},
			{
				name: 'Text',
				key: 'phone',
				fields: [
					{
						name: 'Placeholder',
						value: 'Enter your phone',
					},
					{
						name: 'Label',
						value: 'Phone',
					},
				],
			},
			{
				name: 'Text',
				key: 'bio',
				fields: [
					{
						name: 'Placeholder',
						value: 'Enter your bio',
					},
					{
						name: 'Label',
						value: 'Bio',
					},
					{
						name: 'Textarea',
						value: true,
					},
				],
			},
			{
				name: 'Button',
				fields: [
					{
						name: 'Label',
						value: "Let's go",
					},
					{
						name: 'Submit',
						value: true,
					},
				],
			},
		],
	});

	isMenuOpen = false;

	constructor(
		public userService: UserService,
		private _form: FormService,
	) {}
}
