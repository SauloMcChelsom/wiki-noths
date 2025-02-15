import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageLocalService<T> {
  public async save(key: string, value: any | T): Promise<boolean> {
    await localStorage.removeItem(key);
    await localStorage.setItem(key, JSON.stringify(value));
    return true;
  }

  public async delete(key: string): Promise<boolean> {
    await localStorage.removeItem(key);
    return true;
  }

  public async fetch(key: string): Promise<any | T> {
    return await JSON.parse(localStorage.getItem(key)!);
  }
}
