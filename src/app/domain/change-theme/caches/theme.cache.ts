import { Injectable } from '@angular/core';
import { AppState } from '@core/infra/store/interfaces/state.model';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/assets/environments/enviroment';
import { eLoadingState } from '@core/infra/store/enums/state.enum';
import { TIME_1_SECOND } from '@shared/constants/time.constant';
import { StoreService } from '@core/infra/store/services/store.service';
import { iTheme } from '../interfaces/theme.interface';

type AppStateTheme = AppState<iTheme>;

@Injectable({
  providedIn: 'root',
})
export class ThemeCacheService {
  public constructor(private store: StoreService<iTheme>) {
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
        encryptionKey: environment.payloadStorage.theme.encryptionKey,
        tableName: environment.payloadStorage.theme.tableName,
        storageStrategy: environment.payloadStorage.theme.storageStrategy,
      },
    });
  }

  public results(): Observable<iTheme[]> {
    return this.store.results((state: AppStateTheme) => state.items);
  }

  public save(content: iTheme): Observable<boolean> {
    return this.store.save((state: AppStateTheme) => ({
      ...state,
      items: [...state.items, content],
    }));
  }

  public update(content: iTheme): Observable<boolean> {
    return this.store.update((state: AppStateTheme) => ({
      ...state,
      items: state.items.map((item) => {
        return item.theme === content.theme ? content : item;
      }),
    }));
  }

  public updateSave(content: iTheme): Observable<boolean> {
    return this.store
      .update((state: AppStateTheme) => ({
        ...state,
        items: state.items.map((item) => {
          return item.theme === content.theme ? content : item;
        }),
      }))
      .pipe(
        tap((isTheme: boolean) => (isTheme == false ? this.save(content) : ''))
      );
  }

  public delete(): Observable<boolean> {
    return this.store.delete();
  }
}
