import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Search } from 'src/app/models/search.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardApiService {

  //appUrl = this.constantService.AppUrl;

  constructor(
    private http:HttpClient
  ) { }

  InstantSatisfactionTrend(obj: Search) {
    return this.http.post('/api/Customer/InstantSatisfactionTrend', obj, {});
  }

 getServiceReminderAllCountForDashboard(obj:Search){
  return this.http.post('/api/CustomerSMR/GetServiceReminderAllCountForDashboard', obj, {});
  }

  questionFeedbackWiseTrend(obj:Search){
    return this.http.post('/api/Customer/QuestionFeedbackWiseTrend', obj, {});
  }
}
