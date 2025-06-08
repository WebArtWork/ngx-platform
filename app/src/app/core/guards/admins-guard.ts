import { CanActivateFn } from '@angular/router';

export const adminsGuard: CanActivateFn = (route, state) => {
	return true;
};
