import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerRptInfo } from '../../models/customerRptInfo.model';
import { PsfService } from '../services/psf.service';

@Component({
  selector: 'app-customer-feedback-view',
  templateUrl: './customer-feedback-view.component.html',
  styleUrls: ['./customer-feedback-view.component.css']
})
export class CustomerFeedbackViewComponent implements OnInit {

  customerId:number=0;
  savedFormArray:CustomerRptInfo[]=[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private psfService:PsfService
    ) { }

  ngOnInit(): void {
    this.customerId = this.data;
    this.psfService.getCustomerFeedbackReport(this.customerId).subscribe((data:any)=>{
      this.savedFormArray = data;
    },(error)=>{
      console.log(error);
   });
  }

}
