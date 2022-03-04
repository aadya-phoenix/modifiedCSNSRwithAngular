import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConstantsService } from 'src/app/constants/constants.service';
import { Label } from 'src/app/models/label.model';
import { Search } from 'src/app/models/search.model';
import { ApiService } from 'src/app/services/api.service';
import { CustomerSMRInfo } from '../models/customerSMRInfo.model';
import { PsfRxService } from './services/psf-rx.service';
import { PsfService } from './services/psf.service';

@Component({
  selector: 'app-psf',
  templateUrl: './psf.component.html',
  styleUrls: ['./psf.component.css']
})
export class PsfComponent implements OnInit {

  defaultLanguage:boolean=true;
  resultObj:any;
  searchObj!:Search;
  pendingSearchObj!:Search;
  
  labelObj:Label[]=[];
  freshLead:CustomerSMRInfo[]=[];
  pendingLead:CustomerSMRInfo[]=[];

  checkAccess:boolean=this.constant.takecheckAcess();
  session=this.constant.takeSession();
  selectedLang=this.constant.selectedLanguage;
  showAutoDialer:boolean=false;

  S1:boolean=false;
  S2:boolean=false;

  T1:boolean=false;

  view1:boolean=false;
  
  FromDateLabel :string='';
  ToDateLabel:string='';
  CustomerNameLabel:string='';
  MobileLabel:string='';
  VehicleModelLabel:string='';
  FollowUpDateLabel:string='';
  FollowUpTimeLabel:string='';
  VehicleSaleDateLabel:string='';
  ServiceDateLabel:string='';
  LastServiceLabel:string='';
  ActionLabel:string='';
  StatusLabel:string='';
  MileageLabel:string='';
  DownloadReportLabel:string='';
  TodaysCallingPlanPostServiceFollowupLabel:string='';
  PendingCasesLabel:string='';
  LastServiceDateLabel:string='';
  ServiceVisitHistoryLabel:string='';
  CustomerDetailsLabel:string='';
  SubmitLabel:string='';
  BackLabel:string='';
  RemarksLabel:string='';
  RepairDetailsLabel:string='';
  DateLabel:string='';
  TIMELabel:string='';
  StatusDetailLabel:string='';
  CallActivityLabel:string='';
  CallHistoryLabel:string='';
  ServiceTypeLabel:string='';
  JobCardNumberLabel:string='';
  GeneratedfortodayLabel:string='';
  TodayCallingplanLabel:string='';
  NoActionLeadsLabel:string='';
  ServiceAppointmentLabel:string='';
  AllLeadsLabel:string='';
  FreshLeadsLabel:string='';
  FollowsUpLabel:string='';
  NonCountableLabel:string='';
  CustomerMileageLabel:string='';
  CustomerSALabel:string='';
  CustomerTecLabel:string='';
  ButtonText:string='';
  PageTitle:string='';
  CustomerContactLabel2:string='';
  SearchText:string='';
  Followupleadslabel:string='';
  NonContactedLeadlabel:string='';
  

  constructor(
      private constant:ConstantsService,
      private apiService:ApiService,
      private psfService:PsfService,
      private rx:PsfRxService,
      private datePipe: DatePipe,
      public dialog:MatDialog,
  ) { }

