import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Search } from 'src/app/models/search.model';
import { CustomerRptInfo } from '../../models/customerRptInfo.model';

@Injectable({
  providedIn: 'root'
})
export class DisSatisfiedService {

  AppUrl ="https://demo2.suzuki-feedback.com";

  constructor(private http:HttpClient) { }

  getDissatisfiedCustomer(obj:Search) {
    return this.http.post(this.AppUrl + '/api/Customer/GetDissatisfiedCustomer', obj, {});
  }
  getComplaintAttribution(){
    return this.http.post(this.AppUrl + '/api/Dealer/GetComplaintAttribution',{});
  }

  updateDissaitisfiedCustomer(obj:CustomerRptInfo){
    return this.http.post(this.AppUrl + '/api/Customer/UpdateDissaitisfiedCustomer', obj, {});
  }
  getCustomerFeedbackReport(id:number){
    return this.http.post(this.AppUrl + '/api/Customer/GetCustomerFeedbackReport?CustomerDetailId=' + id,{});
  }
  generateCustomerFeedbackReportForSurvey(id:number){
    return this.http.post(this.AppUrl + '/api/Customer/GenerateCustomerFeedbackReportForSurvey?CustomerDetailId=' + id,{});
  }
  generateCustomerFeedbackReportForPSF(id:number) {
    return this.http.post(this.AppUrl + '/api/Customer/GenerateCustomerFeedbackReportForPSF?CustomerDetailId=' + id,{});
  }
  generateCustomerFeedbackReportForPSFSALES(id:number) {
    return this.http.post(this.AppUrl + '/api/Customer/GenerateCustomerFeedbackReportForPSFSALES?CustomerDetailId=' + id,{});
  }
}
