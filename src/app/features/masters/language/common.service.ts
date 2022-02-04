import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Language } from '../models/language.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
 
  //appUrl = this.constant.AppUrl;
   
  constructor(
    private http:HttpClient
    ) { }

  deleteLanguage(data:Language) {
    return this.http.post('/api/Language/DeleteLanguage/', data, {});
  }

  editLanguage(data:Language){
    return this.http.post('/api/Language/EditLanguage/', data, {});
  }

}
