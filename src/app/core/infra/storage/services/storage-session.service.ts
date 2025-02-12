import { Injectable } from '@angular/core';
import { aStorage } from '../abstracts/storage.abstract';

@Injectable({ providedIn: 'root' })
export class StorageSessionService implements aStorage<any> {
  public async save(key: string, value: any): Promise<boolean> {
    await sessionStorage.removeItem(key);
    await sessionStorage.setItem(key, JSON.stringify(value));
    return true;
  }

  public async delete(key: string): Promise<boolean> {
    await sessionStorage.removeItem(key);
    return true;
  }

  public async fetch(key: string): Promise<any> {
    return await JSON.parse(sessionStorage.getItem(key)!);
  }
}
