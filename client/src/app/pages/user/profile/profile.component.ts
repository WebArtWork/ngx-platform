import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	inject,
} from '@angular/core';
import { FileComponent } from 'src/app/libs/file/components/file/file.component';
import { FormInterface } from 'src/app/libs/form/interfaces/form.interface';
import { FormService } from 'src/app/libs/form/services/form.service';
import { UserService } from 'src/app/modules/user/services/user.service';
import { environment } from 'src/environments/environment';
import { CoreService } from 'wacom';
import { ButtonComponent } from '../../../libs/button/button.component';
import { FormComponent } from '../../../libs/form/components/form/form.component';
import { TranslateDirective } from '../../../libs/translate/translate.directive';

interface ChangePassword {
	oldPass: string;
	newPass: string;
}

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		TranslateDirective,
		ButtonComponent,
		FileComponent,
		FormComponent,
	],
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
	private _form = inject(FormService);
	private _core = inject(CoreService);
	private _cdr = inject(ChangeDetectorRef);
	userService = inject(UserService);

	readonly url = environment.url;

	constructor() {
		this._core.onComplete('us.user').then(() => {
			const user = {};

			this._core.copy(this.userService.user, user);

			this.user = user;

			this._cdr.detectChanges();
		});
	}

	formUser: FormInterface = this._form.prepareForm({
		formId: 'user',
		title: 'My profile',
		components: [
			{
				name: 'Text',
				key: 'name',
				focused: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'Enter your name ...',
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
						value: 'Enter your phone ...',
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
						value: 'Enter your biography ...',
					},
					{
						name: 'Label',
						value: 'Biography',
					},
					{
						name: 'Textarea',
						value: true,
					},
				],
			},
		],
	});

	user: Record<string, unknown>;

	update() {
		this._core.copy(this.user, this.userService.user);

		this.userService.updateMe();
	}

	// Update user password
	formPassword: FormInterface = this._form.prepareForm({
		formId: 'changePassword',
		title: 'Change password',
		components: [
			{
				name: 'Password',
				key: 'oldPass',
				focused: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'Enter your old password ...',
					},
					{
						name: 'Label',
						value: 'Old Password',
					},
				],
			},
			{
				name: 'Password',
				key: 'newPass',
				fields: [
					{
						name: 'Placeholder',
						value: 'Enter your new password ...',
					},
					{
						name: 'Label',
						value: 'New Password',
					},
				],
			},
		],
	});

	changePassword() {
		this._form.modal<ChangePassword>(this.formPassword, {
			label: 'Change',
			click: (submition: unknown, close: () => void) => {
				this.userService.changePassword(
					(submition as ChangePassword).oldPass,
					(submition as ChangePassword).newPass,
				);

				close();
			},
		});
	}

	updateThumb(thumb: string | string[]) {
		this.userService.user.thumb = Array.isArray(thumb) ? thumb[0] : thumb;

		this.userService.updateMe();
	}
}
