import {
	importProvidersFrom,
	provideZonelessChangeDetection,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
	PreloadAllModules,
	provideRouter,
	withInMemoryScrolling,
	withPreloading,
} from '@angular/router';
import { NgxTinymceModule } from 'ngx-tinymce';
import { environment } from 'src/environments/environment';
import { provideWacom } from 'wacom';
import { routes } from './app.routes';
import { AdminsGuard } from './modules/user/guards/admins.guard';
import { AuthenticatedGuard } from './modules/user/guards/authenticated.guard';
import { GuestGuard } from './modules/user/guards/guest.guard';

export const appConfig = {
	providers: [
		provideZonelessChangeDetection(),
		provideWacom({
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
			theme: {
				primary: '#282828',
				secondary: '#ffffff',
				info: '#9ddeff',
				error: '#ffafb4',
				success: '#a6efb8',
				warning: '#ffcfa5',
				question: '#fff9b2',
			},
		}),
		importProvidersFrom(
			BrowserModule,
			NgxTinymceModule.forRoot({
				baseURL: '//cdnjs.cloudflare.com/ajax/libs/tinymce/5.7.1/',
			}),
		),
		/* providers */
		AuthenticatedGuard,
		GuestGuard,
		AdminsGuard,
		provideRouter(
			routes,
			withPreloading(PreloadAllModules),
			withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
		),
	],
};
