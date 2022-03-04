import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Search } from 'src/app/models/search.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardApiService {

  AppUrl ="https://demo2.suzuki-feedback.com";

  constructor(
    private http:HttpClient
  ) { }

  InstantSatisfactionTrend(obj: Search) {
    return this.http.post(this.AppUrl +'/api/Customer/InstantSatisfactionTrend', obj, {});
  }

 getServiceReminderAllCountForDashboard(obj:Search){
  return this.http.post(this.AppUrl +'/api/CustomerSMR/GetServiceReminderAllCountForDashboard', obj, {});
  }

  questionFeedbackWiseTrend(obj:Search){
    return this.http.post(this.AppUrl +'/api/Customer/QuestionFeedbackWiseTrend', obj, {});
  }
}
