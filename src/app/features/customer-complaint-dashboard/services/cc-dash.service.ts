import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Search } from 'src/app/models/search.model';

@Injectable({
  providedIn: 'root'
})
export class CcDashService {

  AppUrl ="https://demo2.suzuki-feedback.com";

  constructor(
    private http: HttpClient,
  ) { }

  customerComplaintDashBoardCountersModewise(obj:Search){
    return this.http.post(this.AppUrl +'/api/Dashboard_bk/CustomerComplaintDashBoardCountersModewise', obj, {});
  }

  getComplaintCategoryCountForDashBoard(obj:Search){
    return this.http.post(this.AppUrl +'/api/Dashboard_bk/GetComplaintCategoryCountForDashBoard', obj, {});
  }
}
