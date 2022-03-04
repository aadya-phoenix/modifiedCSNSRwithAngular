import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from 'src/app/models/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  AppUrl ="https://demo2.suzuki-feedback.com";

  constructor(
    private http: HttpClient
  ){}
  
  deleteCountry(data:Country){
    return this.http.post(this.AppUrl +'/api/Country/DeleteCountry/', data, {});
  }

  editCountry(data:Country){ 
    return this.http.post(this.AppUrl +'/api/Country/EditCountry/', data, {});
  }
}
