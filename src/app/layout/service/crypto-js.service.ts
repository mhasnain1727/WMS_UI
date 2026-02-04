import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class CryptoJsService {

  // 🔐 Static key (password encryption ke liye)
  private PASSWORD_KEY = CryptoJS.enc.Utf8.parse('/<du3]@D33Asr3@X');
  private PASSWORD_IV  = CryptoJS.enc.Utf8.parse('/<du3]@D33Asr3@X');

  constructor() {}

  /* =========================
     PASSWORD ENCRYPTION
     (ACTIVE - LOGIN USE)
     ========================= */

  encryptPassword(password: string): string {
    const encrypted = CryptoJS.AES.encrypt(
      password,
      this.PASSWORD_KEY,
      {
        keySize: 128,
        iv: this.PASSWORD_IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }
    );
    return encrypted.toString();
  }

  decryptPassword(cipherText: string): string {
    const bytes = CryptoJS.AES.decrypt(
      cipherText,
      this.PASSWORD_KEY,
      {
        keySize: 128,
        iv: this.PASSWORD_IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }
    );
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  /* =====================================================
     PAYLOAD ENCRYPTION (COMMENTED - FUTURE USE)
     Backend abhi normal payload expect karta hai
     ===================================================== */

  /*
  encryptPayload(text: string): string {
    let encyCode: string;

    if (environment.staging) {
      encyCode = '/<N]%PNf#B';
    } else {
      encyCode = '/>Z{%oHa#A';
    }

    const now = new Date();
    const year  = now.getUTCFullYear().toString().slice(-2);
    const month = String(now.getUTCMonth() + 1).padStart(2, '0');
    const day   = String(now.getUTCDate()).padStart(2, '0');

    const utcTime = `${year}${month}${day}`;
    const numericVal = (Number(utcTime) * 7412).toString().slice(-6);
    const finalKey = encyCode + numericVal;

    const base64Text = btoa(unescape(encodeURIComponent(text)));
    const key = CryptoJS.enc.Utf8.parse(finalKey);

    const encrypted = CryptoJS.AES.encrypt(
      base64Text,
      key,
      {
        keySize: 128,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      }
    );

    return encrypted.toString();
  }
  */

}
