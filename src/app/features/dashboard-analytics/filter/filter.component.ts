import { Component, OnInit } from '@angular/core';
import { AnalyticsConstantsService } from 'src/app/constants/analytics-constants.service';
import { ConstantsService } from 'src/app/constants/constants.service';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from '../services/common.service';

import { Country } from 'src/app/models/country.model';
import { Csi } from 'src/app/models/csi.model';
import { Outlet } from 'src/app/models/oultet.model';
import { SearchAnalytics } from 'src/app/models/searchAnalytics.model';
import { VehicleType } from 'src/app/models/vehicleType.model';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  outletObj: Outlet[]=[];
  vehicleTypeObj: VehicleType[]=[];
  countryObj: Country[]=[];
  surveyTypeId: number = this.analyticService.surveyTypeId;
  searchObj: SearchAnalytics = this.analyticService.takeSearchObject();
  session = this.constantService.takeSession();
  Role = this.session.RoleName;

  Instant:boolean = false;
  Survey:boolean = true;

  constructor(
    private analyticService:AnalyticsConstantsService,
    private apiService:ApiService,
    private constantService:ConstantsService,
    private common:CommonService
  ) { }

  ngOnInit(): void {
    this.apiService.getCountryList().subscribe((data:any)=>{
      console.log("country Obj is",data);
      this.countryObj=data;
    }, err=>{
      console.log("countryObject error",err);
    });

    this.getDealerByCountry(this.searchObj.Country_Id);
    this.apiService.getVehicleTypeForDDL().subscribe((data:any)=>{
      this.vehicleTypeObj = data;
    },err=>{
      console.log("vehicle typer error..",err);
    })
  }
   
  toggleDashboard(id:number){
    this.common.sendToggleEvent({id:id,obj:this.searchObj});
    this.changeCountry();
  }

  changeCountry(){
    this.common.sendCountryEvent({id:this.surveyTypeId,obj:this.searchObj});
  }

  getDealerByCountry(id:number){
    if (id == 0) {
      this.apiService.getDealerOutletList(this.session.User_Id).subscribe((data:any) => {
        this.outletObj = data;
      }, (error) => {
        console.log(error);
      });
    }
    else {
      this.apiService.getOutLetListByCountry(id).subscribe((data:any) => {
        this.outletObj = data;
      }, (error) => {
        console.log(error);
      });
    }
  }
}

