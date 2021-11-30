import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Search } from '../models/search.model';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  selectedLanguage:number=2;
  defaultLanguage:boolean= true;
  surveyTypeId:number=5;
  

  sess:any;
  session:any;
  searchObj!: Search;

  constructor(
    private datePipe: DatePipe
  ) { }
  takeSession():any{
    
     this.sess = sessionStorage.getItem("app");
     this.session = JSON.parse(this.sess);
     return this.session;
 
 }

 takeSearchObject():Search{
  var date = new Date();
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  return this.searchObj = {
      FromDate: this.datePipe.transform(firstDay, 'MMMM dd, yyyy'),
      ToDate: this.datePipe.transform(lastDay, 'MMMM dd, yyyy'),
      VehicleType: 0,
      Country_Id: 0,
      UserId: this.session.User_Id,
      SatisfactionType: '0',
      OutletId: 0,
      BrandType: 'All'
  };
 }

 takeComplaintSearchObject():Search{
  var date = new Date();
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return this.searchObj = {
      FromDate: this.datePipe.transform(firstDay, 'MMMM dd, yyyy'),
      ToDate: this.datePipe.transform(lastDay, 'MMMM dd, yyyy'),
      VehicleType: 0,
      Country_Id: this.session.Country_Id,
      UserId: this.session.User_Id,
      SatisfactionType: '0',
      OutletId: this.session.AccountId,
      BrandType: 'All'
  };

 }
}
