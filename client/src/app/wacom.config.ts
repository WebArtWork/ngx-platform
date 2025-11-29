import { environment } from '@env';

export const wacomConfig = {
	store: {},
	http: {
		url: environment.url,
	},
	socket: environment.production,
	meta: {
		warnMissingGuard: false,
		useTitleSuffix: true,
		defaults: {
			title: environment.meta.title,
			favicon: environment.meta.favicon,
			description: environment.meta.description,
			titleSuffix: ' | ' + environment.meta.title,
			'og:image': environment.meta.image,
		},
	},
};
