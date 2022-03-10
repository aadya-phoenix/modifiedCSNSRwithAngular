import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


import { Subscription } from 'rxjs';
import { Search } from 'src/app/models/search.model';
import Swal from 'sweetalert2';
import { CustomerRptInfo } from '../../models/customerRptInfo.model';
import { CustomerFeedbackOverallComponent } from '../customer-feedback-overall/customer-feedback-overall.component';
import { DisSatisfiedService } from '../services/dis-satisfied.service';
import { RxDisService } from '../services/rx-dis.service';

@Component({
  selector: 'app-dissatisfied-customers-form',
  templateUrl: './dissatisfied-customers-form.component.html',
  styleUrls: ['./dissatisfied-customers-form.component.css']
})
export class DissatisfiedCustomersFormComponent implements OnInit {

  @Input()
  labelObj!:any;

  @Input()
  searchObj!:Search;

  searchEventSubscription!:Subscription;

  searchText:string='';
  currentPage:number=1;

  savedFormArray:CustomerRptInfo[]=[];
  complaintAttr:any;
  
  constructor(
    private disService:DisSatisfiedService,
    private rxService:RxDisService,
    private datePipe:DatePipe,
    public dialog:MatDialog
  ) { }


  ngOnInit(): void {
    this.searchCustomer();

    this.searchEventSubscription = this.rxService.getEvent().subscribe((data) => {
      this.searchObj = data.search;
      console.log("search obj",this.searchObj);
      this.searchCustomer();
    });

    this.disService.getComplaintAttribution().subscribe((data:any)=>{
      this.complaintAttr = data;
      },(error)=>{
      console.log(error);
    });
  }

  searchCustomer(){
    this.disService.getDissatisfiedCustomer(this.searchObj).subscribe((data:any)=>{
      this.savedFormArray = data;
    },err=>{
      console.log(err);
    });
  }

  openCustomerFeedback(id:number,detailId:number){
    this.dialog.open(CustomerFeedbackOverallComponent,{data:{custId:id,detailId:detailId}});
  }

  update(obj:CustomerRptInfo):any{
    if (obj.Date == null) {
      Swal.fire('error', 'Please Select Conversion Date', 'error');
      return false;
    }
    if (obj.ConversionType == null || obj.ConversionType == '') {
        Swal.fire('error', 'Please Select Conversion Mode', 'error');
        return false;
    }
    if (obj.Remarks == null || obj.Remarks == '') {
        Swal.fire('error', 'Please Enter Remarks', 'error');
        return false;
    }
    if(obj.ComplaintAttribution == null || obj.ComplaintAttribution == ""){
        Swal.fire('Erorr','Please Select Complaint Category ', 'error');
        return false;
    }
    this.disService.updateDissaitisfiedCustomer(obj).subscribe((data:any)=>{
      if (data != null) {
          Swal.fire('Sucess', data, 'success');
          this.init();
       }
      },(error)=>{
       console.log(error);
    });
  }

  init(){}
}
