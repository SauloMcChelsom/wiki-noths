import { Routes } from '@angular/router';

export const CHANGE_THEME_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/change-theme/change-theme.page').then(
        (m) => m.ChangeThemePage
      ),
    data: { title: 'NOTE.HOME' },
  },
];
