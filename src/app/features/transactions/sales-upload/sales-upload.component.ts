import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConstantsService } from 'src/app/constants/constants.service';
import { Label } from 'src/app/models/label.model';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { TrnCommonService } from '../services/trn-common.service';

@Component({
  selector: 'app-sales-upload',
  templateUrl: './sales-upload.component.html',
  styleUrls: ['./sales-upload.component.css']
})
export class SalesUploadComponent implements OnInit {

  labelObj:Label[]=[];
  
  myFile:any; 
  session= this.constant.takeSession();
  selectedLang:number=this.constant.selectedLanguage;

  UploadCustomerDataLabel:string='';
  UploadSalesLabel:string='';
  ExampleFileLabel:string='';
  DownloadTemplateLabel:string='';
  ImportantPointsLabel:string='';
  ColoumMarkedLabel:string='';
  ColoumMandatryLabel:string='';
  CustomerNameLabel:string='';
  RegNoLabel:string='';
  CustomerVINLabel:string='';
  CustomerServiceTypeLabel:string='';
  CustomerVehicleLabel:string='';
  CustomerMileageLabel:string='';
  VehicleModelLabel:string='';
  ServiceTpeReferLabel:string='';
  BillDateExamLabel:string='';
  PageTitle:string='';
  CustomerRemarksLabel:string='';
  SerachText:string='';
  DealerOutletLabel:string='';
  ComplaintSourceLabel:string='';
  VehicleSaleLabel:string=';'

  constructor(
    private constant:ConstantsService,
    private apiService:ApiService,
    private trnCommonService:TrnCommonService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getFormDetails();
  }

  getFormDetails(){
    this.apiService.getLabel().subscribe((data:any):any=>{
      this.labelObj = data;
      this.selectLanguage(this.selectedLang);
     },err=>{
      console.log(err);
    });
  }

  uploadFile(event:any){
    this.myFile = event.target.files[0];
  }

  uploadCustomer():any{
    const formdata = new FormData()  ;
    formdata.append('file',this.myFile);

    const obj = {
      User_Id: this.session.User_Id,
      UploadType: 'Sales'
    };
    formdata.append('file',this.myFile);
    formdata.append('data', JSON.stringify(obj));

    if (this.myFile == null || this.myFile == '') {
      Swal.fire('Please Upload customer Data');
      return false;
    }
    this.trnCommonService.uploadCustomer(formdata).subscribe((data:any):any=>{
      if (data.indexOf('Success') != -1) {
        Swal.fire('success', 'Customers uploaded succesfully', 'success');
      }
      else {
          Swal.fire('Error', data, 'error');
         }
        },err=>{
        Swal.fire('Error', err, 'error');
    });
  }

