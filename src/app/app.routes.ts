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
    path: 'change-language',
    loadComponent: () =>
      import('./core/layout/change-language/change-language.layout').then(
        (m) => m.ChangeLanguageLayout
      ),
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./domain/change-language/change-language.routes').then(
            (m) => m.CHANGE_LANGUAGE_ROUTES
          ),
      },
    ],
  },
  {
    path: 'change-theme',
    loadComponent: () =>
      import('./core/layout/change-theme/change-theme.layout').then(
        (m) => m.ChangeThemeLayout
      ),
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./domain/change-theme/change-theme.routes').then(
            (m) => m.CHANGE_THEME_ROUTES
          ),
      },
    ],
  },
];
