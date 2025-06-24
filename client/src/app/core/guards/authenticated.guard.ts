import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticatedGuard {
	private router = inject(Router);

	/** Inserted by Angular inject() migration for backwards compatibility */
	constructor(...args: unknown[]);

	constructor() {}

	canActivate(): boolean {
		if (localStorage.getItem('waw_user')) {
			return true;
		} else {
			this.router.navigateByUrl('/sign');

			return false;
		}
	}
}
