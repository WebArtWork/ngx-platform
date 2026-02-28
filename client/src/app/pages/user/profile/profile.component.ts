import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { form, submit } from '@angular/forms/signals';
import { MaterialComponent } from '@icon/material';
import { ButtonComponent } from '@lib/button';
import { FileComponent } from '@lib/file';
import { InputComponent } from '@lib/input';
import { UserService } from '@module/user';
import { EmitterService } from 'wacom';
import { ProfileModel } from './profile.interface';
import { profileSchema } from './profile.schema';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		InputComponent,
		ButtonComponent,
		FileComponent,
		MaterialComponent,
	],
	templateUrl: './profile.component.html',
})
export class ProfileComponent {
	readonly userService = inject(UserService);
	private readonly _emitterService = inject(EmitterService);

	// Profile
	private readonly _initialProfile = computed<ProfileModel>(() => {
		const u = this.userService.user();
		return {
			name: u.name || '',
			phone: u.phone || '',
			bio: u.bio || '',
		};
	});

	readonly profileModel = signal<ProfileModel>(this._initialProfile());
	readonly profileForm = form(this.profileModel, profileSchema);
	readonly isSubmitDisabled = computed(() => this.profileForm().invalid());

	constructor() {
		// Keep model in sync when user changes via emitter event.
		this._emitterService
			.onComplete('us.user')
			.pipe(takeUntilDestroyed())
			.subscribe(() => {
				this.profileModel.set(this._initialProfile());
				this.profileForm().reset();
			});
	}

	wFormSubmit(): void {
		submit(this.profileForm, (formTree) => {
			this.userService.user.set({
				...this.userService.user(),
				...(formTree().value() as ProfileModel),
			});

			this.userService.updateMe();
			return Promise.resolve();
		});
	}

	updateThumb(thumb: string): void {
		this.userService.user.set({
			...this.userService.user(),
			thumb,
		});

		this.userService.updateMe();
	}
}
