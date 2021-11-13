import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Core
import { GuestComponent } from './layout/guest/guest.component';
import { UserComponent } from './layout/user/user.component';
import { Authenticated, Guest, Admins } from '@services';
import { AppComponent } from './app.component';
import { CoreModule } from '@core';
// config
import { WacomModule, MetaGuard } from 'wacom';
const routes: Routes = [{
	path: '',
	canActivate: [Guest],
	component: GuestComponent,
	children: [/* guest */{
		path: '',
		canActivate: [MetaGuard],
		data: {
			meta: {
				title: 'Sign'
			}
		},
		loadChildren: () => import('./pages/guest/sign/sign.module').then(m => m.SignModule)
	}]
}, {
	path: '',
	canActivate: [Authenticated],
	component: UserComponent,
	children: [/* user */{
		path: 'profile',
		canActivate: [MetaGuard],
		data: {
			meta: {
				title: 'My Profile'
			}
		},
		loadChildren: () => import('./pages/user/profile/profile.module').then(m => m.ProfileModule)
	}]
}, {
	path: 'admin',
	canActivate: [Admins],
	component: UserComponent,
	children: [/* admin */{
		path: 'users',
		canActivate: [MetaGuard],
		data: {
			meta: {
				title: 'Users'
			}
		},
		loadChildren: () => import('./pages/admin/users/users.module').then(m => m.UsersModule)
	}]
}, {
	path: '**', redirectTo: 'profile', pathMatch: 'full'
}];

@NgModule({
	declarations: [ /* declarations */
		AppComponent,
		GuestComponent,
		UserComponent
	],
	entryComponents: [ /* entryComponents */
	],
	imports: [
		CoreModule,
		BrowserModule,
		WacomModule.forRoot({
			socket: false,
			meta: {
				useTitleSuffix: true,
				defaults: {
					title: 'Web Art Work',
					titleSuffix: ' | Web Art Work',
					'og:image': 'https://webart.work/api/user/cdn/waw-logo.png'
				}
			},
			alert: {
				alerts: { /* alerts */
				}
			},
			modal: {
				modals: { /* modals */
				}
			},
			popup: {
				popups: { /* popups */
				}
			},
			loader: {
				loaders: { /* loaders */
				}
			}
		}),
		RouterModule.forRoot(routes, {
			scrollPositionRestoration: 'enabled',
			preloadingStrategy: PreloadAllModules,
			relativeLinkResolution: 'legacy'
		})
	],
	providers: [Authenticated, Guest, Admins],
	bootstrap: [AppComponent]
})
export class AppModule { }
