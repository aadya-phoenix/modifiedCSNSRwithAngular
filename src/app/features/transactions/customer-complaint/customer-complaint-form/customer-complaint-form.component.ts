import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Outlet } from 'src/app/models/oultet.model';
import { ApiService } from 'src/app/services/api.service';
import { ConstantsService } from 'src/app/constants/constants.service';
import { TransactionConstantsService } from 'src/app/constants/transaction-constants.service';
import { Subscription } from 'rxjs';
import { CommonService } from '../common.service';
import { CustomerInfo } from '../../models/customerInfo.model';
import Swal from 'sweetalert2';
import { DealerEmployee } from 'src/app/models/dealerEmployee.model';
import { ServiceType } from 'src/app/models/serviceType.model';
import { ComplaintSource } from '../../models/complaintSource.model';
import { Vehicle } from 'src/app/models/vehicle.model';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'customer-complaint-form',
  templateUrl: './customer-complaint-form.component.html',
  styles: [
  ]
})
export class CustomerComplaintFormComponent implements OnInit {
  
  VINNumber:string='';

  @Input()
  labelObj!:any;

  outletObj: Outlet[]=[];
  defaultLanguage:boolean = true;
  selectedLanguage: number = this.constantService.selectedLanguage;
  session = this.constantService.takeSession();
  Role = this.session.RoleName;
  CustomerDisabled:boolean=true;

  SAObj:DealerEmployee[]=[];
  TecObj:DealerEmployee[]=[];
  Customer!:CustomerInfo;
  complaintSource:ComplaintSource[]=[];
  serviceTypeObj:ServiceType[]=[];
  vehicleObj:Vehicle[]=[];

  customerSubscription!: Subscription;

  constructor(
    private apiService: ApiService,
    private constantService: ConstantsService,
    private datePipe: DatePipe,
    private common:CommonService
  ) { }

  ngOnInit(): void {
    this.Customer={ } as CustomerInfo;
    this.customerSubscription = this.common.getCustomerEvent().subscribe((data)=>{
     this.VINNumber = data;
     this.searchByVIN();
   });

   this.getDealerByCountry(this.session.Country_Id);  
   this.getFormDetails();
  }

  searchByVIN():any{
    this.apiService.getCustomerByVIN(this.VINNumber,this.session.User_Id).subscribe((data:any)=>{
     if(data != null){
       this.Customer = data;
       this.Customer.InvoiceDate = this.datePipe.transform(data.InvoiceDate, 'MMMM dd, yyyy');
       this.CustomerDisabled = false;
       this.getEmployee(this.Customer.OutletId);
       this.getServiceList(this.Customer.Vehicle_Id);
      }
     },err=>{
       console.log(err);
    });
 }

 onDateChange(event: MatDatepickerInputEvent<Date>){
  this.Customer.InvoiceDate  = event.value;
 }

  getEmployee(id:any){
    this.apiService.getSAList(id).subscribe((data:any)=>{
      this.SAObj = data;
     },err=>{
      console.log(err);
    });
    this.apiService.getTecnicianList(id).subscribe((data:any)=>{
      this.TecObj = data;
    },err=>{
      console.log(err);
    });
  }

  getServiceList(id:number){
    this.apiService.getServiceTypeList(id).subscribe((data:any)=>{
    this.serviceTypeObj = data;
    },err=>{
      console.log(err);
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

  getFormDetails(){
     this.apiService.getComplaintSource().subscribe((data:any)=>{
       this.complaintSource = data;
       console.log("complaintSource",this.complaintSource);
     },err=>{
       console.log("error",err);
     });

     this.apiService.getVehicleList(this.session.Country_Id).subscribe((data:any)=>{
       this.vehicleObj = data;
     },err=>{
       console.log(err);
     });
  }

  save():any{
    if (this.Customer.ComplaintSource_Id == 0 || this.Customer.ComplaintSource_Id == null) {
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
    if (this.Customer.ServiceTypeId == 0 || this.Customer.ServiceTypeId == null) {
      if(this.Customer.Vehicle_Id == 0 || this.Customer.Vehicle_Id == null){
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
         //this.init();
      }
      else {
        Swal.fire('Error', data, 'error');
      }
      },(error)=> {
      console.log(error);
     });
  }
    
}
