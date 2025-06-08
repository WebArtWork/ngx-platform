import { CanActivateFn } from '@angular/router';

export const guestsGuard: CanActivateFn = (route, state) => {
  return true;
};
