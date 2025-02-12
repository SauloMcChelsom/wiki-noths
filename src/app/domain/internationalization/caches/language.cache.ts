import { Injectable } from '@angular/core';
import { AppState } from '@core/infra/store/interfaces/state.model';
import { Observable, of } from 'rxjs';
import { environment } from 'src/assets/environments/enviroment';
import { iLanguage } from '../interfaces/language.interface';
import { aStoreState } from '@core/infra/store/abstracts/store-state.abstract';
import { aStore } from '@core/infra/store/abstracts/store.abstract';
import { eLoadingState } from '@core/infra/store/enums/state.enum';
import { TIME_1_SECOND } from '@shared/constants/time.constant';

type AppStateLang = AppState<iLanguage>;

@Injectable({
  providedIn: 'root'
})
export class LanguageCacheService implements aStoreState<iLanguage> {
  constructor(private store: aStore<AppStateLang>) {
    this.app();
    setTimeout(() => {
      this.app();
    }, TIME_1_SECOND);
  }

  private app() {
    this.store.initialState({
      items: [],
      callState: eLoadingState.INIT,
      storage: {
        encryptionKey: environment.payloadStorage.systemLanguage.encryptionKey,
        tableName: environment.payloadStorage.systemLanguage.tableName,
        storageStrategy: environment.payloadStorage.systemLanguage.storageStrategy,
      },
    });
  }

  public results(): Observable<iLanguage[]> {
    return this.store.results((state: AppStateLang) => state.items as any);
  }

  public save(content: iLanguage): Observable<boolean> {
    this.store.save((state: AppStateLang) => ({
      ...state,
      items: [...state.items, content],
    }));
    return of(true);
  }

  public update(content: iLanguage): Observable<boolean> {
    this.store.update((state: AppStateLang) => ({
      ...state,
      items: state.items.map((item) =>
        item.prefix === content.prefix ? content : item
      ),
    }));
    return of(true);
  }

  public deletById(prefix: string): Observable<boolean> {
    this.store.deletById((state: AppStateLang) => ({
      ...state,
      items: state.items.filter((item) => item.prefix !== prefix),
    }));
    return of(true);
  }

  public delete(): Observable<boolean> {
    this.store.delete((state: AppStateLang) => ({
      ...state,
      items: (state.items = []),
    }));
    return of(true);
  }
}
