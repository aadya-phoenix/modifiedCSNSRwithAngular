import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ConstantsService } from 'src/app/constants/constants.service';
import { Label } from 'src/app/models/label.model';
import { ApiService } from 'src/app/services/api.service';
import { BookingInfo } from '../models/bookingInfo.model';
import { DirectBookingService } from './direct-booking.service';
import  Swal from 'sweetalert2';
import { CustomerInfo } from '../models/customerInfo.model';
import { ServiceType } from 'src/app/models/serviceType.model';
import { Vehicle } from 'src/app/models/vehicle.model';
import { TrnCommonService } from '../services/trn-common.service';

@Component({
  selector: 'app-direct-booking',
  templateUrl: './direct-booking.component.html',
  styleUrls: ['./direct-booking.component.css']
})
export class DirectBookingComponent implements OnInit {

  selectedLang:number=this.constant.selectedLanguage;
  defaultLanguage:boolean=true;
  session = this.constant.takeSession();
  searchText:string='';

  labelObj:Label[]=[];
  Customer!: BookingInfo;
  serviceTypeObj:ServiceType[]=[];
  vehicleObj:Vehicle[]=[];

  VINNumber:string='';
  CustomerDisabled:boolean = true;
  ShowDetails:boolean = false;

  CustomerNameLabel:string='';
  CustomerContactLabel:string='';
  CustomerEmailLabel:string='';
  CustomerVINLabel:string='';
  CustomerRegistrationLabel:string='';
  CustomerVehicleLabel:string='';
  CustomerJCNLabel:string='';
  CustomerInvoiceDateLabel:string='';
  CustomerServiceTypeLabel:string='';
  CustomerMileageLabel:string='';
  CustomerSALabel:string='';
  CustomerTecLabel:string='';
  ButtonText:string='';
  PageTitle:string='';
  BookingDateLabel:string='';
  BookingTimeLabel:string='';
  SearchTextLabel:string='';
  DirectServiceLabel:string='';
  SearchText:string='';
  CustomerRemarksLabel:string='';
  CustomerContactLabel2:string='';

  constructor(
    private constant:ConstantsService,
    private apiService:ApiService,
    private dbService:DirectBookingService,
    private datePipe:DatePipe,
    private trn:TrnCommonService
  ) { }

  ngOnInit(): void {
    this.Customer={
        OutletId : 0, 
        Customer_Id :0,
        CustomerName : '',
        CustomerEmail : '',
        CustomerMobile2 : '',
        CustomerMobile : '',
        VINNumber : '',
        RegistrationNumber :'',
        Vehicle_Id : 0,
        ServiceType_Id : 0,
        Remarks : '',
        Mileage : 0,
        UserId : 0,
    }
   this.getFormDetails();
  }

  getFormDetails(){
    this.apiService.getLabel().subscribe(data=>{
      this.labelObj = data;
      this.selectLanguage(this.selectedLang);
     },(error)=>{
      console.log(error);
   });
   
   this.apiService.getVehicleList(this.session.Country_Id).subscribe((data:any)=>{
    this.vehicleObj = data;
    },(error)=>{
     console.log(error);
   });
  }

