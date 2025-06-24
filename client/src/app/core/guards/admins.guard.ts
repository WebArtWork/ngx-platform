import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AdminsGuard {
	private router = inject(Router);

	/** Inserted by Angular inject() migration for backwards compatibility */
	constructor(...args: unknown[]);

	constructor() {}

	canActivate(): boolean {
		if (localStorage.getItem('waw_user')) {
			const user = JSON.parse(localStorage.getItem('waw_user') as string);

			if (user.is && user.is.admin) return true;

			this.router.navigate(['/profile']);

			return false;
		} else {
			this.router.navigate(['/sign']);

			return false;
		}
	}
}
