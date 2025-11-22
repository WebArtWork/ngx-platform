export interface ProfileModel {
	name: string;
	email: string;
	phone: string;
	bio: string;
}

export interface SecurityModel {
	currentPassword: string;
	newPassword: string;
	confirmPassword: string;
}
