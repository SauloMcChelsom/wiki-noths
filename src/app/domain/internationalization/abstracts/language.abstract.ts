import { Observable } from 'rxjs';
import { iLanguage } from '../interfaces/language.interface';
import { Injectable } from '@angular/core';

export abstract class aLanguage {
  abstract getAllLanguage(): Observable<iLanguage[]>;
  abstract getLanguage(): Observable<iLanguage>;
  abstract addLanguage(prefix: string): Observable<iLanguage>
}