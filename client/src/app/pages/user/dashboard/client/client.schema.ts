import { required, schema } from '@angular/forms/signals';
import { User } from '@module/user';

export const clientSchema = schema<User>((path) => {
	required(path.name, { message: 'Enter your name...' });
	required(path.email, { message: 'Enter your email...' });
	required(path.phone, { message: 'Enter your phone...' });
});
