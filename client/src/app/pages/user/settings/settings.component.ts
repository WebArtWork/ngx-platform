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
import { ThemeComponent } from '@icon/theme';
import { ButtonComponent } from '@lib/button';
import { InputComponent } from '@lib/input';
import { LanguageService } from '@lib/translate';
import { UserService } from '@module/user';
import { SecurityModel } from './settings.interface';
import { securitySchema } from './settings.schema';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		InputComponent,
		ButtonComponent,
		ThemeComponent,
		MaterialComponent,
	],
	templateUrl: './settings.component.html',
})
export class SettingsComponent {
	readonly userService = inject(UserService);
	readonly languageService = inject(LanguageService);

	// Security
	readonly securityModel = signal<SecurityModel>({
		currentPassword: '',
		newPassword: '',
		confirmPassword: '',
	});

	readonly securityForm = form(this.securityModel, securitySchema);

	readonly isSecurityDisabled = computed(() => {
		const m = this.securityModel();
		return (
			this.securityForm().invalid() || m.newPassword !== m.confirmPassword
		);
	});

	wSecuritySubmit(): void {
		submit(this.securityForm, (formTree) => {
			const payload = formTree().value() as SecurityModel;

			this.userService
				.changePassword(payload.currentPassword, payload.newPassword)
				.pipe(takeUntilDestroyed())
				.subscribe({
					next: () => {
						this.securityForm().reset();
						this.securityModel.set({
							currentPassword: '',
							newPassword: '',
							confirmPassword: '',
						});
					},
				});

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
