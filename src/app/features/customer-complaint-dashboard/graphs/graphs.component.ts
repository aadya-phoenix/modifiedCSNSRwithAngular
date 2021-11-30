import { Component, OnInit } from '@angular/core';
import { Label } from 'src/app/models/label.model';
import { Search } from 'src/app/models/search.model';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from '../services/common.service';
import { ConstantsService } from 'src/app/constants/constants.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {

  labelObj: Label[] = [];
  searchObj!: Search;
  selectedLanguage: number = this.constantService.selectedLanguage;
  defaultLanguage: boolean = true;

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

  countrySubscription!:Subscription;

  constructor(
    private apiService: ApiService,
    private constantService:ConstantsService,
    private common:CommonService
  ) { }

  ngOnInit(): void {
    this.apiService.getLabel().subscribe(data => {
      this.labelObj = data;
      this.selectLanguage(this.selectedLanguage);
    });

    this.countrySubscription= this.common.getCountryEvent().subscribe(data=>{
      this.searchObj =data;
      this.changeCountry();
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

  changeCountry(){}

}
