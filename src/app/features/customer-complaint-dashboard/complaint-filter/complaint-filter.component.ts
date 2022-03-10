import { Component, OnInit } from '@angular/core';
import { BrandTag } from 'src/app/models/brandTag.model';
import { Country } from 'src/app/models/country.model';
import { Label } from 'src/app/models/label.model';
import { Outlet } from 'src/app/models/oultet.model';
import { Search } from 'src/app/models/search.model';
import { VehicleType } from 'src/app/models/vehicleType.model';

import { ConstantsService } from 'src/app/constants/constants.service';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from '../services/common.service';
import { Level } from 'src/app/models/level.model';
import { LevelDetailInfo } from 'src/app/models/levelDetailInfo.model';
import { LevelSearch } from 'src/app/models/levelSeach.model';
import { DatePipe } from '@angular/common';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-complaint-filter',
  templateUrl: './complaint-filter.component.html',
  styleUrls: ['./complaint-filter.component.css']
})
export class ComplaintFilterComponent implements OnInit {

  labelObj: Label[] = [];
  outletObj: Outlet[]=[];
  countryObj: Country[]=[];
  brandTagObj:BrandTag[]=[];
  vehicleTypeObj: VehicleType[]=[];
  searchObj: Search = this.constantService.takeSearchAnalytics();
  selectedLanguage: number = this.constantService.selectedLanguage;
  defaultLanguage: boolean = true;
  session = this.constantService.takeSession();
  Role = this.session.RoleName;

  levelObj: Level[] = [];
  levelSearchObj!: LevelSearch;
  outObj!: LevelSearch;
  levelDetail: LevelDetailInfo[] = [];
  resultLabelObj:any;
  
  FromDateLabel: string = '';
  ToDateLabel: string = '';
  CountryLabel: string = '';
  DealerOutletCodeLabel: string = '';
  VehicleLabel: string = '';
  CustomerComplaintDashboardLabel: string = '';
  TOTALCOMPLAINTSLabel: string = '';
  COMPLAINTSRESOLVEDLabel: string = '';
  SearchLabel: string = '';
  ComplaintAttributionLabel: string = '';
  ComplaintStatusLabel: string = '';
  ParameterLabel: string = '';
  ComplaintGeneratedLabel: string = '';
  COMPLAINTSPENDINGLabel: string = '';
  DISTRIBUTORCOMPLAINTSLabel: string = '';
  TotalLabel: string = '';
  ResolvedLabel: string = '';
  ComplaintResolutionSourceLabel: string = '';
  TelephonicLabel: string = '';
  WorkshopVisitLabel: string = '';
  HomeVisitLabel: string = '';
  BrandLabel: string = '';
  NumbersLabel: string = '';


  constructor(
    private apiService: ApiService,
    private constantService: ConstantsService,
    private common:CommonService,
    private datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    if (this.session.RoleName == 'HOAdmin' || this.session.RoleName ==  'Distributor'||  
    this.session.RoleName ==  'Zone/Region'|| this.session.RoleName ==  'LastLeg'  ){
     this.searchObj.OutletId = 0;
     }

    this.apiService.getLabel().subscribe(data => {
      this.labelObj = data;
      this.selectLanguage(this.selectedLanguage);
    });

    this.apiService.getCountryList().subscribe((data:any)=>{
      this.countryObj = data;
    },err=>{
      console.log(err);
    });

    this.getLevelList(this.searchObj.Country_Id);

    this.apiService.getBrandTagForDDL().subscribe(data=>{
      this.brandTagObj = data;
    },err=>{
      console.log("error",err);
    });

    this.apiService.getVehicleTypeForDDL().subscribe((data:any)=>{
      this.vehicleTypeObj = data ;
    },err=>{
      console.log(err);
    });

  }

