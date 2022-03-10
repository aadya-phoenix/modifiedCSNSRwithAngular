import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerRptInfo } from '../../models/customerRptInfo.model';
import { DisSatisfiedService } from '../services/dis-satisfied.service';

@Component({
  selector: 'app-customer-feedback-overall',
  templateUrl: './customer-feedback-overall.component.html',
  styleUrls: ['./customer-feedback-overall.component.css']
})
export class CustomerFeedbackOverallComponent implements OnInit {

  customerDetailId:number=0;
  customerId:number=0;
  searchText:string='';
  customerFeedbackFormArray:CustomerRptInfo[]=[];
  surveySavedFormArray:CustomerRptInfo[]=[];
  PSFSavedFormArray:CustomerRptInfo[]=[];
  PSFSalesSavedFormArray:CustomerRptInfo[]=[];

  constructor(
    @Inject(MAT_DIALOG_DATA)public data:any,
    private disService:DisSatisfiedService,) { }

  ngOnInit(): void {
    this.customerDetailId = this.data.detailId;
    this.customerId = this.data.id;

    this.disService.getCustomerFeedbackReport(this.customerDetailId).subscribe((data:any)=>{
      this.customerFeedbackFormArray = data;
      console.log(data);
      },(error)=>{
       console.log(error);
    });
    this.disService.generateCustomerFeedbackReportForSurvey(this.customerDetailId).subscribe((data:any)=>{
      this.surveySavedFormArray = data;
      console.log(data);
    },(error)=>{
      console.log(error);
   });
   
   this.disService.generateCustomerFeedbackReportForPSF(this.customerDetailId).subscribe((data:any)=>{
    this.PSFSavedFormArray = data;
    console.log(data);
     },(error)=>{
    console.log(error);
   });

   this.disService.generateCustomerFeedbackReportForPSFSALES(this.customerId).subscribe((data:any)=>{
    this.PSFSalesSavedFormArray = data;
    console.log(data);
     },(error)=>{
    console.log(error);
   });
  }

}