  selectLanguage(id:number){
    if (id == 2) {
       for (let label of this.labelObj) {
         if (label.DefaultLanguage == 'Upload Customer Data') {
             this.UploadCustomerDataLabel = label.DefaultLanguage;
         }
         if (label.DefaultLanguage == 'Upload Sales Data') {
             this.UploadSalesLabel = label.DefaultLanguage;
         }
         if (label.DefaultLanguage == 'Example File') {
             this.ExampleFileLabel = label.DefaultLanguage;
         }
         if (label.DefaultLanguage == 'Download Template') {
             this.DownloadTemplateLabel = label.DefaultLanguage;
         }
         if (label.DefaultLanguage == 'Important Points') {
             this.ImportantPointsLabel = label.DefaultLanguage;
         }
         if (label.DefaultLanguage == 'Columns marked in red in excel template are mandatory') {
             this.ColoumMarkedLabel = label.DefaultLanguage;
         }
         if (label.DefaultLanguage == 'Following columns are mandatory:') {
             this.ColoumMandatryLabel = label.DefaultLanguage;
         }
         if (label.DefaultLanguage == 'Customer Name') {
             this.CustomerNameLabel = label.DefaultLanguage;
         }
         if (label.DefaultLanguage == 'Registration Number') {
             this.RegNoLabel = label.DefaultLanguage;
         }
          if (label.DefaultLanguage == 'VIN Number') {
             this.CustomerVINLabel = label.DefaultLanguage;
         }
          if (label.DefaultLanguage == 'Service Type') {
             this.CustomerServiceTypeLabel = label.DefaultLanguage;
          }
         if (label.DefaultLanguage == 'Vehicle') {
             this.CustomerVehicleLabel = label.DefaultLanguage;
         }
         if (label.DefaultLanguage == 'Mileage') {
             this.CustomerMileageLabel = label.DefaultLanguage;
         }
         if (label.DefaultLanguage == 'Vehicle Model (Refer Vehicle)') {
             this.VehicleModelLabel = label.DefaultLanguage;
         }
         if (label.DefaultLanguage == 'Service Type (Refer Service Type)') {
             this.ServiceTpeReferLabel = label.DefaultLanguage;
         }
         if (label.DefaultLanguage == 'Bill Date & Vehicle Sale Date should be in DD-MMM-YYYY format (ex : 01-Jan-2018)') {
             this.BillDateExamLabel = label.DefaultLanguage;
         }
         if (label.DefaultLanguage == 'Instant Feedback Card') {
             this.PageTitle = label.DefaultLanguage;
         }
        if (label.DefaultLanguage == 'Remarks') {
             this.CustomerRemarksLabel = label.DefaultLanguage;
                }
         if (label.DefaultLanguage == 'Search by VIN Number or Mobile Number or Registration Number') {
                    this.SerachText = label.DefaultLanguage;
                }
        if (label.DefaultLanguage == 'Dealer Outlet Code') {
                    this.DealerOutletLabel = label.DefaultLanguage;
                }
        if (label.DefaultLanguage == 'Complaint Source') {
                    this.ComplaintSourceLabel = label.DefaultLanguage;
                }
         if (label.DefaultLanguage == 'Vehicle Sale Date should be in DD-MMM-YYYY format (ex : 01-Jan-2018)'){
           this.VehicleSaleLabel = label.DefaultLanguage;
             }
           }
        }
    if (id > 2){
        for (let label of this.labelObj) {
       if(label.Language_Id==id){ 
          if (label.DefaultLanguage == 'Upload Customer Data') {
             this.UploadCustomerDataLabel = label.ConvertedLanguage;
         }
         if (label.DefaultLanguage == 'Upload Sales Data') {
             this.UploadSalesLabel = label.ConvertedLanguage;
         }

         if (label.DefaultLanguage == 'Example File') {
             this.ExampleFileLabel = label.ConvertedLanguage;
         }
         if (label.DefaultLanguage == 'Download Template') {
             this.DownloadTemplateLabel = label.ConvertedLanguage;
         }
         if (label.DefaultLanguage == 'Important Points') {
             this.ImportantPointsLabel = label.ConvertedLanguage;
         }
         if (label.DefaultLanguage == 'Columns marked in red in excel template are mandatory') {
             this.ColoumMarkedLabel = label.ConvertedLanguage;
         }
         if (label.DefaultLanguage == 'Following columns are mandatory:') {
             this.ColoumMandatryLabel = label.ConvertedLanguage;
         }
         if (label.DefaultLanguage == 'Customer Name') {
             this.CustomerNameLabel = label.ConvertedLanguage;
         }
         if (label.DefaultLanguage == 'Registration Number') {
             this.RegNoLabel = label.ConvertedLanguage;
         }
          if (label.DefaultLanguage == 'VIN Number') {
             this.CustomerVINLabel = label.ConvertedLanguage;
         }
          if (label.DefaultLanguage == 'Service Type') {
              this.CustomerServiceTypeLabel = label.ConvertedLanguage;
           }
        if (label.DefaultLanguage == 'Vehicle') {
             this.CustomerVehicleLabel = label.ConvertedLanguage;
         }
         if (label.DefaultLanguage == 'Mileage') {
             this.CustomerMileageLabel = label.ConvertedLanguage;
         }
         if (label.DefaultLanguage == 'Vehicle Model (Refer Vehicle)') {
             this.VehicleModelLabel = label.ConvertedLanguage;
         }
         if (label.DefaultLanguage == 'Service Type (Refer Service Type)') {
             this.ServiceTpeReferLabel = label.ConvertedLanguage;
         }
         if (label.DefaultLanguage == 'Bill Date & Vehicle Sale Date should be in DD-MMM-YYYY format (ex : 01-Jan-2018)') {
             this.BillDateExamLabel = label.ConvertedLanguage;
         }
         if (label.DefaultLanguage == 'Instant Feedback Card') {
             this.PageTitle = label.ConvertedLanguage;
         }
         if (label.DefaultLanguage == 'Remarks'){
                this.CustomerRemarksLabel = label.ConvertedLanguage;
         }
          if (label.DefaultLanguage == 'Search by VIN Number or Mobile Number or Registration Number') {
                     this.SerachText = label.ConvertedLanguage;
          }
         if (label.DefaultLanguage == 'Dealer Outlet Code') {
                     this.DealerOutletLabel = label.ConvertedLanguage;
          }
         if (label.DefaultLanguage == 'Complaint Source') {
                     this.ComplaintSourceLabel = label.ConvertedLanguage;
          }
           if (label.DefaultLanguage == 'Vehicle Sale Date should be in DD-MMM-YYYY format (ex : 01-Jan-2018)'){
            this.VehicleSaleLabel = label.DefaultLanguage;
           }
           }
     
         }
       }
  }

  vehicle(){
    this.router.navigateByUrl('/index/Vehicle');
  }
}
