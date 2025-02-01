import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Language } from '../interfaces/language.interface';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  public getAllLanguage(): Observable<Language[]> {
    return throwError(() => 'Method not implemented.');
  }

  public getLanguage(): Observable<Language> {
    return throwError(() => 'Method not implemented.');
  }

  public addLanguage(prefix: string): Observable<Language> {
    return throwError(() => 'Method not implemented.' + prefix);
  }
}
