import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MastersApiService {
  appUrl = "http://localhost:52268/api/";
  constructor(
    private httpClient: HttpClient
  ) { }

  getCompanyList(){
    return this.httpClient.get(this.appUrl + 'Company/GetCompanyList');;
  }

  deleteCompany(data:any){
    return this.httpClient.post(this.appUrl + 'Company/DeleteCompany/', data, {
      transformRequest: angular.identity,
            headers: { 'c': undefined }
      }),
   
  }
}
