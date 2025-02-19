import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
    data: { title: 'NOTE.ABA_LOGIN' },
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
    data: { title: 'NOTE.ABA_LOGIN' },
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.page').then((m) => m.RegisterPage),
    data: { title: 'NOTE.ABA_REGISTER' },
  },
];