  selectLanguage(id:number){
    if (id == 2) {
      this.defaultLanguage = true;
        for (let label of this.labelObj) {
            if (label.DefaultLanguage == 'Customer Name') {
                this.CustomerNameLabel = label.DefaultLanguage;
            } if (label.DefaultLanguage == 'Contact Number') {
                this.CustomerContactLabel = label.DefaultLanguage;
            }if (label.DefaultLanguage == 'Email Id') {
                this.CustomerEmailLabel = label.DefaultLanguage;
            }if (label.DefaultLanguage == 'VIN Number') {
                this.CustomerVINLabel = label.DefaultLanguage;
            }if (label.DefaultLanguage == 'Registration Number') {
                this.CustomerRegistrationLabel = label.DefaultLanguage;
            }if (label.DefaultLanguage == 'Vehicle') {
                this.CustomerVehicleLabel = label.DefaultLanguage;
            }if (label.DefaultLanguage == 'Job Card Number') {
                this.CustomerJCNLabel = label.DefaultLanguage;
            }if (label.DefaultLanguage == 'Invoice Date') {
                this.CustomerInvoiceDateLabel = label.DefaultLanguage;
            }if (label.DefaultLanguage == 'Service Type') {
                this.CustomerServiceTypeLabel = label.DefaultLanguage;
            }if (label.DefaultLanguage == 'Mileage') {
                this.CustomerMileageLabel = label.DefaultLanguage;
            }if (label.DefaultLanguage == 'Service Advisor') {
                this.CustomerSALabel = label.DefaultLanguage;
            }if (label.DefaultLanguage == 'Technician') {
                this.CustomerTecLabel = label.DefaultLanguage;
            }if (label.DefaultLanguage == 'Save and Next') {
                this.ButtonText = label.DefaultLanguage;
            }if (label.DefaultLanguage == 'Instant Feedback Card') {
                this.PageTitle = label.DefaultLanguage;
            }if (label.DefaultLanguage == 'Booking Date*') {
                this.BookingDateLabel = label.DefaultLanguage;
            }if (label.DefaultLanguage == 'Booking Time') {
                this.BookingTimeLabel = label.DefaultLanguage;
            }if (label.DefaultLanguage == 'Search') {
                this.SearchTextLabel = label.DefaultLanguage;
            }if (label.DefaultLanguage == 'Direct Service Appointment') {
                this.DirectServiceLabel = label.DefaultLanguage;
            }if (label.DefaultLanguage == 'Search by VIN Number or Mobile Number or Registration Number') {
                this.SearchText = label.DefaultLanguage;
            }if (label.DefaultLanguage == 'Remarks') {
                this.CustomerRemarksLabel = label.DefaultLanguage;
            }if (label.DefaultLanguage == 'Contact Number 2') {
                this.CustomerContactLabel2 = label.DefaultLanguage;
            }
        }
    }
    if (id > 2) {
        this.defaultLanguage = false;
        for (let label of this.labelObj) {
         if(label.Language_Id==id){
            if (label.DefaultLanguage == 'Customer Name') {
                this.CustomerNameLabel = label.ConvertedLanguage;
            } if (label.DefaultLanguage == 'Search by VIN Number or Mobile Number or Registration Number') {
                this.SearchText = label.ConvertedLanguage;
            } if (label.DefaultLanguage == 'Contact Number') {
                this.CustomerContactLabel = label.ConvertedLanguage;
            } if (label.DefaultLanguage == 'Email Id') {
                this.CustomerEmailLabel = label.ConvertedLanguage;
            } if (label.DefaultLanguage == 'VIN Number') {
                this.CustomerVINLabel = label.ConvertedLanguage;
            } if (label.DefaultLanguage == 'Registration Number') {
                this.CustomerRegistrationLabel = label.ConvertedLanguage;
            } if (label.DefaultLanguage == 'Vehicle') {
                this.CustomerVehicleLabel = label.ConvertedLanguage;
            } if (label.DefaultLanguage == 'Job Card Number') {
                this.CustomerJCNLabel = label.ConvertedLanguage;
            } if (label.DefaultLanguage == 'Invoice Date') {
                this.CustomerInvoiceDateLabel = label.ConvertedLanguage;
            } if (label.DefaultLanguage == 'Service Type') {
                this.CustomerServiceTypeLabel = label.ConvertedLanguage;
            } if (label.DefaultLanguage == 'Mileage') {
                this.CustomerMileageLabel = label.ConvertedLanguage;
            } if (label.DefaultLanguage == 'Service Advisor') {
                this.CustomerSALabel = label.ConvertedLanguage;
            } if (label.DefaultLanguage == 'Technician') {
                this.CustomerTecLabel = label.ConvertedLanguage;
            } if (label.DefaultLanguage == 'Save and Next') {
                this.ButtonText = label.ConvertedLanguage;
            } if (label.DefaultLanguage == 'Instant Feedback Card') {
                this.PageTitle = label.ConvertedLanguage;
            } if (label.DefaultLanguage == 'Booking Date*') {
                this.BookingDateLabel = label.ConvertedLanguage;
            } if (label.DefaultLanguage == 'Booking Time') {
                this.BookingTimeLabel = label.ConvertedLanguage;
            } if (label.DefaultLanguage == 'Search') {
                this.SearchTextLabel = label.ConvertedLanguage;
            } if (label.DefaultLanguage == 'Direct Service Appointment') {
                this.DirectServiceLabel = label.ConvertedLanguage;
            } if (label.DefaultLanguage == 'Remarks') {
                this.CustomerRemarksLabel = label.ConvertedLanguage;
            } if (label.DefaultLanguage == 'Contact Number 2') {
                 this.CustomerContactLabel2 = label.ConvertedLanguage;
            }
         }

        }
    }
  }

