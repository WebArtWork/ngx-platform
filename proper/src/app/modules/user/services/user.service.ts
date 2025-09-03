import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import {
	AlertService,
	CoreService,
	CrudService,
	HttpService,
	StoreService,
} from 'wacom';
import { User } from '../interfaces/user.interface';
@Injectable({
	providedIn: 'root',
})
export class UserService extends CrudService<User> {
	readonly url = environment.url;

	roles = (
		(environment as unknown as { roles: string[] }).roles || []
	).concat(['admin']);

	employees = (environment as unknown as { roles: string[] }).roles || [];

	theme = 'dark';

	themes = (
		(environment as unknown as { themes: string[] }).themes || []
	).concat(['dark', 'white']);

	users = signal<User[]>(this.getDocs());

	user = signal<User>(
		localStorage.getItem('waw_user')
			? JSON.parse(localStorage.getItem('waw_user') as string)
			: this.new(),
	);

	thumb = signal(
		!this.user().thumb || this.user().thumb.includes('assets/default.png')
			? 'assets/default.png'
			: this.url + this.user().thumb,
	);

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

		this._store.get('mode', (mode) => {
			if (mode) {
				this.setTheme(mode);
			} else {
				this.setTheme('dark');
			}
		});

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

	toggleTheme() {
		this.setTheme(this.theme === 'dark' ? 'white' : 'dark');
	}

	setTheme(theme = 'white') {
		if (theme === 'white') {
			this._store.remove('theme');

			for (const localtheme of this.themes) {
				(document.body.parentNode as HTMLElement).classList.remove(
					localtheme,
				);
			}
		} else {
			this._store.set('theme', theme);

			(document.body.parentNode as HTMLElement).classList.add(theme);
		}

		this.theme = theme;
	}

	setUser(user: User): void {
		this.user.set(user);

		localStorage.setItem('waw_user', JSON.stringify(user));

		this._core.complete('us.user');
	}

	updateMe(): void {
		this.setUser(this.user());

		this.update(this.user());
	}

	updateMeAfterWhile(): void {
		this.setUser(this.user());

		this.updateAfterWhile(this.user());
	}

	changePassword(oldPass: string, newPass: string): void {
		if (this._changingPassword) return;

		this._changingPassword = true;

		this._http.post(
			'/api/user/changePassword',
			{
				newPass: newPass,
				oldPass: oldPass,
			},
			(resp: boolean) => {
				this._changingPassword = false;

				if (resp) {
					this._alert.info({
						text: 'Successfully changed password',
					});
				} else {
					this._alert.error({
						text: 'Incorrect current password',
					});
				}
			},
		);
	}

	logout(): void {
		this.user.set(this.new());

		localStorage.removeItem('waw_user');

		this._http.remove('token');

		this._http.get('/api/user/logout');

		this._router.navigateByUrl('/sign');

		setTimeout(() => {
			location.reload();
		}, 100);
	}

	updateAdmin(user: User): void {
		this.update(user, {
			name: 'admin',
		});
	}

	deleteAdmin(user: User): void {
		this.delete(user, {
			name: 'admin',
		});
	}

	private _changingPassword = false;

	private _http = inject(HttpService);

	private _store = inject(StoreService);

	private _alert = inject(AlertService);

	private _core = inject(CoreService);

	private _router = inject(Router);
}
