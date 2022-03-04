import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class MastersApiService {

  AppUrl ="https://demo2.suzuki-feedback.com";
  
  constructor(
    private httpClient: HttpClient
  ) { }

  getCompanyList() {
    return this.httpClient.get(this.AppUrl +'/api/Company/GetCompanyList');
  }

  deleteCompany(data: any) {
    return this.httpClient.post(this.AppUrl +'/api/Company/DeleteCompany/', data, {});

  }

  editCompany(fd: FormData) {
    return this.httpClient.post(this.AppUrl +'/api/Company/EditCompany/', fd, {
      headers: new HttpHeaders({
        'content-type': 'undefined'
      })
    });
  }

  addCompany(fd: FormData) {
    return this.httpClient.post(this.AppUrl +'/api/Company/AddCompany/', fd, {
      headers: new HttpHeaders({
        'content-type': 'undefined'
      })
    });
  }

  addLanguage(data: any) {
    return this.httpClient.post(this.AppUrl +'/api/Language/AddLanguage/', data, {});
  }

  getLanguageList() {
    return this.httpClient.get(this.AppUrl +'/api/Language/GetLanguageList');
  }

  uploadExcel(fd: FormData) {
    return this.httpClient.post(this.AppUrl +"/api/Language/PostData", fd, {
      headers: new HttpHeaders({
        'content-type': 'undefined'
      })
    });
  }

  getCountryList() {
    return this.httpClient.get(this.AppUrl +'/api/Country/GetCountryList');
  }

  addCountry(data: any) {
    return this.httpClient.post(this.AppUrl +'/api/Country/AddCountry/', data, {});
  }

  uploadCountryExcel(fd: FormData) {
    return this.httpClient.post(this.AppUrl +"/api/Country/PostData", fd, {
    });
  }

  getStateAll() {
    return this.httpClient.get(this.AppUrl +'/api/Country/GetStateAll');
  }
  
  getVehicleList(){
    return this.httpClient.get(this.AppUrl +'/api/Company/GetVehicleList');
   }
}
