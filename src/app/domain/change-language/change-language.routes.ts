import { Routes } from '@angular/router';

export const CHANGE_LANGUAGE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/change-language/change-language.page').then(
        (m) => m.ChangeLanguagePage
      ),
    data: { title: 'NOTE.HOME' },
  },
];
