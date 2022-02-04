import { Component, OnInit } from '@angular/core';
import { ConstantsService } from 'src/app/constants/constants.service';
import { MastersApiService } from 'src/app/services/masters-api.service';

import { Country } from 'src/app/models/country.model';

import { CountryUploadComponent } from './country-upload/country-upload.component';
import { SmsSetupComponent } from './sms-setup/sms-setup.component';

import { MatDialog} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { EmailTemplateComponent } from './email-template/email-template.component';
import { Language } from '../models/language.model';
import { RxService } from './rx.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CountryService } from './country.service';


@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  showSearchGrid:boolean=true;
  showCountryForm:boolean = false;
  showEditForm:boolean = false;

  countryObj:Country[]=[];
  languageObj:Language[]=[];
  country!: Country;

  session=this.constants.takeSession();
  searchText:string='';

  toggleSubscription!: Subscription;

  constructor(
    private masters:MastersApiService,
    private constants:ConstantsService,
    public dialog:MatDialog,
    private rx:RxService,
    private countryService:CountryService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.showSearchGrid = true;
    this.showCountryForm = false;
    this.showEditForm = false;
    this.getFormDetails();

    this.toggleSubscription = this.rx.getToggleEvent().subscribe(data=>{
      this.init();
      console.log("init country call from dialog sms");
    })
  }

  getFormDetails(){
   this.masters.getCountryList().subscribe((data:any)=>{
       this.countryObj=data;
   },err=>{
     console.log(err);
   });

   this.masters.getLanguageList().subscribe((data:any)=>{
     this.languageObj = data;
   },err=>{
     console.log(err);
   });
  }
  
  addCountry(){
    this.country = {
      Country_Id: 0,
      CountryName: '',
      Language_Id: 0,
      Company_Id: 1,
      IsActive: true,
      CreatedBy: this.session.User_Id,
      ModifiedBy: 0,
      Language:''
  };
  this.showSearchGrid = false;
  this.showCountryForm = true;
  this.showEditForm = false;
  }
  
  addUpload(){
    this.dialog.open(CountryUploadComponent,{
      disableClose: true,
      panelClass: 'custom-dialog-container',
      width:'550px',
      height:'265px'
    });
  }

  saveForm(){
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to continue this process?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Continue",
      allowOutsideClick:false
    }).then((result):any=>{
      if(result.isConfirmed){
    if (this.country.CountryName == null || this.country.CountryName == ''){
      Swal.fire('error', 'Please enter Country', 'error');
      return false;
     }
     if (this.country.Language_Id == null || this.country.Language_Id == 0){
       Swal.fire('error', 'Please select Language', 'error');
       return false;
     }

     this.masters.addCountry(this.country).subscribe((data:any)=>{
      Swal.fire('Success', data, 'success');
      this.init();
     },err=>{
       console.log(err);
     });
    }
  });
  }

  init(){
  this.showSearchGrid = true;
  this.showCountryForm = false;
  this.showEditForm = false;
  this.getFormDetails();
  }

  smsSetup(id:number){
    this.dialog.open(SmsSetupComponent,{
      data:{countryId:id},
      panelClass: 'custom-dialog-container',
       width:'900px',
      height:'500px' 
    });
  }

  emailTemplate(id:number, obj:Country){
    this.dialog.open(EmailTemplateComponent,{data:{countryId:id}}); 
  }
 
  createLevel(id:number){
    this.router.navigate(['/index/levelMaster',id]);
  }

  createSubLevel(id:number){
    this.router.navigate(['/index/levelDetail',id]);
  }

  tsmMapping(countryId:number){
    this.router.navigate(['/index/TSM',countryId]);
  }
  employeeUpload(countryId:number){
    this.router.navigate(['/index/CountryWiseEmployee',countryId]);
  }
  editTransaction(country:Country){
    this.showSearchGrid = false;
    this.showCountryForm = false;
    this.showEditForm = true;
    this.country = country;
  }
  deleteTransaction(country:any){
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to continue this process?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Continue",
      allowOutsideClick:false
    }).then((result):any=>{
      if(result.isConfirmed){
      country.ModifiedBy = this.session.User_Id;

      this.countryService.deleteCountry(country).subscribe((data:any)=>{
          this.init();
          Swal.fire("success", data, "success");
      }, err=>{
        console.log(err);
      });
     }
    });
  }

  editSaveTransaction(){
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to continue this process?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Continue",
      allowOutsideClick:false
    }).then((result):any=>{
      if(result.isConfirmed){
    if (this.country.CountryName == null || this.country.CountryName == ''){
      Swal.fire('error', 'Please enter Country', 'error');
      return false;
     }
     if (this.country.Language_Id == null || this.country.Language_Id == 0){
       Swal.fire('error', 'Please select Language', 'error');
       return false;
     }
     this.country.ModifiedBy = this.session.User_Id;
     this.countryService.editCountry(this.country).subscribe((data:any)=>{
      Swal.fire('Success', data, 'success');
      this.init();
     },err=>{
       console.log(err);
     });
    }
  });
  }

}