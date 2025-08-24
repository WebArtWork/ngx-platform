import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormInterface } from 'src/app/libs/form/interfaces/form.interface';
import { FormService } from 'src/app/libs/form/services/form.service';
import { TableComponent } from 'src/app/libs/table/table.component';
import { TranslateService } from 'src/app/libs/translate/translate.service';
import { AlertService, CoreService } from 'wacom';
import { userFormComponents } from '../../formcomponents/user.formcomponents';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [TableComponent],
	templateUrl: './clients.component.html',
	styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent {
	private _translate = inject(TranslateService);
	private _userService = inject(UserService);
	private _alertService = inject(AlertService);
	private _core = inject(CoreService);
	private _form = inject(FormService);

	columns = ['name', 'email'];

	form: FormInterface = this._form.prepareForm(userFormComponents);

	users: User[] = [];

	private _page = 1;

	setUsers(page = this._page) {
		this._page = page;

		this._core.afterWhile(
			this,
			() => {
				this._userService.get({ page }).subscribe((users) => {
					this.users.splice(0, this.users.length);

					this.users.push(...users);
				});
			},
			250,
		);
	}

	config = {
		paginate: this.setUsers.bind(this),
		perPage: 20,
		setPerPage: this._userService.setPerPage.bind(this._userService),
		allDocs: false,
		create: () => {
			this._form
				.modal<User>(this.form, {
					label: 'Create',
					click: (created: unknown, close: () => void) => {
						this._userService.create(created as User, {
							alert: this._translate.translate(
								'User.Client has been created',
							),
							callback: () => {
								this.setUsers();
								close();
							},
						});
					},
				})
				.then(this._userService.create.bind(this));
		},
		update: (doc: User) => {
			this._form.modal<User>(this.form, [], doc).then((updated: User) => {
				this._core.copy(updated, doc);

				this._userService.update(doc, {
					alert: this._translate.translate(
						'User.Client has been updated',
					),
				});
			});
		},
		delete: (user: User) => {
			this._alertService.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this client?',
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: () => {
							this._userService.delete(user, {
								name: 'admin',
								alert: this._translate.translate(
									'User.Client has been deleted',
								),
								callback: () => {
									this.setUsers();
								},
							});
						},
					},
				],
			});
		},
	};

	constructor() {
		this.setUsers();
	}
}
