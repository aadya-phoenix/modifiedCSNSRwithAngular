import { Component, OnInit } from '@angular/core';

import { ConstantsService } from 'src/app/constants/constants.service';
import { CustomerRptInfo } from 'src/app/features/transactions/models/customerRptInfo.model';
import { BrandTag } from 'src/app/models/brandTag.model';
import { Country } from 'src/app/models/country.model';
import { Label } from 'src/app/models/label.model';
import { Level } from 'src/app/models/level.model';
import { LevelDetailInfo } from 'src/app/models/levelDetailInfo.model';
import { LevelSearch } from 'src/app/models/levelSeach.model';
import { Outlet } from 'src/app/models/oultet.model';
import { Search } from 'src/app/models/search.model';
import { VehicleType } from 'src/app/models/vehicleType.model';
import { ApiService } from 'src/app/services/api.service';
import { IfcReportService } from '../services/ifc-report.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pending-ifc-report',
  templateUrl: './pending-ifc-report.component.html',
  styleUrls: ['./pending-ifc-report.component.css']
})
export class PendingIfcReportComponent implements OnInit {


  defaultLanguage:boolean=true;
  session = this.constant.takeSession();
  Role: any;
  selectedLang = this.constant.selectedLanguage;

  dataExists:boolean=false;
  dealerName:string='';

  labelObj:Label[]=[];
  levelObj:Level[]=[];
  levelDetailObj:LevelDetailInfo[]=[];
  outletObj:Outlet[]=[]
  savedFormArray:CustomerRptInfo[]=[];
  searchObj!:Search;

  vehicleTypeObj:VehicleType[]=[];
  countryObj:Country[]=[];
  brandTagObj:BrandTag[]=[];
  
  resultObj:any;

  FromDateLabel:string='';
  ToDateLabel:string='';
  VehicleLabel:string='';
  SearchLabel:string='';
  SurveyFeedbackPendingIFCLabel:string='';
  JobCardLabel:string='';
  ServiceAdvisorLabel:string='';
  OutletLabel:string='';
  VehicleNameLabel:string='';
  ServiceTypeLabel:string='';
  BillDateLabel:string='';
  RegistrationNumberLabel:string='';
  CustomerNameLabel:string='';
  CustomerMobileLabel:string='';
  EmailLabel:string='';
  TechnicianLabel:string='';
  BrandLabel:string='';
  DownloadReportLabel:string='';
  DealerOutletCodeLabel:string='';
  CountryLabel:string='';
  SaleDateLabel:string='';
  MileageLabel:string='';
  FromToDateWithinMonth:string='';

  constructor(
    private constant:ConstantsService,
    private apiService:ApiService,
    private ifcReportService:IfcReportService
  ) { }

  ngOnInit(): void {
    this.Role = this.session.RoleName;
    this.searchObj = {
      FromDate: null,
      ToDate: null,
      VehicleType: 0,
      Country_Id: this.session.Country_Id,
      UserID: this.session.User_Id,
      SatisfactionType: '',
      OutletId: 0,
      BrandType:'All',
      Level_Id: 0,
      Leveldetail_Id: 0
    };
    this.getLevelList(this.session.Country_Id);

    this.apiService.getVehicleTypeForDDL().subscribe((data: any) => {
        if(data){
           this.vehicleTypeObj = data;
        }
       }, (error) => {
        console.log(error);
     });
     this.apiService.getCountryList().subscribe((data: any) => {
       if(data){
        this.countryObj = data;
        }
       }, (error) => {
     console.log(error);
     });
     this.apiService.getBrandTagForDDL().subscribe((data: any) => {
        if(data){
        }
       }, (error) => {
     console.log(error);
     });
    this.apiService.getLabel().subscribe((data: any) => {
      if(data){
        this.labelObj = data;
        this.selectLanguage(this.selectedLang);
         }
     }, (error) => {
     console.log(error);
     });
  }

