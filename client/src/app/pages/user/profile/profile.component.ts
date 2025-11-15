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

	// Local editable snapshot passed into <wform>
	user: Record<string, unknown>;

	constructor() {
		this._emitterService.onComplete('us.user').subscribe(() => {
			this.user = {};
			// clone current user into plain object
			this._coreService.copy(this.userService.user(), this.user);
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
				required: true,
				props: {
					placeholder: 'Enter your name ...',
					label: 'Name',
				},
			},
			{
				name: 'Text',
				key: 'phone',
				props: {
					placeholder: 'Enter your phone ...',
					label: 'Phone',
				},
			},
			{
				name: 'Text',
				key: 'bio',
				props: {
					placeholder: 'Enter your biography ...',
					label: 'Biography',
					textarea: true,
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
				required: true,
				props: {
					placeholder: 'Enter your old password ...',
					label: 'Old Password',
				},
			},
			{
				name: 'Password',
				key: 'newPass',
				required: true,
				props: {
					placeholder: 'Enter your new password ...',
					label: 'New Password',
				},
			},
		],
	});

	// gets called with VirtualFormService.getValues(formId)
	update(values: Record<string, unknown>) {
		if (!values) return;

		// sync local snapshot used as [submition]
		if (!this.user) this.user = {};
		this._coreService.copy(values, this.user);

		// sync user signal and push to backend
		this.userService.user.update((current) => {
			const next = { ...current };
			this._coreService.copy(values, next as any);
			return next;
		});

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
