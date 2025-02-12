import { Observable } from 'rxjs';

export abstract class aStoreState<T> {
  public abstract results(): Observable<T[]>;

  public abstract save(content: T): Observable<any>;

  public abstract update(content: T): Observable<any>;

  public abstract deletById(uid: string): Observable<any>;

  public abstract delete(): Observable<any>;
}
