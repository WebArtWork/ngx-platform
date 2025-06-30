import { enableProdMode, importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
	PreloadAllModules,
	Routes,
	provideRouter,
	withInMemoryScrolling,
	withPreloading
} from '@angular/router';
import { NgxTinymceModule } from 'ngx-tinymce';
import { MetaGuard, WacomModule } from 'wacom';
import { AppComponent } from './app/app.component';
import { AdminsGuard } from './app/core/guards/admins.guard';
import { AuthenticatedGuard } from './app/core/guards/authenticated.guard';
import { GuestGuard } from './app/core/guards/guest.guard';
import { environment } from './environments/environment';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/sign',
		pathMatch: 'full'
	},
	{
		path: '',
		canActivate: [GuestGuard],
		loadComponent: () =>
			import('./app/core/theme/guest/guest.component').then(
				(m) => m.GuestComponent
			),
		children: [
			/* guest */
			{
				path: 'sign',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Sign'
					}
				},
				loadChildren: () =>
					import('./app/pages/guest/sign/sign.routes').then(
						(m) => m.routes
					)
			}
		]
	},
	{
		path: '',
		canActivate: [AuthenticatedGuard],
		loadComponent: () =>
			import('./app/core/theme/user/user.component').then(
				(m) => m.UserComponent
			),
		children: [
			/* user */
			{
				path: 'profile',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'My Profile'
					}
				},
				loadChildren: () =>
					import('./app/pages/user/profile/profile.routes').then(
						(m) => m.routes
					)
			}
		]
	},
	{
		path: '',
		loadComponent: () =>
			import('./app/core/theme/public/public.component').then(
				(m) => m.PublicComponent
			),
		children: [
			/* user */
			{
				path: 'document',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Document'
					}
				},
				loadChildren: () =>
					import('./app/pages/guest/document/document.routes').then(
						(m) => m.routes
					)
			}
		]
	},
	{
		path: 'admin',
		canActivate: [AdminsGuard],
		loadComponent: () =>
			import('./app/core/theme/user/user.component').then(
				(m) => m.UserComponent
			),
		children: [
			/* admin */
			{
				path: 'users',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Users'
					}
				},
				loadChildren: () =>
					import('./app/modules/user/pages/users/users.routes').then(
						(m) => m.routes
					)
			},
			{
				path: 'forms',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Forms'
					}
				},
				loadChildren: () =>
					import(
						'./app/modules/customform/pages/customforms/customforms.routes'
					).then((m) => m.routes)
			},
			{
				path: 'translates',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Translates'
					}
				},
				loadChildren: () =>
					import(
						'./app/libs/translate/pages/translates/translates.routes'
					).then((m) => m.routes)
			}
		]
	},
	{
		path: '**',
		redirectTo: 'profile',
		pathMatch: 'full'
	}
];

if (environment.production) {
	enableProdMode();
}

bootstrapApplication(AppComponent, {
	providers: [
		importProvidersFrom(
			BrowserModule,
			NgxTinymceModule.forRoot({
				baseURL: '//cdnjs.cloudflare.com/ajax/libs/tinymce/5.7.1/'
			}),
			WacomModule.forRoot({
				store: {},
				http: {
					url: environment.url
				},
				socket: environment.production,
				meta: {
					useTitleSuffix: true,
					defaults: {
						title: environment.meta.title,
						favicon: environment.meta.favicon,
						description: environment.meta.description,
						titleSuffix: ' | ' + environment.meta.title,
						'og:image': environment.meta.image
					}
				}
			})
		),
		/* providers */
		AuthenticatedGuard,
		GuestGuard,
		AdminsGuard,
		provideAnimations(),
		provideRouter(
			routes,
			withPreloading(PreloadAllModules),
			withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })
		)
	]
})
	// eslint-disable-next-line no-console
	.catch((err) => console.error(err));
