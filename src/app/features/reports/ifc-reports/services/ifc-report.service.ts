import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Search } from 'src/app/models/search.model';

@Injectable({
  providedIn: 'root'
})
export class IfcReportService {

  AppUrl ="https://demo2.suzuki-feedback.com";

  constructor(private http:HttpClient) { }

  getCustomerFeedbackReport(data:Search){
    return this.http.post(this.AppUrl + 'Customer/GetPendingIFCList', data);
  }
}
