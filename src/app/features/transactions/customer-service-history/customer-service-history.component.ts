import { Component, OnInit } from '@angular/core';
import { ConstantsService } from 'src/app/constants/constants.service';
import { Label } from 'src/app/models/label.model';
import { Vehicle } from 'src/app/models/vehicle.model';
import { ApiService } from 'src/app/services/api.service';
import { CustomerServiceInfo } from '../models/customerServiceInfo.model';
import { TrnCommonService } from '../services/trn-common.service';
import { CustomerInfo } from '../models/customerInfo.model';
import { DealerEmployee } from '../../../models/dealerEmployee.model';
import { ServiceType } from 'src/app/models/serviceType.model';
import { Outlet } from 'src/app/models/oultet.model';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-service-history',
  templateUrl: './customer-service-history.component.html',
  styleUrls: ['./customer-service-history.component.css']
})
export class CustomerServiceHistoryComponent implements OnInit {

  selectedLang:number=this.constant.selectedLanguage;
  session = this.constant.takeSession();
  defaultLanguage:boolean=true;

  VINNumber:string='';

  labelObj:Label[]=[];
  vehicleObj:Vehicle[]=[];
  outletObj:Outlet[]=[];
  serviceHistory:CustomerServiceInfo[]=[];
  Customer!:CustomerInfo;

  CustomerDisabled:boolean=true;
  SAObj:DealerEmployee[]=[];
  tecObj:DealerEmployee[]=[];
  serviceTypeObj:ServiceType[]=[];


  CustomerNameLabel:string = '';
  CustomerContactLabel:string = '';
  CustomerEmailLabel:string = '';
  CustomerVINLabel:string = '';
  CustomerRegistrationLabel:string = '';
  CustomerVehicleLabel:string = '';
  CustomerJCNLabel:string = '';
  CustomerInvoiceDateLabel:string = '';
  CustomerServiceTypeLabel:string = '';
  CustomerMileageLabel:string = '';
  CustomerTecLabel:string = '';
  CustomerSALabel:string = '';
  ButtonText:string = '';
  PageTitle:string = '';
  ServiceDateLabel:string = '';
  ServiceTypeLabel:string = '';
  OutletLabel:string = '';
  RepairDetailsLabel:string = '';
  JobCardNumberLabel:string = '';
  MileageLabel:string = '';
  SearchText:string = '';
  SearchTextLabel:string = '';
  CSHLabel:string = '';
  SVHLabel:string = '';


  constructor(
    private constant:ConstantsService,
    private apiService:ApiService,
    private trn:TrnCommonService,
    private datePipe:DatePipe
  ) { }

