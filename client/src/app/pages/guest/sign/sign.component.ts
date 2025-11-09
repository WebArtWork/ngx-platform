import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { SpiderComponent } from 'src/app/icons/spider/spider.component';
import { FormComponent } from 'src/app/libs/form/components/form/form.component';
import { FormService } from 'src/app/libs/form/services/form.service';
import { User } from 'src/app/modules/user/interfaces/user.interface';
import { UserService } from 'src/app/modules/user/services/user.service';
import { environment } from 'src/environments/environment';
import { AlertService, HttpService, UtilService } from 'wacom';

interface RespStatus {
	email: string;
	pass: string;
}

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [SpiderComponent, FormComponent],
	templateUrl: './sign.component.html',
	styleUrl: './sign.component.scss',
})
export class SignComponent {
	userService = inject(UserService);
	private _formService = inject(FormService);
	private _utilService = inject(UtilService);
	private _alertService = inject(AlertService);
	private _httpService = inject(HttpService);
	private _router = inject(Router);
	private _cdr = inject(ChangeDetectorRef);

	readonly logo = environment.sign.logo;

	form = this._formService.prepareForm({
		formId: 'sign',
		title: 'Sign In / Sign Up',
		components: [
			{
				name: 'Email',
				key: 'email',
				focused: true,
				required: true,
				props: {
					Label: 'Email',
					Placeholder: 'Enter your email',
				},
			},
			{
				name: 'Password',
				key: 'password',
				required: true,
				props: {
					Label: 'Password',
					Placeholder: 'Enter your password',
				},
			},
			{
				name: 'Number',
				key: 'resetPin',
				hidden: true,
				props: {
					Label: 'Code',
					Placeholder: 'Enter code from email',
				},
			},
			{
				name: 'Button',
				props: {
					Label: "Let's go",
					Submit: true,
					Click: () => this.submit(),
				},
			},
		],
	});

	user = {
		email: environment.sign.email,
		password: environment.sign.password,
		resetPin: null,
	};

	submit(): void {
		if (!this.form.components[2].hidden && this.user.resetPin) {
			this.save();
			return;
		}

		if (!this.user.email) {
			this._alertService.error({ text: 'Sign.Enter your email' });
			return;
		}

		if (!this._utilService.valid(this.user.email)) {
			this._alertService.error({ text: 'Sign.Enter proper email' });
			return;
		}

		if (!this.user.password) {
			this._alertService.error({ text: 'Sign.Enter your password' });
			return;
		}

		this._httpService.post(
			'/api/user/status',
			this.user,
			(resp: RespStatus) => {
				if (resp.email && resp.pass) this.login();
				else if (resp.email) this.reset();
				else this.sign();
			},
		);
	}

	private login(): void {
		this._httpService.post(
			'/api/user/login',
			this.user,
			this._set.bind(this),
		);
	}

	private sign(): void {
		this._httpService.post(
			'/api/user/sign',
			this.user,
			this._set.bind(this),
		);
	}

	private reset(): void {
		this._httpService.post('/api/user/request', this.user, () => {
			this.form.components[2].hidden = false;
			this._cdr.detectChanges();
		});
		this._alertService.info({ text: 'Mail will be sent to your email' });
	}

	private save(): void {
		this._httpService.post(
			'/api/user/change',
			this.user,
			(resp: boolean) => {
				if (resp)
					this._alertService.info({
						text: 'Password successfully changed',
					});
				else this._alertService.error({ text: 'Wrong code' });
				this.login();
			},
		);
	}

	private _set(user: User): void {
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
