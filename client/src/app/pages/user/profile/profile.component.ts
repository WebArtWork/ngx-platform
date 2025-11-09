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
import { CoreService, EmitterService } from 'wacom';

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

	private _formService = inject(FormService);
	private _coreService = inject(CoreService);
	private _emitterService = inject(EmitterService);
	private _cdr = inject(ChangeDetectorRef);

	user: Record<string, unknown>;

	constructor() {
		this._emitterService.onComplete('us.user').subscribe(() => {
			const user: any = {};
			this._coreService.copy(this.userService.user(), user);
			this.user = user;
			this._cdr.detectChanges();
		});
	}

	formUser = this._formService.prepareForm({
		formId: 'user',
		title: 'My profile',
		components: [
			{
				name: 'Text',
				key: 'name',
				focused: true,
				props: {
					Placeholder: 'Enter your name ...',
					Label: 'Name',
					Required: true,
				},
			},
			{
				name: 'Text',
				key: 'phone',
				props: {
					Placeholder: 'Enter your phone ...',
					Label: 'Phone',
				},
			},
			{
				name: 'Text',
				key: 'bio',
				props: {
					Placeholder: 'Enter your biography ...',
					Label: 'Biography',
					Textarea: true,
				},
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
				props: {
					Placeholder: 'Enter your old password ...',
					Label: 'Old Password',
					Required: true,
				},
			},
			{
				name: 'Password',
				key: 'newPass',
				props: {
					Placeholder: 'Enter your new password ...',
					Label: 'New Password',
					Required: true,
				},
			},
		],
	});

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
}
