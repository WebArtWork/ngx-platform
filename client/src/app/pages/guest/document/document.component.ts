import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormInterface } from 'src/app/libs/form/interfaces/form.interface';
import { FormService } from 'src/app/libs/form/services/form.service';
import { UserService } from 'src/app/modules/user/services/user.service';
import { ButtonComponent } from '../../../libs/button/button.component';
import { FormComponent } from '../../../libs/form/components/form/form.component';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [RouterLink, ButtonComponent, FormComponent],
	templateUrl: './document.component.html'
})
export class DocumentComponent {
	userService = inject(UserService);
	private _form = inject(FormService);

	formDoc: FormInterface = this._form.getForm('docForm', {
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
						value: 'Enter your name'
					},
					{
						name: 'Label',
						value: 'Name'
					}
				]
			},
			{
				name: 'Text',
				key: 'phone',
				fields: [
					{
						name: 'Placeholder',
						value: 'Enter your phone'
					},
					{
						name: 'Label',
						value: 'Phone'
					}
				]
			},
			{
				name: 'Text',
				key: 'bio',
				fields: [
					{
						name: 'Placeholder',
						value: 'Enter your bio'
					},
					{
						name: 'Label',
						value: 'Bio'
					},
					{
						name: 'Textarea',
						value: true
					}
				]
			},
			{
				name: 'Button',
				fields: [
					{
						name: 'Label',
						value: "Let's go"
					},
					{
						name: 'Submit',
						value: true
					}
				]
			}
		]
	});

	isMenuOpen = false;

	back(): void {
		window.history.back();
	}
}
