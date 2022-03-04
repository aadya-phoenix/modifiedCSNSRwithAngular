import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConstantsService } from 'src/app/constants/constants.service';
import { DealerEmployee } from 'src/app/models/dealerEmployee.model';
import { SurveyForm } from 'src/app/models/surveyForm.model';
import { Vehicle } from 'src/app/models/vehicle.model';
import { ApiService } from 'src/app/services/api.service';
import { MastersApiService } from 'src/app/services/masters-api.service';
import { CustomerInfo } from '../../models/customerInfo.model';
import { CustomerFeedbackRxService } from '../services/customer-feedback-rx.service';
import { CustomerFeedbackService } from '../services/customer-feedback.service';
import * as _ from 'lodash';
import Swal from 'sweetalert2';
import { InstantFeedbackInfo } from '../../models/instantFeedbackInfo.model';

@Component({
  selector: 'app-customer-feedback-form',
  templateUrl: './customer-feedback-form.component.html',
  styleUrls: ['./customer-feedback-form.component.css']
})
export class CustomerFeedbackFormComponent implements OnInit {

  @Input()
  labelObj!:any;

  VINNumber:string='';
  Customer!:CustomerInfo;
  CustomerDisabled:boolean=true;
  ShowDetails:boolean=true;
  defaultLanguage:boolean=true;

  vehicleObj:Vehicle[]=[];
  SAObj:DealerEmployee[]=[];
  TecObj:DealerEmployee[]=[];
  surveyObj!:SurveyForm;
  rawObj!:SurveyForm;

  surveyId!:number;
  dataLoaded!:boolean;
  customer_Id:string='';
  src:string='';

  searchEventSubscription!: Subscription;
  session= this.constant.takeSession();
  
  
  constructor(
    private rxService:CustomerFeedbackRxService,
    private cfService:CustomerFeedbackService,
    private constant:ConstantsService,
    private masters:MastersApiService,
    private apiService:ApiService,
    private datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.searchEventSubscription = this.rxService.getEvent().subscribe((data) => {
      this.VINNumber = data.vin;
      console.log("Vin number is",this.VINNumber);
      this.searchByVIN();
    });
    this.getFormDetails();
    this.Customer={
      CustomerName : '' ,
      CustomerMobile : '' ,
      CustomerMobile2 : '' ,
      CustomerEmail : '' ,
      VINNumber : '' ,
      RegistrationNumber : '' ,
      Vehicle_Id : 0,
      VehicleName : '' ,
      VehicleCode : '' ,
      DealerCode :'' ,
      JOBCardNumber : '' ,
      ServiceAdvisorEmpCde : '' ,
      TecnicianEmpCde : '' ,
      InvoiceDate : null,
      Mileage :  0,
      ServiceTypeId :  0,
      ServiceAdvisorId :  0,
      TecnicianId : 0,
      OutletId :  0,
      Customer_Id :  0,
      ServiceType : '' ,
      DealerOutletId :  0,
      Remarks : '' ,   
      ComplaintStatus :  0,
      CmplnAttribute : '' ,
      RepairDetails : '' ,
    }
  }

   getFormDetails(){
     this.masters.getVehicleList().subscribe((data:any)=>{
       this.vehicleObj=data;
      },err=>{
      console.log(err);
    });

    this.apiService.getSAList(this.session.AccountId).subscribe((data:any)=>{
      this.SAObj = data;
    },err=>{
      console.log(err);
    });

    
    this.apiService.getTecnicianList(this.session.AccountId).subscribe((data:any)=>{
      this.TecObj = data;
    },err=>{
      console.log(err);
    });

    this.cfService.getSurveyDetail(this.session.User_Id).subscribe((data:any)=>{
      if (data != null) {
          this.surveyObj = data;
         for(let que of this.surveyObj.QuestionArray ){
           for(let value of que.Data){
                  value.CheckboxAnswer = [];
                  value.MultiSelectAnswer = [];
              };
            };
          console.log("survey",this.surveyObj);
          this.rawObj = _.cloneDeep(this.surveyObj);
         this.surveyId = data.Id;
       }
      else {
          this.dataLoaded = false;
        }},err=>{
          console.log(err);
        });
  
   }

  searchByVIN():any{
    if (this.VINNumber == null || this.VINNumber == '')
    {
        Swal.fire('Error', 'Please enter VIN Nunmber to continue', 'error');
        return false;
    }
   
    this.cfService.getCustomerByVIN(this.VINNumber, this.session.User_Id).subscribe((data:any):any=>{
      if (data != null) {
            this.Customer = data;
            this.Customer.InvoiceDate = this.datepipe.transform(data.InvoiceDate, 'MMMM dd, yyyy');
            this.CustomerDisabled = true;
            this.ShowDetails = true;
          }
        else {
            this.ShowDetails = false;
            Swal.fire('Error', 'No customer data exists.', 'error');
            return false;
        }
      },err=>{
        console.log(err);
      });
  }

  multiSelectSelected(){}
  checkboxSeleted(){}

  save():any{
    if (this.Customer.VINNumber == '' || this.Customer.VINNumber == null) {
        Swal.fire('Please enter customer VIN');
        return false;
    }
    if (this.Customer.CustomerMobile == '' || this.Customer.CustomerMobile == null) {
      Swal.fire('Please enter customer mobile');
        return false;
    }

  for (let item of this.surveyObj.QuestionArray){
      for (let pt of item.Data){
          var z = 1;
          if (pt.QuestionType == 1) {
              if (pt.YesNoAnswere == null || pt.YesNoAnswere == ''){
                  return Swal.fire('Please select answer for question ' + z);
              }
          }
          if (pt.QuestionType == 2) {
              if (pt.SelectOptionArray == null){
                  return Swal.fire('Please select answer for question ' + z);
              }
          }
          if (pt.QuestionType == 3) {
              if (pt.MultiSelectAnswer == null ){
                  return Swal.fire('Please select answer for question ' + z);
              }
          }

          if (pt.QuestionType == 7) {
              if (pt.RangeAnswere == null || pt.RangeAnswere == ''){
                  return Swal.fire('Please select answer for question ' + z);
              }
          }
          if (pt.QuestionType == 8) {
              if (pt.RangeAnswere == null || pt.RangeAnswere == ''){
                  return Swal.fire('Please select answer for question ' + z);
             }
           }
           z++;
        }
  const Obj : InstantFeedbackInfo= {
      Customer_Id: this.customer_Id,     
      Survey_Id: this.surveyId,
      Src: this.src,
      QuestionArray: this.surveyObj.QuestionArray,
      Customer:this.Customer
  };
   this.cfService.saveResponse(Obj).subscribe((data:any)=>{
      if (data.indexOf('succesfully') != -1) {
        Swal.fire('Thanks', data, 'success');
          this.surveyObj = _.cloneDeep(this.rawObj);
          this.Customer = {} as CustomerInfo;
          this.init();
      }
      else
      {
        Swal.fire('Error', data, 'error');
      }
    },(error)=>{
      console.log(error);
  });

  }
 }
 init(){

 }
}
