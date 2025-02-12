import { Injectable } from '@angular/core';
import { Observable, switchMap, take, tap } from 'rxjs';
import { iLanguage } from '../interfaces/language.interface';
import { aLanguage } from '../abstracts/language.abstract';
import { aStoreState } from '@core/infra/store/abstracts/store-state.abstract';

@Injectable({ providedIn: 'root' })
export class LanguageService implements aLanguage {
  public constructor(
    private api: aLanguage,
    private cache: aStoreState<iLanguage>
  ) {}

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
