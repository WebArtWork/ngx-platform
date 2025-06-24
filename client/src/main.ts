import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { AuthenticatedGuard } from './app/core/guards/authenticated.guard';
import { Routes, withPreloading, withInMemoryScrolling, provideRouter, PreloadAllModules } from '@angular/router';
import { GuestGuard } from './app/core/guards/guest.guard';

import { MetaGuard, WacomModule } from 'wacom';


import { AdminsGuard } from './app/core/guards/admins.guard';
import { CoreModule } from 'src/app/core/core.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { environment as environment_1 } from 'src/environments/environment';
import { AppComponent } from './app/app.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/sign',
        pathMatch: 'full'
    },
    {
        path: '',
        canActivate: [GuestGuard],
        loadComponent: () => import('./app/core/theme/guest/guest.component').then(m => m.GuestComponent),
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
                loadChildren: () => import("./app/pages/guest/sign/sign.module").then((m) => m.SignModule)
            }
        ]
    },
    {
        path: '',
        canActivate: [AuthenticatedGuard],
        loadComponent: () => import('./app/core/theme/user/user.component').then(m => m.UserComponent),
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
                loadChildren: () => import("./app/pages/user/profile/profile.module").then((m) => m.ProfileModule)
            }
        ]
    },
    {
        path: '',
        loadComponent: () => import('./app/core/theme/public/public.component').then(m => m.PublicComponent),
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
                loadChildren: () => import("./app/pages/guest/document/document.module").then((m) => m.DocumentModule)
            },
            {
                path: 'components',
                canActivate: [MetaGuard],
                data: {
                    meta: {
                        title: 'Components'
                    }
                },
                loadChildren: () => import("./app/pages/guest/components/components.module").then((m) => m.ComponentsModule)
            }
        ]
    },
    {
        path: 'admin',
        canActivate: [AdminsGuard],
        loadComponent: () => import('./app/core/theme/user/user.component').then(m => m.UserComponent),
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
                loadChildren: () => import("./app/modules/user/pages/users/users.module").then((m) => m.UsersModule)
            },
            {
                path: 'forms',
                canActivate: [MetaGuard],
                data: {
                    meta: {
                        title: 'Forms'
                    }
                },
                loadChildren: () => import("./app/modules/customform/pages/customforms/customforms.module").then((m) => m.CustomformsModule)
            },
            {
                path: 'translates',
                canActivate: [MetaGuard],
                data: {
                    meta: {
                        title: 'Translates'
                    }
                },
                loadChildren: () => import("./app/core/modules/translate/pages/translates/translates.module").then((m) => m.TranslatesModule)
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
        importProvidersFrom(CoreModule, BrowserModule, WacomModule.forRoot({
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
            },
            modal: {
                modals: {
                /* modals */
                }
            },
            alert: {
                alerts: {
                /* alerts */
                }
            },
            loader: {
                loaders: {
                /* loaders */
                }
            },
            popup: {
                popups: {
                /* popups */
                }
            }
        })),
        /* providers */
        AuthenticatedGuard,
        GuestGuard,
        AdminsGuard,
        provideAnimations(),
        provideRouter(routes, withPreloading(PreloadAllModules), withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }))
    ]
})
	// eslint-disable-next-line no-console
	.catch((err) => console.error(err));
