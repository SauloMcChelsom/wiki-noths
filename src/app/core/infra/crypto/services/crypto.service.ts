import * as CryptoJS from 'crypto-js';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CryptoService<T> {
  public encrypt(value: any | T, secretKey: string): string {
    let valueToEncrypt: any = value;

    if (typeof value === 'object') {
      valueToEncrypt = JSON.stringify(value);
    }

    const ciphertext = CryptoJS.AES.encrypt(
      valueToEncrypt,
      secretKey
    ).toString();

    return ciphertext;
  }

  public decrypt(ciphertext: string, secretKey: string): string {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    let decryptedData: any;

    try {
      decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (e) {
      decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    }

    return decryptedData;
  }
}
