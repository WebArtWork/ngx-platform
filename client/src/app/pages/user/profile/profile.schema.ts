import { required, schema } from '@angular/forms/signals';
import { ProfileModel } from './profile.interface';

export const profileSchema = schema<ProfileModel>((path) => {
	required(path.name, { message: 'Enter your name...' });

	required(path.phone, { message: 'Enter your phone...' });

	required(path.bio, { message: 'Enter your biography...' });
});
