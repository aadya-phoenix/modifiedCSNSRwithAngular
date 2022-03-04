import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConstantsService } from 'src/app/constants/constants.service';
import Swal from 'sweetalert2';
import { AutomaticCall } from '../../models/automaticCall.model';
import { CustomerDetailInfo } from '../../models/customerDetailInfo.model';
import { CustomerServiceInfo } from '../../models/customerServiceInfo.model';
import { SMRCallHistoryInfo } from '../../models/sMRCallHistoryInfo.model';
import { StatusInfo } from '../../models/statusInfo.model';
import { CustomerFeedbackViewComponent } from '../customer-feedback-view/customer-feedback-view.component';
import { PsfRxService } from '../services/psf-rx.service';
import { PsfService } from '../services/psf.service';
import {SurveyForm} from '../../../../models/surveyForm.model';
import { DatePipe } from '@angular/common';
import { CallLogInfo } from '../../models/callLogInfo.model';
import { TrnCommonService } from '../../services/trn-common.service';

@Component({
  selector: 'app-psf-view',
  templateUrl: './psf-view.component.html',
  styleUrls: ['./psf-view.component.css']
})
export class PsfViewComponent implements OnInit {

  @Input()
  labelObj!:any;

  @Input()
  showAutoDialer!:boolean;

  serviceHistory:CustomerServiceInfo[]=[];
  CustomerDetail!:CustomerDetailInfo;
  callHistory:SMRCallHistoryInfo[]=[];
  contactStatus:StatusInfo[]=[];
  noContactStatus:StatusInfo[]=[];
  surveyObj!:SurveyForm;

  session=this.constant.takeSession();
  defaultLanguage:boolean=true;
  
  contactedCREid:number=0;

  customerId:number=0;
  customerDetailID:number=0;
  callLogId:number=0;
  serviceTypeId:number=0;
  freshIndex:number=0;

  view1:boolean=true;
  view2:boolean=false;
  view3:boolean=false;
  view4:boolean=false;
  view5:boolean=false;
  view6:boolean=false;

  T1:boolean = true;
  T2:boolean= false;
  CheckOptionAnswer:any;

  booking:boolean=false;
  ContactTime:any;
  ContactDate:any;
  ContactRemarks:string='';
  Category:number=0;
  Feedback:boolean=false;
  ShowRemarks:boolean=false;
  ShowCloseFollowUp:boolean=false;
  CloseFollowUp:boolean=false;

  myAnswerCheckbox:any = {
    selected: {}
    };
  
  constructor(
    private psfService:PsfService,
    private constant:ConstantsService,
    private trnService:TrnCommonService,
    private rx:PsfRxService,
    public dialog:MatDialog,
    private datePipe:DatePipe
  ) { }

  ngOnInit(): void {
    this.rx.getCurrentView().subscribe(data=>{
      console.log("data",data);
      this.openSMRView(data.curr,data.custId,data.detailId,data.logId,data.serviceTypeId);
    });
  }

  openSMRView(curr:string,custId:number,detailId:number,logId:number,serviceTypeId:number){
    this.psfService.getSurveyBasedOnUser(this.session.User_Id).subscribe((data:any)=>{
      if (data != null) {
        this.surveyObj = data;
        for(let item of this.surveyObj.QuestionArray){
          for(let pt of item.Data){
            pt.CheckboxAnswer = [];
            pt.MultiSelectAnswer = [];
          }
        }
      }
     },(error)=>{
      console.log(error);
    });
    if (curr == 'view1'){
      this.view1 = true;
      this.view2 = false;
      this.view3 = false;
      this.view4 = false;
      this.view5 = false;
      this.view6 = false;
    }
    else if (curr == 'view2'){
      this.view1 = false;
      this.view2 = true;
      this.view3 = false;
      this.view4 = false;
      this.view5 = false;
      this.view6 = false;
      this.customerId = custId;
      this.customerDetailID = detailId;
      this.callLogId = logId;
      this.serviceTypeId = serviceTypeId;
    //  this.freshIndex = index;

      this.trnService.getCustomerServiceHistory(custId).subscribe((data:any)=>{
          this.serviceHistory = data;
        },(error)=>{
          console.log(error);
       });
       this.psfService.getCustomerDetail(custId).subscribe((data:any)=>{
          this.CustomerDetail = data;
        },(error)=>{
          console.log(error);
       });
       this.psfService.getSMRCallHistory(logId).subscribe((data:any)=>{
       this.callHistory = data;
      },(error)=>{
        console.log(error);
     });

      this.getStatusWindow('T1', 1);
      this.getStatusWindow('T2', 2);
    }

  }
  automaticCall(customerDtlId:number,name:string,contactNumber:string,creId:number,logId:number){
   const callDetail:AutomaticCall={
    CustomerDetail_Id: customerDtlId,
    CustomerName: name,
    ContactNumber: contactNumber,
    CRE_ID: creId,
    CallType: 'PSF',
    IsCall: true,
    CallLogId: logId,
    CreatedBy: this.session.User_Id,
   };
   
   this.psfService.generateAutomaticCall(callDetail).subscribe((data:any)=>{
    if (data != null) {
        Swal.fire(data);
     }
    },(error)=>{
      console.log(error);
   }); 
  }
  viewCallDetail(detailId:number,mobile:string){}
  openCustomerFeedback(){
   this.dialog.open(CustomerFeedbackViewComponent,{data:this.customerDetailID});
  }

