import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConstantsService } from 'src/app/constants/constants.service';
import { Label } from 'src/app/models/label.model';
import { Search } from 'src/app/models/search.model';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from '../../dashboard-analytics/services/common.service';

@Component({
  selector: 'app-counters',
  templateUrl: './counters.component.html',
  styleUrls: ['./counters.component.css']
})
export class CountersComponent implements OnInit {

  labelObj: Label[] = [];
  searchObj!: Search;
  selectedLanguage: number = this.constantService.selectedLanguage;
  defaultLanguage: boolean = true;
  totalComplaints:number=0;
  resolvedComplaint:number=0;
  pendingComplaints:number=0;
  distributorComplaints:number=0;
  customerComplaint: any[] = [] ;

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

  changeCountry(){
    this.apiService.customerComplaintDashBoardCounters(this.searchObj).subscribe((data:any)=>{

      this.totalComplaints = (data.IFC_Complaint + data.Survey_Complaint + 
        data.PSF_Complaint + data.Direct_Complaint + data.Distributer_Complaint);
         console.log("this.totalComplaints",this.totalComplaints);
        this.resolvedComplaint = (data.IFC_ComplaintResolved + data.Survey_ComplaintResolved + data.PSF_ComplaintResolved + data.Direct_ComplaintResolved + data.Distributer_ComplaintResolved);
        console.log("this.resolvedComplaint",this.resolvedComplaint);
                this.pendingComplaints = this.totalComplaints - this.resolvedComplaint;
                console.log("this.pendingComplaints",this.pendingComplaints);
                this.distributorComplaints = data.Distributer_Complaint;
                console.log("this.distributorComplaints",this.distributorComplaints);


                this.customerComplaint = [
                    {
                        'CMP': this.totalComplaints,
                        'RES': this.resolvedComplaint,
                        'Type': 'Total'
                    },
                    {
                        'CMP': data.IFC_Complaint,
                        'RES': data.IFC_ComplaintResolved,
                        'Type': 'IFC'
                    },
                    {
                        'CMP': data.Survey_Complaint,
                        'RES': data.Survey_ComplaintResolved,
                        'Type': 'Survey'
                    },
                    {
                        'CMP': data.Direct_Complaint,
                        'RES': data.Direct_ComplaintResolved,
                        'Type': 'Direct'
                    },
                    {
                        'CMP': data.PSF_Complaint,
                        'RES': data.PSF_ComplaintResolved,
                        'Type': 'PSF'
                    },
                    {
                        'CMP': data.Distributer_Complaint,
                        'RES': data.Distributer_ComplaintResolved,
                        'Type': 'Distributor'
                    },
                ];
                console.log("this.customerComplaint",this.customerComplaint);
    },error=>{
      console.log(error);
    })
  }

}
