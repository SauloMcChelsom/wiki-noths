export abstract class aStorage<T> {
  public abstract fetch(key: string): Promise<T>;
  public abstract delete(key: string): Promise<boolean>;
  public abstract save(key: string, value: any): Promise<boolean>;
}
