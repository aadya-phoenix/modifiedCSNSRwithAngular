import { Component, OnInit } from '@angular/core';
import { AnalyticsConstantsService } from 'src/app/constants/analytics-constants.service';
import { ConstantsService } from 'src/app/constants/constants.service';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from '../services/common.service';

import { Search } from 'src/app/models/search.model';
import { Level } from 'src/app/models/level.model';
import { Country } from 'src/app/models/country.model';
import { LevelSearch } from 'src/app/models/levelSeach.model';
import { LevelDetailInfo } from 'src/app/models/levelDetailInfo.model';
import { Outlet } from 'src/app/models/oultet.model';
import { VehicleType } from 'src/app/models/vehicleType.model';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  
  surveyTypeId: number = this.analyticService.surveyTypeId;
  searchObj: Search = this.analyticService.takeSearchObject();
  session = this.constantService.takeSession();
  Role = this.session.RoleName;

  Instant:boolean = false;
  Survey:boolean = true;

  levelObj: Level[] = [];
  countryObj:Country[]=[];
  levelSearchObj!: LevelSearch;
  levelDetail: LevelDetailInfo[] = [];
  outObj!: LevelSearch;
  outletObj: Outlet[] = [];
  vehicleObj:VehicleType[]=[];

  constructor(
    private analyticService:AnalyticsConstantsService,
    private apiService:ApiService,
    private constantService:ConstantsService,
    private common:CommonService
  ) { }

  ngOnInit(): void {
    this.apiService.getCountryList().subscribe((data:any)=> {
      this.countryObj = data;
    },error=>{
      console.log(error);
  });
  this.getLevelList(this.session.Country_Id);

  this.apiService.getVehicleTypeForDDL().subscribe((data:any)=>{
    this.vehicleObj = data;
   },error=>{
    console.log(error);
   });
  }
  
  getLevelList(id:any){
    if (this.session.RoleName === 'Zone/Region' || this.session.RoleName === 'LastLeg' ) {
      this.searchObj.Level_Id = this.session.DealerId;
      this.searchObj.Leveldetail_Id = this.session.AccountId;
      this.apiService.getLevelListForZoneRegion(this.session.Country_Id, this.session.DealerId).subscribe((data:any)=> {
          if (data) {
              this.levelObj = data;                  
              this.getLevelDetails(this.searchObj.Level_Id);
          }
      },error=>{
          console.log(error);
      });
    }
  else {
    this.apiService.getLevelList(id).subscribe((data:any)=> {
          if (data) {
              this.levelObj = data;
              this.searchObj.Level_Id = this.levelObj[0].Level_Id;
              this.getLevelDetails(this.searchObj.Level_Id);
              console.log(this.levelObj);
          }
      },error=>{
          console.log(error);
      });
   }
  }
  getLevelDetails(levelId:any){

    this.levelSearchObj = {
      Level_Id: levelId,
      Leveldetail_Id: 0,
      UserName: this.session.UserName,
      Country_Id: this.searchObj.Country_Id
    };

    this.apiService.getLevelDetailListForZoneRegion(this.levelSearchObj).subscribe((data: any) => {
      this.levelDetail = data;
      if (this.session.RoleName === 'Zone/Region' || this.session.RoleName === 'LastLeg') {
        this.searchObj.Leveldetail_Id = this.session.AccountId;
      }
      else {
        this.searchObj.Leveldetail_Id = this.levelDetail[0].Leveldetail_Id;
      }
      this.getOutletListBySublevel();
  },error=>{
      console.log(error);
  });
  }

  getOutletListBySublevel(){
    this.outObj = {
      Level_Id: this.searchObj.Level_Id,
      Leveldetail_Id: this.searchObj.Leveldetail_Id,
      UserName: this.session.UserName,
      Country_Id: this.searchObj.Country_Id
    };

    this.apiService.getOutletListBySublevel(this.outObj).subscribe((data: any) => {
      this.outletObj = data;
    },error=>{
      console.log(error);
  });
  }

  toggleDashboard(id:number){
   
  }

  changeCountry(){

  }
  
}

