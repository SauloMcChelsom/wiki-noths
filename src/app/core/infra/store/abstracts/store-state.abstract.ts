import { Observable } from 'rxjs';

export abstract class aStoreState<T> {
  abstract results(): Observable<T[]>;

  abstract save(content: T): Observable<any>;

  abstract update(content: T): Observable<any>;

  abstract deletById(uid: string): Observable<any>;

  abstract delete(): Observable<any>;
}
