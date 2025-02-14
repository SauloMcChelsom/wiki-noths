import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { CustomTranslateModule } from '@domain/change-language/configs/translate-module-config';
import { routes } from './app.routes';
import { CoreModule } from './core.module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(
      CoreModule,
      CustomTranslateModule,
      NoopAnimationsModule,
      BrowserAnimationsModule
    ),
  ],
};
