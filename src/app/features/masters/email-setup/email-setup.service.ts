import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailSetupInfo } from './emailSetupInfo.model';

@Injectable({
  providedIn: 'root'
})
export class EmailSetupService {

  AppUrl ="https://demo2.suzuki-feedback.com";

  constructor(
    private http:HttpClient
  ) { }

   getEmailSetup(accountId:number, dealerId:number) {
    return this.http.get(this.AppUrl +'/api/Form/GetEmailSetup?AccountId=' + accountId + '&DealerId=' + dealerId);
  }

  configureEmailSetup(data:EmailSetupInfo){
    return this.http.post(this.AppUrl +'/api/Form/ConfigureEmailSetup/', data, {});
  }
}
