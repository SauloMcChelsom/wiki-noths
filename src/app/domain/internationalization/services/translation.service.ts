import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DEFAULT_LANG } from '@domain/internationalization/constants/default.constant';
import { TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private defaultLang = DEFAULT_LANG;
  private translateService: TranslateService = inject(TranslateService);
  private platformId = inject<any>(PLATFORM_ID);
  private lang: LanguageService = inject(LanguageService);

  public constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.lang
        .getLanguage()
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
    const language$ = this.lang.getLanguage();

    let defaultLang = '';
    language$.subscribe((lang) => (defaultLang = lang.prefix)).unsubscribe();
    return defaultLang;
  }
}
