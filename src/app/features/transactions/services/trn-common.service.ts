import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrnCommonService {

  AppUrl ="https://demo2.suzuki-feedback.com";

  constructor(
    private http:HttpClient
  ) { }

  getUserLanguage(id:number) {
    return this.http.get(this.AppUrl +'/api/Login/GetUserLanguage?UserId=' + id);
  }
  uploadCustomer(fd:FormData) {
    return this.http.post(this.AppUrl +'/api/Customer/UploadCustomer/', fd, {});
  }
  getCustomerPendingSurvey(id:number) {
    return this.http.get(this.AppUrl +'/api/Customer/GetPendingSurvey?UserId=' + id);
  }
  resendSurvey(id:number){
    return this.http.get(this.AppUrl +'/api/Customer/ResendSurvey?Customer_Id=' + id);
  }
  getCustomerByVIN(vin:string, uid:number) {
    return this.http.get(this.AppUrl +'/api/Customer/GetCustomerForComplaint?VIN=' + vin + '&UserId=' + uid);
  }
  getCustomerServiceHistory(id:any){
    return this.http.get(this.AppUrl +'/api/CustomerSMR/GetCustomerServiceHistory?CustomerId=' + id);
  }
  getServiceTypeList(id:number){
    return this.http.get(this.AppUrl +'/api/Dealer/GetServiceTypeListByVehicle?VehicleId=' + id);
  }
  getOutLetListByCountry(id:number){
    return this.http.get(this.AppUrl +'/api/Dealer/GetOutLetListForComplaint?CountryId=' + id);
  }
}
