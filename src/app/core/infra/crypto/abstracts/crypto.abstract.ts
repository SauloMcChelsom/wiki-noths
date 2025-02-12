export abstract class aCrypto {
  abstract encrypt(value: any, secretKey: string): any;
  abstract decrypt(ciphertext: string, secretKey: string): any;
}
