import { Injectable } from '@angular/core';

@Injectable()
export abstract class aStore<T> {
  public abstract initialState(initialState: any): void;

  public abstract results(selector: any | T): any;

  public abstract save(updateFn: any | T): any;

  public abstract update(updateFn: any | T): any;

  public abstract deletById(updateFn: any | T): any;

  public abstract delete(updateFn: any | T): any;
}
