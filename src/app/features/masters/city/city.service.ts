import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City } from '../models/city.model';

@Injectable({
  providedIn: 'root'
})
export class CityService {

 // appUrl = this.constantService.AppUrl;
  
  constructor(
    private http: HttpClient
  ) { }
  
  getCityAll(){
    return this.http.get('/api/Country/GetCityAll');
  }
  addCity(data:City) {
    return this.http.post('/api/Country/AddCity/', data, {});
 }
  
 uploadCity(fd:FormData){
  return this.http.post("/api/Country/UploadCity", fd, {});
  }

  deleteCity(data:City) {
    return this.http.post('/api/Country/DeleteCity/', data, {});
 }
 
}
