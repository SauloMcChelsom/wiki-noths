import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { iLanguage } from '../interfaces/language.interface';
import { aLanguage } from '../abstracts/language.abstract';

@Injectable({ providedIn: 'root' })
export class LanguageMockservice implements aLanguage {
  private lang$!: BehaviorSubject<iLanguage[]>;
  private favorite$!: BehaviorSubject<iLanguage>;
  private lang: iLanguage[] = [
    { language: 'Português (Brasil)', prefix: 'pt-BR' },
    { language: 'Inglês (Estados Unidos)', prefix: 'en-US' },
    { language: 'Espanhol (Colômbia)', prefix: 'es-CO' },
  ];

  constructor() {
    this.favorite$ = new BehaviorSubject({
      language: 'Inglês (Estados Unidos)',
      prefix: 'en-US',
    });
    this.lang$ = new BehaviorSubject(this.lang);
  }

  public getAllLanguage(): Observable<iLanguage[]> {
    return this.lang$.asObservable();
  }

  public getLanguage(): Observable<iLanguage> {
    return this.favorite$.asObservable();
  }

  public addLanguage(prefix: string): Observable<iLanguage> {
    const lang = this.lang.find((r) => r.prefix == prefix);
    this.favorite$.next(lang!);
    return this.favorite$.asObservable();
  }
}
