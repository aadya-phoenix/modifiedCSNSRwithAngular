import { Component, OnInit } from '@angular/core';
import { ConstantsService } from 'src/app/constants/constants.service';
import { Label } from 'src/app/models/label.model';
import { ApiService } from 'src/app/services/api.service';
import { CustomerFeedbackRxService } from './services/customer-feedback-rx.service';

@Component({
  selector: 'app-customer-feedback',
  templateUrl: './customer-feedback.component.html',
  styleUrls: ['./customer-feedback.component.css']
})
export class CustomerFeedbackComponent implements OnInit {

  defaultLanguage:boolean=true;
  selectedLang:number=this.constant.selectedLanguage;

  labelObj:Label[]=[];
  resultObj:any;

  VINNumber:string='';

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
  SerachText:string='';
  SerachTextLabel:string='';
  CustomerContactLabel2:string='';
  RepairDetailsLabel:string='';

  constructor(
    private constant:ConstantsService,
    private apiService:ApiService,
    private rx:CustomerFeedbackRxService) { }

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
  selectLanguage(id:number){
    if (id == 2) {
        this.defaultLanguage = true;
        for (let label of this.labelObj) {
            if (label.DefaultLanguage == 'Customer Name') {
                this.CustomerNameLabel = label.DefaultLanguage;
            }
            if (label.DefaultLanguage == 'Contact Number') {
                this.CustomerContactLabel = label.DefaultLanguage;
            }
            if (label.DefaultLanguage == 'Email Id') {
                this.CustomerEmailLabel = label.DefaultLanguage;
            }
            if (label.DefaultLanguage == 'VIN Number') {
                this.CustomerVINLabel = label.DefaultLanguage;
            }
            if (label.DefaultLanguage == 'Registration Number') {
                this.CustomerRegistrationLabel = label.DefaultLanguage;
            }
            if (label.DefaultLanguage == 'Vehicle') {
                this.CustomerVehicleLabel = label.DefaultLanguage;
            }
            if (label.DefaultLanguage == 'Job Card Number') {
                this.CustomerJCNLabel = label.DefaultLanguage;
            }
            if (label.DefaultLanguage == 'Invoice/Bill Date') {
                this.CustomerInvoiceDateLabel = label.DefaultLanguage;
            }
            if (label.DefaultLanguage == 'Service Type') {
                this.CustomerServiceTypeLabel = label.DefaultLanguage;
            }
            if (label.DefaultLanguage == 'Mileage') {
                this.CustomerMileageLabel = label.DefaultLanguage;
            }
            if (label.DefaultLanguage == 'Service Advisor') {
                this.CustomerSALabel = label.DefaultLanguage;
            }
            if (label.DefaultLanguage == 'Technician') {
                this.CustomerTecLabel = label.DefaultLanguage;
            }
            if (label.DefaultLanguage == 'Save and Next') {
                this.ButtonText = label.DefaultLanguage;
            }
            if (label.DefaultLanguage == 'Instant Feedback Card') {
                this.PageTitle = label.DefaultLanguage;
            }
             if (label.DefaultLanguage == 'Search by VIN Number or Mobile Number or Registration Number') {
                this.SerachText = label.DefaultLanguage;
            }
            if (label.DefaultLanguage == 'Search') {
                this.SerachTextLabel = label.DefaultLanguage;
            }
            if (label.DefaultLanguage == 'Contact Number 2') {
                 this.CustomerContactLabel2 = label.DefaultLanguage;
            }
             if (label.DefaultLanguage == 'Repair Details') {
                this.RepairDetailsLabel = label.DefaultLanguage;
            }    
        }
    }
    if (id > 2) {
      this.defaultLanguage = false;
        for (let label of this.labelObj) { 
          if(label.Language_Id==id)
           { 
            if (label.DefaultLanguage == 'Customer Name') {
                this.CustomerNameLabel = label.ConvertedLanguage;
            }
            if (label.DefaultLanguage == 'Contact Number') {
                this.CustomerContactLabel = label.ConvertedLanguage;
            }
            if (label.DefaultLanguage == 'Email Id') {
                this.CustomerEmailLabel = label.ConvertedLanguage;
            }
            if (label.DefaultLanguage == 'VIN Number') {
                this.CustomerVINLabel = label.ConvertedLanguage;
            }
            if (label.DefaultLanguage == 'Registration Number') {
                this.CustomerRegistrationLabel = label.ConvertedLanguage;
            }
            if (label.DefaultLanguage == 'Vehicle') {
                this.CustomerVehicleLabel = label.ConvertedLanguage;
            }
            if (label.DefaultLanguage == 'Job Card Number') {
                this.CustomerJCNLabel = label.ConvertedLanguage;
            }
            if (label.DefaultLanguage == 'Invoice/Bill Date') {
                this.CustomerInvoiceDateLabel = label.ConvertedLanguage;
            }
            if (label.DefaultLanguage == 'Service Type') {
                this.CustomerServiceTypeLabel = label.ConvertedLanguage;
            }
            if (label.DefaultLanguage == 'Mileage') {
                this.CustomerMileageLabel = label.ConvertedLanguage;
            }
            if (label.DefaultLanguage == 'Service Advisor') {
                this.CustomerSALabel = label.ConvertedLanguage;
            }
            if (label.DefaultLanguage == 'Technician') {
                this.CustomerTecLabel = label.ConvertedLanguage;
            }
            if (label.DefaultLanguage == 'Save and Next') {
                this.ButtonText = label.ConvertedLanguage;
            }
            if (label.DefaultLanguage == 'Instant Feedback Card') {
                this.PageTitle = label.ConvertedLanguage;
            }
             if (label.DefaultLanguage == 'Search by VIN Number or Mobile Number or Registration Number') {
                this.SerachText = label.ConvertedLanguage;
            }
            if (label.DefaultLanguage == 'Search') {
                        this.SerachTextLabel = label.ConvertedLanguage;
            }
            if (label.DefaultLanguage == 'Contact Number 2') {
                        this.CustomerContactLabel2 = label.ConvertedLanguage;
             }
            if (label.DefaultLanguage == 'Repair Details') {
                    this.RepairDetailsLabel = label.ConvertedLanguage;
             }
           }
        }
    }

    this.resultObj={
      CustomerNameLabel:this.CustomerNameLabel,
      CustomerContactLabel:this.CustomerContactLabel,
      CustomerEmailLabel:this.CustomerEmailLabel,
      CustomerVINLabel:this.CustomerVINLabel,
      CustomerRegistrationLabel:this.CustomerRegistrationLabel,
      CustomerVehicleLabel:this.CustomerVehicleLabel,
      CustomerJCNLabel:this.CustomerJCNLabel,
      CustomerInvoiceDateLabel:this.CustomerInvoiceDateLabel,
      CustomerServiceTypeLabel:this.CustomerServiceTypeLabel,
      CustomerMileageLabel:this.CustomerMileageLabel,
      CustomerSALabel:this.CustomerSALabel,
      CustomerTecLabel:this.CustomerTecLabel,
      ButtonText:this.ButtonText,
      PageTitle:this.PageTitle,
      SerachText:this.SerachText,
      SerachTextLabel:this.SerachTextLabel,
      CustomerContactLabel2:this.CustomerContactLabel2,
      RepairDetailsLabel:this.RepairDetailsLabel,
    };
  }
  
  searchByVIN(){
    this.rx.sendEvent({vin:this.VINNumber,dLang:this.defaultLanguage});
  }
}
