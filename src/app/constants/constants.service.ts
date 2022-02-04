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
  
  AppUrl : string = '"http://localhost:52268/api/"';

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
  const session = this.takeSession();
  let date = new Date();
  let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  
  if(date.getDate()===1){
    var lastDay = new Date(date.getFullYear(), date.getMonth() ,1);
  }
  else{
    lastDay = new Date(date.getFullYear(), date.getMonth() ,date.getDate()-1);
  }
  
  return this.searchObj = {
      FromDate: this.datePipe.transform(firstDay, 'MMMM dd, yyyy'),
      ToDate: this.datePipe.transform(lastDay, 'MMMM dd, yyyy'),
      OutletId: 0,
      Country_Id: session.Country_Id,
      VehicleType: 0,
      UserID: session.User_Id,
      SatisfactionType: '0',
      BrandType: 'All',
      Source: 'All',
      Level_Id: 1,
      Leveldetail_Id: 0
  };
  }

 takeSearchAnalytics():Search{
  var  date = new Date();
  var  firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  var  lastDay = null;
  
  if(date.getDate()=== 1){
    lastDay= new Date(date.getFullYear(), date.getMonth(), 1);
  }
  else{		
    lastDay =new Date(date.getFullYear(), date.getMonth() , date.getDate()-1);
  }
  return this.searchObj = {
    FromDate: this.datePipe.transform(firstDay, 'MMMM dd, yyyy'),
    ToDate: this.datePipe.transform(lastDay, 'MMMM dd, yyyy'),
    VehicleType: 0,
    Country_Id: this.session.Country_Id,
    UserID: this.session.User_Id,
    SatisfactionType: '0',
    OutletId: this.session.AccountId,
    Source: 'All',
    BrandType: 'All',
    Level_Id: 1,
    Leveldetail_Id: 0
    };
  }


}
