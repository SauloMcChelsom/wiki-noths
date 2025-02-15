import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageSessionService<T> {
  public async save(key: string, value: any | T): Promise<boolean> {
    await sessionStorage.removeItem(key);
    await sessionStorage.setItem(key, JSON.stringify(value));
    return true;
  }

  public async delete(key: string): Promise<boolean> {
    await sessionStorage.removeItem(key);
    return true;
  }

  public async fetch(key: string): Promise<any | T> {
    return await JSON.parse(sessionStorage.getItem(key)!);
  }
}
