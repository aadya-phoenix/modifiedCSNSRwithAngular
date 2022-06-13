import { Component, OnInit } from '@angular/core';
import { ConstantsService } from 'src/app/constants/constants.service';
import { TransactionConstantsService } from 'src/app/constants/transaction-constants.service';
import { Label } from 'src/app/models/label.model';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { CommonService } from './common.service';

@Component({
  selector: 'customer-complaint',
  templateUrl: './customer-complaint.component.html',
  styleUrls: ['./customer-complaint.component.css']
})
export class CustomerComplaintComponent implements OnInit {

  labelObj:Label[]=[];
  defaultLanguage:boolean = true;
  selectedLanguage: number = this.constantService.selectedLanguage;
  session = this.constantService.takeSession();
  VINNumber:string='';

  resultObj:any;

  SearchText: string = '';
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
  SearchTextLabel: string = '';
  DealerOutletLabel: string = '';
  ComplaintSourceLabel: string = '';
  CCLabel: string = '';
  CustomerContactLabel2: string = '';
  RepairDetailsLabel: string = '';

  constructor(
    private apiService: ApiService,
    private constantService: ConstantsService,
    private common:CommonService
  ) { }

  ngOnInit(): void {
    this.apiService.getLabel().subscribe(data=>{
     this.labelObj  = data;
     this.selectLanguage(this.selectedLanguage);
    },err=>{
      console.log(err);
    });
  }

  selectLanguage(id: number) {
    if (id == 2) {
      this.defaultLanguage = true;
      for (var i = 0; i < this.labelObj.length; i++) {
        if (this.labelObj[i].DefaultLanguage == 'Search by VIN Number or Mobile Number or Registration Number') {
          this.SearchText = this.labelObj[i].DefaultLanguage;
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
          this.SearchTextLabel = this.labelObj[i].DefaultLanguage;
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
            this.SearchText = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'Search') {
            this.SearchTextLabel = this.labelObj[i].ConvertedLanguage;
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

    this.resultObj = {
      SearchText: this.SearchText ,
      CustomerNameLabel: this.CustomerNameLabel ,
      CustomerContactLabel: this.CustomerContactLabel ,
      CustomerEmailLabel: this.CustomerEmailLabel ,
      CustomerVINLabel: this.CustomerVINLabel ,
      CustomerRegistrationLabel: this.CustomerRegistrationLabel ,
      CustomerVehicleLabel: this.CustomerVehicleLabel ,
      CustomerJCNLabel: this.CustomerJCNLabel ,
      CustomerInvoiceDateLabel: this.CustomerInvoiceDateLabel ,
      CustomerServiceTypeLabel: this.CustomerServiceTypeLabel ,
      CustomerMileageLabel: this.CustomerMileageLabel ,
      CustomerSALabel: this.CustomerSALabel ,
      CustomerTecLabel: this.CustomerTecLabel ,
      ButtonText: this.ButtonText ,
      PageTitle: this.PageTitle ,
      CustomerRemarksLabel: this.CustomerRemarksLabel ,
      SearchTextLabel: this.SearchTextLabel ,
      DealerOutletLabel: this.DealerOutletLabel ,
      ComplaintSourceLabel: this.ComplaintSourceLabel ,
      CCLabel: this.CCLabel ,
      CustomerContactLabel2: this.CustomerContactLabel2 ,
      RepairDetailsLabel: this.RepairDetailsLabel ,
    }
  }

  searchByVIN():any{
    this.common.sendCustomerEvent(this.VINNumber);
    if (this.VINNumber == null || this.VINNumber == '') {
      Swal.fire('Error', 'Please enter VIN Nunmber to continue', 'error');
      return false;
  }

  }
}

