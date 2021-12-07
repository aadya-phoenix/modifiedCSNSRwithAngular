import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Label } from 'src/app/models/label.model';
import { Outlet } from 'src/app/models/oultet.model';
import { ApiService } from 'src/app/services/api.service';
import { ConstantsService } from 'src/app/constants/constants.service';
import { TransactionConstantsService } from 'src/app/constants/transaction-constants.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { CommonService } from './common.service';

@Component({
  selector: 'customer-complaint-form',
  templateUrl: './customer-complaint-form.component.html',
  styles: [
  ]
})
export class CustomerComplaintFormComponent implements OnInit {
  @Input('vinNumber')
  VINNumber:string=this.constants.VINNumber;


  labelObj:Label[]=[];
  outletObj: Outlet[]=[];
  defaultLanguage:boolean = true;
  selectedLanguage: number = this.constantService.selectedLanguage;
  session = this.constantService.takeSession();
  Role = this.session.RoleName;
  CustomerDisabled:boolean=true;

  SAObj:any;
  TecObj:any;
  Customer:any;
  complaintSource:any;
  serviceTypeObj:any;
  vehicleObj:any;

  customerSubscription!: Subscription;

  SerachText: string = '';
  CustomerNameLabel: string = '';
  CustomerContactLabel: string = '';
  CustomerEmailLabel: string = '';
  CustomerVINLabel: string = '';
  CustomerRegistrationLabel: string = '';
  CustomerVehicleLabel: string = '';
  CustomerJCNLabel: string = '';
  CustomerInvoiceDateLabel: string = '';
  CustomerServiceTypeLabel: string = '';
  CustomerMileageLabel: string = '';
  CustomerSALabel: string = '';
  CustomerTecLabel: string = '';
  ButtonText: string = '';
  PageTitle: string = '';
  CustomerRemarksLabel: string = '';
  SerachTextLabel: string = '';
  DealerOutletLabel: string = '';
  ComplaintSourceLabel: string = '';
  CCLabel: string = '';
  CustomerContactLabel2: string = '';
  RepairDetailsLabel: string = '';

  constructor(
    private apiService: ApiService,
    private constants:TransactionConstantsService,
    private constantService: ConstantsService,
    private datePipe: DatePipe,
    private common:CommonService
  ) { }

  ngOnInit(): void {
    this.apiService.getLabel().subscribe(data=>{
      this.labelObj  = data;
      this.selectLanguage(this.selectedLanguage);
     },err=>{
       console.log(err);
     });
   this.customerSubscription = this.common.getCustomerEvent().subscribe(()=>{
     this.searchByVIN();
   });

   this.getDealerByCountry(this.session.Country_Id);
     
  }
  searchByVIN():any{
  this.apiService.getCustomerByVIN(this.VINNumber,this.session.User_Id).subscribe(
    (data:any)=>{
      if(data != null){
        console.log("data is..",data);
        this.Customer = data;
        this.Customer.InvoiceDate = this.datePipe.transform(data.InvoiceDate, 'MMMM dd, yyyy');
        this.CustomerDisabled = false;
        this.getEmployee(this.Customer.OutletId);
        this.getServiceList(this.Customer.Vehicle_Id);
      }
    }
  )}
  selectLanguage(id: number) {
    if (id == 2) {
      this.defaultLanguage = true;
      for (var i = 0; i < this.labelObj.length; i++) {
        if (this.labelObj[i].DefaultLanguage == 'Search by VIN Number or Mobile Number or Registration Number') {
          this.SerachText = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'Customer Name') {
          this.CustomerNameLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'Contact Number') {
          this.CustomerContactLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'Email Id') {
          this.CustomerEmailLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'VIN Number') {
          this.CustomerVINLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'Registration Number') {
          this.CustomerRegistrationLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'Vehicle') {
          this.CustomerVehicleLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'Job Card Number') {
          this.CustomerJCNLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'Invoice/Bill Date') {
          this.CustomerInvoiceDateLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'Service Type') {
          this.CustomerServiceTypeLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'Mileage') {
          this.CustomerMileageLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'Service Advisor') {
          this.CustomerSALabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'Technician') {
          this.CustomerTecLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'Save and Next') {
          this.ButtonText = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'Instant Feedback Card') {
          this.PageTitle = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'Remarks') {
          console.log(this.labelObj[i].DefaultLanguage);
          this.CustomerRemarksLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'Search') {
          this.SerachTextLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'Dealer Outlet Code') {
          this.DealerOutletLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'Complaint Source') {
          this.ComplaintSourceLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'Customer Complaint') {
          this.CCLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'Contact Number 2') {
          this.CustomerContactLabel2 = this.labelObj[i].DefaultLanguage;
        }

        if (this.labelObj[i].DefaultLanguage == 'Repair Details') {
          this.RepairDetailsLabel = this.labelObj[i].DefaultLanguage;
        }


      }
    }
    if (id > 2) {
      this.defaultLanguage = false;
      for (var i = 0; i < this.labelObj.length; i++) {

        if (this.labelObj[i].Language_Id == id) {

          if (this.labelObj[i].DefaultLanguage == 'Customer Name') {
            this.CustomerNameLabel = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'Contact Number') {
            this.CustomerContactLabel = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'Email Id') {
            this.CustomerEmailLabel = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'VIN Number') {
            this.CustomerVINLabel = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'Registration Number') {
            this.CustomerRegistrationLabel = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'Vehicle') {
            this.CustomerVehicleLabel = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'Job Card Number') {
            this.CustomerJCNLabel = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'Invoice/Bill Date') {
            this.CustomerInvoiceDateLabel = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'Service Type') {
            this.CustomerServiceTypeLabel = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'Mileage') {
            this.CustomerMileageLabel = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'Service Advisor') {
            this.CustomerSALabel = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'Technician') {
            this.CustomerTecLabel = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'Save and Next') {
            this.ButtonText = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'Instant Feedback Card') {
            this.PageTitle = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'Remarks') {
            console.log(this.labelObj[i].DefaultLanguage);
            this.CustomerRemarksLabel = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'Search by VIN Number or Mobile Number or Registration Number') {
            this.SerachText = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'Search') {
            this.SerachTextLabel = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'Dealer Outlet Code') {
            this.DealerOutletLabel = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'Complaint Source') {
            this.ComplaintSourceLabel = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'Customer Complaint') {
            this.CCLabel = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'Contact Number 2') {
            this.CustomerContactLabel2 = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'Repair Details') {
            this.RepairDetailsLabel = this.labelObj[i].ConvertedLanguage;
          }


        }
      }
    }
  };

