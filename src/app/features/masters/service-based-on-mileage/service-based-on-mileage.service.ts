import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceInfo } from './serviceInfo.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceBasedOnMileageService {

  AppUrl ="https://demo2.suzuki-feedback.com";

  constructor(
    private http:HttpClient
  ) { }

  getCountryBasedOnMilage(){
    return this.http.get(this.AppUrl +'/api/ServiceBasedOnMilage/GetCountryBasedOnMilage');
  }

  addCountryBasedOnMilage(data:any){
    return this.http.post(this.AppUrl +'/api/ServiceBasedOnMilage/AddCountryBasedOnMilage/', data, {});
  }
  editCountryBasedOnMilage(data:ServiceInfo) {
    return this.http.post(this.AppUrl + 'ServiceBasedOnMilage/EditCountryBasedOnMilage/', data, {});
  }

}