  selectLanguage(id:number){
    if (id == 2) {
        this.defaultLanguage = true;
        for (let label of this.labelObj) {
            if (label.DefaultLanguage == 'From Date') {
                this.FromDateLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'To Date') {
                this.ToDateLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Vehicle') {
                this.VehicleLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Search') {
                this.SearchLabel = label.DefaultLanguage;
            }  if (label.DefaultLanguage == 'Survey Feedback - Pending IFC') {
                this.SurveyFeedbackPendingIFCLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Job Card') {
                this.JobCardLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Service Advisor') {
                this.ServiceAdvisorLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Outlet') {
                this.OutletLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Vehicle Name') {
                this.VehicleNameLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Service Type') {
                this.ServiceTypeLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Bill Date') {
                this.BillDateLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Registration Number') {
                this.RegistrationNumberLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Customer Name') {
                this.CustomerNameLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Customer Mobile') {
                this.CustomerMobileLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Email') {
                this.EmailLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Technician') {
                this.TechnicianLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Brand') {
                this.BrandLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Download Report') {
                this.DownloadReportLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Dealer Outlet Code') {
                this.DealerOutletCodeLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Country') {
                this.CountryLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Sale Date') {
                this.SaleDateLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Mileage') {
                this.MileageLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'From & To Date should be within a Month') {
                this.FromToDateWithinMonth = label.DefaultLanguage;
            }
        }
    }
    if (id > 2) {
        this.defaultLanguage = false;
        for (let label of this.labelObj) {
            if (label.Language_Id == id) {
                if (label.DefaultLanguage == 'From Date') {
                    this.FromDateLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'To Date') {
                    this.ToDateLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Vehicle') {
                    this.VehicleLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Search') {
                    this.SearchLabel = label.ConvertedLanguage;
                }  if (label.DefaultLanguage == 'Survey Feedback - Pending IFC') {
                    this.SurveyFeedbackPendingIFCLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Job Card') {
                    this.JobCardLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Service Advisor') {
                    this.ServiceAdvisorLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Outlet') {
                    this.OutletLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Vehicle Name') {
                    this.VehicleNameLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Service Type') {
                    this.ServiceTypeLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Bill Date') {
                    this.BillDateLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Registration Number') {
                    this.RegistrationNumberLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Customer Name') {
                    this.CustomerNameLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Customer Mobile') {
                    this.CustomerMobileLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Email') {
                    this.EmailLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Technician') {
                    this.TechnicianLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Brand') {
                    this.BrandLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Download Report') {
                    this.DownloadReportLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Dealer Outlet Code') {
                    this.DealerOutletCodeLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Country') {
                    this.CountryLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Sale Date') {
                   this.SaleDateLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Mileage') {
                    this.MileageLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'From & To Date should be within a Month') {
                    this.FromToDateWithinMonth = label.ConvertedLanguage;
                }
           }
        }
    }

   /*  this.resultObj={
      FromDateLabel
      ToDateLabel
      VehicleLabel
      SearchLabel
      SurveyFeedbackPendingIFCLabel
      JobCardLabel
      ServiceAdvisorLabel
      OutletLabel
      VehicleNameLabel
      ServiceTypeLabel
      BillDateLabel
      RegistrationNumberLabel
      CustomerNameLabel
      CustomerMobileLabel
      EmailLabel
      TechnicianLabel
      BrandLabel
      DownloadReportLabel
      DealerOutletCodeLabel
      CountryLabel
      SaleDateLabel
      MileageLabel
      FromToDateWithinMonth
    }; */
  }

  getLevelList(id:number){
      if (this.session.RoleName === 'Zone/Region' || this.session.RoleName === 'LastLeg') {
          this.searchObj.Level_Id = this.session.DealerId;
          this.searchObj.Leveldetail_Id = this.session.AccountId;
          this.apiService.getLevelListForZoneRegion(this.session.Country_Id, this.session.DealerId).subscribe((data: any) => {
              if (data !== null) {
                  this.levelObj = data;
                  this.getLevelDetails(this.searchObj.Level_Id);
              }
          }, (error) => {
              console.log(error);
          });
      }
      else {
          this.apiService.getLevelList(id).subscribe((data: any) => {
              if (data !== null) {
                  this.levelObj = data;
                  this.searchObj.Level_Id = this.levelObj[0].Level_Id;
                  this.getLevelDetails(this.searchObj.Level_Id);
              }
          }, (error) => {
              console.log(error);
          });
      }
  }

  getLevelDetails(levelId:any){
    let obj:LevelSearch = {
      Level_Id: levelId,
      Leveldetail_Id: 0,
      UserName: this.session.UserName,
      Country_Id: this.searchObj.Country_Id
    };

    this.apiService.getLevelDetailListForZoneRegion(obj).subscribe((data: any)=>{
      this.levelDetailObj = data;
      if (this.session.RoleName === 'Zone/Region' || this.session.RoleName === 'LastLeg') {
          this.searchObj.Leveldetail_Id = this.session.AccountId;
      }
      else {
          this.searchObj.Leveldetail_Id = this.levelDetailObj[0].Leveldetail_Id;
      }
      this.getOutletListBySublevel();
      },(error)=>{
      console.log(error);
    });
  }

  getOutletListBySublevel(){
    let obj:LevelSearch = {
      Level_Id: this.searchObj.Level_Id,
      Leveldetail_Id: this.searchObj.Leveldetail_Id,
      UserName: this.session.UserName,
      Country_Id: this.searchObj.Country_Id
    };

    this.apiService.getOutletListBySublevel(obj).subscribe((data: any)=>{
      this.outletObj = data;
      }, (error)=> {
      console.log(error);
    });
  }

  search():any{
    this.dataExists = false;
    let FromDate = new Date(this.searchObj.FromDate);
    let ToDate = new Date(this.searchObj.ToDate);
    if (this.searchObj.Leveldetail_Id===0) {
        this.searchObj.Level_Id = this.levelObj[0].Level_Id;
    }

    this.searchObj.SatisfactionType = '';
    let MonthDiff = ToDate.getMonth() - FromDate.getMonth() + (12 * (ToDate.getFullYear() - FromDate.getFullYear()));
    if (MonthDiff < 1) {
        this.ifcReportService.getCustomerFeedbackReport(this.searchObj).subscribe((data: any)=>{
            if (data != null) {
                this.savedFormArray = data;
                this.dataExists = true;
            }
            else {
                this.dataExists = false;
            }
          }, (error)=> {
            console.log(error);
        });

        for (let outlet of  this.outletObj) {
            if (this.searchObj.OutletId == outlet.Outlet_Id) {
                this.dealerName = outlet.OutletCode;
            }
        }
    }
    else {
        Swal.fire(this.FromToDateWithinMonth);
        return false;

    }
  }

  downloadExcel(){}

  onDateChangeFrom(event: MatDatepickerInputEvent<Date>){
    this.searchObj.FromDate  = event.value;
  } 

  onDateChangeTo(event: MatDatepickerInputEvent<Date>){
    this.searchObj.ToDate  = event.value;
  }

}
