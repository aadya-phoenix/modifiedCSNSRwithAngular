import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City } from '../models/city.model';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  AppUrl ="https://demo2.suzuki-feedback.com";
  
  constructor(
    private http: HttpClient
  ) { }
  
  getCityAll(){
    return this.http.get(this.AppUrl +'/api/Country/GetCityAll');
  }
  addCity(data:City) {
    return this.http.post(this.AppUrl +'/api/Country/AddCity/', data, {});
 }
  
 uploadCity(fd:FormData){
  return this.http.post(this.AppUrl +"/api/Country/UploadCity", fd, {});
  }

  deleteCity(data:City) {
    return this.http.post(this.AppUrl +'/api/Country/DeleteCity/', data, {});
 }
 
}
