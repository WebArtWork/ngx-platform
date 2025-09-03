import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	inject,
} from '@angular/core';
import { ButtonComponent } from 'src/app/libs/button/button.component';
import { FileComponent } from 'src/app/libs/file/components/file/file.component';
import { FormComponent } from 'src/app/libs/form/components/form/form.component';
import { FormService } from 'src/app/libs/form/services/form.service';
import { TranslateDirective } from 'src/app/modules/translate/directives/translate.directive';
import { UserService } from 'src/app/modules/user/services/user.service';
import { environment } from 'src/environments/environment';
import { CoreService } from 'wacom';

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
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
	userService = inject(UserService);

	readonly url = environment.url;

	constructor() {
		this._coreService.onComplete('us.user').then(() => {
			const user = {};

			this._coreService.copy(this.userService.user, user);

			this.user = user;

			this._cdr.detectChanges();
		});
	}

	private _formService = inject(FormService);

	formUser = this._formService.prepareForm({
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

	formPassword = this._formService.prepareForm({
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

	user: Record<string, unknown>;

	update() {
		this._coreService.copy(this.user, this.userService.user);

		this.userService.updateMe();
	}

	changePassword() {
		this._formService.modal<ChangePassword>(this.formPassword, {
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
		this.userService.user.update((user) => {
			user.thumb = Array.isArray(thumb) ? thumb[0] : thumb;

			return user;
		});

		this.userService.updateMe();
	}

	private _coreService = inject(CoreService);

	private _cdr = inject(ChangeDetectorRef);
}
