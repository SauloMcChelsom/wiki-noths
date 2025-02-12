import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () =>
      import('./core/layout/auth/auth.layout').then((m) => m.AuthLayout),
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./domain/auth/auth.routes').then((m) => m.AUTH_ROUTES),
      },
    ],
  },
  {
    path: 'internationalization',
    loadComponent: () =>
      import(
        './core/layout/internationalization/internationalization.layout'
      ).then((m) => m.InternationalizationLayout),
    children: [
      {
        path: '',
        loadChildren: () =>
          import(
            './domain/internationalization/internationalization.routes'
          ).then((m) => m.INTERNATIONALIZATION_ROUTES),
      },
    ],
  },
];
