import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
    {
        path: '',
        loadComponent: ()=> import('./pages/login/login.page').then(m=>m.LoginPage)
    },
    {
        path: 'sign-up',
        loadComponent: ()=> import('./pages/sign-up/sign-up.page').then(m=>m.SignUpPage)
    }
]