  searchByVIN():any{
    if (this.VINNumber == null || this.VINNumber == '') {
      Swal.fire('Error', 'Please enter VIN Nunmber to continue', 'error');
      return false;
    }
    this.trn.getCustomerByVIN(this.VINNumber, this.session.User_Id).subscribe((data:any):any=>{
      if (data != null) {
          this.Customer = data;
          this.Customer.InvoiceDate = this.datePipe.transform(data.InvoiceDate, 'MMMM dd, yyyy');
          this.CustomerDisabled = false;
          this.ShowDetails = true;
          this.getEmployee(this.Customer.OutletId);
          this.getServiceList(this.Customer.Vehicle_Id);
       }
      else {
          this.ShowDetails = false;
          Swal.fire('Error', 'No customer data exists. Please add customer details for service booking', 'error');
          this.CustomerDisabled = false;
          return false;
        }
      },(error)=>{
          console.log(error);
    });

  }
  
  getEmployee(id:any){
    
  }
  getServiceList(id:number){
    this.dbService.getServiceTypeList(id).subscribe((data:any):any=>{
      this.serviceTypeObj = data;
     },(error)=>{
      console.log(error);
   });
  }

  save():any{
    if (this.Customer.CustomerName == '' || this.Customer.CustomerName == null) {
      Swal.fire('Please enter customer name');
      return false;
    }
    if (this.Customer.RegistrationNumber == '' || this.Customer.RegistrationNumber == null) { 
      Swal.fire('Please enter Registration number');
      return false;
    }
    if (this.Customer.Vehicle_Id == 0 || this.Customer.Vehicle_Id == null) {
     Swal.fire('Please select Vehicle');
     return false;
    }
    if (this.Customer.CustomerEmail == '' || this.Customer.CustomerEmail == null) {  
      this.Customer.CustomerEmail = 'NA';
    }
    if (this.Customer.BookingDate == null) {
     Swal.fire('Please select booking Date');
      return false;
    }
    if (this.Customer.BookingTime == '' || this.Customer.BookingTime == null) {
     Swal.fire('Please enter Booking Time');
     return false;
    } 
    if (this.Customer.ServiceType_Id == 0 || this.Customer.ServiceType_Id == null) {
      Swal.fire('Please enter Service Details');
      return false;
    }

   this.Customer.BookingTime = this.datePipe.transform(this.Customer.BookingTime, 'HH:mm:ss');

    if (this.Customer.CustomerMobile == '' || this.Customer.CustomerMobile == null) {
     if (this.Customer.CustomerEmail == '' || this.Customer.CustomerEmail == null) {
      Swal.fire('Please enter either mobile number or customer email');
      return false;
     }
    }
    this.dbService.saveResponse(this.Customer).subscribe((data:any)=>{
      if (data.indexOf('succesfully') != -1) {
         Swal.fire('Thanks', data, 'success');
          this.init();
      }
      else {
         Swal.fire('Error', data, 'error');
      }
     },(error)=>{
      console.log(error);
   });
  }
  init(){}
}
