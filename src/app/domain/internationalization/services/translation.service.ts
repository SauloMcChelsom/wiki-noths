import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DEFAULT_LANG } from '@domain/internationalization/constants/default.constant';
import { TranslateService } from '@ngx-translate/core';
import { catchError, tap, throwError } from 'rxjs';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private defaultLang = DEFAULT_LANG;

  public constructor(
    private translateService: TranslateService,
    @Inject(PLATFORM_ID) private platformId: any,
    private lang: LanguageService
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.lang
        .getLanguage()
        .pipe(
          catchError(() => {
            this.translateService.setDefaultLang(this.defaultLang);
            this.translateService.use(this.defaultLang);
            return throwError(() => new Error('NOTE.NOT_DEFAULT_LANGUAGE'));
          })
        )
        .pipe(
          tap((savedLang) => {
            if (savedLang) {
              this.defaultLang = savedLang.prefix;
            }
            this.translateService.setDefaultLang(this.defaultLang);
            this.translateService.use(this.defaultLang);
          })
        )
        .subscribe({});
    }
  }

  public changeLang(lang: string) {
    this.translateService.use(lang);
    if (isPlatformBrowser(this.platformId)) {
      this.lang.addLanguage(lang).subscribe({});
    }
  }

  public getDefaultLang(): string {
    return this.defaultLang;
  }
}
