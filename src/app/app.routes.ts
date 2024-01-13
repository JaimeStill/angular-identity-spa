import {
    HomeRoute,
    ProfileRoute
} from './routes';

import { Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';

export const routes: Routes = [
    {
        path: 'profile',
        component: ProfileRoute,
        canActivate: [ MsalGuard ]
    },
    { path: '', component: HomeRoute },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
