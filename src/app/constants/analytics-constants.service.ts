import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SearchAnalytics } from '../models/searchAnalytics.model';
import { ConstantsService } from './constants.service';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsConstantsService {

  surveyTypeId:number = 2;
  searchObj!: SearchAnalytics;
  session:any=this.constantService.takeSession();
  constructor(
    private datePipe: DatePipe,
    private constantService:ConstantsService
  ) { }

  takeSearchObject():SearchAnalytics{
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
        OutletId: 0,
        SourceType: 1,
        BrandType: 'All'
    };
   }
}