  ngOnInit(): void {
      if (this.checkAccess==true){
         this.showAutoDialer=true;
      }
      if(this.session.Country_Id == 15 && this.showAutoDialer === true){
      //  this.dialog.open({});
      //make a dialog component
      }
      else{
      this.S1=true;
      this.T1=true;
      this.view1 = true;

      this.searchObj = {
        FromDate: this.datePipe.transform(new Date(), 'MMMM dd, yyyy'),
        ToDate: this.datePipe.transform(new Date(), 'MMMM dd, yyyy'),
        VehicleType: 0,
        Country_Id: 0,
        UserID: this.session.User_Id,
        SatisfactionType: '',
        OutletId: 0,
        CallType:'PSF'
      };
      let date = new Date();
      let lastDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
      let lastMonth = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);  

      this.pendingSearchObj = {
        FromDate: this.datePipe.transform(lastMonth, 'MMMM dd, yyyy'),
        ToDate: this.datePipe.transform(lastDay, 'MMMM dd, yyyy'),
        VehicleType: 0,
        Country_Id: 0,
        UserID: this.session.User_Id,
        SatisfactionType: '',
        OutletId: 0,
        CallType: 'PSF'
      };
      this.getFormDetails();
      }
  }

  getFormDetails(){
      //Label Object
      this.apiService.getLabel().subscribe((data:any)=>{
         this.labelObj=data;
         this.selectLanguage(this.selectedLang);
        },err=>{
          console.log(err)
      });

      //Fresh Leads
      this.psfService.getFreshSMRLead(this.searchObj).subscribe((data:any)=>{
        if (data != null){
            this.freshLead = data;
        }
       },(error)=>{
        console.log(error);
     });
     //Pending Lead
     this.psfService.getPendingSMRLead(this.pendingSearchObj).subscribe((data:any)=>{
        if(data != null) {
            this.pendingLead = data;
        }
      },(error)=>{
        console.log(error);
     });
  }

  selectLanguage(id:number){
    if (id == 2){
        this.defaultLanguage = true;
        for (let label of this.labelObj) {
            if (label.DefaultLanguage == 'From Date') {
                this.FromDateLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'To Date') {
                this.ToDateLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Customer Name') {
                this.CustomerNameLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Mobile') {
                this.MobileLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Vehicle Model') {
                this.VehicleModelLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Follow Up Date') {
                this.FollowUpDateLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Follow Up Time') {
                this.FollowUpTimeLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Vehicle Sale Date') {
                this.VehicleSaleDateLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Service Date') {
                this.ServiceDateLabel = label.DefaultLanguage;
            }  if (label.DefaultLanguage == 'Last Service') {
                this.LastServiceLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Action') {
                this.ActionLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Status') {
                this.StatusLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Mileage') {
                this.MileageLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Download Report') {
                this.DownloadReportLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Todays Calling Plan - Post Service Follow-up') {
                this.TodaysCallingPlanPostServiceFollowupLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Pending Cases') {
                this.PendingCasesLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Last Service Date') {
                this.LastServiceDateLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Service Visit History') {
                this.ServiceVisitHistoryLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Customer Details') {
                this.CustomerDetailsLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Submit') {
                this.SubmitLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Back') {
                this.BackLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Remarks') {
                this.RemarksLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Repair Details') {
                this.RepairDetailsLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Date') {
                this.DateLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'TIME') {
                this.TIMELabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Status Detail') {
                this.StatusDetailLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Call Activity') {
                this.CallActivityLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Call History') {
                this.CallHistoryLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Service Type') {
                this.ServiceTypeLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Job Card Number') {
                this.JobCardNumberLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Generated for today') {
                this.GeneratedfortodayLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == "Today's calling plan - due cases") {
                this.TodayCallingplanLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'No Action Leads') {
                this.NoActionLeadsLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'VIN Number') {
                this.ServiceAppointmentLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'All Leads') {
                this.AllLeadsLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Fresh Leads') {
                this.FreshLeadsLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Follow - Ups') {
                this.FollowsUpLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Non Contactable - Earlier') {
                this.NonCountableLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Email Id') {
                this.CustomerMileageLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Service Advisor') {
                this.CustomerSALabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Technician') {
                this.CustomerTecLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Save and Next') {
                this.ButtonText = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Instant Feedback Card') {
                this.PageTitle = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Contact Number 2') {
                this.CustomerContactLabel2 = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Search') {
                this.SearchText = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Follow-up Leads') {
                this.Followupleadslabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Non Contacted Leads') {
                this.NonContactedLeadlabel = label.DefaultLanguage;
            }       
        }
    }
    if (id > 2){
        this.defaultLanguage = false;
        for (let label of this.labelObj){
            if (label.Language_Id == id) {
                if (label.DefaultLanguage == 'From Date') {
                    this.FromDateLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'To Date') {
                    this.ToDateLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Customer Name') {
                    this.CustomerNameLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Mobile') {
                    this.MobileLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Vehicle Model') {
                    this.VehicleModelLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Follow Up Date') {
                    this.FollowUpDateLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Follow Up Time') {
                    this.FollowUpTimeLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Vehicle Sale Date') {
                    this.VehicleSaleDateLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Service Date') {
                    this.ServiceDateLabel = label.ConvertedLanguage;
                }  if (label.DefaultLanguage == 'Last Service') {
                    this.LastServiceLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Action') {
                    this.ActionLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Status') {
                    this.StatusLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Mileage') {
                    this.MileageLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Download Report') {
                    this.DownloadReportLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Todays Calling Plan - Post Service Follow-up') {
                    this.TodaysCallingPlanPostServiceFollowupLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Pending Cases') {
                    this.PendingCasesLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Last Service Date') {
                    this.LastServiceDateLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Customer Details') {
                    this.CustomerDetailsLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Submit') {
                    this.SubmitLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Back') {
                    this.BackLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Remarks') {
                    this.RemarksLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Repair Details') {
                    this.RepairDetailsLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Date') {
                    this.DateLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'TIME') {
                    this.TIMELabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Status Detail') {
                    this.StatusDetailLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Call Activity') {
                    this.CallActivityLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Call History') {
                    this.CallHistoryLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Service Visit History') {
                    this.ServiceVisitHistoryLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Service Type') {
                    this.ServiceTypeLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Job Card Number') {
                    this.JobCardNumberLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Generated for today') {
                    this.GeneratedfortodayLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == "Today's calling plan - due cases") {
                    this.TodayCallingplanLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'No Action Leads') {
                   this.NoActionLeadsLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'VIN Number') {
                   this.ServiceAppointmentLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'All Leads') {
                   this.AllLeadsLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Fresh Leads') {
                   this.FreshLeadsLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Follow - Ups') {
                  this.FollowsUpLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Non Contactable - Earlier') {
                  this.NonCountableLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Email Id') {
                  this.CustomerMileageLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Service Advisor') {
                  this.CustomerSALabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Technician') {
                  this.CustomerTecLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Save and Next') {
                  this.ButtonText = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Instant Feedback Card') {
                  this.PageTitle = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Contact Number 2') {
                  this.CustomerContactLabel2 = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Search') {
                 this.SearchText = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Follow-up Leads') {
                 this.Followupleadslabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Non Contacted Leads') {
                 this.NonContactedLeadlabel = label.ConvertedLanguage;
                }               
            }
        }
    }

    this.resultObj={
      FromDateLabel : this.FromDateLabel,
      ToDateLabel : this.ToDateLabel,
      CustomerNameLabel : this.CustomerNameLabel,
      MobileLabel : this.MobileLabel,
      VehicleModelLabel  : this.VehicleModelLabel,
      FollowUpDateLabel : this.FollowUpDateLabel,
      FollowUpTimeLabel  : this.FollowUpTimeLabel,
      VehicleSaleDateLabel : this.VehicleSaleDateLabel,
      ServiceDateLabel  : this.ServiceDateLabel,
      LastServiceLabel  : this.LastServiceLabel,
      ActionLabel  : this.ActionLabel,
      StatusLabel : this.StatusLabel,
      MileageLabel : this.MileageLabel,
      DownloadReportLabel  : this.DownloadReportLabel,
      TodaysCallingPlanPostServiceFollowupLabel  : this.TodaysCallingPlanPostServiceFollowupLabel,
      PendingCasesLabel : this.PendingCasesLabel,
      LastServiceDateLabel  : this.LastServiceDateLabel,
      ServiceVisitHistoryLabel  : this.ServiceVisitHistoryLabel,
      CustomerDetailsLabel  : this.CustomerDetailsLabel,
      SubmitLabel  : this.SubmitLabel,
      BackLabel  : this.BackLabel,
      RemarksLabel : this.RemarksLabel,
      RepairDetailsLabel  : this.RepairDetailsLabel,
      DateLabel  : this.DateLabel,
      TIMELabel : this.TIMELabel,
      StatusDetailLabel  : this.StatusDetailLabel,
      CallActivityLabel : this.CallActivityLabel,
      CallHistoryLabel  : this.CallHistoryLabel,
      ServiceTypeLabel  : this.ServiceTypeLabel,
      JobCardNumberLabel : this.JobCardNumberLabel,
      GeneratedfortodayLabel  : this.GeneratedfortodayLabel,
      TodayCallingplanLabel  : this.TodayCallingplanLabel,
      NoActionLeadsLabel  : this.NoActionLeadsLabel,
      ServiceAppointmentLabel  : this.ServiceAppointmentLabel,
      AllLeadsLabel  : this.AllLeadsLabel,
      FreshLeadsLabel : this.FreshLeadsLabel,
      FollowsUpLabel: this.FollowsUpLabel,
      NonCountableLabel : this.NonCountableLabel,
      CustomerMileageLabel : this.CustomerMileageLabel,
      CustomerSALabel : this.CustomerSALabel,
      CustomerTecLabel : this.CustomerTecLabel,
      ButtonText : this.ButtonText,
      PageTitle : this.PageTitle,
      CustomerContactLabel2  : this.CustomerContactLabel2,
      SearchText  : this.SearchText,
      Followupleadslabel : this.Followupleadslabel,
      NonContactedLeadlabel  : this.NonContactedLeadlabel,
  
    }
 }

 getCurrentWindow(curr:string){
   this.rx.sendCurrentView({txt:curr,searchObj:this.searchObj,pendingObj:this.pendingSearchObj});
 }

}
