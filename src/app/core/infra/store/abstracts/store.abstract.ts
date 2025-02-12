import { Injectable } from "@angular/core";

@Injectable()
export abstract class aStore<T> {
  abstract initialState(initialState: any): void;

  abstract results(selector: any): any;

  abstract save(updateFn: any): any;

  abstract update(updateFn: any): any;

  abstract deletById(updateFn: any): any;

  abstract delete(updateFn: any): any;
}