  getEmployee(id:number){
    this.apiService.getSAList(id).subscribe(data=>{
      this.SAObj = data;
      console.log("this.SAObj",this.SAObj);
    },err=>{
      console.log("error is ",err);
    });
    this.apiService.getTecnicianList(id).subscribe(data=>{
      this.TecObj = data;
      console.log("this.TecObj",this.TecObj);
    },err=>{
      console.log("error in technician list",err);
    });
  }

  getServiceList(id:number){
    this.apiService.getServiceTypeList(id).subscribe(data=>{
    this.serviceTypeObj = data;
    },err=>{
      console.log("error is..",err);
    });
  }

  getDealerByCountry(id:number){
    this.apiService.getOutLetListByCountry(id).subscribe((data:any)=>{
          this.outletObj  = data;
          if (this.session.RoleName == 'DealerAdmin') {
            this.Customer.OutletId = this.session.AccountId;
            this.getEmployee(this.Customer.OutletId);
        }
    },err=>{
      console.log(err);
    });
  }

  getFormdetail(){
     this.apiService.getComplaintSource().subscribe(data=>{
       this.complaintSource = data;
     },err=>{
       console.log("error",err);
     });

     this.apiService.getVehicleList(this.session.Country_Id).subscribe(data=>{
       this.vehicleObj = data;
     },err=>{
       console.log(err);
     });
  }

  save():any{
    if (this.Customer.ComplaintSource_Id == '' || this.Customer.ComplaintSource_Id == null) {
      Swal.fire('Please select source of the complaint');
      return false;
     }
  if (this.Customer.VINNumber == '' || this.Customer.VINNumber == null) {
    Swal.fire('Please enter customer VIN');
      return false;
    }
  if (this.Customer.CustomerMobile == '' || this.Customer.CustomerMobile == null) {
      if (this.Customer.CustomerEmail == '' || this.Customer.CustomerEmail == null) {
        Swal.fire('Please enter either mobile number or customer email');
          return false;
      } 
  }
 
if (this.Customer.ServiceTypeId == '' || this.Customer.ServiceTypeId == null) {
    if(this.Customer.Vehicle_Id == '' || this.Customer.Vehicle_Id == null){
      Swal.fire('Please select  Vehicle');
            return false;
     }
     Swal.fire('Please Select  Service Type');
      return false;
     }
  this.Customer.CreatedBy = this.session.User_Id;
  if (this.session.RoleName == 'Distributor') {
      this.Customer.Distributor = true;
  }
  else {
      this.Customer.Distributor = false;
  }

  this.apiService.saveResponse(this.Customer).subscribe((data:any)=> {
      console.log(data);
      if (data.indexOf('succesfully') != -1) {
        Swal.fire('Thanks', data, 'success');
         //this.int();
      }
      else {
        Swal.fire('Error', data, 'error');
      }
  },(error)=> {
      console.log(error);
  });
  }
    
}
