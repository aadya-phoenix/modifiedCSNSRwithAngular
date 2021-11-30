import { Component, OnInit } from '@angular/core';
import { BrandTag } from 'src/app/models/brandTag.model';
import { Country } from 'src/app/models/country.model';
import { Label } from 'src/app/models/label.model';
import { Outlet } from 'src/app/models/oultet.model';
import { Search } from 'src/app/models/search.model';
import { VehicleType } from 'src/app/models/vehicleType.model';

import { ConstantsService } from 'src/app/constants/constants.service';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from '../../dashboard-analytics/services/common.service';

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
  searchObj: Search = this.constantService.takeComplaintSearchObject();
  selectedLanguage: number = this.constantService.selectedLanguage;
  defaultLanguage: boolean = true;
  session = this.constantService.takeSession();
  Role = this.session.RoleName;

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
    private common:CommonService
  ) { }

  ngOnInit(): void {
    this.apiService.getLabel().subscribe(data => {
      this.labelObj = data;
      this.selectLanguage(this.selectedLanguage);
    });

    this.apiService.getCountryList().subscribe((data:any)=>{
      this.countryObj = data;
    },err=>{
      console.log("country obj error is..",err);
    });

    this.apiService.getDealerOutletList(this.session.User_Id).subscribe((data:any)=> {
      this.outletObj = data;
  },  error=> {
      console.log(error);
  });


    this.apiService.getBrandTagForDDL().subscribe(data=>{
      console.log("brand tag data is..",data);
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

  selectLanguage(id: number) {
    this.defaultLanguage = true;
    if (id == 2) {
      this.defaultLanguage = true;
      for (var i = 0; i < this.labelObj.length; i++) {

        if (this.labelObj[i].DefaultLanguage == 'From Date') {
          this.FromDateLabel = this.labelObj[i].DefaultLanguage;
        } if (this.labelObj[i].DefaultLanguage == 'To Date') {
          this.ToDateLabel = this.labelObj[i].DefaultLanguage;
        } if (this.labelObj[i].DefaultLanguage == 'Country') {
          this.CountryLabel = this.labelObj[i].DefaultLanguage;
        } if (this.labelObj[i].DefaultLanguage == 'Dealer Outlet Code') {
          this.DealerOutletCodeLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'Vehicle') {
          this.VehicleLabel = this.labelObj[i].DefaultLanguage;
        } if (this.labelObj[i].DefaultLanguage == 'Customer Complaint Dashboard') {
          this.CustomerComplaintDashboardLabel = this.labelObj[i].DefaultLanguage;
        } if (this.labelObj[i].DefaultLanguage == 'TOTAL COMPLAINTS') {
          this.TOTALCOMPLAINTSLabel = this.labelObj[i].DefaultLanguage;
        } if (this.labelObj[i].DefaultLanguage == 'COMPLAINTS RESOLVED') {
          this.COMPLAINTSRESOLVEDLabel = this.labelObj[i].DefaultLanguage;
        } if (this.labelObj[i].DefaultLanguage == 'Search') {
          this.SearchLabel = this.labelObj[i].DefaultLanguage;
        } if (this.labelObj[i].DefaultLanguage == 'Complaint Attribution') {
          this.ComplaintAttributionLabel = this.labelObj[i].DefaultLanguage;
        } if (this.labelObj[i].DefaultLanguage == 'Complaint Status') {
          this.ComplaintStatusLabel = this.labelObj[i].DefaultLanguage;
        } if (this.labelObj[i].DefaultLanguage == 'Parameter') {
          this.ParameterLabel = this.labelObj[i].DefaultLanguage;
        } if (this.labelObj[i].DefaultLanguage == 'Complaint Generated') {
          this.ComplaintGeneratedLabel = this.labelObj[i].DefaultLanguage;
        } if (this.labelObj[i].DefaultLanguage == 'COMPLAINTS PENDING') {
          this.COMPLAINTSPENDINGLabel = this.labelObj[i].DefaultLanguage;
        } if (this.labelObj[i].DefaultLanguage == 'DISTRIBUTOR COMPLAINTS') {
          this.DISTRIBUTORCOMPLAINTSLabel = this.labelObj[i].DefaultLanguage;
        } if (this.labelObj[i].DefaultLanguage == 'Total') {
          this.TotalLabel = this.labelObj[i].DefaultLanguage;
        } if (this.labelObj[i].DefaultLanguage == 'Resolved') {
          this.ResolvedLabel = this.labelObj[i].DefaultLanguage;
        } if (this.labelObj[i].DefaultLanguage == 'Complaint Resolution Source') {
          this.ComplaintResolutionSourceLabel = this.labelObj[i].DefaultLanguage;
        } if (this.labelObj[i].DefaultLanguage == 'Telephonic') {
          this.TelephonicLabel = this.labelObj[i].DefaultLanguage;
        } if (this.labelObj[i].DefaultLanguage == 'Workshop Visit') {
          this.WorkshopVisitLabel = this.labelObj[i].DefaultLanguage;
        } if (this.labelObj[i].DefaultLanguage == 'Home Visit') {
          this.HomeVisitLabel = this.labelObj[i].DefaultLanguage;
        } if (this.labelObj[i].DefaultLanguage == 'Brand') {
          this.BrandLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'Numbers') {
          this.NumbersLabel = this.labelObj[i].DefaultLanguage;
        }
      }
    }
    if (id > 2) {
      this.defaultLanguage = false;
      for (var i = 0; i < this.labelObj.length; i++) {
        if (this.labelObj[i].Language_Id == id) {
          if (this.labelObj[i].DefaultLanguage == 'From Date') {
            this.FromDateLabel = this.labelObj[i].ConvertedLanguage;
          } if (this.labelObj[i].DefaultLanguage == 'To Date') {
            this.ToDateLabel = this.labelObj[i].ConvertedLanguage;
          } if (this.labelObj[i].DefaultLanguage == 'Vehicle') {
            this.VehicleLabel = this.labelObj[i].ConvertedLanguage;
          } if (this.labelObj[i].DefaultLanguage == 'Customer Complaint Dashboard') {
            this.CustomerComplaintDashboardLabel = this.labelObj[i].ConvertedLanguage;
          } if (this.labelObj[i].DefaultLanguage == 'TOTAL COMPLAINTS') {
            this.TOTALCOMPLAINTSLabel = this.labelObj[i].ConvertedLanguage;
          } if (this.labelObj[i].DefaultLanguage == 'COMPLAINTS RESOLVED') {
            this.COMPLAINTSRESOLVEDLabel = this.labelObj[i].ConvertedLanguage;
          } if (this.labelObj[i].DefaultLanguage == 'Search') {
            this.SearchLabel = this.labelObj[i].ConvertedLanguage;
          } if (this.labelObj[i].DefaultLanguage == 'Complaint Attribution') {
            this.ComplaintAttributionLabel = this.labelObj[i].ConvertedLanguage;
          } if (this.labelObj[i].DefaultLanguage == 'Complaint Status') {
            this.ComplaintStatusLabel = this.labelObj[i].ConvertedLanguage;
          } if (this.labelObj[i].DefaultLanguage == 'Parameter') {
            this.ParameterLabel = this.labelObj[i].ConvertedLanguage;
          } if (this.labelObj[i].DefaultLanguage == 'Complaint Generated') {
            this.ComplaintGeneratedLabel = this.labelObj[i].ConvertedLanguage;
          } if (this.labelObj[i].DefaultLanguage == 'Country') {
            this.CountryLabel = this.labelObj[i].ConvertedLanguage;
          } if (this.labelObj[i].DefaultLanguage == 'Dealer Outlet Code') {
            this.DealerOutletCodeLabel = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'COMPLAINTS PENDING') {
            this.COMPLAINTSPENDINGLabel = this.labelObj[i].ConvertedLanguage;
          } if (this.labelObj[i].DefaultLanguage == 'DISTRIBUTOR COMPLAINTS') {
            this.DISTRIBUTORCOMPLAINTSLabel = this.labelObj[i].ConvertedLanguage;
          } if (this.labelObj[i].DefaultLanguage == 'Total') {
            this.TotalLabel = this.labelObj[i].ConvertedLanguage;
          } if (this.labelObj[i].DefaultLanguage == 'Resolved') {
            this.ResolvedLabel = this.labelObj[i].ConvertedLanguage;
          } if (this.labelObj[i].DefaultLanguage == 'Complaint Resolution Source') {
            this.ComplaintResolutionSourceLabel = this.labelObj[i].ConvertedLanguage;
          } if (this.labelObj[i].DefaultLanguage == 'Telephonic') {
            this.TelephonicLabel = this.labelObj[i].ConvertedLanguage;
          } if (this.labelObj[i].DefaultLanguage == 'Workshop Visit') {
            this.WorkshopVisitLabel = this.labelObj[i].ConvertedLanguage;
          } if (this.labelObj[i].DefaultLanguage == 'Home Visit') {
            this.HomeVisitLabel = this.labelObj[i].ConvertedLanguage;
          } if (this.labelObj[i].DefaultLanguage == 'COMPLAINTS PENDING') {
            this.COMPLAINTSPENDINGLabel = this.labelObj[i].ConvertedLanguage;
          } if (this.labelObj[i].DefaultLanguage == 'Numbers') {
            this.NumbersLabel = this.labelObj[i].ConvertedLanguage;
          } if (this.labelObj[i].DefaultLanguage == 'Brand') {
            this.BrandLabel = this.labelObj[i].ConvertedLanguage;
          }
        }
      }
    }
  }

  getDealerByCountry(id:number){
    if (id == 0) {
      this.apiService.getDealerOutletList(this.session.User_Id).subscribe((data:any)=> {
          this.outletObj = data;
      },  error=> {
          console.log(error);
      });
  }
  else {
    this.apiService.getOutLetListByCountry(id).subscribe((data:any)=> {
          this.outletObj = data;
      },  error=> {
          console.log(error);
      });
  }
  }

  changeCountry(){
    this.common.sendCountryEvent({obj:this.searchObj});
  }
}
