import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Search } from '../models/search.model';
import { ConstantsService } from './constants.service';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsConstantsService {

  surveyTypeId:number = 1;
  searchObj!: Search;
  session:any=this.constantService.takeSession();
  constructor(
    private datePipe: DatePipe,
    private constantService:ConstantsService
  ) { }

  takeSearchObject():Search{
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  
    return this.searchObj = {
        FromDate: this.datePipe.transform(firstDay, 'MMMM dd, yyyy'),
        ToDate: this.datePipe.transform(lastDay, 'MMMM dd, yyyy'),
        VehicleType: 0,
        Country_Id: this.session.Country_Id,
        UserID: this.session.User_Id,
        SatisfactionType: '0',
        OutletId: 0,
        SourceType: 1,
        BrandType: 'All',
        Level_Id: 1,
        Leveldetail_Id: 0
    };
   }

}
