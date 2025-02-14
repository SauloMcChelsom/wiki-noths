import { inject, Injectable } from '@angular/core';
import { Observable, switchMap, take, tap } from 'rxjs';
import { iLanguage } from '../interfaces/language.interface';
import { LanguageMockservice } from '../mocks/language.mock';
import { LanguageCacheService } from '../caches/language.cache';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private api: LanguageMockservice = inject(LanguageMockservice);
  private cache: LanguageCacheService = inject(LanguageCacheService);

  public getAllLanguage(): Observable<iLanguage[]> {
    return this.api.getAllLanguage();
  }

  public getLanguage(): Observable<iLanguage> {
    return this.cache.results().pipe(
      switchMap((lang) => {
        if (lang.length > 0) {
          return lang;
        }
        return this.api.getLanguage();
      }),
      take(1)
    );
  }

  public addLanguage(prefix: string): Observable<iLanguage> {
    return this.cache.delete().pipe(
      switchMap(() => this.api.addLanguage(prefix)),
      tap((lang) => this.cache.save(lang)),
      take(1)
    );
  }
}