  ngOnInit(): void {
    this.getFormDetails();
       this.Customer={
          CustomerName : '',
          CustomerMobile : '',
          CustomerMobile2 : '',
          CustomerEmail : '',
          VINNumber : '',
          RegistrationNumber : '',
          Vehicle_Id : 0 ,
          VehicleName : '',
          VehicleCode : '',
          DealerCode :'',
          JOBCardNumber : '',
          ServiceAdvisorEmpCde :'',
          TecnicianEmpCde : '',
          ServiceTypeId : 0 ,
          ServiceAdvisorId : 0 ,
          TecnicianId : 0 ,
          OutletId : 0 ,
          Customer_Id : 0 ,
          ServiceType : '',
          Remarks : '',
          CmplnAttribute : '',
          RepairDetails : '',
       }
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
   this.trn.getOutLetListByCountry(this.session.Country_Id).subscribe((data:any)=>{
     this.outletObj = data;
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
            }if (label.DefaultLanguage == 'Contact Number') {
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
            }if (label.DefaultLanguage == 'Service Date') {
                this.ServiceDateLabel = label.DefaultLanguage;
            }if (label.DefaultLanguage == 'Service Type') {
                this.ServiceTypeLabel = label.DefaultLanguage;
            }if (label.DefaultLanguage == 'Outlet') {
                this.OutletLabel = label.DefaultLanguage;
            }if (label.DefaultLanguage == 'Repair Details') {
                this.RepairDetailsLabel = label.DefaultLanguage;
            }if (label.DefaultLanguage == 'Job Card Number') {
                this.JobCardNumberLabel = label.DefaultLanguage;
            }if (label.DefaultLanguage == 'Mileage') {
                this.MileageLabel = label.DefaultLanguage;
            }if (label.DefaultLanguage == 'Search by VIN Number or Mobile Number or Registration Number') {
                this.SearchText = label.DefaultLanguage;
            }if (label.DefaultLanguage == 'Search') {
                this.SearchTextLabel = label.DefaultLanguage;
            }if (label.DefaultLanguage == 'Customer Service History') {
                this.CSHLabel = label.DefaultLanguage;
            }if (label.DefaultLanguage == 'Service Visit History') {
                this.SVHLabel = label.DefaultLanguage;
            }
        }
    }
    if (id > 2) {
        this.defaultLanguage = false;
        for (let label of this.labelObj) {
            if (label.Language_Id == id) {
                if (label.DefaultLanguage == 'Customer Name') {
                    this.CustomerNameLabel = label.ConvertedLanguage;
                }if (label.DefaultLanguage == 'Contact Number') {
                    this.CustomerContactLabel = label.ConvertedLanguage;
                }if (label.DefaultLanguage == 'Email Id') {
                    this.CustomerEmailLabel = label.ConvertedLanguage;
                }if (label.DefaultLanguage == 'VIN Number') {
                    this.CustomerVINLabel = label.ConvertedLanguage;
                }if (label.DefaultLanguage == 'Registration Number') {
                    this.CustomerRegistrationLabel = label.ConvertedLanguage;
                }if (label.DefaultLanguage == 'Vehicle') {
                    this.CustomerVehicleLabel = label.ConvertedLanguage;
                }if (label.DefaultLanguage == 'Job Card Number') {
                    this.CustomerJCNLabel = label.ConvertedLanguage;
                }if (label.DefaultLanguage == 'Invoice Date') {
                    this.CustomerInvoiceDateLabel = label.ConvertedLanguage;
                }if (label.DefaultLanguage == 'Service Type') {
                    this.CustomerServiceTypeLabel = label.ConvertedLanguage;
                }if (label.DefaultLanguage == 'Mileage') {
                    this.CustomerMileageLabel = label.ConvertedLanguage;
                }if (label.DefaultLanguage == 'Service Advisor') {
                    this.CustomerSALabel = label.ConvertedLanguage;
                }if (label.DefaultLanguage == 'Technician') {
                    this.CustomerTecLabel = label.ConvertedLanguage;
                }if (label.DefaultLanguage == 'Save and Next') {
                    this.ButtonText = label.ConvertedLanguage;
                }if (label.DefaultLanguage == 'Instant Feedback Card') {
                    this.PageTitle = label.ConvertedLanguage;
                }if (label.DefaultLanguage == 'Service Date') {
                    this.ServiceDateLabel = label.ConvertedLanguage;
                }if (label.DefaultLanguage == 'Service Type') {
                    this.ServiceTypeLabel = label.ConvertedLanguage;
                }if (label.DefaultLanguage == 'Outlet') {
                    this.OutletLabel = label.ConvertedLanguage;
                }if (label.DefaultLanguage == 'Repair Details') {
                    this.RepairDetailsLabel = label.ConvertedLanguage;
                }if (label.DefaultLanguage == 'Job Card Number') {
                    this.JobCardNumberLabel = label.ConvertedLanguage;
                }if (label.DefaultLanguage == 'Mileage') {
                    this.MileageLabel = label.ConvertedLanguage;
                }if (label.DefaultLanguage == 'Search by VIN Number or Mobile Number or Registration Number') {
                    this.SearchText = label.ConvertedLanguage;
                }if (label.DefaultLanguage == 'Search') {
                    this.SearchTextLabel = label.ConvertedLanguage;
                }if (label.DefaultLanguage == 'Customer Service History') {
                    this.CSHLabel = label.ConvertedLanguage;
                }if (label.DefaultLanguage == 'Service Visit History') {
                    this.SVHLabel = label.ConvertedLanguage;
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
          this.CustomerDisabled = true;
          this.trn.getCustomerServiceHistory(this.Customer.Customer_Id).subscribe((data:any)=>{
              this.serviceHistory = data;
            },(error)=>{
              console.log(error);
          });
      }
      else {
          Swal.fire('Error', 'No customer data exists.', 'error');
          this.CustomerDisabled = true;
          return false;
       }
     },(error)=>{
      console.log(error);
   });
  }

  getEmployee(id:any){
    this.apiService.getSAList(id).subscribe((data:any)=>{
      this.SAObj = data;
       },(error)=>{
      console.log(error);
    });
    this.apiService.getTecnicianList(id).subscribe((data:any)=>{
      this.tecObj = data;
      },(error)=>{
      console.log(error);
    });
  }

  getServiceList(id:number){
    this.trn.getServiceTypeList(id).subscribe((data:any)=>{
      this.serviceTypeObj = data;
  }, function (error) {
      console.log(error);
  });
  }

}
