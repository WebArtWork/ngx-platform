import { Component, inject } from '@angular/core';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { UserService } from 'src/app/modules/user/services/user.service';
import { environment } from 'src/environments/environment';
import { CoreService } from 'wacom';
import { ButtonComponent } from '../../../core/modules/button/button.component';
import { FileComponent } from '../../../core/modules/file/file.component';
import { FormComponent } from '../../../core/modules/form/form.component';
import { TranslateDirective } from '../../../core/modules/translate/translate.directive';

interface ChangePassword {
	oldPass: string;
	newPass: string;
}

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
	imports: [FileComponent, FormComponent, ButtonComponent, TranslateDirective]
})
export class ProfileComponent {
	private _form = inject(FormService);
	private _core = inject(CoreService);
	us = inject(UserService);

	readonly url = environment.url;

	/** Inserted by Angular inject() migration for backwards compatibility */
	constructor(...args: unknown[]);

	constructor() {
		this._core.onComplete('us.user').then(() => {
			const user = {};

			this._core.copy(this.us.user, user);

			this.user = user;
		});
	}

	// Update user profile
	formProfile: FormInterface = this._form.getForm('profile', {
		formId: 'profile',
		title: 'Profile Settings',
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
			}
		]
	});

	user: Record<string, unknown>;

	update(): void {
		this._core.copy(this.user, this.us.user);

		this.us.updateMe();
	}

	// Update user password
	formPassword: FormInterface = this._form.getForm('change password', {
		formId: 'change password',
		title: 'Change password',
		components: [
			{
				name: 'Password',
				key: 'oldPass',
				focused: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'Enter your old password'
					},
					{
						name: 'Label',
						value: 'Old Password'
					}
				]
			},
			{
				name: 'Password',
				key: 'newPass',
				fields: [
					{
						name: 'Placeholder',
						value: 'Enter your new password'
					},
					{
						name: 'Label',
						value: 'New Password'
					}
				]
			}
		]
	});

	changePassword(): void {
		this._form
			.modal<ChangePassword>(this.formPassword, {
				label: 'Change',
				click: (submition: unknown, close: () => void) => {
					this.us.changePassword(
						(submition as ChangePassword).oldPass,
						(submition as ChangePassword).newPass
					);

					close();
				}
			})
			.then((submition: ChangePassword) => {
				this.us.changePassword(submition.oldPass, submition.newPass);
			});
	}

	updateThumb(thumb: string | string[]): void {
		this.us.user.thumb = Array.isArray(thumb) ? thumb[0] : thumb;

		this.us.updateMe();
	}
}
