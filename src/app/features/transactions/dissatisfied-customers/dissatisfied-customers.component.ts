import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ConstantsService } from 'src/app/constants/constants.service';
import { Label } from 'src/app/models/label.model';
import { Search } from 'src/app/models/search.model';
import { ApiService } from 'src/app/services/api.service';
import { RxDisService } from './services/rx-dis.service';

@Component({
  selector: 'app-dissatisfied-customers',
  templateUrl: './dissatisfied-customers.component.html',
  styleUrls: ['./dissatisfied-customers.component.css']
})
export class DissatisfiedCustomersComponent implements OnInit {

  selectedLang:number=this.constant.selectedLanguage;
  session = this.constant.takeSession();
  defaultLanguage:boolean=true;

  searchObj!:Search;
  labelObj:Label[]=[];
  resultObj:any;

  CustomerNameLabel:string = '';
  MobileLabel:string = '';
  VehicleModelLabel:string = '';
  ResponseDateLabel:string = '';
  DetailsLabel:string = '';
  RemarksLabel:string = '';
  BillDateLabel:string = '';
  ServiceTypeLabel:string = '';
  RegistrationNoLabel:string = '';
  EmailLabel:string = '';
  ConversionDateLabel:string = '';
  ConversionModeLabel:string = '';
  ComplaintCategoryLabel:string = '';
  OutletLabel:string = '';
  ActionTakenRemarksLabel:string = '';
  ActionLabel:string = '';
  ConvertedtoSatisfyLabel:string = '';
  FromDateLabel:string = '';
  ToDateLabel:string = '';
  SourceLabel:string = '';
  SearchTextLabel:string = '';
  DisSatisfactionLabel:string = '';
  UpdateLabel:string = '';

  constructor(
    private constant:ConstantsService,
    private apiService:ApiService,
    private rx:RxDisService,
    private datePipe: DatePipe,
    ) { }

  ngOnInit(): void {
    let date = new Date();
      this.searchObj={
        FromDate: null,
        ToDate: null,
        VehicleType: 0,
        Country_Id: 0,
        UserID: this.session.User_Id,
        SatisfactionType: '',
        OutletId: 0,
        Source: 'All'
      }
      let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      this.searchObj.FromDate = this.datePipe.transform(firstDay, 'MMMM dd, yyyy');
      this.searchObj.ToDate = this.datePipe.transform(lastDay, 'MMMM dd, yyyy');
      this.getFormDetails();
  }

  getFormDetails(){
    this.apiService.getLabel().subscribe(data=>{
      this.labelObj = data;
      this.selectLanguage(this.selectedLang);
     },(error)=>{
      console.log(error);
   });
  }

  selectLanguage(id:number){
    if (id == 2) {
        this.defaultLanguage = true;
        for (let label of this.labelObj){
            if (label.DefaultLanguage == 'Customer Name') {
                this.CustomerNameLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Mobile') {
                this.MobileLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Vehicle Model') {
                this.VehicleModelLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Response Date') {
                this.ResponseDateLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Details') {
                this.DetailsLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Remarks') {
                this.RemarksLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Bill Date') {
                this.BillDateLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Service Type') {
                this.ServiceTypeLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Registration No') {
                this.RegistrationNoLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Email') {
                this.EmailLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Conversion Date') {
                this.ConversionDateLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Conversion Mode') {
                this.ConversionModeLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Complaint Category') {
                this.ComplaintCategoryLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Outlet') {
                this.OutletLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Action Taken/Remarks') {
                this.ActionTakenRemarksLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Action') {
                this.ActionLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Converted to Satisfy') {
                this.ConvertedtoSatisfyLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'From Date') {
                this.FromDateLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'To Date') {
                this.ToDateLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Source') {
                this.SourceLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Search') {
                this.SearchTextLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Dis-satisfied to Satisfied – Conversion') {
                this.DisSatisfactionLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Update') {
                this.UpdateLabel = label.DefaultLanguage;
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
                } if (label.DefaultLanguage == 'Response Date') {
                    this.ResponseDateLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Details') {
                    this.DetailsLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Remarks') {
                    this.RemarksLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Bill Date') {
                    this.BillDateLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Service Type') {
                    this.ServiceTypeLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Registration No') {
                    this.RegistrationNoLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Email') {
                    this.EmailLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Conversion Date') {
                    this.ConversionDateLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Conversion Mode') {
                    this.ConversionModeLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Complaint Category') {
                    this.ComplaintCategoryLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Outlet') {
                    this.OutletLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Action Taken/Remarks') {
                    this.ActionTakenRemarksLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Action') {
                    this.ActionLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Converted to Satisfy') {
                    this.ConvertedtoSatisfyLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'From Date') {
                    this.FromDateLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'To Date') {
                    this.ToDateLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Source') {
                    this.SourceLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Search') {
                    this.SearchTextLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Dis-satisfied to Satisfied – Conversion') {
                    this.DisSatisfactionLabel = label.ConvertedLanguage;
                } if (label.DefaultLanguage == 'Update') {
                    this.UpdateLabel = label.ConvertedLanguage;
                }
            }
        }
    }

    this.resultObj={
      CustomerNameLabel:this.CustomerNameLabel ,
      MobileLabel:this.MobileLabel ,
      VehicleModelLabel:this.VehicleModelLabel ,
      ResponseDateLabel:this.ResponseDateLabel  ,
      DetailsLabel:this.DetailsLabel  ,
      RemarksLabel:this.RemarksLabel  ,
      BillDateLabel:this.BillDateLabel ,
      ServiceTypeLabel:this.ServiceTypeLabel ,
      RegistrationNoLabel:this.RegistrationNoLabel  ,
      EmailLabel:this.EmailLabel  ,
      ConversionDateLabel:this.ConversionDateLabel  ,
      ConversionModeLabel:this.ConversionModeLabel ,
      ComplaintCategoryLabel:this.ComplaintCategoryLabel ,
      OutletLabel:this.OutletLabel ,
      ActionTakenRemarksLabel:this.ActionTakenRemarksLabel ,
      ActionLabel:this.ActionLabel ,
      ConvertedtoSatisfyLabel:this.ConvertedtoSatisfyLabel ,
      FromDateLabel:this.FromDateLabel ,
      ToDateLabel:this.ToDateLabel  ,
      SourceLabel:this.SourceLabel ,
      SearchTextLabel:this.SearchTextLabel ,
      DisSatisfactionLabel:this.DisSatisfactionLabel ,
      UpdateLabel:this.UpdateLabel ,
    }
  } 

  searchCustomer(){
    this.rx.sendEvent({search:this.searchObj});
  }
}
