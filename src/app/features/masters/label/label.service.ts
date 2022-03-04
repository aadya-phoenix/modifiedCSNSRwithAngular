import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LabelInfo } from './models/labelInfo.model';

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  AppUrl ="https://demo2.suzuki-feedback.com";
  
  constructor(
    private http:HttpClient
  ) { }

  getLabelList(){
    return this.http.get(this.AppUrl +'/api/Label/GetLabelList');
  }
  updateLabel(obj:LabelInfo) {
    return this.http.post(this.AppUrl + '/api/Label/UpdateLabel', obj, {});
  }
}
