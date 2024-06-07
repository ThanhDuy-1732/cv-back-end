// Utilities
import * as CryptoJS from 'crypto-js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CryptoService {
  decrypt(encrypt: string, key: string): string {
    const bytes = CryptoJS.AES.decrypt(encrypt, key);

    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
