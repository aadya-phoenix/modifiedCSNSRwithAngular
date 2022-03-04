import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutomatedSurveyService {

  AppUrl ="https://demo2.suzuki-feedback.com";

  constructor(
    private http: HttpClient
  ) { }

  getTaskInfo(){
    return this.http.get(this.AppUrl +'/api/Company/GetTaskInfo');
  }

  triggerSurvey(Freq:any,FollowUp:any,FolloupCount:any,Status:number, Id:number){
    return this.http.get(this.AppUrl +'/api/Customer/TriggerSurvey?Frequency=' + Freq + '&FollowupFreuency=' +
     FollowUp + '&FollowUpCount=' + FolloupCount + '&Status=' + Status + '&SurveyId=' + Id);
  }
}
