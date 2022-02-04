import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Search } from 'src/app/models/search.model';

@Injectable({
  providedIn: 'root'
})
export class CcDashService {

 // appUrl = this.constantService.AppUrl;;

  constructor(
    private http: HttpClient,
  ) { }

  customerComplaintDashBoardCountersModewise(obj:Search){
    return this.http.post('/api/Dashboard_bk/CustomerComplaintDashBoardCountersModewise', obj, {});
  }

  getComplaintCategoryCountForDashBoard(obj:Search){
    return this.http.post('/api/Dashboard_bk/GetComplaintCategoryCountForDashBoard', obj, {});
  }
}
