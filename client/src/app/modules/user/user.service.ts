import {
	Injectable,
	WritableSignal,
	computed,
	inject,
	signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '@lib/alert';
import { environment } from 'src/environments/environment';
import { CrudService, EmitterService, HttpService } from 'wacom';
import { User } from './user.interface';
@Injectable({
	providedIn: 'root',
})
export class UserService extends CrudService<User> {
	private readonly _httpService = inject(HttpService);

	private readonly _alertService = inject(AlertService);

	private readonly _router = inject(Router);

	private readonly _emitterService = inject(EmitterService);

	readonly url = environment.url;

	roles = (
		(environment as unknown as { roles: string[] }).roles || []
	).concat(['admin']);

	employees = (environment as unknown as { roles: string[] }).roles || [];

	users = signal<User[]>(this.getDocs());

	user = signal<User>(
		localStorage.getItem('waw_user')
			? JSON.parse(localStorage.getItem('waw_user') as string)
			: this.new(),
	);

	thumb = computed(() => {
		return !this.user().thumb ||
			this.user().thumb.includes('assets/default.png')
			? 'assets/default.png'
			: this.url + this.user().thumb;
	});

	role(role: string): boolean {
		return !!(this.user().is || {})[role];
	}

	usersByRole: Record<string, WritableSignal<User[]>> = {};

	constructor() {
		super({
			name: 'user',
			replace: (user) => {
				user.roles = [];
				user.data = user.data || {};
				user.is = user.is || {};

				for (const field of (
					environment as unknown as { userFields: string[] }
				).userFields || []) {
					user.data[field] = user.data[field] || {};
				}

				for (const role of this.roles) {
					if (user.is[role]) {
						user.roles.push(role);
					}
				}

				return user;
			},
		});

		this.filteredDocuments(
			{},
			{
				field: 'roles',
				filtered: (splitted) => {
					for (const role in splitted) {
						if (this.usersByRole[role]) {
							this.usersByRole[role].set(
								(splitted as Record<string, User[]>)[role],
							);
						} else {
							this.usersByRole[role] = signal(
								(splitted as Record<string, User[]>)[role],
							);
						}
					}
				},
			},
		);

		if (localStorage.getItem('waw_user')) {
			this.fetch({}, { name: 'me' }).subscribe((user: User) => {
				if (user) {
					if (
						!localStorage.getItem('waw_user') &&
						this._router.url === '/sign'
					) {
						this._router.navigateByUrl('/profile');
					}

					this.setUser(user);
				} else if (localStorage.getItem('waw_user')) {
					this.logout();
				}
			});

			this.get({
				query: environment.appId ? 'appId=' + environment.appId : '',
			});
		}
	}

	setUser(user: User) {
		this.user.set(user);

		localStorage.setItem('waw_user', JSON.stringify(user));

		this._emitterService.complete('us.user');
	}

	updateMe() {
		this.setUser(this.user());

		return this.update(this.user()).subscribe(() => {
			this._alertService.info({
				text: 'Profile information has been updated',
			});
		});
	}

	updateMeAfterWhile() {
		this.setUser(this.user());

		this.updateAfterWhile(this.user());
	}

	changePassword(oldPass: string, newPass: string) {
		return this._httpService.post(
			'/api/user/changePassword',
			{
				newPass: newPass,
				oldPass: oldPass,
			},
			(resp: boolean) => {
				if (resp) {
					this._alertService.info({
						text: 'Successfully changed password',
					});
				} else {
					this._alertService.error({
						text: 'Incorrect current password',
					});
				}
			},
		);
	}

	logout() {
		this.user.set(this.new());

		localStorage.removeItem('waw_user');

		this._httpService.remove('token');

		this._httpService.get('/api/user/logout');

		this._router.navigateByUrl('/sign');

		setTimeout(() => {
			location.reload();
		}, 100);
	}

	updateAdmin(user: User) {
		return this.update(user, {
			name: 'admin',
		});
	}

	deleteAdmin(user: User) {
		return this.delete(user, {
			name: 'admin',
		});
	}
}
