import { Component, OnInit } from '@angular/core';
import { ConstantsService } from 'src/app/constants/constants.service';
import { Label } from 'src/app/models/label.model';
import { ApiService } from 'src/app/services/api.service';
import { CustomerUploadInfo } from '../models/customerUploadInfo.model';
import { TrnCommonService } from '../services/trn-common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pending-survey',
  templateUrl: './pending-survey.component.html',
  styleUrls: ['./pending-survey.component.css']
})
export class PendingSurveyComponent implements OnInit {

  selectedLang:number=this.constant.selectedLanguage;
  defaultLanguage:boolean=true;
  session = this.constant.takeSession();
  searchText:string='';

  labelObj:Label[]=[];
  savedFormArray:CustomerUploadInfo[]=[];

  CustomerNameLabel:string='';
  MobileLabel:string='';
  VehicleModelLabel:string='';
  OutletLabel:string='';
  EmailLabel:string='';
  RegistrationNoLabel:string='';
  BillDateLabel:string='';
  VINLabel:string='';
  ActionLabel:string='';
  SurveySentDateLabel:string='';
  SentonMailLabel:string='';
  SentonMobileLabel:string='';
  PendingSurveysLabel:string='';
  SearchLabel:string='';
  ResendSurveyLabel:string='';
  CaptureSurveyLabel:string='';

  constructor(
    private constant:ConstantsService,
    private apiService:ApiService,
    private trnService:TrnCommonService
  ) { }

  ngOnInit(): void {
    this.apiService.getLabel().subscribe(data=>{
      this.labelObj = data;
      this.selectLanguage(this.selectedLang);
     },(error)=>{
      console.log(error);
   });
    this.trnService.getCustomerPendingSurvey(this.session.User_Id).subscribe((data:any)=>{
     this.savedFormArray = data;
      },(error)=>{
      console.log(error);
    });
  }

  selectLanguage(id:number){
    if (id == 2) {
        this.defaultLanguage = true;
           for (let label of this.labelObj) {
            if (label.DefaultLanguage == 'Customer Name') {
                this.CustomerNameLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Mobile') {
                this.MobileLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Vehicle Model') {
                this.VehicleModelLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Outlet') {
                this.OutletLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Email') {
                this.EmailLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Registration No') {
                this.RegistrationNoLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Bill Date') {
                this.BillDateLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'VIN') {
                this.VINLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Action') {
                this.ActionLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Survey Sent Date') {
                this.SurveySentDateLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Sent on Mail') {
                this.SentonMailLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Sent on Mobile') {
                this.SentonMobileLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Pending Surveys') {
                this.PendingSurveysLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Search') {
                this.SearchLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Resend Survey') {
                this.ResendSurveyLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Capture Survey') {
                 this.CaptureSurveyLabel = label.DefaultLanguage;
           }   
        }
    }
    if (id > 2) {
        this.defaultLanguage = false;
           for (let label of this.labelObj) {
               if (label.Language_Id == id) {
                if (label.DefaultLanguage == 'Customer Name') {
                    this.CustomerNameLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Mobile') {
                    this.MobileLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Vehicle Model') {
                    this.VehicleModelLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Outlet') {
                    this.OutletLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Email') {
                    this.EmailLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Registration No') {
                    this.RegistrationNoLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Bill Date') {
                    this.BillDateLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'VIN') {
                    this.VINLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Action') {
                    this.ActionLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Survey Sent Date') {
                    this.SurveySentDateLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Sent on Mail') {
                    this.SentonMailLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Sent on Mobile') {
                    this.SentonMobileLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Pending Surveys') {
                    this.PendingSurveysLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Search') {
                    this.SearchLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Resend Survey') {
                   this.ResendSurveyLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Capture Survey') {
                    this.CaptureSurveyLabel = label.ConvertedLanguage;
                }   
            }
        }
    }
  }

  resendSurvey(cid:number,Email:string):any{
    if (  Email === null || Email === ''   ) {
      Swal.fire('Error', 'Customer Email is not available, "Resend Survey" sends Survey link using email only.', 'error');
      return false;
    }

     this.trnService.resendSurvey(cid).subscribe((data:any)=>{
      Swal.fire(data);
       },(error)=>{
      console.log(error);
    });
  }
  openSurvey(cid:number,sid:number){}

}
