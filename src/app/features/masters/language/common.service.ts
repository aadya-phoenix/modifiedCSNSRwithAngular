import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Language } from '../../../models/language.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
 
  AppUrl ="https://demo2.suzuki-feedback.com";
   
  constructor(
    private http:HttpClient
    ) { }

  deleteLanguage(data:Language) {
    return this.http.post(this.AppUrl +'/api/Language/DeleteLanguage/', data, {});
  }

  editLanguage(data:Language){
    return this.http.post(this.AppUrl +'/api/Language/EditLanguage/', data, {});
  }

}
