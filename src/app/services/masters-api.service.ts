import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class MastersApiService {

  //appUrl = this.constant.AppUrl;
  
  constructor(
    private httpClient: HttpClient
  ) { }

  getCompanyList() {
    return this.httpClient.get('/api/Company/GetCompanyList');
  }

  deleteCompany(data: any) {
    return this.httpClient.post('/api/Company/DeleteCompany/', data, {});

  }

  editCompany(fd: FormData) {
    return this.httpClient.post('/api/Company/EditCompany/', fd, {
      headers: new HttpHeaders({
        'content-type': 'undefined'
      })
    });
  }

  addCompany(fd: FormData) {
    return this.httpClient.post('/api/Company/AddCompany/', fd, {
      headers: new HttpHeaders({
        'content-type': 'undefined'
      })
    });
  }

  addLanguage(data: any) {
    return this.httpClient.post('/api/Language/AddLanguage/', data, {});
  }

  getLanguageList() {
    return this.httpClient.get('/api/Language/GetLanguageList');
  }

  uploadExcel(fd: FormData) {
    return this.httpClient.post("/api/Language/PostData", fd, {
      headers: new HttpHeaders({
        'content-type': 'undefined'
      })
    });
  }

  getCountryList() {
    return this.httpClient.get('/api/Country/GetCountryList');
  }

  addCountry(data: any) {
    return this.httpClient.post('/api/Country/AddCountry/', data, {});
  }

  uploadCountryExcel(fd: FormData) {
    return this.httpClient.post("/api/Country/PostData", fd, {
    });
  }

  getStateAll() {
    return this.httpClient.get('/api/Country/GetStateAll');
  }
  
}
