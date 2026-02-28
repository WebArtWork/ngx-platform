import { required, schema } from '@angular/forms/signals';
import { SecurityModel } from './settings.interface';

export const securitySchema = schema<SecurityModel>((path) => {
	required(path.currentPassword, {
		message: 'Enter your current password...',
	});

	required(path.newPassword, {
		message: 'Enter your new password...',
	});

	required(path.confirmPassword, {
		message: 'Confirm your new password...',
	});
});
