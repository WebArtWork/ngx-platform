import {
	enableProdMode,
	importProvidersFrom,
	provideZonelessChangeDetection,
} from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import {
	PreloadAllModules,
	provideRouter,
	withInMemoryScrolling,
	withPreloading,
} from '@angular/router';
import { NgxTinymceModule } from 'ngx-tinymce';
import { WacomModule } from 'wacom';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { AdminsGuard } from './app/core/guards/admins.guard';
import { AuthenticatedGuard } from './app/core/guards/authenticated.guard';
import { GuestGuard } from './app/core/guards/guest.guard';
import { environment } from './environments/environment';

if (environment.production) {
	enableProdMode();
}

bootstrapApplication(AppComponent, {
	providers: [
		provideZonelessChangeDetection(),
		importProvidersFrom(
			BrowserModule,
			NgxTinymceModule.forRoot({
				baseURL: '//cdnjs.cloudflare.com/ajax/libs/tinymce/5.7.1/',
			}),
			WacomModule.forRoot({
				store: {},
				http: {
					url: environment.url,
				},
				socket: environment.production,
				meta: {
					useTitleSuffix: true,
					defaults: {
						title: environment.meta.title,
						favicon: environment.meta.favicon,
						description: environment.meta.description,
						titleSuffix: ' | ' + environment.meta.title,
						'og:image': environment.meta.image,
					},
				},
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
})
	// eslint-disable-next-line no-console
	.catch((err) => console.error(err));
