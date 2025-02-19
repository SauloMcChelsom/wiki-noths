import { inject, Injectable } from '@angular/core';
import { ThemeCacheService } from '../caches/theme.cache';
import { iTheme } from '../interfaces/theme.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private themeCache = inject(ThemeCacheService);

  public getTheme(): Observable<iTheme[]> {
    return this.themeCache.results();
  }

  public saveTheme(theme: iTheme): Observable<boolean> {
    return this.themeCache.save(theme);
  }

  public deleteTheme(): Observable<boolean> {
    return this.themeCache.delete();
  }

  public updateTheme(theme: iTheme): Observable<boolean> {
    return this.themeCache.update(theme);
  }

  public updateSaveTheme(theme: iTheme): Observable<boolean> {
    return this.themeCache.updateSave(theme);
  }
}