  selectLanguage(id: any) {
    if (id == 2) {
      this.defaultLanguage = true;
      for (const label of this.labelObj) {
        if (label.DefaultLanguage == 'From Date') {
          this.FromDateLabel = label.DefaultLanguage;
        } if (label.DefaultLanguage == 'To Date') {
          this.ToDateLabel = label.DefaultLanguage;
        } if (label.DefaultLanguage == 'Country') {
          this.CountryLabel = label.DefaultLanguage;
        } if (label.DefaultLanguage == 'Dealer Outlet Code') {
          this.DealerOutletCodeLabel = label.DefaultLanguage;
        }
        if (label.DefaultLanguage == 'Vehicle') {
          this.VehicleLabel = label.DefaultLanguage;
        } if (label.DefaultLanguage == 'Customer Complaint Dashboard') {
          this.CustomerComplaintDashboardLabel = label.DefaultLanguage;
        } if (label.DefaultLanguage == 'TOTAL COMPLAINTS') {
          this.TOTALCOMPLAINTSLabel = label.DefaultLanguage;
        } if (label.DefaultLanguage == 'COMPLAINTS RESOLVED') {
          this.COMPLAINTSRESOLVEDLabel = label.DefaultLanguage;
        } if (label.DefaultLanguage == 'Search') {
          this.SearchLabel = label.DefaultLanguage;
        } if (label.DefaultLanguage == 'Complaint Attribution') {
          this.ComplaintAttributionLabel = label.DefaultLanguage;
        } if (label.DefaultLanguage == 'Complaint Status') {
          this.ComplaintStatusLabel = label.DefaultLanguage;
        } if (label.DefaultLanguage == 'Parameter') {
          this.ParameterLabel = label.DefaultLanguage;
        } if (label.DefaultLanguage == 'Complaint Generated') {
          this.ComplaintGeneratedLabel = label.DefaultLanguage;
        } if (label.DefaultLanguage == 'COMPLAINTS PENDING') {
          this.COMPLAINTSPENDINGLabel = label.DefaultLanguage;
        } if (label.DefaultLanguage == 'DISTRIBUTOR COMPLAINTS') {
          this.DISTRIBUTORCOMPLAINTSLabel = label.DefaultLanguage;
        } if (label.DefaultLanguage == 'Total') {
          this.TotalLabel = label.DefaultLanguage;
        } if (label.DefaultLanguage == 'Resolved') {
          this.ResolvedLabel = label.DefaultLanguage;
        } if (label.DefaultLanguage == 'Complaint Resolution Source') {
          this.ComplaintResolutionSourceLabel = label.DefaultLanguage;
        } if (label.DefaultLanguage == 'Telephonic') {
          this.TelephonicLabel = label.DefaultLanguage;
        } if (label.DefaultLanguage == 'Workshop Visit') {
          this.WorkshopVisitLabel = label.DefaultLanguage;
        } if (label.DefaultLanguage == 'Home Visit') {
          this.HomeVisitLabel = label.DefaultLanguage;
        } if (label.DefaultLanguage == 'Brand') {
          this.BrandLabel = label.DefaultLanguage;
        }
        if (label.DefaultLanguage == 'Numbers') {
          this.NumbersLabel = label.DefaultLanguage;
        }
      }
    }
    if (id > 2) {
      this.defaultLanguage = false;
      for (const label of this.labelObj) {
        if (label.Language_Id == id) {
          if (label.DefaultLanguage == 'From Date') {
            this.FromDateLabel = label.ConvertedLanguage;
          } if (label.DefaultLanguage == 'To Date') {
            this.ToDateLabel = label.ConvertedLanguage;
          } if (label.DefaultLanguage == 'Vehicle') {
            this.VehicleLabel = label.ConvertedLanguage;
          } if (label.DefaultLanguage == 'Customer Complaint Dashboard') {
            this.CustomerComplaintDashboardLabel = label.ConvertedLanguage;
          } if (label.DefaultLanguage == 'TOTAL COMPLAINTS') {
            this.TOTALCOMPLAINTSLabel = label.ConvertedLanguage;
          } if (label.DefaultLanguage == 'COMPLAINTS RESOLVED') {
            this.COMPLAINTSRESOLVEDLabel = label.ConvertedLanguage;
          } if (label.DefaultLanguage == 'Search') {
            this.SearchLabel = label.ConvertedLanguage;
          } if (label.DefaultLanguage == 'Complaint Attribution') {
            this.ComplaintAttributionLabel = label.ConvertedLanguage;
          } if (label.DefaultLanguage == 'Complaint Status') {
            this.ComplaintStatusLabel = label.ConvertedLanguage;
          } if (label.DefaultLanguage == 'Parameter') {
            this.ParameterLabel = label.ConvertedLanguage;
          } if (label.DefaultLanguage == 'Complaint Generated') {
            this.ComplaintGeneratedLabel = label.ConvertedLanguage;
          } if (label.DefaultLanguage == 'Country') {
            this.CountryLabel = label.ConvertedLanguage;
          } if (label.DefaultLanguage == 'Dealer Outlet Code') {
            this.DealerOutletCodeLabel = label.ConvertedLanguage;
          }
          if (label.DefaultLanguage == 'COMPLAINTS PENDING') {
            this.COMPLAINTSPENDINGLabel = label.ConvertedLanguage;
          } if (label.DefaultLanguage == 'DISTRIBUTOR COMPLAINTS') {
            this.DISTRIBUTORCOMPLAINTSLabel = label.ConvertedLanguage;
          } if (label.DefaultLanguage == 'Total') {
            this.TotalLabel = label.ConvertedLanguage;
          } if (label.DefaultLanguage == 'Resolved') {
            this.ResolvedLabel = label.ConvertedLanguage;
          } if (label.DefaultLanguage == 'Complaint Resolution Source') {
            this.ComplaintResolutionSourceLabel = label.ConvertedLanguage;
          } if (label.DefaultLanguage == 'Telephonic') {
            this.TelephonicLabel = label.ConvertedLanguage;
          } if (label.DefaultLanguage == 'Workshop Visit') {
            this.WorkshopVisitLabel = label.ConvertedLanguage;
          } if (label.DefaultLanguage == 'Home Visit') {
            this.HomeVisitLabel = label.ConvertedLanguage;
          } if (label.DefaultLanguage == 'COMPLAINTS PENDING') {
            this.COMPLAINTSPENDINGLabel = label.ConvertedLanguage;
          } if (label.DefaultLanguage == 'Numbers') {
            this.NumbersLabel = label.ConvertedLanguage;
          } if (label.DefaultLanguage == 'Brand') {
            this.BrandLabel = label.ConvertedLanguage;
          }
        }
      }
    }
    this.resultLabelObj={
      FromDateLabel  : this.FromDateLabel ,
      ToDateLabel : this.ToDateLabel ,
      CountryLabel : this.CountryLabel ,
      DealerOutletCodeLabel : this.DealerOutletCodeLabel ,
      VehicleLabel : this.VehicleLabel ,
      CustomerComplaintDashboardLabel : this.CustomerComplaintDashboardLabel ,
      TOTALCOMPLAINTSLabel  : this.TOTALCOMPLAINTSLabel ,
      COMPLAINTSRESOLVEDLabel : this.COMPLAINTSRESOLVEDLabel ,
      SearchLabel : this.SearchLabel ,
      ComplaintAttributionLabel : this.ComplaintAttributionLabel ,
      ComplaintStatusLabel : this.ComplaintStatusLabel ,
      ParameterLabel : this.ParameterLabel ,
      ComplaintGeneratedLabel: this.ComplaintGeneratedLabel ,
      COMPLAINTSPENDINGLabel : this.COMPLAINTSPENDINGLabel ,
      DISTRIBUTORCOMPLAINTSLabel: this.DISTRIBUTORCOMPLAINTSLabel ,
      TotalLabel: this.TotalLabel ,
      ResolvedLabel : this.ResolvedLabel ,
      ComplaintResolutionSourceLabel : this.ComplaintResolutionSourceLabel ,
      TelephonicLabel: this.TelephonicLabel ,
      WorkshopVisitLabel : this.WorkshopVisitLabel ,
      HomeVisitLabel:this.HomeVisitLabel ,
      BrandLabel :this.BrandLabel ,
      NumbersLabel : this.NumbersLabel 
    };
  }
  getLevelList(id: any) {
    if (this.session.RoleName === 'Zone/Region' || this.session.RoleName === 'LastLeg') {
      this.searchObj.Level_Id = this.session.DealerId;
      this.searchObj.Leveldetail_Id = this.session.AccountId;

      this.apiService.getLevelListForZoneRegion(this.session.Country_Id, this.session.DealerId).subscribe
        ((data: any) => {
          this.levelObj = data;
          this.getLevelDetails(this.searchObj.Level_Id);
        }, err => {
          console.log(err);
        });
    }
    else {
      this.apiService.getLevelList(id).subscribe((data: any) => {
        this.levelObj = data;
        this.searchObj.Level_Id = this.levelObj[0].Level_Id;
        this.getLevelDetails(this.searchObj.Level_Id);
      }, err => {
        console.log(err);
      });
    }
  }
  getLevelDetails(levelId: any) {
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
    }, err => {
      console.log(err);
    });
  }

  getOutletListBySublevel() {
    this.outObj = {
      Level_Id: this.searchObj.Level_Id,
      Leveldetail_Id: this.searchObj.Leveldetail_Id,
      UserName: this.session.UserName,
      Country_Id: this.searchObj.Country_Id
    };

    this.apiService.getOutletListBySublevel(this.outObj).subscribe((data: any) => {
      this.outletObj = data;
    }, err => {
      console.log(err);
    });
  }
  changeCountry(){

  var Currdate = new Date();

   var SelectedDate = new Date(this.searchObj.ToDate);
   if (SelectedDate.getFullYear() >= Currdate.getFullYear()){
     if (SelectedDate.getFullYear() > Currdate.getFullYear() || 
        SelectedDate.getMonth() >= Currdate.getMonth()){
          if (SelectedDate.getFullYear() > Currdate.getFullYear() 
           || SelectedDate.getMonth() > Currdate.getMonth() || 
           (Currdate.getDate() != 1 && SelectedDate.getDate() >= Currdate.getDate())){
            var lastDay = new Date(Currdate.getFullYear(), Currdate.getMonth(), Currdate.getDate() - 1);
                   this.searchObj.ToDate = this.datepipe.transform(lastDay, 'MMMM dd, yyyy');
               }

           }

       }
    this.common.sendCountryEvent({obj:this.searchObj});
    
  }

  onDateChangeFrom(event: MatDatepickerInputEvent<Date>){
     this.searchObj.FromDate  = event.value;
  }
   onDateChangeTo(event: MatDatepickerInputEvent<Date>){
    this.searchObj.ToDate  = event.value;
  }
}
