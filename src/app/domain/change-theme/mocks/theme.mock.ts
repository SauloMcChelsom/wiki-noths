import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { iTheme } from '../interfaces/theme.interface';

@Injectable({ providedIn: 'root' })
export class ThemeMockservice {
  private theme$!: BehaviorSubject<iTheme>;

  public getTheme(): Observable<iTheme> {
    return this.theme$.asObservable();
  }

  public addTheme(theme: iTheme): Observable<iTheme> {
    this.theme$.next(theme);
    return this.theme$.asObservable();
  }
}
