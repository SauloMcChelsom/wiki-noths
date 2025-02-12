import { aStorage } from '../abstracts/storage.abstract';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageLocalService implements aStorage<any> {
  public async save(key: string, value: any): Promise<boolean> {
    await localStorage.removeItem(key);
    await localStorage.setItem(key, JSON.stringify(value));
    return true;
  }

  public async delete(key: string): Promise<boolean> {
    await localStorage.removeItem(key);
    return true;
  }

  public async fetch(key: string): Promise<any> {
    return await JSON.parse(localStorage.getItem(key)!);
  }
}
