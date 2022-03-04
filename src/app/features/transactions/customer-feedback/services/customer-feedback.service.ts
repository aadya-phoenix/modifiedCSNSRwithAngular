import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InstantFeedbackInfo } from '../../models/instantFeedbackInfo.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerFeedbackService {

  AppUrl ="https://demo2.suzuki-feedback.com";
  
  constructor(private http:HttpClient) { }

  getCustomerByVIN(vin:string, uid:number) {
    return this.http.get(this.AppUrl +'/api/Customer/GetCustomerByVIN?VIN=' + vin + '&UserId=' + uid);
  }
  getSurveyDetail(Id:number){
    return this.http.get(this.AppUrl +'/api/Form/GetInstantFeedbackDetail?User_Id=' + Id);
  }
  saveResponse(obj:InstantFeedbackInfo){
    return this.http.post(this.AppUrl +'/api/SurveyPage/SaveInstantFeedback', obj, {});
  }
}
