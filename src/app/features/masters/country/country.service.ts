import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from 'src/app/models/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

 // appUrl = this.constant.AppUrl;

  constructor(
    private http: HttpClient
  ){}
  
  deleteCountry(data:Country){
    return this.http.post('/api/Country/DeleteCountry/', data, {});
  }

  editCountry(data:Country){ 
    return this.http.post('/api/Country/EditCountry/', data, {});
  }
}
