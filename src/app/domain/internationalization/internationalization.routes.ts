import { Routes } from '@angular/router';

export const INTERNATIONALIZATION_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/change-language/change-language.page').then(
        (m) => m.ChangeLanguagePage
      ),
    data: { title: 'NOTE.HOME' },
  },
];
