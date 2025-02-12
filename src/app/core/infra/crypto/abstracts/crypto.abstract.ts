export abstract class aCrypto {
  public abstract encrypt(value: any, secretKey: string): any;
  public abstract decrypt(ciphertext: string, secretKey: string): any;
}
