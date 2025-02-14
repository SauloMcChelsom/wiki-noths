import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageLocalService<T> {
  public async save(key: string, value: T): Promise<boolean> {
    await localStorage.removeItem(key);
    await localStorage.setItem(key, JSON.stringify(value));
    return true;
  }

  public async delete(key: string): Promise<boolean> {
    await localStorage.removeItem(key);
    return true;
  }

  public async fetch(key: string): Promise<T> {
    return await JSON.parse(localStorage.getItem(key)!);
  }
}
