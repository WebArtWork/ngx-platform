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
import { TranslateService } from 'src/app/modules/translate/services/translate.service';
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

	readonly logo = environment.sign.logo;

	private _formService = inject(FormService);

	form = this._formService.prepareForm({
		formId: 'sign',
		title: 'Sign In / Sign Up',
		components: [
			{
				name: 'Email',
				key: 'email',
				focused: true,
				required: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'Enter your email',
					},
					{
						name: 'Label',
						value: 'Email',
					},
				],
			},
			{
				name: 'Password',
				key: 'password',
				required: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'Enter your password',
					},
					{
						name: 'Label',
						value: 'Password',
					},
				],
			},
			{
				name: 'Number',
				key: 'resetPin',
				fields: [
					{
						name: 'Placeholder',
						value: 'Enter code from email',
					},
					{
						name: 'Label',
						value: 'code',
					},
				],
				hidden: true,
			},
			{
				name: 'Button',
				fields: [
					{
						name: 'Label',
						value: "Let's go",
					},
					{
						name: 'Submit',
						value: true,
					},
					{
						name: 'Click',
						value: () => {
							this.submit();
						},
					},
				],
			},
		],
	});

	user = {
		email: environment.sign.email,
		password: environment.sign.password,
		resetPin: null,
	};

	submit() {
		if (!this.form.components[2].hidden && this.user.resetPin) {
			this.save();
		} else if (!this.user.email) {
			this._alert.error({
				text: 'Sign.Enter your email',
			});
		}

		if (!this._utilService.valid(this.user.email)) {
			this._alert.error({
				text: 'Sign.Enter proper email',
			});
		} else if (!this.user.password) {
			this._alert.error({
				text: 'Sign.Enter your password',
			});
		} else {
			this._http.post(
				'/api/user/status',
				this.user,
				(resp: RespStatus) => {
					if (resp.email && resp.pass) {
						this.login();
					} else if (resp.email) {
						this.reset();
					} else {
						this.sign();
					}
				},
			);
		}
	}

	login() {
		this._http.post('/api/user/login', this.user, this._set.bind(this));
	}

	sign() {
		this._http.post('/api/user/sign', this.user, this._set.bind(this));
	}

	reset() {
		this._http.post('/api/user/request', this.user, () => {
			this.form.components[2].hidden = false;

			this._cdr.detectChanges();
		});

		this._alert.info({
			text: 'Mail will sent to your email',
		});
	}

	save() {
		this._http.post('/api/user/change', this.user, (resp: boolean) => {
			if (resp) {
				this._alert.info({
					text: 'Password successfully changed',
				});
			} else {
				this._alert.error({
					text: 'Wrong Code',
				});
			}

			this.login();
		});
	}

	private _utilService = inject(UtilService);

	private _alert = inject(AlertService);

	private _http = inject(HttpService);

	private _router = inject(Router);

	private _translate = inject(TranslateService);

	private _cdr = inject(ChangeDetectorRef);

	private _set(user: User) {
		if (user) {
			const token = (user as unknown as { token: string }).token || '';

			if (token) {
				this._http.set('token', token);
			}

			localStorage.setItem('waw_user', JSON.stringify(user));

			this.userService.setUser(user);

			this.userService.get();

			this._router.navigateByUrl('/profile');
		} else {
			this._alert.error({
				text: 'Something went wrong',
			});
		}
	}
}
