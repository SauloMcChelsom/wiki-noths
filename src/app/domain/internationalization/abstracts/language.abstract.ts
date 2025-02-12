import { Observable } from 'rxjs';
import { iLanguage } from '../interfaces/language.interface';

export abstract class aLanguage {
  public abstract getAllLanguage(): Observable<iLanguage[]>;
  public abstract getLanguage(): Observable<iLanguage>;
  public abstract addLanguage(prefix: string): Observable<iLanguage>;
}
