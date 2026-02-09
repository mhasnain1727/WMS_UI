import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptoJsService {

  // 🔐 Password Keys (CBC - for Login Request)
  private PASSWORD_KEY = CryptoJS.enc.Utf8.parse('/<du3]@D33Asr3@X');
  private PASSWORD_IV  = CryptoJS.enc.Utf8.parse('/<du3]@D33Asr3@X');

  // 🔑 Static Token Key (ECB - for Login Response/Tokens) - Pre-Prod
  private STATIC_TOKEN_KEY = '/N<i[C@K&F#A25@2';

  constructor() { }

  /**
   * Login Request ke liye password encrypt karein
   */
  encryptPassword(password: string): string {
    const encrypted = CryptoJS.AES.encrypt(password, this.PASSWORD_KEY, {
      keySize: 128,
      iv: this.PASSWORD_IV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  }

  /**
   * EXACT PURANA LOGIC: DecryptToken
   * Iska use karke aapka 'abc.data' decrypt ho jayega
   */
  DecryptToken(encryptedText: string): string {
    if (!encryptedText) return '';

    try {
      const key = CryptoJS.enc.Utf8.parse(this.STATIC_TOKEN_KEY);

      const decrypted = CryptoJS.AES.decrypt(encryptedText, key, {
        keySize: 128,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });

      // Latin1 raw bytes nikal kar btoa/atob flow handle karein
      const rawData = decrypted.toString(CryptoJS.enc.Latin1);
      
      // btoa/atob and URI decoding as per old project
      return decodeURIComponent(escape(atob(rawData)));

    } catch (error) {
      console.error("DecryptToken Error:", error);
      return '';
    }
  }
}