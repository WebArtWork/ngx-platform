import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	signal,
} from '@angular/core';
import { form, submit } from '@angular/forms/signals';
import { AlertService } from '@lib/alert';
import { ButtonComponent } from '@lib/button';
import { InputComponent } from '@lib/input';
import { NEW_USER, User, UserService } from '@module/user';
import { clientSchema } from './client.schema';

@Component({
	selector: 'app-client',
	imports: [ButtonComponent, InputComponent],
	templateUrl: './client.component.html',
	styleUrl: './client.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientComponent {
	private readonly _userService = inject(UserService);
	private readonly _alertService = inject(AlertService);

	readonly clientModel = signal<User>(NEW_USER);

	readonly clientForm = form(this.clientModel, clientSchema);
	readonly isSubmitDisabled = computed(() => this.clientForm().invalid());
	wFormSubmit() {
		submit(this.clientForm, async (field) => {
			this._userService.create(field().value()).subscribe(() => {
				this._alertService.success({
					text: 'Client has been created',
				});
			});

			this.clientModel.set(NEW_USER);

			return null; // no submission errors
		});
	}
}
