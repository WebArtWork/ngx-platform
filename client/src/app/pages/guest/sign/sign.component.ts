import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	inject,
	signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env';
import { SpiderComponent } from '@icon/spider';
import { AlertService } from '@lib/alert';
import { ButtonComponent } from '@lib/button';
import { InputComponent } from '@lib/input';
import { User, UserService } from '@module/user';
import { VirtualFormService } from 'src/app/virtual-form.service';
import { HttpService, UtilService } from 'wacom';

interface RespStatus {
	email: string;
	pass: string;
}

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [SpiderComponent, InputComponent, ButtonComponent],
	templateUrl: './sign.component.html',
	styleUrl: './sign.component.scss',
})
export class SignComponent {
	userService = inject(UserService);
	private _virtualFormService = inject(VirtualFormService);
	private _utilService = inject(UtilService);
	private _alertService = inject(AlertService);
	private _httpService = inject(HttpService);
	private _router = inject(Router);
	private _cdr = inject(ChangeDetectorRef);

	readonly logo = environment.sign.logo;

	user = {
		email: environment.sign.email,
		password: environment.sign.password,
		resetPin: null,
	};

	showCode = signal(false);

	constructor() {
		this._virtualFormService.patch('sign', {
			email: environment.sign.email,
			password: environment.sign.password,
		});

		this._virtualFormService.setHandler('sign', 'onValidSubmit', (user) => {
			console.log(user);

			// this.user = user;

			// this.submit();
		});

		this._virtualFormService.setHandler(
			'sign',
			'onInvalidSubmit',
			(user) => {
				console.log(user);
			},
		);
	}

	wFormSubmit() {
		if (this.showCode() && this.user.resetPin) {
			this.change();

			return;
		}

		if (!this.user.email) {
			this._alertService.error({ text: 'Enter your email...' });

			return;
		}

		if (!this._utilService.valid(this.user.email)) {
			this._alertService.error({ text: 'Enter proper email...' });

			return;
		}

		if (!this.user.password) {
			this._alertService.error({ text: 'Enter your password...' });

			return;
		}

		this.submit();
	}

	submit() {
		this._httpService.post(
			'/api/user/status',
			this.user,
			(resp: RespStatus) => {
				if (resp.email && resp.pass) this.login();
				else if (resp.email) this.request();
				else this.sign();
			},
		);
	}

	private login() {
		this._httpService.post(
			'/api/user/login',
			this.user,
			this._set.bind(this),
		);
	}

	private sign() {
		this._httpService.post(
			'/api/user/sign',
			this.user,
			this._set.bind(this),
		);
	}

	private request() {
		this._httpService.post('/api/user/request', this.user, () => {
			this.showCode.set(true);

			this._alertService.info({
				text: 'Mail will be sent to your email',
			});

			this._cdr.detectChanges();
		});
	}

	private change() {
		this._httpService.post(
			'/api/user/change',
			this.user,
			(resp: boolean) => {
				if (resp) {
					this._alertService.info({
						text: 'Password successfully changed',
					});
				} else {
					this._alertService.error({ text: 'Wrong code' });
				}

				this.login();
			},
		);
	}

	private _set(user: User) {
		if (!user) {
			this._alertService.error({ text: 'Something went wrong' });
			return;
		}
		const token = (user as unknown as { token: string }).token || '';
		if (token) this._httpService.set('token', token);

		localStorage.setItem('waw_user', JSON.stringify(user));
		this.userService.setUser(user);
		this.userService.get();
		this._router.navigateByUrl('/profile');
	}
}