  getStatusWindow(curr:string,id:number){
    if (curr == 'T1') {
      this.T1 = true;
      this.T2 = false;
      this.psfService.getSMRStatus(id).subscribe((data:any)=>{
          this.contactStatus = data;
          this.selectRadioButton(data[data.length - 2]);
        },(error)=>{
          console.log(error);
       });
    }
     else if (curr == 'T2') {
      this.T1 = false;
      this.T2 = true;
      this.psfService.getSMRStatus(id).subscribe((data:any)=>{
          this.noContactStatus = data;
        },(error)=>{
          console.log(error);
       });
    }
  }
  selectRadioButton(obj:StatusInfo){
    for(let item of this.contactStatus){
        item.IsSelected = false;
    }
    for(let item of this.contactStatus){
      item.IsSelected = false;
    }
    obj.IsSelected = true;
    if (obj.CallStatus == 'Customer Response') {
      this.Feedback = true;
      this.ShowRemarks = false;
      this.ContactTime = null;
      this.ShowCloseFollowUp = false;
      this.CloseFollowUp = false;
    }
    else {
      this.Feedback = false;
      this.ShowRemarks = true;
      this.ContactTime = null;
      this.ShowCloseFollowUp = false;
      this.CloseFollowUp = false;
    }
    this.showRemarksFn(obj.CaptureDate);
  }
  selectNonRadioButton(obj:StatusInfo) {
    for(let item of this.contactStatus){
      item.IsSelected = false;
    }
    for(let item of this.contactStatus){
    item.IsSelected = false;
    }
    obj.IsSelected = true;
    this.Feedback = false;
    this.ShowRemarks = true;
    this.ContactTime = null;
    this.ShowCloseFollowUp = true;
    this.CloseFollowUp = false;
    this.showRemarksFn(obj.CaptureDate);
  }
  showRemarksFn(obj:boolean){
      if (obj == true) {
        this.booking = true;
      }
      else {
        this.booking = false;
      }
  }
  saveSMRCallLog(id:number,view:string):any{
        var Status = 0;
        var DateReq = false;
        for (let item of this.contactStatus) {
            if (item.IsSelected == true){
                Status = item.CallStatus_Id;
                DateReq = item.CaptureDate;
            }
        }
        if (Status != 0) {
            this.Category = 1;
        }
        else {
            this.Category = 2;
        }
        for (let item of this.noContactStatus){
            if (item.IsSelected == true) {
                Status = item.CallStatus_Id;
                DateReq = item.CaptureDate;
            }
        }
        if (Status == 0) {
            Swal.fire('Error', 'Please select call status to continue', 'error');
            return false;
        }
        if (Status == 17) {
          for(let item of this.surveyObj.QuestionArray){
            for(let pt of item.Data){
                    var z= 1 ;
                    if (pt.QuestionType == 1) {
                        if (pt == null || pt.YesNoAnswere == '') {
                            return Swal.fire('Please select answer for question ' + z);
                        }
                    }
                    if (pt.QuestionType == 2) {
                        if (pt.SelectOptionArray == null ) {
                            return Swal.fire('Please select answer for question ' + z);
                        }
                    }
                    if (pt.QuestionType == 3) {
                        if (pt.MultiSelectAnswer == null) {
                            return Swal.fire('Please select answer for question ' + z);
                        }
                    }
                    if (pt.QuestionType == 7) {
                        if (pt.RangeAnswere == null || pt.RangeAnswere == '') {
                            return Swal.fire('Please select answer for question ' + z);
                        }
                    }
                    if (pt.QuestionType == 8) {
                        if (pt.RangeAnswere == null || pt.RangeAnswere == '') {
                            return Swal.fire('Please select answer for question ' + z);
                        }
                    }
                    z++;
                }
            }
        }
      
       if (this.CloseFollowUp == false && (Status == 12 || Status == 15 || Status == 16|| Status == 18)){
           if (DateReq == true && (this.ContactDate == '' || this.ContactDate == null)) {
            Swal.fire('Error', 'Please select date to continue', 'error');
                return false;
                  }
                if (DateReq == true && (this.ContactTime == '' || this.ContactTime == null)) {
            Swal.fire('Error', 'Please select time status to continue', 'error');
                return false;
              }
        }
	 
        const obj:CallLogInfo = {
            CallLog_Id: this.callLogId,
            Customer_Id: this.customerId,
            CustomerDetail_Id: this.customerDetailID,
            StatusCategory_Id: this.Category,
            CallStatus_Id: Status,
            FollowUpDate: this.Category == 1 ? this.ContactDate : this.ContactDate,
            FollowUpTime: this.Category == 1 ? this.datePipe.transform(this.ContactTime, 'HH:mm:ss') : this.datePipe.transform(this.ContactTime, 'HH:mm:ss'),
            Remarks: this.Category == 1 ? this.ContactRemarks : this.ContactRemarks,
            CreatedBy: this.session.User_Id,
            ServiceType_Id: this.serviceTypeId,
            QuestionArray: this.surveyObj.QuestionArray,
            CallType: 'PSF',
	      		CloseFollowUp: this.CloseFollowUp,
        };
        this.psfService.saveSMRCallLog(obj).subscribe(data=>{
            Swal.fire(data);
            this.getCurrentWindow("S1");
         },(error)=>{
            console.log(error);
        });
  }
  getCurrentWindow(view:string){}
}