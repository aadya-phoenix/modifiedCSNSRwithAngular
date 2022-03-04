import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Search } from 'src/app/models/search.model';
import { AutomaticCall } from '../../models/automaticCall.model';
import { CallLogInfo } from '../../models/callLogInfo.model';

@Injectable({
  providedIn: 'root'
})
export class PsfService {
  
  AppUrl ="https://demo2.suzuki-feedback.com";

  constructor(private http:HttpClient) { }

  getFreshSMRLead(obj:Search){
    return this.http.post(this.AppUrl +'/api/CustomerSMR/GetFreshReminder', obj, {});
  }
  getPendingSMRLead(obj:Search){
    return this.http.post(this.AppUrl +'/api/CustomerSMR/GetPendingReminder', obj, {});
  }
  getFreshLeadCount(obj:Search){
    return this.http.post(this.AppUrl +'/api/CustomerSMR/GetFreshLeadReminderCount', obj, {});
  }
  getFollowUpSMRLead(obj:Search){
    return this.http.post(this.AppUrl +'/api/CustomerSMR/GetFollowUpReminderCount', obj, {});
  }
  getNonContactedFollowUpSMRLead(obj:Search){
    return this.http.post(this.AppUrl +'/api/CustomerSMR/GetNonContactReminderCount', obj, {});
  }
  getCustomerDetail(id:number){
    return this.http.get(this.AppUrl +'/api/CustomerSMR/GetCustomerDetail?CustomerId=' + id);
  }
  generateAutomaticCall(obj:AutomaticCall){
    return this.http.post(this.AppUrl +'/api/SMSReceiver/GenerateAutomaticCall', obj, {});
  }
  getSMRCallHistory(id:number) {
    return this.http.get(this.AppUrl +'/api/CustomerSMR/GetSMRCallHistory?CallLogId=' + id);
  }
  getSMRStatus(id:number) {
    return this.http.get(this.AppUrl +'/api/CustomerSMR/GetSMRStatusForLead?CategoryId=' + id + '&CallType=PSF');
  }
  getSurveyBasedOnUser(id:number){
    return this.http.get(this.AppUrl +'api/SurveyPage/GetSurveyBasedOnUser?Id=' + id + '&CallType=PSF');
  }
  saveSMRCallLog(obj:CallLogInfo) {
    return this.http.post(this.AppUrl +'/api/CustomerSMR/SaveReminderCallLog', obj, {});
  }
  getCustomerFeedbackReport(id:number){
    return this.http.post(this.AppUrl +'/api/Customer/GetCustomerFeedbackReport?CustomerDetailId=' + id,{});
  }
}
