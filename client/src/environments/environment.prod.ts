// Form components mapping is managed in `src/app/app.formcomponents.ts`.

export const environment = {
	roles: [],
	production: true,
	appId: 'appId',
	url: 'https://api.webart.work',
	sign: {
		logo: '',
		email: '',
		password: '',
	},
	image: {
		default: 'https://ngx.webart.work/assets/logo.png',
		logo: 'https://ngx.webart.work/assets/logo.png',
	},
	meta: {
		title: 'Web Art Work',
		description:
			'An amazing solution to build web or mobile app for your business',
		favicon: 'https://ngx.webart.work/assets/favicon.ico',
		image: 'https://ngx.webart.work/assets/logo.png',
	},
	defaultLanguageCode: 'en',
	languages: [
		{
			name: 'Ukrainian',
			origin: 'українська',
			code: 'uk',
		},
		{
			code: 'en',
			name: 'English',
			origin: 'English',
		},
	],
};
