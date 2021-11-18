import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptService {

  constructor() { }

  hash(value : string) : string{
    return CryptoJS.SHA1(value).toString();
  }
}
