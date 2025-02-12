import { Observable, of } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { aCrypto } from '../abstracts/crypto.abstract';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CryptoService implements aCrypto {
  public encrypt(value: any, secretKey: string): Observable<string> {
    let valueToEncrypt: any = value;

    if (typeof value === 'object') {
      valueToEncrypt = JSON.stringify(value);
    }

    const ciphertext = CryptoJS.AES.encrypt(
      valueToEncrypt,
      secretKey
    ).toString();

    return of(ciphertext);
  }

  public decrypt(ciphertext: string, secretKey: string): Observable<any> {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    let decryptedData: any;

    try {
      decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (e) {
      decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    }

    return of(decryptedData);
  }
}
